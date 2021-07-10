import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react'
import React from 'react'

const InputField = props => {
  const { label, onChange, onBlur, error } = props

  return (
    <IonItem>
      <IonLabel color={error && 'danger'} position="floating">
        {label}
      </IonLabel>
      <IonInput
        onIonChange={onChange}
        onIonBlur={onBlur}
        clearInput
        {...props}
      ></IonInput>
      <IonText color="danger">
        <small>{error}</small>
      </IonText>
    </IonItem>
  )
}

export default InputField
