import React from 'react'
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonRow,
} from '@ionic/react'
import { cameraOutline, closeCircle } from 'ionicons/icons'

const ImageField = ({ photos, takePhoto, removePhoto }) => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          {photos.map((photo, index) => (
            <IonCol size="2" key={index}>
              <IonImg src={photo.webviewPath} />
            </IonCol>
          ))}
          {!photos.length ? (
            <IonCol size="2">
              <IonButton size="large" onClick={takePhoto}>
                <IonIcon icon={cameraOutline} />
              </IonButton>
            </IonCol>
          ) : (
            <IonCol size="2">
              <IonIcon
                color="danger"
                icon={closeCircle}
                onClick={removePhoto}
              />
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}

export default ImageField
