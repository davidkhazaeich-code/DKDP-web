export function TechStack() {
  const techs = [
    { name: 'HTML', c: '#E34F26', bg: 'rgba(227,79,38,0.08)', b: 'rgba(227,79,38,0.28)' },
    { name: 'CSS', c: '#1572B6', bg: 'rgba(21,114,182,0.10)', b: 'rgba(21,114,182,0.28)' },
    { name: 'JavaScript', c: '#F7DF1E', bg: 'rgba(247,223,30,0.06)', b: 'rgba(247,223,30,0.22)' },
    { name: 'Next.js', c: '#ffffff', bg: 'rgba(255,255,255,0.06)', b: 'rgba(255,255,255,0.15)' },
    { name: 'Astro', c: '#FF5D01', bg: 'rgba(255,93,1,0.10)', b: 'rgba(255,93,1,0.28)' },
    { name: 'WordPress', c: '#21759B', bg: 'rgba(33,117,155,0.10)', b: 'rgba(33,117,155,0.28)' },
    { name: 'Shopify', c: '#96BF48', bg: 'rgba(150,191,72,0.08)', b: 'rgba(150,191,72,0.28)' },
    { name: 'Webflow', c: '#4353FF', bg: 'rgba(67,83,255,0.08)', b: 'rgba(67,83,255,0.28)' },
    { name: 'Elementor', c: '#E2173E', bg: 'rgba(226,23,62,0.08)', b: 'rgba(226,23,62,0.28)' },
    { name: 'Squarespace', c: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', b: 'rgba(212,212,216,0.18)' },
    { name: 'Vercel', c: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', b: 'rgba(212,212,216,0.20)' },
    { name: 'Figma', c: '#F24E1E', bg: 'rgba(242,78,30,0.08)', b: 'rgba(242,78,30,0.28)' },
    { name: 'Sanity', c: '#F03E2F', bg: 'rgba(240,62,47,0.08)', b: 'rgba(240,62,47,0.28)' },
    { name: 'Tailwind CSS', c: '#38BDF8', bg: 'rgba(56,189,248,0.08)', b: 'rgba(56,189,248,0.28)' },
  ]
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {techs.map((t) => (
        <span
          key={t.name}
          className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold"
          style={{ background: t.bg, border: `1px solid ${t.b}`, color: t.c }}
        >
          {t.name}
        </span>
      ))}
    </div>
  )
}
