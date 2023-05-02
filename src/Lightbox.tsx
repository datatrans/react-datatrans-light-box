import { useEffect } from 'react'
import PropTypes from 'prop-types'

const getUrl = (production: boolean) => production
  ? 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js'

export interface LightboxProps {
  production: boolean
  transactionId: string
  onLoaded?: () => void
  onOpened?: () => void
  onCancelled?: () => void
  onError?: () => void
}

export interface LightboxConfig {
  transactionId: string
  loaded?: () => void
  opened?: () => void
  cancelled?: () => void
  error?: () => void
}


declare let window: Window & {
  Datatrans?: {
    startPayment: (config: LightboxConfig) => void
    close: () => void
  }
};

const startPayment = (config: LightboxConfig) => {
  if (window.Datatrans) {
    window.Datatrans.startPayment(config)
  }
}

const cleanupLightbox = () => {
  if (window.Datatrans) {
    try {
      window.Datatrans.close()
    } catch (err) {} // eslint-disable-line no-empty
  }
}

const Lightbox = (props: LightboxProps) => {
  useEffect(() => {
    const { production } = props
    const config =
      {
        transactionId: props.transactionId,
        loaded: props.onLoaded,
        opened: props.onOpened,
        closed: props.onCancelled,
        error: props.onError
      }
    const scriptSource = getUrl(production)

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      startPayment(config)

      return cleanupLightbox
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      startPayment(config)
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
