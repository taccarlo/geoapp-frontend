import React from 'react'
import { IonIcon, IonLabel } from '@ionic/react'

import classes from './TabButton.module.css'

export const TabButton = ({ label, icon, action }) => {
  return (
    <div className={classes.tabButton} onClick={action}>
      <IonIcon className={classes.tabButtonIcon} icon={icon} />
      <IonLabel>{label}</IonLabel>
    </div>
  )
}

export default TabButton
