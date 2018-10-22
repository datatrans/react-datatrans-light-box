export const filterProps = (props, reject) => {
  const newProps = { ...props }
  reject.forEach(key => delete newProps[key])

  return newProps
}

export const convertArrays = props => Object.keys(props)
  .reduce((prev, key) => {
    const value = props[key]

    if (Array.isArray(value)) {
      return { ...prev, [key]: value.join(',') }
    }

    return { ...prev, [key]: value }
  }, {})
