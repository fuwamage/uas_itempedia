import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Welcome from './pages/Welcome';
import Signin from './pages/Signin/Signin';
import SigninEmail from './pages/Signin/SigninEmail';
import Signup from './pages/Signup/Signup';
import Otp from './pages/Signup/Otp';
import Complete from './pages/Signup/Complete';
import Home from './pages/Home/Home';
import SignupContextProvider from './data/SignupContextProvider';

import axios from 'axios';

setupIonicReact();

const App: React.FC = () => {  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>          
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signin/email" component={SigninEmail} />
          <SignupContextProvider>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/otp" component={Otp} />
            <Route exact path="/complete" component={Complete} />
          </SignupContextProvider>
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/welcome" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
export default App;

