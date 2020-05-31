import { APP } from './types'

export function determineUIVersion() {
  if (window.innerWidth < 768) {
    return 'mobile'
  } else if (window.innerWidth < 1024) {
    return 'tablet'
  }

  return 'desktop'
}

export const switchUIVersion = payload => ({
  type: APP.SWITCH_UI_VERSION,
  payload,
  meta: {
    debounce: {
      time: 500,
    },
  },
})
