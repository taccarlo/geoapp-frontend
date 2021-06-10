import React from 'react'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { connect } from 'react-redux'
import { setMapView } from '../../redux/actions'

export const DistrictList = props => {
  const { district, setMapView, history } = props

  const onDistrictClick = district => {
    setMapView({ lat: district.lat, lng: district.lng })
    history.push('/map')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>District</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {district.districts.map(district => (
            <IonItem
              button
              key={district.id}
              onClick={() => onDistrictClick(district)}
            >
              <IonLabel>{district.denominazione}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = state => ({
  district: state.district,
})

const mapDispatchToProps = {
  setMapView,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
