import React from 'react'
import { connect } from 'react-redux'
import { IonCheckbox, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { medkitOutline, leafOutline } from 'ionicons/icons'
import Modal from '../UI/modal/Modal'

import { fetchLocations, switchIsChecked } from '../../redux/actions'

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

const catIds = []

const CategoryList = ({
  categories,
  show,
  fetchLocations,
  switchIsChecked,
}) => {
  const onLocationClick = (cat) => {
    if (!cat.isChecked) {
      switchIsChecked(cat.id)
      const category = catIds.find((id) => id === cat.id)
      if (!category) {
        catIds.push(cat.id)
      }
      fetchLocations(catIds)
    } else {
      switchIsChecked(cat.id)
      const categoryIndex = catIds.findIndex((id) => id === cat.id)
      catIds.splice(categoryIndex, 1)
      fetchLocations(catIds)
    }
    console.log('catIds :>> ', catIds)
  }

  const renderCategories = () => {
    if (show) {
      return (
        <Modal>
          <IonList>
            {categories.map((category) => (
              <IonItem
                key={category.id}
                button
                onClick={() => onLocationClick(category)}
              >
                <IonCheckbox
                  slot="start"
                  value={category.id}
                  checked={category.isChecked}
                />
                <IonIcon
                  color={
                    category.isChecked
                      ? categoryConfig[category.denominazione].color
                      : 'medium'
                  }
                  icon={categoryConfig[category.denominazione].icon}
                  slot="start"
                />
                <IonLabel
                  color={
                    category.isChecked
                      ? categoryConfig[category.denominazione].color
                      : 'medium'
                  }
                >
                  {category.denominazione}
                </IonLabel>
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

const mapDispatchToProps = {
  fetchLocations,
  switchIsChecked,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
