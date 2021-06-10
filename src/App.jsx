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
import { mapOutline, home, list } from 'ionicons/icons'

import Map from './pages/map/Map'
import Districts from './pages/district/Districts'
import Category from './pages/category/Category'

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

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/categories" component={Category} />
            <Route path="/districts" component={Districts} />
            <Route path="/map" component={Map} />
            <Route exact path="/" render={() => <Redirect to="/map" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={mapOutline} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="districts" href="/districts">
              <IonIcon icon={home} />
              <IonLabel>Districts</IonLabel>
            </IonTabButton>
            <IonTabButton tab="categories" href="/categories">
              <IonIcon icon={list} />
              <IonLabel>Categories</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
