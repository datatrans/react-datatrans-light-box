import React, { Component } from 'react'
import LightBox from 'react-datatrans-light-box'

const config = {
  merchantId: '1100004624',
  refno: '11000asdfasdf4624',
  amount: '1000',
  currency: 'CHF',
  sign: 'adsadf',
  production: false,
  paymentmethod: ['ECA', 'VIS', 'AMX'],
}

export default class App extends Component {
  render() {
    return <div>
      <LightBoxApproach />
      <LightBoxHocApproach />
    </div>
  }
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
