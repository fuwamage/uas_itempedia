import React from 'react';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonNavLink, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from '@ionic/react';

import '../../css/Welcome.css';
import { calendar, cart, home, homeOutline, informationCircle, mailOpen, mailOpenOutline, mailOutline, map, newspaper, newspaperOutline, paperPlane, person, personCircle, personOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Signin from '../Signin/Signin';
import HomeFeed from './Feed';
import Account from './Account';
import TransactionHistory from './TransactionHistory';
import Feed from './Feed';
import Cart from './Cart';
import Merchant from './Merchant';
import TransactionMerchant from './TransactionMerchant';
import TopUpSaldo from './TopUpSaldo';


const Home: React.FC = () => {
    return (
        <>
            <IonTabs>
                <IonRouterOutlet >
                    <Redirect exact path="/home" to="/home/feed" />
                    <Route exact path="/home/feed" component={Feed} />
                    <Route exact path="/home/cart" component={Cart} />
                    <Route exact path="/home/merchant" component={Merchant} />
                    <Route exact path="/home/account" component={Account} />
                    <Route exact path="/home/account/transactionhistory" component={TransactionHistory} />
                    <Route exact path="/home/account/transactionmerchant" component={TransactionMerchant} />
                    <Route exact path="/home/account/topupsaldo" component={TopUpSaldo} />
 
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/home/feed">
                        <IonIcon icon={homeOutline} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="transaction" href="/home/account/topupsaldo">
                        <IonIcon icon={newspaperOutline} />
                        <IonLabel>Top-up Saldo</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="messages" href="/home/feed">
                        <IonIcon icon={mailOutline} />
                        <IonLabel>Message</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="account" href="/home/account">
                        <IonIcon icon={personOutline} />
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>

    );
};
export default Home;