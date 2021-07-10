import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLoading,
  useIonToast,
} from '@ionic/react'
import { checkmarkSharp, closeOutline } from 'ionicons/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import strapi from '../../api/strapi'
import { usePhotoGallery } from '../../hooks/usePhotoGallery'

import { fetchCategories, fetchDistricts } from '../../redux/actions'
import InputField from '../../components/contribute/InputField'
import SelectField from '../../components/contribute/SelectField'
import GetLocation from '../../components/contribute/GetLocation'
import ImageField from '../../components/contribute/ImageField'

const Contribute = ({
  fetchDistricts,
  districtsLoading,
  districtsFailed,
  fetchCategories,
  categoriesLoading,
  categoriesFailed,
  districts,
  categories,
}) => {
  const { photos, takePhoto, removePhoto } = usePhotoGallery()
  const [loading, setLoading] = useState(false)
  const [present, dismiss] = useIonToast()

  const formik = useFormik({
    initialValues: {
      denominazione: '',
      indirizzo: '',
      civico: '',
      email: '',
      telefono: '',
      sito: '',
      orario: '',
      descrizizone: '',
      category: '',
      district: '',
      lat: '',
      lng: '',
    },
    validationSchema: Yup.object({
      denominazione: Yup.string().required(),
      indirizzo: Yup.string().required(),
      civico: Yup.string().required(),
      email: Yup.string().email(),
      telefono: Yup.number(),
      sito: Yup.string().url(),
      orario: Yup.string(),
      descrizizone: Yup.string(),
      district: Yup.number().required(),
      category: Yup.number().required(),
      lat: Yup.number().required(),
      lng: Yup.number().required(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Add Location
        const res = await strapi.post('/locations', values)
        // Upload image for it
        const fd = new FormData()
        fd.append(
          'files',
          await blobFromPath(photos[0].webviewPath),
          photos[0].filepath
        )
        fd.append('ref', 'location')
        fd.append('refId', res.data.id)
        fd.append('field', 'cover')
        const uploadRes = await strapi.post('/upload', fd)
        console.log('uploadRes :>> ', uploadRes)
        setLoading(false)

        present({
          buttons: [{ icon: closeOutline, handler: () => dismiss() }],
          message: 'Your request has been submitted',
          color: 'success',
          duration: 5000,
        })
        setSubmitting(false)
        resetForm()
      } catch (error) {
        setLoading(false)
        present({
          buttons: [{ icon: closeOutline, handler: () => dismiss() }],
          message: error.message,
          color: 'danger',
          duration: 5000,
        })
      }
    },
  })

  useEffect(() => {
    fetchCategories()
    fetchDistricts()
  }, [fetchCategories, fetchDistricts])

  const blobFromPath = async path => {
    const response = await fetch(path)
    return await response.blob()
  }

  const onGetLocation = (lat, lng) => {
    formik.setFieldValue('lat', lat)
    formik.setFieldValue('lng', lng)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contribute</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageField
            photos={photos}
            takePhoto={takePhoto}
            removePhoto={removePhoto}
          />

          <InputField
            label="Denominazione"
            id="denominazione"
            name="denominazione"
            type="text"
            value={formik.values.denominazione}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.denominazione && formik.errors.denominazione}
          />

          <InputField
            label="Indirizzo"
            id="indirizzo"
            name="indirizzo"
            type="text"
            value={formik.values.indirizzo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.indirizzo && formik.errors.indirizzo}
          />

          <InputField
            label="Civico"
            id="civico"
            name="civico"
            type="text"
            value={formik.values.civico}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.civico && formik.errors.civico}
          />

          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <InputField
            label="Telefono"
            id="telefono"
            name="telefono"
            type="number"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telefono && formik.errors.telefono}
          />

          <InputField
            label="Sito"
            id="sito"
            name="sito"
            type="url"
            value={formik.values.sito}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sito && formik.errors.sito}
          />

          <InputField
            label="Orario"
            id="orario"
            name="orario"
            type="text"
            value={formik.values.orario}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.orario && formik.errors.orario}
          />

          <InputField
            label="Descrizizone"
            id="descrizizone"
            name="descrizizone"
            type="text"
            value={formik.values.descrizizone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.descrizizone && formik.errors.descrizizone}
          />

          <SelectField
            label="District"
            id="district"
            name="district"
            value={formik.values.district}
            entities={districts}
            onChange={formik.handleChange}
            error={formik.touched.district && formik.errors.district}
            loading={districtsLoading}
            failedToFetch={districtsFailed}
          />

          <SelectField
            label="Category"
            id="category"
            name="category"
            value={formik.values.category}
            entities={categories}
            onChange={formik.handleChange}
            error={formik.touched.category && formik.errors.category}
            loading={categoriesLoading}
            failedToFetch={categoriesFailed}
          />

          <GetLocation
            lat={formik.values.lat}
            lng={formik.values.lng}
            onClick={(lat, lng) => onGetLocation(lat, lng)}
            error={formik.touched.lat && formik.errors.lat} // TODO Fix this split lat lng into two fields
          />

          <IonGrid>
            <IonRow class="ion-justify-content-end">
              <IonCol size="auto">
                <IonButton color="primary" type="submit">
                  <IonIcon icon={checkmarkSharp} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          message={'Please wait...'}
        />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = state => ({
  districts: Object.values(state.district.districts),
  districtsLoading: state.district.loading,
  districtsFailed: state.district.error,
  categories: Object.values(state.category.categories),
  categoriesLoading: state.category.loading,
  categoriesFailed: state.category.error,
})

const mapDispatchToProps = {
  fetchCategories,
  fetchDistricts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Contribute)
