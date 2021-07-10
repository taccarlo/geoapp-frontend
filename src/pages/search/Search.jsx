import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import strapi from '../../api/strapi'
import { FETCH_LOCATIONS } from '../../redux/actions/types'
import LocationList from '../../components/location/LocationList'

const Search = props => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true)
        const res = await strapi.get(
          `/locations?denominazione_contains=${value}`
        )
        dispatch({ type: FETCH_LOCATIONS, payload: res.data })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    }
    if (value) {
      fetchLocations()
    }
  }, [value, dispatch])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={value}
          onIonChange={e => setValue(e.target.value)}
          debounce={500}
        ></IonSearchbar>
        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <LocationList {...props} />
        )}
      </IonContent>
      {!!error && (
        <IonToast
          isOpen={!!error}
          color="danger"
          position="bottom"
          onDidDismiss={() => setError(null)}
          message={error.message}
          duration={5000}
          buttons={[
            {
              icon: 'close-sharp',
              role: 'cancel',
              handler: () => {
                setError(null)
              },
            },
          ]}
        />
      )}
    </IonPage>
  )
}

export default Search
