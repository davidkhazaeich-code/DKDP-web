# Google My Business API Setup Guide

This guide walks you through setting up the Google My Business (GMB) API for automated blog publishing to your business profile.

## Overview

The integration allows you to:
- Automatically post blog articles to Google My Business from GitHub Actions
- Use service account authentication (no OAuth required)
- Manage account and location IDs securely via GitHub Secrets

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Enter project name: `DKDP Blog Publisher` (or similar)
5. Click "Create"
6. Wait for project creation to complete

### 1.2 Enable Required APIs

1. In the Cloud Console, go to **APIs & Services** > **Library**
2. Search for and enable these APIs (click each, then "Enable"):
   - **Google My Business API**
   - **Business Information API** (also called "Business Information API")

3. Verify both are enabled: Go to **APIs & Services** > **Enabled APIs & Services**

## Step 2: Create Service Account

### 2.1 Create the Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **+ Create Credentials** > **Service Account**
3. Enter service account name: `blog-publisher`
4. Enter service account ID: `blog-publisher` (auto-filled, leave as-is or customize)
5. Enter description: `Service account for automated blog publishing to GMB`
6. Click "Create and Continue"

### 2.2 Grant Required Roles

On the next screen:
1. Click **Grant this service account access to project**
2. Add these roles:
   - `Editor` (or more restrictive: `Business Information Manager`)
   - `Service Account User`
3. Click "Continue"
4. Click "Done"

### 2.3 Download JSON Key

1. In **APIs & Services** > **Credentials**, find your service account
2. Click on the service account email address
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** format
6. Click **Create**

A JSON file will download automatically. This file contains your private key.

**Important:** Keep this file secure. You'll base64-encode it for GitHub Secrets.

## Step 3: Grant GMB Access

The service account email must be added as a Manager on your Google My Business profile.

### 3.1 Find Service Account Email

1. Open the JSON key file you downloaded
2. Locate the `"client_email"` field
3. Copy the entire email address (format: `blog-publisher@PROJECT_ID.iam.gserviceaccount.com`)

### 3.2 Add to Google My Business

