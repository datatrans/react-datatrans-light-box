[![Build Status](https://circleci.com/gh/datatrans/react-datatrans-light-box.png?circle-token=:circle-token)](https://circleci.com/gh/datatrans/react-datatrans-light-box)

# react-datatrans-light-box
Official Datatrans light box library for showing our payment page in React applications.
React is defined as a peer dependency and expected to be made available by your project. Other than that this library is completely dependency-free.



## How to install

```bash
npm i react-datatrans-light-box --save
```

or

```bash
yarn add react-datatrans-light-box
```

## LightBoxHoc - Higher-Order Component
The HOC is our recommended way of using this library and showing our payment page. It provides you with easier control over loading and showing the payment page.
In case you are unfamiliar with the concept of HOCs we recommend to read this guide:
 [https://facebook.github.io/react/docs/higher-order-components.html](https://facebook.github.io/react/docs/higher-order-components.html)
The LightBox HOC wraps your target component in a `div` tag and adds a LightBox component as a child.

### Example Usage of LightBoxHoc

```javascript

const config = {
  merchantId: '1100004624',
  refno: '11000asdfasdf4624',
  amount: '1000',
  currency: 'CHF',
  sign: 'adsadf',
  production: false,
}

class LightBoxHocApproachBase extends Component {

  constructor(props) {
    super(props)

    props.lightBox.on('cancelled', () => this.setState({cancelled: true}))
    props.lightBox.on('error', (error) => this.setState({error}))
    props.lightBox.on('loaded', () => {
      this.setState({loaded: true})
    })
  }

  render() {

    const {lightBox} = this.props

    return <div>

      <h1> Test LightBoxHoc Apprach </h1>

      <div> props.lightBox: </div>
      <pre> {JSON.stringify(lightBox, null, 2)} </pre>

      {lightBox.loaded && <button onClick={lightBox.show}>
        show payment page
      </button>}

      <button onClick={() => lightBox.load(config)}>
        load lightbox with HOC
      </button>

    </div>
  }

}

LightBoxHocApproachBase.propTypes = {
  lightBox: LightBox.Hoc.propType,
}

const LightBoxHocApproach = LightBox.Hoc(LightBoxHocApproachBase)

```

### props.lightBox
The following props are available on `props.lightBox` of your target component:

```javascript
LightBoxHoc.propType = PropTypes.shape({
  //LightBox state
  visible: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  cancelled: PropTypes.bool.isRequired,
  error: PropTypes.any,

  //Methods
  load: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
})
```


## Example Usage of LightBox component
You can also use a more direct approach and display the LightBox component whenever or whereever you like.

```javascript

import React, {PropTypes, Component} from 'react'
import Lightbox from 'react-datatrans-light-box'


const config = {
  merchantId: '1100004624',
  refno: '11000asdfasdf4624',
  amount: '1000',
  currency: 'CHF',
  sign: 'adsadf',
  production: false,
}

class LightBoxApproach extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showsLightBox: false,
    }
    this.start = this.start.bind(this)
  }

  start() {
    this.setState({showsLightBox: true})
  }

  render() {

    return <div>
      <h1> Test LightBox Approach </h1>
      <div>
        { this.state.showsLightBox
          ? 'LightBox is rendered and cannot be reused.'
          : <button onClick={this.start}> start lightbox </button>
        }

        { this.state.showsLightBox && <LightBox {...config} /> }

        { this.state.error && <div>{JSON.stringify(this.state.error)}</div> }
      </div>
    </div>
  }
}

```

## Props

The LightBox component takes the following props as input.

### Mandatory
Please note that these props also need to be passed to `props.lightBox.load()` when using the HOC.

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
|`onCancelled` | Function | Called when user has cancelled payment.|
|`onLoaded` | Function | Called when payment page is loaded.|
|`onError` | Function | Called when there was an error loading the payment page.|
|and many more... | | Refer to this [PDF](https://pilot.datatrans.biz/showcase/doc/Technical_Implementation_Guide.pdf) to get the full list of supported parameters.|


