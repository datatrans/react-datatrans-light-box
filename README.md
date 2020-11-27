[![NPM version][npm-version-image]][npm-url] [![Build Status](https://circleci.com/gh/datatrans/react-datatrans-light-box.png?circle-token=:circle-token)](https://circleci.com/gh/datatrans/react-datatrans-light-box)

# Datatrans React Light Box

Official Datatrans light box library for showing our payment page in React applications.
React is defined as a peer dependency and expected to be made available by your project. Other than that this library is completely dependency-free.

## Compatibility

Beginning with v3.0.0, this component is using the [Datatrans Payment JSON API](https://api-reference.datatrans.ch/#tag/v1transactions).

If you're still using the legacy XML API, please refer to [react-datatrans-light-box v2.0.2](https://github.com/datatrans/react-datatrans-light-box/tree/2.0.2).

## How to install

```sh
# Use with current JSON API
npm install react-datatrans-light-box

# Use with legacy XML API (supported by react-datatrans-light-box <= 2.x)
npm install react-datatrans-light-box@2
```

## Example usage

```js
import React, { useState } from 'react'
import Lightbox from 'react-datatrans-light-box'

export default (props) => {
  const { transactionId } = props

  const [lightbox, showLightbox] = useState(false)

  const onLoaded = () => console.log('Loaded')
  const onOpened = () => console.log('Opened')
  const onCancelled = () => showLightbox(false)
  const onError = (data) => {
    console.log('Error:', data)
    showLightbox(false)
  }

  return <div>
    <h1>Datatrans Lightbox Demo</h1>
    <div>
      {lightbox
        ? <Lightbox
            transactionId={transactionId}
            production={true}
            onLoaded={this.onLoaded}
            onOpened={this.onOpened}
            onCancelled={this.onCancelled}
            onError={this.onError}
          />
        : <button onClick={() => showLightbox(true)}>Start Lightbox</button>
      }
    </div>
  </div>
}
```

## Properties

The Lightbox component takes the following properties as input.

| Property | Mandatory | Type | Description |
| -------- | --------- | ---- | ----------- |
| `transactionId` | **Yes** | String | Transaction ID returned by [Initializing Transactions](https://docs.datatrans.ch/docs/redirect-lightbox#section-initializing-transactions). |
| `production` | No | Boolean | Indicates whether requests hit Datatrans' production or sandbox environment. Defaults to `false` (sandbox). |
| `onLoaded` | No | Function | Called when payment page is loaded. |
| `onOpened` | No | Function | Called when payment page is opened. |
| `onCancelled` | No | Function | Called when user has cancelled payment. |
| `onError` | No | Function | Called when there was an error loading the payment page. |

[npm-url]: https://npmjs.com/package/react-datatrans-light-box
[npm-version-image]: https://img.shields.io/npm/v/react-datatrans-light-box.svg?style=flat-square
