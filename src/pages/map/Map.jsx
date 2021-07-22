import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
} from '@ionic/react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  WMSTileLayer,
  MapConsumer,
} from 'react-leaflet'
import { dismissLocationModal } from '../../redux/actions'
import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'
import LocationModal from '../../components/location/LocationModal'

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

  render() {
    const { center, zoom, locationClicked, showModal } = this.props.map
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="content" fullscreen>
        
          <IonModal isOpen={showModal} backdropDismiss={false}>   
           { locationClicked && ( <LocationModal loc={locationClicked}/> )}
            <IonButton onClick={() => this.props.dismissLocationModal()}>
              Dismiss
            </IonButton>
          </IonModal>

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
      layers='OSM-Overlay-WMS'
      url="http://ows.mundialis.de/services/service?"
      transparent='true'
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

const mapDispatchToProps = {dismissLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
