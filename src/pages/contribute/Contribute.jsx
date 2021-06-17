import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonLabel,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonItemDivider,
} from '@ionic/react'
import { location } from 'ionicons/icons'
import { Geolocation } from '@ionic-native/geolocation'

import { fetchCategories, fetchDistricts } from '../../redux/actions'
import strapi from '../../api/strapi'

// TODO upload an image and send it to the api
class Contribute extends Component {
  state = {
    denominazione: '',
    indirizzo: '',
    civico: '',
    category: null,
    district: null,
    lat: null,
    lng: null,
    files: null,
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchDistricts()
  }

  getUserLocation = async () => {
    try {
      const resp = await Geolocation.getCurrentPosition()
      this.setState({ lat: resp.coords.latitude, lng: resp.coords.longitude })
    } catch (error) {
      console.error('Error getting location', error)
    }
  }

  onFileChange = (event) => {
    this.setState({ files: event.target.files[0] })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    try {
      // Add Location
      const res = await strapi.post('/locations', this.state)
      // Upload image for it
      const fd = new FormData()
      fd.append('files', this.state.files, this.state.files.name)
      fd.append('ref', 'location')
      fd.append('refId', res.data.id)
      fd.append('field', 'cover')
      const uploadRes = await strapi.post('/upload', fd)

      console.log('uploadRes :>> ', uploadRes)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { districts, categories } = this.props
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Contribute</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form onSubmit={this.onSubmit}>
            <IonItem>
              <IonLabel position="stacked">Denominazione</IonLabel>
              <IonInput
                type="text"
                name="denominazione"
                value={this.state.denominazione}
                onIonChange={(e) =>
                  this.setState({ denominazione: e.target.value })
                }
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Indirizzo</IonLabel>
              <IonInput
                type="text"
                name="indirizzo"
                value={this.state.indirizzo}
                onIonChange={(e) =>
                  this.setState({ indirizzo: e.target.value })
                }
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Civico</IonLabel>
              <IonInput
                type="text"
                name="civico"
                value={this.state.civico}
                onIonChange={(e) => this.setState({ civico: e.target.value })}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>District</IonLabel>
              <IonSelect
                value={this.state.district}
                placeholder="Select One"
                onIonChange={(e) => this.setState({ district: e.detail.value })}
              >
                {districts.map((district) => (
                  <IonSelectOption key={district.id} value={district.id}>
                    {district.denominazione}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                value={this.state.category}
                placeholder="Select One"
                onIonChange={(e) => this.setState({ category: e.detail.value })}
              >
                {categories.map((category) => (
                  <IonSelectOption key={category.id} value={category.id}>
                    {category.denominazione}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Image</IonLabel>
              <input type="file" onChange={this.onFileChange}></input>
            </IonItem>

            <IonButton
              onClick={this.getUserLocation}
              expand="block"
              color="danger"
            >
              <IonIcon icon={location} slot="start" />
              Location
            </IonButton>

            <IonItemDivider></IonItemDivider>

            <IonButton type="submit" expand="block">
              Submit
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    )
  }
}

const mapStateToProps = (state) => ({
  districts: state.district.districts,
  categories: state.category.categories,
})

const mapDispatchToProps = {
  fetchCategories,
  fetchDistricts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Contribute)
