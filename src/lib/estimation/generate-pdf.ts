import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function formatCHF(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

export function generateEstimationPdf(params: {
  contact: { firstName: string; lastName: string; company: string; email: string; phone: string }
  selections: { label: string; value: string }[]
  price: { totalMin: number; totalMax: number; monthlyMin: number; monthlyMax: number; weeksMin: number; weeksMax: number }
  siteType: string
  date: string
}): Buffer {
  const { contact, selections, price, siteType, date } = params

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginLeft = 20
  const marginRight = 20
  const contentWidth = pageWidth - marginLeft - marginRight

  // Colors
  const violet = [167, 139, 250] as const  // #A78BFA
  const dark = [26, 26, 26] as const       // #1a1a1a
  const gray = [107, 114, 128] as const    // #6b7280
  const lightGray = [245, 245, 245] as const

  // ─── Header ───────────────────────────────────────────────────────

  // Violet accent bar at top
  doc.setFillColor(...violet)
  doc.rect(0, 0, pageWidth, 3, 'F')

  // "DKDP.ch" brand
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...violet)
  doc.text('DKDP.ch', marginLeft, 18)

  // Date top-right
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...gray)
  doc.text(date, pageWidth - marginRight, 18, { align: 'right' })

  // Title
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...dark)
  doc.text('Estimation de projet', marginLeft, 32)

  // Site type subtitle
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(...gray)
  doc.text(siteType, marginLeft, 40)

  // Separator line
  doc.setDrawColor(...violet)
  doc.setLineWidth(0.5)
  doc.line(marginLeft, 44, pageWidth - marginRight, 44)

  // ─── Contact Info ─────────────────────────────────────────────────

  let y = 54

  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...dark)
  doc.text('Coordonnees', marginLeft, y)

  y += 8

  const contactRows: [string, string][] = []
  const fullName = `${contact.firstName} ${contact.lastName}`.trim()
  if (fullName) contactRows.push(['Nom', fullName])
  if (contact.company) contactRows.push(['Entreprise', contact.company])
  if (contact.email) contactRows.push(['Email', contact.email])
  if (contact.phone) contactRows.push(['Telephone', contact.phone])

  autoTable(doc, {
    startY: y,
    head: [],
    body: contactRows,
    theme: 'plain',
    margin: { left: marginLeft, right: marginRight },
    styles: {
      font: 'Helvetica',
      fontSize: 10,
      textColor: dark as [number, number, number],
      cellPadding: { top: 2.5, bottom: 2.5, left: 4, right: 4 },
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 35, textColor: gray as [number, number, number] },
      1: { cellWidth: contentWidth - 35 },
    },
  })

  y = (doc as any).lastAutoTable.finalY + 12

  // ─── Selections table ─────────────────────────────────────────────

  // Filter out empty values
  const filteredSelections = selections.filter(
    (s) => s.label && s.value && s.value.trim() !== ''
  )

  if (filteredSelections.length > 0) {
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...dark)
    doc.text('Recapitulatif des selections', marginLeft, y)

    y += 6

    autoTable(doc, {
      startY: y,
      head: [['Critere', 'Selection']],
      body: filteredSelections.map((s) => [s.label, s.value]),
      theme: 'striped',
      margin: { left: marginLeft, right: marginRight },
      headStyles: {
        fillColor: violet as [number, number, number],
        textColor: [255, 255, 255],
        font: 'Helvetica',
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        font: 'Helvetica',
        fontSize: 10,
        textColor: dark as [number, number, number],
      },
      alternateRowStyles: {
        fillColor: lightGray as [number, number, number],
      },
      styles: {
        cellPadding: { top: 3.5, bottom: 3.5, left: 5, right: 5 },
        lineWidth: 0,
      },
      columnStyles: {
        0: { cellWidth: contentWidth * 0.45, fontStyle: 'bold' },
        1: { cellWidth: contentWidth * 0.55 },
      },
    })

    y = (doc as any).lastAutoTable.finalY + 14
  }

  // ─── Price block ──────────────────────────────────────────────────

  // Background box for pricing
  const priceBoxHeight = price.monthlyMax > 0 ? 52 : 42
  doc.setFillColor(250, 248, 255) // very light violet
  doc.setDrawColor(...violet)
  doc.setLineWidth(0.3)
  doc.roundedRect(marginLeft, y, contentWidth, priceBoxHeight, 3, 3, 'FD')

  y += 10

  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...gray)
  doc.text('Estimation budgetaire', marginLeft + 8, y)

  y += 10

  // Main price range
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...violet)
  const priceText = `CHF ${formatCHF(price.totalMin)} - ${formatCHF(price.totalMax)}`
  doc.text(priceText, marginLeft + 8, y)

  // Monthly cost if applicable
  if (price.monthlyMax > 0) {
    y += 10
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(...dark)
    const monthlyText =
      price.monthlyMin === price.monthlyMax
        ? `+ CHF ${formatCHF(price.monthlyMin)}/mois`
        : `+ CHF ${formatCHF(price.monthlyMin)} - ${formatCHF(price.monthlyMax)}/mois`
    doc.text(monthlyText, marginLeft + 8, y)
  }

  // Delay
  y += 10
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...gray)
  const delayText =
    price.weeksMin === price.weeksMax
      ? `Delai estime : ~${price.weeksMin} semaines`
      : `Delai estime : ~${price.weeksMin}-${price.weeksMax} semaines`
  doc.text(delayText, marginLeft + 8, y)

  // ─── Footer ───────────────────────────────────────────────────────

  const footerY = pageHeight - 12

  // Separator
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(marginLeft, footerY - 6, pageWidth - marginRight, footerY - 6)

  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...gray)
  const footerText =
    'Estimation indicative - Devis personnalise sous 48h | dkdp.ch | dk@dkdp.ch | +41 79 940 79 69'
  doc.text(footerText, pageWidth / 2, footerY, { align: 'center' })

  // ─── Output ───────────────────────────────────────────────────────

  const arrayBuffer = doc.output('arraybuffer')
  return Buffer.from(arrayBuffer)
}
