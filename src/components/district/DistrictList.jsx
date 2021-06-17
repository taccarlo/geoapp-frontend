import { IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDistricts, setMapView } from '../../redux/actions'

const DistrictList = ({ fetchDistricts, districts, setMapView, history }) => {
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
  districts: Object.values(state.district),
})

const mapDispatchToProps = {
  setMapView,
  fetchDistricts,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
