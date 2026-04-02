'use client'

import Cal from '@calcom/embed-react'

export function CalBooking() {
  return (
    <Cal
      namespace="planifier-un-appel"
      calLink="david-khazaei/planifier-un-appel"
      style={{ width: '100%', height: '100%', overflow: 'scroll', minHeight: '600px' }}
      config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'dark' }}
    />
  )
}
