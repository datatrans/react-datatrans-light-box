import React, {PropTypes, Component} from 'react'
const iframeStyle = {
  border: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  '-webkit-transform': 'translate3d(0, 0, 0)',
}



const PaymentPage = props => {

  return <iframe
    src={props.url}
    style={iframeStyle}
    id='datatransPaymentFrame'
    name='datatransPaymentFrame'
    frameBorder={0}
    allowTransparency={true}
  />
}


PaymentPage.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PaymentPage