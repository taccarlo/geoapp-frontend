import React, {Component} from 'react';
import countries from '../../data/countries'
import {
    MapContainer
  } from 'react-leaflet'
import classes from '../../pages/map/Map.module.css'
import "leaflet/dist/leaflet.css"

class MyMap extends Component {
    state = {}

    componentDidMount(){
        console.log(countries)
    }

    render (){
        return (
            <div>
                <h1>
                    My Map
                </h1>
                <MapContainer 
                    className={classes.mapContainer}
                    zoom={2}
                    center = {[20,100]}
                />

            </div>
        );
    }
}
export default MyMap;