export const filterProps = (props, reject) => {
  return Object
  .keys(props)
  .reduce((acc, key) => reject.includes(key) ? acc : set(acc, key, props[key]), {})
}

export const set = (target, key, value) => {
  target[key] = value
  return target
}


export default {
  filterProps, set,
}