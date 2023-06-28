export const isFalsy = (val) => {
  return val === undefined || val === null || val === '' || val === false
}

export const noop = () => {}