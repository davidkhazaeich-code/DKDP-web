import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import fs from 'fs'
import path from 'path'

function fmt(n: number): string {
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
  const W = doc.internal.pageSize.getWidth()   // 210
  const H = doc.internal.pageSize.getHeight()  // 297
  const ML = 18
  const MR = 18
  const CW = W - ML - MR // content width

  // ── Colors ──
  const violet: [number, number, number] = [124, 58, 237]   // #7C3AED
  const violetLight: [number, number, number] = [167, 139, 250] // #A78BFA
  const dark: [number, number, number] = [26, 26, 26]
  const gray: [number, number, number] = [107, 114, 128]
  const lightBg: [number, number, number] = [249, 250, 251]  // #F9FAFB

  // ══════════════════════════════════════════════════════════════════
  // HEADER — Logo + date + titre
  // ══════════════════════════════════════════════════════════════════

  // Violet top bar
  doc.setFillColor(...violet)
  doc.rect(0, 0, W, 2.5, 'F')

  // Logo (read from public/)
  try {
    const logoPath = path.join(process.cwd(), 'public/images/logo/dkdp_noir.png')
    const logoData = fs.readFileSync(logoPath)
    const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`
    doc.addImage(logoBase64, 'PNG', ML, 8, 50, 10)
  } catch {
    // Fallback text if logo not found
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(...dark)
    doc.text('DKDP', ML, 16)
  }

  // Date top-right
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...gray)
  doc.text(date, W - MR, 14, { align: 'right' })

  // Title
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...dark)
  doc.text('Estimation de projet', ML, 28)

  // Subtitle
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...gray)
  doc.text(siteType, ML, 34)

  // Thin separator
  doc.setDrawColor(...violetLight)
  doc.setLineWidth(0.4)
  doc.line(ML, 37, W - MR, 37)

  // ══════════════════════════════════════════════════════════════════
  // CLIENT INFO — compact 2-col layout
  // ══════════════════════════════════════════════════════════════════

  let y = 43

  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...violet)
  doc.text('CLIENT', ML, y)

  y += 5

  const fullName = `${contact.firstName} ${contact.lastName}`.trim()
  const contactPairs: [string, string][] = []
  if (fullName) contactPairs.push(['Nom', fullName])
  if (contact.company) contactPairs.push(['Entreprise', contact.company])
  if (contact.email) contactPairs.push(['Email', contact.email])
  if (contact.phone) contactPairs.push(['Telephone', contact.phone])

  // Draw contact as simple text pairs (compact)
  doc.setFontSize(9)
  for (const [label, value] of contactPairs) {
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor(...gray)
    doc.text(`${label} :`, ML, y)
    doc.setFont('Helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(value, ML + 28, y)
    y += 5
  }

  y += 4

  // ══════════════════════════════════════════════════════════════════
  // SELECTIONS TABLE — compact, striped
  // ══════════════════════════════════════════════════════════════════

  const filtered = selections.filter(s => s.label && s.value && s.value.trim() !== '')

  if (filtered.length > 0) {
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...violet)
    doc.text('CONFIGURATION DU PROJET', ML, y)

    y += 3

    autoTable(doc, {
      startY: y,
      head: [['', '']],
      body: filtered.map(s => [s.label, s.value]),
      showHead: false,
      theme: 'plain',
      margin: { left: ML, right: MR },
      styles: {
        font: 'Helvetica',
        fontSize: 8.5,
        textColor: dark,
        cellPadding: { top: 2, bottom: 2, left: 4, right: 4 },
        lineWidth: 0,
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: CW * 0.38, textColor: gray },
        1: { cellWidth: CW * 0.62 },
      },
      alternateRowStyles: {
        fillColor: lightBg,
      },
      didParseCell: (data: any) => {
        // Round corners feel via row coloring
        if (data.row.index === 0) {
          data.cell.styles.fillColor = lightBg
        }
      },
    })

    y = (doc as any).lastAutoTable.finalY + 6
  }

  // ══════════════════════════════════════════════════════════════════
  // PRICE BLOCK — violet accent box
  // ══════════════════════════════════════════════════════════════════

  const hasMonthly = price.monthlyMin > 0
  const boxH = hasMonthly ? 38 : 30

  // Ensure price box fits on page (leave room for footer)
  if (y + boxH > H - 30) {
    y = H - 30 - boxH
  }

  // Light violet background
  doc.setFillColor(245, 240, 255) // very light violet
  doc.setDrawColor(...violetLight)
  doc.setLineWidth(0.3)
  doc.roundedRect(ML, y, CW, boxH, 2, 2, 'FD')

  // Left violet accent bar
  doc.setFillColor(...violet)
  doc.rect(ML, y, 3, boxH, 'F')

  let py = y + 8

  // Label
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...violet)
  doc.text('ESTIMATION BUDGETAIRE', ML + 10, py)

  py += 8

  // Price
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...dark)
  doc.text(`CHF ${fmt(price.totalMin)} - ${fmt(price.totalMax)}`, ML + 10, py)

  // Delay on the right
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...gray)
  const delayText = price.weeksMin === price.weeksMax
    ? `~${price.weeksMin} semaines`
    : `~${price.weeksMin}-${price.weeksMax} semaines`
  doc.text(delayText, W - MR - 5, py, { align: 'right' })

  // Monthly
  if (hasMonthly) {
    py += 8
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...gray)
    const mText = price.monthlyMin === price.monthlyMax
      ? `+ CHF ${fmt(price.monthlyMin)}/mois (services recurrents)`
      : `+ CHF ${fmt(price.monthlyMin)} - ${fmt(price.monthlyMax)}/mois`
    doc.text(mText, ML + 10, py)
  }

  // ══════════════════════════════════════════════════════════════════
  // NEXT STEPS — small info block
  // ══════════════════════════════════════════════════════════════════

  y = y + boxH + 8

  if (y < H - 40) {
    doc.setFillColor(...lightBg)
    doc.roundedRect(ML, y, CW, 16, 2, 2, 'F')

    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...violet)
    doc.text('PROCHAINE ETAPE', ML + 5, y + 6)

    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...gray)
    doc.text('Notre equipe vous contactera sous 48h pour affiner cette estimation et vous envoyer un devis detaille.', ML + 5, y + 12)
  }

  // ══════════════════════════════════════════════════════════════════
  // FOOTER — contact info + branding
  // ══════════════════════════════════════════════════════════════════

  const footerY = H - 15

  // Separator
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(ML, footerY - 4, W - MR, footerY - 4)

  // Left: branding
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...violet)
  doc.text('DKDP.ch', ML, footerY)

  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray)
  doc.text('Agence digitale a Geneve', ML, footerY + 4)

  // Center: contact
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray)
  doc.text('dk@dkdp.ch  |  +41 79 940 79 69', W / 2, footerY + 2, { align: 'center' })

  // Right: site
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...violet)
  doc.text('dkdp.ch', W - MR, footerY, { align: 'right' })

  doc.setTextColor(...gray)
  doc.setFontSize(6.5)
  doc.text('Estimation indicative', W - MR, footerY + 4, { align: 'right' })

  // ── Output ──
  const arrayBuffer = doc.output('arraybuffer')
  return Buffer.from(arrayBuffer)
}
