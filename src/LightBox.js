import React, {PropTypes, Component} from 'react'
import PaymentPageFrame from './PaymentPageFrame'
import {set, filterProps} from './utils'

const style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#000000',
}

const lockCss = `
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

const rejectProps = ['production', 'onOpened', 'onCancel', 'onLoaded', 'onError']

const buildUrl = (props, production) => production
? 'https://payment.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)
: 'https://pilot.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)

const toUrlParams = props => Object.keys(props)
.map(key => `${key}=${props[key]}`)
.join('&')



export default class LightBox extends Component {


  constructor(props) {
    super(props)

    this.state = {
      paymentPageLoaded: false
    }
    this.onMessage = this.onMessage.bind(this)
    this.lockScrolling = this.lockScrolling.bind(this)
    this.releaseLock = this.releaseLock.bind(this)

    this.lockScrolling()
  }

  lockScrolling() {
    var element = document.createElement('style')
    element.innerHTML = lockCss
    element.id = 'scroll-lock'

    document.getElementsByTagName('head')[0].appendChild(element)
  }

  releaseLock() {
    const element = document.getElementById('scroll-lock')
    element.outerHTML = ''
  }

  onMessage(ev) {

    if(ev.origin !== 'https://pilot.datatrans.biz') return
    if(ev.data == 'cancel') return this.props.onCancel()
    if(ev.data == 'frameReady') {
      this.setState({paymentPageLoaded: true})
      return this.props.onLoaded()
    }
    if(ev.data !== undefined && ev.data.type == 'error') {
      this.props.onError({
        message: ev.data.message,
        detail: ev.data.detail,
      })
    }
  }

  componentDidMount() {
    const addListener = addEventListener || attachEvent
    addListener('message', this.onMessage)
    this.props.onOpened()
  }

  componentWillUnmount() {
    const removeListener = removeEventListener || detachEvent
    removeEventListener('message', this.onMessage)
    this.releaseLock()
  }

  render() {

    const urlParams = filterProps(this.props, rejectProps)
    const url = buildUrl(urlParams, this.props.production)

    return <PaymentPageFrame
      url={url}
      paymentPageLoaded={this.state.paymentPageLoaded}
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

  onOpened: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLoaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

LightBox.defaultProps = {
  onOpened() {},
  onCancel() {},
  onLoaded() {},
  onError() {},
  production: false,
  theme: 'DT2015',
  version: '1.0.2',
}