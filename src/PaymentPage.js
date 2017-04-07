import React, {PropTypes} from 'react'
import styles from './styles'

const PaymentPage = props => {

  return <iframe
    src={props.url}
    style={styles.iframe}
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