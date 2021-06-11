import React from 'react'
import { connect } from 'react-redux'
import { IonIcon, IonItem, IonList, IonText } from '@ionic/react'
import { medkitOutline, leafOutline } from 'ionicons/icons'
import Modal from '../UI/modal/Modal'

const categoryConfig = {
  parco: {
    icon: leafOutline,
    color: 'success',
  },
  farmacia: {
    icon: medkitOutline,
    color: 'danger',
  },
}

const CategoryList = ({ categories, show }) => {
  const renderCategories = () => {
    if (show) {
      return (
        <Modal>
          <IonList>
            {categories.map((category) => (
              <IonItem key={category.id} button>
                <IonIcon
                  color={categoryConfig[category.denominazione].color}
                  icon={categoryConfig[category.denominazione].icon}
                  slot="start"
                />
                <IonText color={categoryConfig[category.denominazione].color}>
                  {category.denominazione}
                </IonText>
              </IonItem>
            ))}
          </IonList>
        </Modal>
      )
    } else {
      return null
    }
  }

  return renderCategories()
}

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  show: state.category.show,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
