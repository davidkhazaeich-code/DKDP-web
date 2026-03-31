// src/components/canvas/__tests__/DottedSurface.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('three', () => {
  const makeArr = () => ({ needsUpdate: false, array: new Float32Array(100) })
  return {
    Scene: class { add() {} fog = null },
    Fog: class {},
    PerspectiveCamera: class {
      position = { set() {} }
      aspect = 1
      updateProjectionMatrix() {}
    },
    WebGLRenderer: class {
      setPixelRatio() {}
      setSize() {}
      setClearColor() {}
      render() {}
      domElement = document.createElement('canvas')
    },
    BufferGeometry: class {
      setAttribute() {}
      attributes = { color: makeArr(), position: makeArr() }
    },
    Float32BufferAttribute: class {
      constructor(public array: Float32Array, _: number) {}
    },
    PointsMaterial: class {},
    Points: class { constructor() {} },
  }
})

import { DottedSurface } from '../DottedSurface'

describe('DottedSurface', () => {
  it('renders a container div', () => {
    render(<DottedSurface />)
    expect(screen.getByTestId('dotted-surface')).toBeInTheDocument()
  })

  it('is aria-hidden', () => {
    render(<DottedSurface />)
    expect(screen.getByTestId('dotted-surface')).toHaveAttribute('aria-hidden', 'true')
  })

  it('accepts className', () => {
    render(<DottedSurface className="absolute inset-0" />)
    expect(screen.getByTestId('dotted-surface')).toHaveClass('absolute', 'inset-0')
  })

  it('accepts violetRatio and orangeRatio without error', () => {
    render(<DottedSurface violetRatio={0.15} orangeRatio={0.06} />)
    expect(screen.getByTestId('dotted-surface')).toBeInTheDocument()
  })
})
