import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { IonIcon, IonItem, IonList } from '@ionic/react'
import { medkitOutline, leafOutline } from 'ionicons/icons'
import { fetchCategories } from '../../redux/actions'

const categoryConfig = {
  parco: leafOutline,
  farmacia: medkitOutline,
}

const CategoryList = ({ categories, fetchCategories }) => {
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <IonList>
      {categories.map((category) => (
        <IonItem key={category.id} button>
          <IonIcon icon={categoryConfig[category.denominazione]} slot="start" />
          {category.denominazione}
        </IonItem>
      ))}
    </IonList>
  )
}

const mapStateToProps = (state) => ({
  categories: state.category.categories,
})

const mapDispatchToProps = {
  fetchCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
