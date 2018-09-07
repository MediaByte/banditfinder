import React, { Component } from 'react';
import RenderMarkers from './components/Maps/RenderMarkers.jsx';
import { geolocated } from 'react-geolocated';
import Gun from 'gun/gun';
import 'tachyons';

const formatData = data => Object.keys(data)
  .map(key => ({ key, ...data[key]  }))
  .filter(m => m.key !== '_')

class App extends Component {

  constructor(props) {
    super(props);
      this.gun = Gun('')
      this.currentLocation = this.gun.get('online').get('users')
        this.state = {
          signs: [],
          device: '',
        }
  }

  componentWillUpdate(prev, next) {
    next.device === '' && prev.isGeolocationEnabled
      ? this.setState({device: prev.coords})
      : null
console.log(prev)
      
  }

  componentDidMount() {
    let signs = []
    this.gun.get('signs').get('location').map().on((user, key) => {
      signs[key] = user
      this.setState({ signs: Object.assign({}, this.state.signs, signs) })
    })
  }

  render() {
    return !this.props.isGeolocationAvailable
      ? <div className={'tc '} >Device not supported</div>
      : !this.props.isGeolocationEnabled
        ? <div className={'tc '}>Geolocation is not accessible</div>
        : this.props.coords
          ? <RenderMarkers
              // className={''} 
              isMarkerShown 
              lat={this.props.coords.latitude} 
              long={this.props.coords.longitude} 
              data={this.state.signs}
            />
          : <h3 className={'tc '}>Getting your location data&hellip; </h3>;
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(App);
