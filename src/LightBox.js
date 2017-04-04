import React, {PropTypes, Component} from 'react'
import PaymentPageFrame from './PaymentPageFrame'
import {filterProps} from './utils'

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

const rejectProps = ['production', 'onOpen', 'onCancel', 'onLoad', 'onError', 'version']

const buildUrl = (props, production) => production
? 'https://payment.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)
: 'https://pilot.datatrans.biz/upp/jsp/upStart.jsp?' + toUrlParams(props)

const toUrlParams = props => Object.keys(props)
.map(key => `${key}=${props[key]}`)
.join('&')


const parseUrl = url => {
  const a = document.createElement('a')
  a.href = url
  return a
}

export default class LightBox extends Component {


  constructor(props) {
    super(props)

    this.state = { paymentPageLoaded: false }
    this.onMessage = this.onMessage.bind(this)
    this.lockScrolling = this.lockScrolling.bind(this)
    this.releaseLock = this.releaseLock.bind(this)

    this.lockScrolling()

    const urlParams = filterProps(this.props, rejectProps)
    this.url = buildUrl(urlParams, this.props.production)
    this.origin = parseUrl(this.url).origin
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

    if(ev.origin !== this.origin) return
    if(ev.data == 'cancel') return this.props.onCancel()
    if(ev.data == 'frameReady') {
      this.setState({paymentPageLoaded: true})
      return this.props.onLoad()
    }
    if(typeof ev.data !== typeof undefined && ev.data.type === 'error') {
      this.props.onError(ev.data)
    }
  }

  componentDidMount() {
    const addListener = addEventListener || attachEvent
    addListener('message', this.onMessage)
    this.props.onOpen()
  }

  componentWillUnmount() {
    const removeListener = removeEventListener || detachEvent
    removeListener('message', this.onMessage)
    this.releaseLock()
  }

  render() {

    return <PaymentPageFrame
      url={this.url}
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

  onOpen: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

LightBox.defaultProps = {
  onOpen() {},
  onCancel() {},
  onLoad() {},
  onError() {},
  production: false,
  theme: 'DT2015',
  version: '1.0.2',
}