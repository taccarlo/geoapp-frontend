import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import {
  mapOutline,
  location,
  arrowUpOutline,
  addCircleOutline,
} from 'ionicons/icons'

import Map from './pages/map/Map'
import Contribute from './pages/contribute/Contribute'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import TabButton from './components/UI/tabButton/TabButton'
import { fetchCategories, fetchDistricts } from './redux/actions'
import { connect } from 'react-redux'

const App = ({ fetchDistricts, fetchCategories }) => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/map" component={Map} />
            <Route path="/contribute" component={Contribute} />
            <Route exact path="/" render={() => <Redirect to="/map" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={mapOutline} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>

            <IonTabButton tab="districts">
              <TabButton
                label="Districts"
                icon={location}
                action={fetchDistricts}
              ></TabButton>
            </IonTabButton>

            <IonTabButton tab="categories">
              <TabButton
                label="Categories"
                icon={arrowUpOutline}
                action={fetchCategories}
              ></TabButton>
            </IonTabButton>

            <IonTabButton tab="contribute" href="/contribute">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Contribute</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  fetchDistricts,
  fetchCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
