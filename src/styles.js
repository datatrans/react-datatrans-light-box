export const scrollLock = `
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  html body {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: fixed;
  }
`

export const pageFrame = {
  'zIndex': 9999,
  position: 'fixed',
  right: 0,
  bottom: 0,
  left: 0,
  top: 0,
  overflow: 'hidden',
  WebkitTransform: 'translate3d(0, 0, 0)',
  transform: 'translate3d(0, 0, 0)',
  display: 'none',
}

export const iframe = {
  border: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
}

export default {
  scrollLock, pageFrame, iframe,
}
