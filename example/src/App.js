import React, { Component } from 'react'
import Lightbox from '../../src'

const config = {
  merchantId: '1100004624',
  refno: 'YOUR_REFERENCE_NUMBER',
  amount: '1000',
  currency: 'CHF',
  sign: '30916165706580013',
  production: false,
  paymentmethod: ['ECA', 'VIS', 'PFC', 'AMX', 'TWI'],
  themeConfiguration: {
    brandColor: '#aa9374'
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLightbox: false
    }
  }

  render() {
    return <div>
      <h1>Datatrans Lightbox Demo</h1>
      <div>
        {this.state.showLightbox
          ? <Lightbox
              {...config}
              onLoaded={this.onLoaded}
              onOpened={this.onOpened}
              onCancelled={this.onCancelled}
              onError={this.onError}
            />
          : <button onClick={this.start}>Start Lightbox</button>
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
}
