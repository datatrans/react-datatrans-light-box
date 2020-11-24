import { Component } from 'react'
import PropTypes from 'prop-types'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.min.js'

const startPayment = ({ transactionId }) => {
  window.Datatrans.startPayment({
    transactionId
  })
}

export default class Lightbox extends Component {
  componentDidMount() {
    const scriptSource = getUrl(this.props.production)

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
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

  componentWillUnmount() {
    // make sure to always clean things up
    if (window.Datatrans) {
      window.setTimeout(() => {
        try {
          window.Datatrans.close()
        } catch (err) {} // eslint-disable-line no-empty
      }, 1)
    }
  }

  render() {
    return null
  }
}

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
