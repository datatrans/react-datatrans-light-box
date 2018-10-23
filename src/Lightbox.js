import { Component } from 'react'
import PropTypes from 'prop-types'
import { filterProps, convertArrays } from './utils'

const PARAMS_BLACKLIST = [
  'production', 'onLoaded', 'onOpened', 'onCancelled', 'onError', 'version'
]

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.min.js'

const startPayment = (props) => {
  const config = {
    params: convertArrays(filterProps(props, PARAMS_BLACKLIST)),
    loaded: props.onLoaded,
    opened: props.onOpened,
    closed: props.onCancelled,
    error: props.onError
  }
  console.log(config)
  window.Datatrans.startPayment(config)
}

export default class Lightbox extends Component {
  componentDidMount() {
    const scriptSource = getUrl(this.props.production)

    if (!document.querySelectorAll('script[src="' + scriptSource + '"]')) {
      startPayment(this.props)

      return
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      startPayment(this.props)
    }

    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

Lightbox.propTypes = {
  merchantId: PropTypes.string.isRequired,
  refno: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  sign: PropTypes.string.isRequired,

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