1. Go to [Google My Business](https://www.google.com/business/)
2. Sign in with your business account
3. Select your business profile
4. Go to **Settings** > **Users and permissions** (or **Admins and managers**)
5. Click **Invite user** or **Add user**
6. Paste the service account email
7. Set role to **Manager** or **Editor**
8. Send invitation

The service account now has access to manage your GMB profile.

## Step 4: Get Account and Location IDs

### 4.1 Retrieve IDs via Python

Create a temporary Python script to list your accounts and locations:

```python
#!/usr/bin/env python3
"""
List Google My Business accounts and locations using service account credentials.
"""

from google.oauth2 import service_account
from google.api_core.gapic_v1 import client_info as client_info_lib
from google.ads.googleads.client import GoogleAdsClient
import json
import sys

# Path to your downloaded JSON key file
CREDENTIALS_FILE = "./credentials.json"  # Update to your path

def get_gmb_accounts():
    """Fetch all GMB accounts accessible by the service account."""
    
    # Load credentials
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_FILE,
        scopes=["https://www.googleapis.com/auth/business.manage"]
    )
    
    # Use Google My Business API (v4)
    from googleapiclient.discovery import build
    
    service = build("mybusiness", "v4", credentials=credentials)
    
    try:
        # List accounts
        response = service.accounts().list().execute()
        accounts = response.get("accounts", [])
        
        if not accounts:
            print("No accounts found.")
            return
        
        print("\n=== Google My Business Accounts ===\n")
        
        for account in accounts:
            account_id = account.get("name", "").split("/")[-1]
            account_name = account.get("accountName", "Unknown")
            
            print(f"Account Name: {account_name}")
            print(f"Account ID: {account_id}")
            
            # List locations for this account
            try:
                locs_response = service.accounts().locations().list(
                    parent=f"accounts/{account_id}"
                ).execute()
                
                locations = locs_response.get("locations", [])
                
                if locations:
                    print(f"  Locations ({len(locations)}):")
                    for loc in locations:
                        loc_id = loc.get("name", "").split("/")[-1]
                        loc_name = loc.get("locationName", "Unknown")
                        print(f"    - {loc_name}: {loc_id}")
                else:
                    print("  Locations: (none)")
            
            except Exception as e:
                print(f"  Error fetching locations: {e}")
            
            print()
    
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    get_gmb_accounts()
```

### 4.2 Run the Script

```bash
# Copy your JSON key to the project root
cp /path/to/your/downloaded/key.json ./credentials.json

# Install required packages
pip install google-auth google-api-python-client

# Run the script
python3 list_gmb_accounts.py
```

### 4.3 Save the IDs

The output will look like:

```
=== Google My Business Accounts ===

Account Name: DKDP Main
Account ID: 123456789
  Locations (1):
    - DKDP Headquarters: 987654321
```

**Save these values:**
- Account ID: `123456789`
- Location ID: `987654321`

You will need these for GitHub Secrets.

## Step 5: GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret** for each:

| Secret Name | Value | Notes |
|-------------|-------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Get from [Anthropic Console](https://console.anthropic.com) |
| `GOOGLE_GMB_CREDENTIALS` | Base64-encoded JSON key | See Step 5.1 below |
| `GOOGLE_GMB_ACCOUNT_ID` | Account ID from Step 4 | Example: `123456789` |
| `GOOGLE_GMB_LOCATION_ID` | Location ID from Step 4 | Example: `987654321` |

### 5.1 Encode Credentials as Base64

Convert your JSON key file to base64:

**On macOS/Linux:**

```bash
base64 -i credentials.json
```

**On Windows (PowerShell):**

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("credentials.json"))
```

Copy the entire output and paste into the `GOOGLE_GMB_CREDENTIALS` secret.

### 5.2 Adding Secrets via GitHub CLI

Alternatively, use the GitHub CLI:

```bash
gh secret set ANTHROPIC_API_KEY --body "your-api-key-here"
gh secret set GOOGLE_GMB_CREDENTIALS < credentials.json.b64
gh secret set GOOGLE_GMB_ACCOUNT_ID --body "123456789"
gh secret set GOOGLE_GMB_LOCATION_ID --body "987654321"
```

## Step 6: Test the Integration

### 6.1 Push a Blog Article

1. Create or update a blog post in your repository
2. Commit and push to the main branch

```bash
git add content/blog/my-article.md
git commit -m "blog: add new article"
git push origin main
```

### 6.2 Monitor GitHub Actions

1. Go to your repository's **Actions** tab
2. Find the workflow run for your commit
3. Click on the run to view logs

Expected workflow steps:
- **Build & Deploy** (Next.js deployment to Vercel)
- **Publish to GMB** (blog article published to Google My Business)

### 6.3 Verify on Google My Business

1. Go to [Google My Business](https://www.google.com/business/)
2. Navigate to your business profile
3. Check the **Posts** section
4. Your article should appear within a few minutes

## Troubleshooting

### "Permission denied" or "Insufficient permissions"

- **Solution:** Ensure the service account email is added as a Manager on your GMB profile (Step 3)
- Verify the email is spelled correctly

### API returns 404

- **Solution:** Double-check Account ID and Location ID (Step 4)
- Run the Python script again to confirm values

### Credentials file not found

- **Solution:** Store the base64-encoded credentials in GitHub Secrets, not in your repository
- Never commit the raw JSON key file

### Workflow fails silently

- **Solution:** Check GitHub Actions logs for error messages
- Verify `GOOGLE_GMB_CREDENTIALS` is properly base64-encoded
- Confirm all 4 secrets are set

## Security Best Practices

1. **Never commit credentials:** The JSON key and base64 string belong only in GitHub Secrets
2. **Rotate keys periodically:** Delete old service account keys and create new ones
3. **Restrict scope:** Use `Business Information Manager` role instead of `Editor` if possible
4. **Monitor access:** Check GMB login activity and revoke access if compromised
5. **Use secrets rotation:** GitHub allows automatic secret rotation for added security

## Next Steps

Once the setup is complete:
1. Finalize your blog publishing workflow (see project documentation)
2. Test posting articles to verify end-to-end integration
3. Document any custom publishing rules or schedule
4. Set up notifications for workflow failures
