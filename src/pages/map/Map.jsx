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

import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'

import axios from 'axios'

import circoscrizioni from '../../data/circoscrizioni.json'
import quartieri from '../../data/quartieri.json'
import farmacie from '../../data/farmacie.json'
import scuole from '../../data/scuole.json'
import ztl from '../../data/ztl.json'
import parcheggiDedicati from '../../data/parcheggiDedicati.json'
import sostaVietata from '../../data/sostaVietata.json'

//var urlCircoscrizioni= "http://192.168.20.20:8080/geoserver/circoscrizioni/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=circoscrizioni%3Acircoscrizioni&maxFeatures=50&outputFormat=application%2Fjson";

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
    layer.bindPopup(farmacia.properties.denominazi)
  }

  OnEachScuola = (scuola, layer) =>{
    layer.bindPopup(scuola.properties.nome_scuol)
  }

  OnEachZTL = (ztl, layer) =>{
    layer.bindPopup(ztl.properties.nome)
  }

  OnEachParcheggioDedicato = (parcheggioDedicato, layer) =>{
    layer.bindPopup(parcheggioDedicato.properties.nome)
  }

  OnEachSostaVietata = (sostaVietata, layer) =>{
    layer.bindPopup(sostaVietata.properties.nome)
  }

  OnEachQuartiere = (quartiere, layer) =>{
    layer.bindPopup(quartiere.properties.nome)
  }

  OnEachCircoscrizione = (paese, layer) =>{
    layer.bindPopup(paese.properties.circoscriz)

    layer.on({
      click: (event) =>{
        console.log("click on "+paese.properties.circoscriz)
      }
    })
  }

  render() {
    const { center, zoom } = this.props.map
    const headers = {
      'crossdomain': 'true',
      'Content-Type':'application/x-www-form-urlencoded',
    };
    //axios.get("http://192.168.20.20:8080/geoserver/circoscrizioni/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=circoscrizioni%3Acircoscrizioni&maxFeatures=50&outputFormat=application%2Fjson", { headers }).then(response => console.log(response));
    //fetch('https://jsonplaceholder.typicode.com/todos/1') .then(response => response.json()) .then(data => console.log(data));

    //var farmacie = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 5"},"geometry":{"type":"Point","coordinates":[10.832991600036621,45.43372583298752]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 3"},"geometry":{"type":"Point","coordinates":[10.855522155761719,45.416286468478475]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 4"},"geometry":{"type":"Point","coordinates":[10.783424377441406,45.42086519967432]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia1"},"geometry":{"type":"Point","coordinates":[10.99658489227295,45.44691472640307]}},{"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"","nome":"Farmacia 2"},"geometry":{"type":"Point","coordinates":[10.987358093261719,45.44730613046779]}}]};
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

      <LayersControl.Overlay name="Confini">

      <WMSTileLayer
      layers='OSM-Overlay-WMS'
      url="http://ows.mundialis.de/services/service?"
      transparent='true'
      />

      </LayersControl.Overlay>

      <LayersControl.Overlay name="Circoscrizioni">
      <GeoJSON key='circoscrizioni' data={circoscrizioni.features} onEachFeature={this.OnEachCircoscrizione} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Quartieri">
      <GeoJSON key='quartieri' data={quartieri.features} onEachFeature={this.OnEachQuartiere} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Farmacie">
      <GeoJSON key='farmacie' data={farmacie.features} onEachFeature={this.OnEachFarmacia} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Scuole">
      <GeoJSON key='scuole' data={scuole.features} onEachFeature={this.OnEachScuola} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="ZTL">
      <GeoJSON key='ZTL' data={ztl.features} onEachFeature={this.OnEachZTL} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Parcheggi Dedicati">
      <GeoJSON key='parcheggiDedicati' data={parcheggiDedicati.features} onEachFeature={this.OnEachParcheggioDedicato} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Sosta Vietata">
      <GeoJSON key='sosta Vietata' data={sostaVietata.features} onEachFeature={this.OnEachSostaVietata} />
      </LayersControl.Overlay>

    </LayersControl>  
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
