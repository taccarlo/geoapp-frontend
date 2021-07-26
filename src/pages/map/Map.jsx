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
import MyMap from '../../components/mymap/MyMap'
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

        <MyMap></MyMap>

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
