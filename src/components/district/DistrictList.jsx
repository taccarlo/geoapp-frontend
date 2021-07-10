import React, { Fragment, useEffect } from 'react'
import {
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonToast,
} from '@ionic/react'

import { connect } from 'react-redux'
import { fetchDistricts, setMapView } from '../../redux/actions'

const DistrictList = ({
  fetchDistricts,
  districts,
  loading,
  error,
  setMapView,
  history,
}) => {
  useEffect(() => {
    fetchDistricts()
  }, [fetchDistricts])

  const onDistrictClick = district => {
    setMapView({ lat: district.lat, lng: district.lng })
    history.push('/map')
  }

  return (
    <Fragment>
      {loading ? (
        <IonProgressBar type="indeterminate"></IonProgressBar>
      ) : (
        <IonList>
          {districts.map(district => (
            <IonItem
              button
              key={district.id}
              onClick={() => onDistrictClick(district)}
            >
              <IonLabel>{district.denominazione}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
      {!!error && (
        <IonToast
          isOpen={!!error}
          color="danger"
          position="bottom"
          onDidDismiss={() => fetchDistricts()}
          message={error.message}
          duration={5000}
          buttons={[
            {
              icon: 'close-sharp',
              role: 'cancel',
              handler: () => {
                fetchDistricts()
              },
            },
          ]}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  districts: Object.values(state.district.districts),
  loading: state.district.loading,
  error: state.district.error,
})

const mapDispatchToProps = {
  setMapView,
  fetchDistricts,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictList)
