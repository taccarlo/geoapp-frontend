import React from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonIcon,
} from '@ionic/react'
import { medkitOutline, leafOutline } from 'ionicons/icons'

const categoryConfig = {
  parco: leafOutline,
  farmacia: medkitOutline,
}

export const CategoryList = ({ categories }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {categories.map(category => (
            <IonItem key={category.id} button>
              <IonIcon
                icon={categoryConfig[category.denominazione]}
                slot="start"
              />
              {category.denominazione}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = state => ({
  categories: state.category.categories,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
