import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { IconBox } from '../IconBox'

const TestIcon = () => (
  <svg data-testid="icon" width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

describe('IconBox', () => {
  it('renders the icon', () => {
    render(<IconBox><TestIcon /></IconBox>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('violet variant uses violet background', () => {
    render(<IconBox variant="violet" data-testid="box"><TestIcon /></IconBox>)
    const box = screen.getByTestId('box')
    expect(box.style.background).toMatch(/124,\s*58,\s*237/)
  })

  it('orange variant uses orange background', () => {
    render(<IconBox variant="orange" data-testid="box"><TestIcon /></IconBox>)
    const box = screen.getByTestId('box')
    expect(box.style.background).toMatch(/255,\s*107,\s*0/)
  })
})
