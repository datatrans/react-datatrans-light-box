import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

const PaymentPage = props => {

  return <iframe
    src={props.url}
    style={styles.iframe}
    id='datatransPaymentFrame'
    name='datatransPaymentFrame'
    frameBorder={0}
  />
}

PaymentPage.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PaymentPage
