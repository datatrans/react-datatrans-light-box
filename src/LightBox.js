import React, {PropTypes, Component} from 'react'
import PaymentPageFrame from './PaymentPageFrame'
import {
  filterProps, toUrlParams, parseUrl,
  removeListener, addListener, lockScrolling,
  releaseLock
} from './utils'

const rejectProps = [
  'production', 'onCancelled', 'onLoaded', 'onError', 'version'
]

const buildUrl = (props, production) => production
? 'https://payment.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)
: 'https://pilot.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)

const hasError = ev => typeof ev.data !== typeof undefined && ev.data.type === 'error'


export default class LightBox extends Component {


  constructor(props) {
    super(props)

    this.onMessage = this.onMessage.bind(this)
    this.onCancelled = this.onCancelled.bind(this)

    lockScrolling()

    const urlParams = filterProps(this.props, rejectProps)
    this.url = buildUrl(urlParams, this.props.production)
    this.origin = parseUrl(this.url).origin

    this.state = { visible: true}
  }

  onMessage(ev) {
    if(ev.origin !== this.origin) return
    if(ev.data === 'cancel') return this.onCancelled()
    if(ev.data === 'frameReady') return this.props.onLoaded()
    if(hasError(ev)) return this.props.onError(ev.data)
  }

  onCancelled() {
    this.setState({visible: false})
    releaseLock()
    this.props.onCancelled()
  }

  componentDidMount() {
    addListener('message', this.onMessage)
  }

  componentWillUnmount() {
    removeListener('message', this.onMessage)
    releaseLock()
  }

  render() {

    if(!this.state.visible) return <div> do not render me </div>

    return <PaymentPageFrame
      url={this.url}
      showsPaymentPage={this.props.showsPaymentPage}
    />
  }

}


LightBox.propTypes = {
  merchantId: PropTypes.string.isRequired,
  refno: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  sign: PropTypes.string.isRequired,

  production: PropTypes.bool,
  showsPaymentPage: PropTypes.bool.isRequired,

  onCancelled: PropTypes.func.isRequired,
  onLoaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,

}

LightBox.defaultProps = {
  onCancelled() {},
  onLoaded() {},
  onError() {},
  production: false,
  theme: 'DT2015',
  version: '1.0.2',
  showsPaymentPage: true,
}