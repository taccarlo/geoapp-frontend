import { IonItem, IonLabel, IonList } from '@ionic/react'
import React from 'react'
import { connect } from 'react-redux'
import { setMapView } from '../../redux/actions'

export const DistrictList = ({ districts, setMapView, history }) => {
  const onDistrictClick = (district) => {
    setMapView({ lat: district.lat, lng: district.lng })
    history.push('/map')
  }

  return (
    <IonList>
      {districts.map((district) => (
        <IonItem
          button
          key={district.id}
          onClick={() => onDistrictClick(district)}
        >
          <IonLabel>{district.denominazione}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
}

const mapStateToProps = (state) => ({
  districts: state.district.districts,
})

const mapDispatchToProps = {
  setMapView,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
