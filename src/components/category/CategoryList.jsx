import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  IonCheckbox,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonToast,
} from '@ionic/react'
import { medkitOutline, leafOutline, checkmarkSharp } from 'ionicons/icons'
import {
  fetchCategories,
  fetchLocations,
  clearLocations,
} from '../../redux/actions'

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

const CategoryList = ({
  fetchCategories,
  loading,
  error,
  categories,
  fetchLocations,
  clearLocations,
  history,
}) => {
  const [checkedState, setCheckedState] = useState({})

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const onCategorySelect = category => {
    const temp = { ...checkedState, [category.id]: !checkedState[category.id] }
    setCheckedState(temp)
  }

  const onFilterSubmit = () => {
    const categoryIds = Object.entries(checkedState).map(categoryId =>
      categoryId[1] === true ? +categoryId[0] : null
    )
    if (categoryIds.every(value => value === null)) {
      clearLocations()
      history.push('/map')
    } else {
      fetchLocations(categoryIds)
      history.push('/map')
    }
  }

  return (
    <Fragment>
      {loading ? (
        <IonProgressBar type="indeterminate"></IonProgressBar>
      ) : (
        <IonList>
          {categories.map(category => (
            <IonItem
              key={category.id}
              button
              onClick={() => onCategorySelect(category)}
            >
              <IonCheckbox
                slot="start"
                value={category.id}
                checked={checkedState[category.id]}
              />
              <IonIcon
                color={
                  checkedState[category.id]
                    ? categoryConfig[category.denominazione].color
                    : 'medium'
                }
                icon={categoryConfig[category.denominazione].icon}
                slot="start"
              />
              <IonLabel
                color={
                  checkedState[category.id]
                    ? categoryConfig[category.denominazione].color
                    : 'medium'
                }
              >
                {category.denominazione}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}

      {categories.length > 0 && (
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton type="submit" onClick={onFilterSubmit}>
            <IonIcon icon={checkmarkSharp}></IonIcon>
          </IonFabButton>
        </IonFab>
      )}

      {!!error && (
        <IonToast
          isOpen={!!error}
          color="danger"
          position="bottom"
          onDidDismiss={() => fetchCategories()}
          message={error.message}
          duration={5000}
          buttons={[
            {
              icon: 'close-sharp',
              role: 'cancel',
              handler: () => {
                fetchCategories()
              },
            },
          ]}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  categories: Object.values(state.category.categories),
  loading: state.category.loading,
  error: state.category.error,
})

const mapDispatchToProps = {
  fetchCategories,
  fetchLocations,
  clearLocations,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
