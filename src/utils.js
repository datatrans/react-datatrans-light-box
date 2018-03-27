
import styles from './styles'

export const filterProps = (props, reject) => {
  const newProps = {...props}
  reject.forEach(key => delete newProps[key])
  return newProps
  // return Object
  // .keys(props)
  // .reduce((acc, key) => reject.includes(key) ? acc : set(acc, key, props[key]), {})
}

export const set = (target, key, value) => {
  target[key] = value
  return target
}

export const toUrlParams = props => Object.keys(props)
.map(key => `${key}=${props[key]}`)
.join('&')

export const getBaseUrl = url => {
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}

export const lockScrolling = () => {
  var element = document.createElement('style')
  element.innerHTML = styles.scrollLock
  element.id = 'scroll-lock'

  document.getElementsByTagName('head')[0].appendChild(element)
}

export const releaseLock = () => {
  const element = document.getElementById('scroll-lock')
  if(element) element.outerHTML = ''
}
