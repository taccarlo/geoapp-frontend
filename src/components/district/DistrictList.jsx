import { IonItem, IonLabel, IonList } from '@ionic/react'
import React from 'react'
import { connect } from 'react-redux'
import { setMapView } from '../../redux/actions'
import Modal from '../UI/modal/Modal'

const DistrictList = ({ districts, setMapView, show }) => {
  const onDistrictClick = (district) => {
    setMapView({ lat: district.lat, lng: district.lng })
  }

  const renderDistricts = () => {
    if (show) {
      return (
        <Modal>
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
        </Modal>
      )
    } else {
      return null
    }
  }

  return renderDistricts()
}

const mapStateToProps = (state) => ({
  districts: state.district.districts,
  show: state.district.show,
})

const mapDispatchToProps = {
  setMapView,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
