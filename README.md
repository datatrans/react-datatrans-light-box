# react-datatrans-lightbox
Datatrans light box mode component for React.
Render this component anywhere in your DOM tree in order to show the Datatrans payment page in fullscreen mode.

React is defined as a peer dependency and expected to be made available by your project. Other than that this component is completely dependency-free.

## How to install

```bash
npm i react-datatrans-lightbox --save
```

or

```bash
yarn add react-datatrans-lightbox --save
```

## Example Usage
```javascript

import React, {PropTypes, Component} from 'react'
import Lightbox from 'react-datatrans-lightbox'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { showsLightBox: false }
    this.start = this.start.bind(this)
  }

  start() {
    this.setState({showsLightBox: true})
  }


  render() {
    return <div>
      <div> Your React App </div>
      <button onClick={this.start}> start lightbox </button>
      {this.state.showsLightBox && <LightBox
        merchantId='1100004624'
        refno='1100004624'
        amount='1000'
        currency='CHF'
      /> }
    </div>
  }

}

```

## Props

### Mandatory
Name | Type | Description
-----|------|-----
```merchantId``` | String | Merchant identifier provided to you by Datatrans.
```refno``` | String | Any value by which you would like to reference the payment.
```amount``` | String |The amount in cents you would like to charge your customer.
```currency``` | String | The type of currency that will be used for the payment.

### Optional
Name | Type |Description
-----|------|---------
```production``` | Boolean | Indicates whether requests hit Datatrans' production or development environment. Defaults to *false*. 
```onOpen``` | Function | Called when payment page has opened.
```onCancel``` | Function | Called when user cancels payment.
```onLoad``` | Function | Called when payment page is loaded.
```onError``` | Function | Called when there was an error.
and many more... | | Refer to this [PDF](https://pilot.datatrans.biz/showcase/doc/Technical_Implementation_Guide.pdf) to get the full list of supported parameters.



