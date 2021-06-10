import { IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMapView, fetchDistricts } from '../../redux/actions'

const DistrictList = ({ districts, setMapView, fetchDistricts, history }) => {
  useEffect(() => {
    fetchDistricts()
  }, [fetchDistricts])

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
  fetchDistricts,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
