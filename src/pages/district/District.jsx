import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import DistrictList from '../../components/district/DistrictList'

const District = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Districts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DistrictList {...props} />
      </IonContent>
    </IonPage>
  )
}

export default District
