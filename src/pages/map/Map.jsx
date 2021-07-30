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

const url='http://192.168.20.63:5000';


export class Map extends Component {
  state = {
    mapContainer: false,
    circoscrizioni: {},
    farmacie:{},
    nuoveZone30:{},
    parcheggiDedicati:{},
    parchiPoligoni:{},
    parchiPunti:{},
    popolazioneResidente:{},
    puntiDiInteresse: {},
    quartieri: {},
    scuole:{},
    sostaVietata:{},
    strade30:{},
    zone30:{},
    ztl :{},
  }

  constructor() {
    super();
    this.geoJsonLayer = React.createRef();
    console.log(this.geoJsonLayer.current);
}

  
  

  componentDidMount() {
    //this.GetCircoscrizioni();
    //this.GetFarmacie();
    //this.GetNuoveZone30();
    //this.GetParcheggiDedicati();
    //this.GetParchiPoligoni();
    //this.GetParchiPunti();
    //this.GetPopolazioneResidente();
    ////this.GetPuntiDiInteresse();
    //this.GetQuartieri();
    //this.GetScuole();
    //this.GetSostaVietata();
    //this.GetStrade30();
    //this.GetZone30();
    //this.GetZtl();

    if (this.state.mapContainer) return

    setTimeout(() => {
      this.setState({ mapContainer: true })
    }, 500)
  }
//GET METHODS
  GetCircoscrizioni() {
    fetch(url+'/get/circoscrizioni', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({circoscrizioni : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetFarmacie(){
    fetch(url+'/get/farmacie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({farmacie : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetNuoveZone30(){
    fetch(url+'/get/nuoveZone30', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({nuoveZone30 : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetParcheggiDedicati(){
    fetch(url+'/get/parcheggiDedicati', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({parcheggiDedicati : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetParchiPoligoni(){
    fetch(url+'/get/parchiPoligoni', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({parchiPoligoni : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetParchiPunti(){
    fetch(url+'/get/parchiPunti', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({parchiPunti : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetPopolazioneResidente(){
    fetch(url+'/get/popolazioneResidente', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({popolazioneResidente : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetPuntiDiInteresse(){
    fetch(url+'/get/puntiDiInteresse', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({puntiDiInteresse : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetQuartieri(){
    fetch(url+'/get/quartieri', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({quartieri : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetScuole(){
    fetch(url+'/get/scuole', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({scuole : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetSostaVietata(){
    fetch(url+'/get/sostaVietata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({sostaVietata : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetStrade30(){
    fetch(url+'/get/strade30', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({strade30 : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetZone30(){
    fetch(url+'/get/zone30', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({zone30 : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  GetZtl(){
    fetch(url+'/get/ztl', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({ztl : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //ON EACH METHODS
  OnEachCircoscrizione = (paese, layer) =>{
    layer.bindPopup(paese.properties.circoscriz)

    layer.on({
      click: (event) =>{
        console.log("click on "+paese.properties.circoscriz)
      }
    })
  }

  OnEachFarmacia = (farmacia, layer) =>{
    layer.bindPopup(farmacia.properties.denominazi)
  }

  OnEachNuovaZona30 = (nuovaZona30, layer) =>{
    layer.bindPopup(nuovaZona30.properties.nome)
  }

  OnEachParcheggioDedicato = (parcheggioDedicato, layer) =>{
    layer.bindPopup(parcheggioDedicato.properties.nome)
  }

  OnEachParcoPoligono = (parcoPoligono, layer) =>{
    layer.bindPopup(parcoPoligono.properties.denominazi)
  }

  OnEachParcoPunto = (parcoPunto, layer) =>{
    layer.bindPopup(parcoPunto.properties.denominazi)
  }

  OnEachPopolazioneResidente = (popolazioneResidente, layer) =>{
    layer.bindPopup(popolazioneResidente.properties.indirizzo)
  }

  OnEachPuntoDiInteresse = (poi, layer) =>{
    layer.bindPopup(poi.properties.nome)
  }

  OnEachQuartiere = (quartiere, layer) =>{
    layer.bindPopup(quartiere.properties.quartiere)
  }

  OnEachScuola = (scuola, layer) =>{
    layer.bindPopup(scuola.properties.nome_scuol)
  }

  OnEachSostaVietata = (sostaVietata, layer) =>{
    layer.bindPopup(sostaVietata.properties.nome)
  }

  OnEachStrada30 = (strada30, layer) =>{
    layer.bindPopup(strada30.properties.nome)
  }

  OnEachZona30 = (zona30, layer) =>{
    layer.bindPopup(zona30.properties.nome)
  }

  OnEachZTL = (ztl, layer) =>{
    layer.bindPopup(ztl.properties.nome)
  }

  render() {
    const { center, zoom } = this.props.map
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
        <GeoJSON key='Circoscrizioni' data={this.state.circoscrizioni.features} onEachFeature={this.OnEachCircoscrizione} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Farmacie">
      <GeoJSON key='Farmacie' data={this.state.farmacie.features} onEachFeature={this.OnEachFarmacia} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Nuove Zone 30">
      <GeoJSON key='Nuove Zone 30' data={this.state.nuoveZone30.features} onEachFeature={this.OnEachNuovaZona30} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Quartieri">
      <GeoJSON key='Quartieri' data={this.state.quartieri.features} onEachFeature={this.OnEachQuartiere} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Parcheggi Dedicati">
      <GeoJSON key='Parcheggi Dedicati' data={this.state.parcheggiDedicati.features} onEachFeature={this.OnEachParcheggioDedicato} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name=" NW Parchi Poligoni">
      <GeoJSON key='Parchi Poligoni' data={this.state.parchiPoligoni.features} onEachFeature={this.OnEachParcoPoligono} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name=" Parchi Punti">
      <GeoJSON key='Parchi Punti' data={this.state.parchiPunti.features} onEachFeature={this.OnEachParcoPunto} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name=" Popolazione Residente">
      <GeoJSON key='Popolazione Residente' data={this.state.popolazioneResidente.features} onEachFeature={this.OnEachPopolazioneResidente} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="NW Punti Di Interesse">
      <GeoJSON key='Punti Di Interesse' data={this.state.puntiDiInteresse.features} onEachFeature={this.OnEachPuntoDiInteresse} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Scuole">
      <GeoJSON key='Scuole' data={this.state.scuole.features} onEachFeature={this.OnEachScuola} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Sosta Vietata">
      <GeoJSON key='Sosta Vietata' data={this.state.sostaVietata.features} onEachFeature={this.OnEachSostaVietata} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Strade 30">
      <GeoJSON key='Strade 30' data={this.state.strade30.features} onEachFeature={this.OnEachStrada30} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Zone 30">
      <GeoJSON key='Zone 30' data={this.state.zone30.features} onEachFeature={this.OnEachZona30} />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="ZTL">
      <GeoJSON key='ZTL' data={this.state.ztl.features} onEachFeature={this.OnEachZTL} />
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
