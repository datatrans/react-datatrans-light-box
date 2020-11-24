import React, { Component } from 'react'
import Lightbox from '../../src'

const config = {
  currency: 'CHF',
  refno: 'cK1lO9XLv',
  amount: 1337,
  redirect: {
    successUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/successPage.jsp',
    cancelUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/cancelPage.jsp',
    errorUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/errorPage.jsp'
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLightbox: false,
      transactionId: false
    }
  }

  componentDidMount () {
    this.initializeTransaction('https://api.sandbox.datatrans.com/v1/transactions', config)
  }

  render () {
    const { transactionId, showLightbox } = this.state
    return <div>
      <h1>Datatrans Lightbox Demo</h1>
      <div>
        {showLightbox
          ? <Lightbox
              transactionId={transactionId}
              production={false /* Default: false */}
              onLoaded={this.onLoaded}
              onOpened={this.onOpened}
              onCancelled={this.onCancelled}
              onError={this.onError}
            />
          : <button onClick={this.start} disabled={!transactionId}>Start Lightbox</button>
        }
      </div>

    </div>
  }

  start = () => {
    this.setState({ showLightbox: true })
  }

  onLoaded = () => {
    console.log('Loaded')
  }

  onOpened = () => {
    console.log('Opened')
  }

  onCancelled = () => {
    console.log('Cancelled')
    this.setState({ showLightbox: false })
  }

  onError = (data) => {
    console.log('Error:', data)
    this.setState({ showLightbox: false })
  }

  /*
   * WARNING !!!
   * Initialize Transaction via CORS
   * You have to do this part on your server.
   * Don't call our init endpoint from the client side.
   * It won't work (CORS). It only works from the browser for this demo.
   */
  initializeTransaction = (url = '', data = {}) => {
    try {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Basic MTEwMDAyNTgzNTozY29mTjNNeFhhQkg3VWw4'
          },
          body: JSON.stringify(data)
      })
        .then(data => this.setState({ transactionId: data.transactionId }))
        .catch(err => this.setState({ transactionId: '201124010951422089' }))
    } catch (error) {
      console.log(error)
    }
  }
}
