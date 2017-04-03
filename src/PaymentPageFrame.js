import React, {PropTypes} from 'react'
import PaymentPage from './PaymentPage'

const baseStyle = {
  'zIndex': 9999,
  position: 'fixed',
  right: 0,
  bottom: 0,
  left: 0,
  top: 0,
  overflow: 'hidden',
  '-webkit-transform': 'translate3d(0, 0, 0)',
  display: 'none',
}

const display = 'block'



const PaymentPageFrame = props =>  {


  const style = props.paymentPageLoaded ? {...baseStyle, display} : baseStyle

  // ensures that iframe will not be rerendered on frameReady

  return <div style={style}>
    <PaymentPage url={props.url} />
  </div>
}

PaymentPageFrame.propTypes = {
  url: PropTypes.string.isRequired,
  paymentPageLoaded: PropTypes.bool.isRequired,
}

export default PaymentPageFrame