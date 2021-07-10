import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import CategoryList from '../../components/category/CategoryList'

const Category = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CategoryList {...props} />
      </IonContent>
    </IonPage>
  )
}

export default Category
