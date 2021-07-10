import React from 'react'
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react'
import { location } from 'ionicons/icons'
import { Geolocation } from '@capacitor/geolocation'

const GetLocation = ({ lat, lng, onClick, error }) => {
  const getUserLocation = async () => {
    try {
      const res = await Geolocation.getCurrentPosition()
      onClick(res.coords.latitude, res.coords.longitude)
    } catch (error) {
      console.error('Error getting location', error)
    }
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" size-sm>
          <IonButton onClick={getUserLocation} color="danger" expand="full">
            <IonIcon icon={location} slot="start" />
            Get Your Location
          </IonButton>
        </IonCol>
        <IonCol size="12" size-sm>
          <IonItem>
            <IonLabel>Lat: </IonLabel>
            <IonInput type="number" value={lat} disabled></IonInput>
            <IonText color="danger">
              <small>{error}</small>
            </IonText>
          </IonItem>
        </IonCol>
        <IonCol size="12" size-sm>
          <IonItem>
            <IonLabel>Lng: </IonLabel>
            <IonInput type="number" value={lng} disabled></IonInput>
            <IonText color="danger">
              <small>{error}</small>
            </IonText>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default GetLocation
