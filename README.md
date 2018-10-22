[![NPM version][npm-version-image]][npm-url] [![Build Status](https://circleci.com/gh/datatrans/react-datatrans-light-box.png?circle-token=:circle-token)](https://circleci.com/gh/datatrans/react-datatrans-light-box)

# react-datatrans-light-box

Official Datatrans light box library for showing our payment page in React applications.
React is defined as a peer dependency and expected to be made available by your project. Other than that this library is completely dependency-free.

## How to install

```bash
npm install react-datatrans-light-box
```

## Example Usage of Lightbox component
You can also use a more direct approach and display the Lightbox component whenever or whereever you like.

```javascript
import React, { Component } from 'react'
import Lightbox from 'react-datatrans-light-box'

const config = {
  merchantId: '1100004624',
  refno: 'YOUR_REFERENCE_NUMBER',
  amount: '1000',
  currency: 'CHF',
  sign: '30916165706580013',
  production: false,
  paymentmethod: ['ECA', 'VIS', 'PFC', 'TWI'],
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

    this.start = this.start.bind(this)
  }

  start() {
    this.setState({ showLightbox: true })
  }

  render() {
    return <div>
      <h1>Datatrans Lightbox Demo</h1>
      <div>
        {this.state.showLightbox
          ? 'Lightbox was rendered and cannot be reused.'
          : <button onClick={this.start}>Start Lightbox</button>
        }

        {this.state.showLightbox &&
          <Lightbox
            {...config}
            onLoaded={this.onLoaded}
            onOpened={this.onOpened}
            onCancelled={this.onCancelled}
            onError={this.onError} />
          }
      </div>
    </div>
  }

  onLoaded() {
    console.log('Loaded')
  }

  onOpened() {
    console.log('Opened')
  }

  onCancelled() {
    console.log('Cancelled')
  }

  onError(data) {
    console.log('Error:', data)
  }
}

```

## Properties

The Lightbox component takes the following properties as input.

### Mandatory

Name | Type | Description
-----|------|-----|
`merchantId` | String | Merchant identifier provided to you by Datatrans.
`refno` | String | Any value by which you would like to reference the payment.|
`amount` | String |The amount in cents you would like to charge your customer.|
`currency` | String | The type of currency that will be used for the payment.|
`sign` | String | Transaction security parameter. Find it in Datatrans' [Webadmin Tool](https://payment.datatrans.biz/). |

### Optional

|Name  | Type   |Description |
|----- |:------ |------------|
|`production` | Boolean | Indicates whether requests hit Datatrans' production or development environment. Defaults to *false*.|
|`onLoaded` | Function | Called when payment page is loaded.|
|`onOpened` | Function | Called when payment page is opened.|
|`onCancelled` | Function | Called when user has cancelled payment.|
|`onError` | Function | Called when there was an error loading the payment page.|
|and many more... | | Refer to this [PDF](https://pilot.datatrans.biz/showcase/doc/Technical_Implementation_Guide.pdf) to get the full list of supported parameters.|

[npm-url]: https://npmjs.com/package/react-datatrans-light-box
[npm-version-image]: https://img.shields.io/npm/v/react-datatrans-light-box.svg?style=flat-square
