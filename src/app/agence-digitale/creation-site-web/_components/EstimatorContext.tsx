'use client'

import { createContext, useContext, useReducer } from 'react'
import type {
  EstimationState,
  EstimationAction,
} from '@/lib/estimation/types'

// ── Initial state ──

const initialState: EstimationState = {
  currentStep: 1,
  direction: 1,

  // Step 1
  situation: null,
  siteType: null,
  sector: null,

  // Step 2
  logo: null,
  branding: null,
  strategy: [],

  // Step 3
  pages: null,
  languages: null,
  designLevel: null,

  // Step 4
  copywriting: null,
  visuals: null,

  // Step 5
  features: [],

  // Step 6
  seo: [],
  acquisition: [],
  automation: [],

  // Step 7
  services: [],

  // Step 8
  contact: {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    currentSiteUrl: '',
    launchDate: '',
    appDescription: '',
  },
  isSubmitting: false,
  isSubmitted: false,
}

// ── Reducer ──

function estimationReducer(
  state: EstimationState,
  action: EstimationAction,
): EstimationState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
        direction: action.step > state.currentStep ? 1 : -1,
      }

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 8),
        direction: 1,
      }

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
        direction: -1,
      }

    case 'SKIP_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 8),
        direction: 1,
      }

    // ── Step 1 ──
    case 'SET_SITUATION':
      return { ...state, situation: action.value }

    case 'SET_SITE_TYPE':
      return { ...state, siteType: action.value }

    case 'SET_SECTOR':
      return { ...state, sector: action.value }

    // ── Step 2 ──
    case 'SET_LOGO':
      return { ...state, logo: action.value }

    case 'SET_BRANDING':
      return { ...state, branding: action.value }

    case 'TOGGLE_STRATEGY':
      return {
        ...state,
        strategy: state.strategy.includes(action.value)
          ? state.strategy.filter((v) => v !== action.value)
          : [...state.strategy, action.value],
      }

    // ── Step 3 ──
    case 'SET_PAGES':
      return { ...state, pages: action.value }

    case 'SET_LANGUAGES':
      return { ...state, languages: action.value }

    case 'SET_DESIGN_LEVEL':
      return { ...state, designLevel: action.value }

    // ── Step 4 ──
    case 'SET_COPYWRITING':
      return { ...state, copywriting: action.value }

    case 'SET_VISUALS':
      return { ...state, visuals: action.value }

    // ── Step 5 ──
    case 'TOGGLE_FEATURE':
      return {
        ...state,
        features: state.features.includes(action.value)
          ? state.features.filter((v) => v !== action.value)
          : [...state.features, action.value],
      }

    // ── Step 6 ──
    case 'TOGGLE_SEO':
      return {
        ...state,
        seo: state.seo.includes(action.value)
          ? state.seo.filter((v) => v !== action.value)
          : [...state.seo, action.value],
      }

    case 'TOGGLE_ACQUISITION':
      return {
        ...state,
        acquisition: state.acquisition.includes(action.value)
          ? state.acquisition.filter((v) => v !== action.value)
          : [...state.acquisition, action.value],
      }

    case 'TOGGLE_AUTOMATION':
      return {
        ...state,
        automation: state.automation.includes(action.value)
          ? state.automation.filter((v) => v !== action.value)
          : [...state.automation, action.value],
      }

    // ── Step 7 ──
    case 'TOGGLE_SERVICE':
      return {
        ...state,
        services: state.services.includes(action.value)
          ? state.services.filter((v) => v !== action.value)
          : [...state.services, action.value],
      }

    // ── Step 8 ──
    case 'SET_CONTACT_FIELD':
      return {
        ...state,
        contact: { ...state.contact, [action.field]: action.value },
      }

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value }

    case 'SET_SUBMITTED':
      return { ...state, isSubmitted: true, isSubmitting: false }

    default:
      return state
  }
}

// ── Context ──

const EstimatorContext = createContext<{
  state: EstimationState
  dispatch: React.Dispatch<EstimationAction>
} | null>(null)

// ── Provider ──

export function EstimatorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(estimationReducer, initialState)

  return (
    <EstimatorContext.Provider value={{ state, dispatch }}>
      {children}
    </EstimatorContext.Provider>
  )
}

// ── Hook ──

export function useEstimator() {
  const ctx = useContext(EstimatorContext)
  if (!ctx) {
    throw new Error('useEstimator must be used within an EstimatorProvider')
  }
  return ctx
}
