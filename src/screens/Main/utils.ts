type validationType = undefined | 'warning' | 'error' | 'correct'

export const returnCircleColor = (validation?: validationType) => {
  switch (validation) {
    case 'error':
      return '#CC0303'
    case 'warning':
      return '#FCEA45'
    case 'correct':
      return '#23AF0C' 
    default:
      return '#bbb'
  }
}