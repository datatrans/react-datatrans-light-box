import { useEffect } from 'react'
import PropTypes from 'prop-types'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js'

const startPayment = (props) => {
  if (window.Datatrans) {
    window.Datatrans.startPayment({
      transactionId: props.transactionId,
      loaded: props.onLoaded,
      opened: props.onOpened,
      closed: props.onCancelled,
      error: props.onError
    })
  }
}

const cleanupLightbox = () => {
  if (window.Datatrans) {
    try {
      window.Datatrans.close()
    } catch (err) {} // eslint-disable-line no-empty
  }
}

const Lightbox = (props) => {
  useEffect(() => {
    const { production } = props
    const scriptSource = getUrl(production)

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      startPayment(props)

      return cleanupLightbox
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      startPayment(props)
    }

    document.body.appendChild(script)

    return cleanupLightbox
  }, [])

  return null
}

export default Lightbox

Lightbox.propTypes = {
  transactionId: PropTypes.string.isRequired,

  production: PropTypes.bool,

  onLoaded: PropTypes.func,
  onOpened: PropTypes.func,
  onCancelled: PropTypes.func,
  onError: PropTypes.func
}

Lightbox.defaultProps = {
  onLoaded() {},
  onOpened() {},
  onCancelled() {},
  onError() {},
  production: false
}
