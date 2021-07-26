import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  MapConsumer,
  GeoJSON,
  LayersControl,
} from 'react-leaflet'

import axios from 'axios';

import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'

import paesi from '../../data/countries.json'

export class Map extends Component {
  state = {
    mapContainer: false,
  }

  componentDidMount() {
    if (this.state.mapContainer) return

    setTimeout(() => {
      this.setState({ mapContainer: true })
    }, 500)
  }

  OnEachFarmacia = (farmacia, layer) =>{
    layer.bindPopup(farmacia.properties.nome)
  }

  OnEachParco = (parco, layer) =>{
    layer.bindPopup(parco.properties.nome)
  }

  OnEachPaese = (paese, layer) =>{
    layer.bindPopup(paese.properties.ADMIN)

    layer.on({
      click: (event) =>{
        console.log("click on "+paese.properties.ADMIN)
      }
    })
  }

  
  render() {

    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'crossdomain': 'true',
        'Content-Type':'application/x-www-form-urlencoded',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    };

    //axios.get("http://192.168.20.20:8080/geoserver/circoscrizioni/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=circoscrizioni%3Acircoscrizioni&maxFeatures=50&outputFormat=application%2Fjson", { headers }).then(response => console.log(response));
    
    axios.get("https://api.npms.io/v2/search?q=react", { headers }).then(response => console.log(response));

    const { center, zoom } = this.props.map
    var farmacie = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 5"},"geometry":{"type":"Point","coordinates":[10.832991600036621,45.43372583298752]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 3"},"geometry":{"type":"Point","coordinates":[10.855522155761719,45.416286468478475]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 4"},"geometry":{"type":"Point","coordinates":[10.783424377441406,45.42086519967432]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia1"},"geometry":{"type":"Point","coordinates":[10.99658489227295,45.44691472640307]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 2"},"geometry":{"type":"Point","coordinates":[10.987358093261719,45.44730613046779]}}]};
    var parchi = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"airport","nome":"Parco 1"},"geometry":{"type":"Point","coordinates":[11.034822463989258,45.4468846182856]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Parco 2"},"geometry":{"type":"Point","coordinates":[11.05748176574707,45.43357525704575]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Parco 3"},"geometry":{"type":"Point","coordinates":[11.715545654296875,45.31352900692258]}}]};
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="content" fullscreen>
          {this.state.mapContainer && (
            <MapContainer
              className={classes.mapContainer}
              center={center}
              zoom={zoom}
            >
              <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="experiment">

      <WMSTileLayer
      url="http://192.168.20.20:8080/geoserver/circoscrizioni/wms?scrizioni&bbox=10.877110481262207%2C45.3494987487793%2C11.12392807006836%2C45.54174041748047&srs=EPSG%3A404000"
      format="image"
      service="WMS"
      request="GetMap"
      layers="circoscrizioni:circoscrizioni"
      version="1.1.0"
      />

      </LayersControl.Overlay>
      <LayersControl.Overlay name="Marker with popup">
        <Marker position={[45.439351, 10.99471]}>
          <Popup>
            Verona 2
          </Popup>
        </Marker>
      </LayersControl.Overlay>
    </LayersControl>
              <GeoJSON key='farmacie' data={farmacie.features} onEachFeature={this.OnEachFarmacia} />
              <GeoJSON key='parchi' data={parchi.features} onEachFeature={this.OnEachParco} />
              <GeoJSON key='paesi' data={paesi.features} onEachFeature={this.OnEachPaese} />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapConsumer>
                {map => {
                  map.setView(center)
                  return null
                }}
              </MapConsumer>
              <Marker position={[45.438351, 10.99171]}>
                <Popup>Verona</Popup>
              </Marker>
              <LocationMarkers />
            </MapContainer>
          )}
        </IonContent>
      </IonPage>
    )
  }
}

const mapStateToProps = state => ({
  map: state.map,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
