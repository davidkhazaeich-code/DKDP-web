#!/usr/bin/env node
/**
 * Met à jour l'idée Notion après création de la PR :
 *   - Statut  → "En PR" (select ou status, auto-détecté)
 *   - PR      → URL de la pull request (si une propriété url "PR" existe)
 *
 * Variables d'environnement :
 *   NOTION_API_KEY   (requis)
 *   NOTION_PAGE_ID   (requis)  ID de la page idée
 *   PR_URL           (option)  URL de la PR
 *   NEW_STATUS       (option)  def. "En PR"
 *
 * Ne fait jamais échouer le job : un souci de sync Notion ne doit pas casser la PR.
 */

import { Client } from '@notionhq/client'

const PAGE_ID = process.env.NOTION_PAGE_ID
const PR_URL = process.env.PR_URL
const NEW_STATUS = process.env.NEW_STATUS || 'En PR'

async function main() {
  if (!process.env.NOTION_API_KEY || !PAGE_ID) {
    console.log('ℹ Pas de NOTION_API_KEY/NOTION_PAGE_ID — skip mise à jour Notion.')
    return
  }
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const page = await notion.pages.retrieve({ page_id: PAGE_ID })
  const props = page.properties || {}
  const statusKey = ['Statut', 'Status', 'Statut éditorial'].find((k) => props[k])
  const update = {}

  if (statusKey) {
    const type = props[statusKey].type // 'select' | 'status'
    update[statusKey] = type === 'status'
      ? { status: { name: NEW_STATUS } }
      : { select: { name: NEW_STATUS } }
  }
  if (PR_URL && props['PR'] && props['PR'].type === 'url') {
    update['PR'] = { url: PR_URL }
  }

  if (Object.keys(update).length === 0) {
    console.log('ℹ Aucune propriété à mettre à jour (Statut/PR introuvables).')
    return
  }
  await notion.pages.update({ page_id: PAGE_ID, properties: update })
  console.log(`✓ Idée Notion → "${NEW_STATUS}"${PR_URL ? ` (PR liée)` : ''}.`)
}

main().catch((e) => {
  console.warn(`⚠ Mise à jour Notion échouée (non bloquant) : ${e.message}`)
})
