[![NPM version][npm-version-image]][npm-url] [![Build Status](https://circleci.com/gh/datatrans/react-datatrans-light-box.png?circle-token=:circle-token)](https://circleci.com/gh/datatrans/react-datatrans-light-box)

# react-datatrans-light-box

Official Datatrans light box library for showing our payment page in React applications.
React is defined as a peer dependency and expected to be made available by your project. Other than that this library is completely dependency-free.

## How to install

```bash
npm install react-datatrans-light-box
```
### Install legacy
```bash
npm install react-datatrans-light-box@2
```

## Example Usage of Lightbox component
You can also use a more direct approach and display the Lightbox component whenever or whereever you like.

```javascript
import React, { useState } from 'react'
import Lightbox from 'react-datatrans-light-box'

export default () => {
  const [lightbox, showLightbox] = useState(false)
  const [transactionId, setTransactionId] = useState(false)

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

### Mandatory

Name | Type | Description
-----|------|-----|
`transactionId` | String | Transaction ID returned by ' [Initializing Transactions](https://docs.datatrans.ch/docs/redirect-lightbox#section-initializing-transactions). |

### Optional

|Name  | Type   |Description |
|----- |:------ |------------|
|`production` | Boolean | Indicates whether requests hit Datatrans' production or development environment. Defaults to *false*.|
|`onLoaded` | Function | Called when payment page is loaded.|
|`onOpened` | Function | Called when payment page is opened.|
|`onCancelled` | Function | Called when user has cancelled payment.|
|`onError` | Function | Called when there was an error loading the payment page.|

[npm-url]: https://npmjs.com/package/react-datatrans-light-box
[npm-version-image]: https://img.shields.io/npm/v/react-datatrans-light-box.svg?style=flat-square
