import React, {Component} from 'react'
import PropTypes from 'prop-types'
import LightBox from './LightBox'
import {filterProps} from './utils'


const notLoadedError = () => new Error(
  'payment page is not loaded yet.'
)

const initialState = {
  shouldLoad: false,
  visible: false,
  loaded: false,
  error: null,
  cancelled: false,
}

const LightBoxHoc = Wrapee => class Wrapper extends Component {

  constructor(props) {
    super(props)

    this.load     = this.load.bind(this)
    this.show     = this.show.bind(this)
    this.on       = this.on.bind(this)

    this.onLoaded            = this.onLoaded.bind(this)
    this.onCancelled         = this.onCancelled.bind(this)
    this.onError             = this.onError.bind(this)

    this.config = {}

    this.state = {
      ...initialState,
      load: this.load,
      show: this.show,
      on: this.on,
    }

    this.listeners = {
      cancelled: [],
      error: [],
      loaded: [],
    }
  }

  onCancelled() {
    this.listeners.cancelled.forEach(fn => fn())
    this.setState({...initialState, cancelled: true})
  }

  onError(error) {
    this.setState(
      {...initialState, error},
      () => this.listeners.error.forEach(fn => fn(error))
    )
  }

  onLoaded() {
    this.setState(
      {loaded: true},
      () => this.listeners.loaded.forEach(fn => fn())
    )

  }

  /**
   * Registers listeners
   */
  on(key, fn) {
    const listeners = this.listeners[key]
    if(!listeners) return console.error(key, 'not supported')
    listeners.push(fn)
  }

  load(config) {
    this.config = config
    this.setState({shouldLoad: true})
  }

  show() {
    if(!this.state.loaded) throw notLoadedError()
    this.setState({visible: true})
  }


  render() {

    return <div>
      { this.state.shouldLoad && <LightBox
          {...this.config}
          onLoaded={this.onLoaded}
          showsPaymentPage={this.state.visible}
          onCancelled={this.onCancelled}
          onError={this.onError}
        />
      }

      <Wrapee
        {...this.props}
        lightBox={filterProps(this.state, ['shouldLoad'])}
      />
    </div>
  }
}

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

export default LightBoxHoc
