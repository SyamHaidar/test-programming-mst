import { keyframes } from 'styled-components'

// ----------------------------------------------------------------------

export const AnimateFade = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opcatity: 1;
  }
`

export const AnimateModal = keyframes`
  from {
    opacity: 0;
    transform: scale(1.15);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const AnimateModalRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(130%);
  }
  
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimateModalBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(130%)
  }
  
  to {
    opacity: 1;
    transform: translateY(0)
  }
`

export const AnimateScaleX = keyframes`
  from {
    transform: scaleX(0);
  }
  
  to {
    transform: scaleX(1);
  }
`

export const AnimateSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`
