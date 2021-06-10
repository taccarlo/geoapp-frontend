import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import DistrictList from '../../components/district/DistrictList'

export const Districts = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>District</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DistrictList {...props} />
      </IonContent>
    </IonPage>
  )
}

export default Districts
