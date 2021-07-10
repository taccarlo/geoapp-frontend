import {
  IonItem,
  IonLabel,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react'
import React, { Fragment } from 'react'

export const SelectField = props => {
  const { label, entities, onChange, error, loading, failedToFetch } = props

  return (
    <Fragment>
      <IonItem>
        <IonLabel>{label}</IonLabel>

        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}

        {!!failedToFetch && (
          <IonText color="danger">{failedToFetch.message}</IonText>
        )}

        <IonSelect
          placeholder="Select One"
          onIonChange={onChange}
          {...props}
          disabled={!!failedToFetch}
        >
          {entities.map(entity => (
            <IonSelectOption key={entity.id} value={entity.id}>
              {entity.denominazione}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonText color="danger">
          <small>{error}</small>
        </IonText>
      </IonItem>
    </Fragment>
  )
}

export default SelectField
