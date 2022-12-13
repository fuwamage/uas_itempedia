import React from 'react';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonNavLink, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from '@ionic/react';

import '../../css/Welcome.css';
import { calendar, home, homeOutline, informationCircle, mailOpen, mailOpenOutline, mailOutline, map, newspaper, newspaperOutline, paperPlane, person, personCircle, personOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Signin from '../Signin/Signin';
import HomeFeed from './HomeFeed';




const Home: React.FC = () => {
    return (
        <>
            <IonTabs>
                <IonRouterOutlet >
                    <Redirect exact path="/home" to="/home/feed" />
                    <Route exact path="/home/feed" component={HomeFeed} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/home/feed">
                        <IonIcon icon={homeOutline} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="transaction" href="/home/feed">
                        <IonIcon icon={newspaperOutline} />
                        <IonLabel>Transaction</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="messages" href="/home/feed">
                        <IonIcon icon={mailOutline} />
                        <IonLabel>Message</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="account" href="/home/feed">
                        <IonIcon icon={personOutline} />
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>

    );
};
export default Home;