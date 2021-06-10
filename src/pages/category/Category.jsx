import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import CategoryList from '../../components/category/CategoryList'

const Category = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CategoryList {...props} />
      </IonContent>
    </IonPage>
  )
}

export default Category
