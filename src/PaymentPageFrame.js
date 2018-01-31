import React from 'react'
// import PropTypes from 'prop-types'
import PaymentPage from './PaymentPage'
import styles from './styles'

const display = 'block'

const PaymentPageFrame = props =>  {

  const style = props.showsPaymentPage
  ? {...styles.pageFrame, display}
  : styles.pageFrame


  return <div style={style}>
    <PaymentPage url={props.url} />
  </div>
}

// PaymentPageFrame.propTypes = {
//   url: PropTypes.string.isRequired,
//   showsPaymentPage: PropTypes.bool.isRequired,
// }

export default PaymentPageFrame
