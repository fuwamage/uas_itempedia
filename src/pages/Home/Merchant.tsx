import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonProgressBar, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonTab, IonText, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';

import '../../css/Welcome.css';
import { calculatorOutline, fileTrayOutline, mail, mailOpenSharp, mailOutline, star, storefrontOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';

import axios, { Axios, AxiosResponse } from 'axios';

import SignupContext from '../../data/signup-context';
import WaitingPayments from '../../components/Account/WaitingPayments';
import WaitingDelivery from '../../components/Account/WaitingDelivery';
import ItemSent from '../../components/Account/SucessfullTransaction';
import SuccessfullTransaction from '../../components/Account/SucessfullTransaction';

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { constants } from 'buffer';
import { getHeader } from '../../store';
import ShopInfo from '../../components/Account/ShopInfo';
import ShopContent from '../../components/Account/ShopContent';


const Merchant: React.FC = () => {

    const history = useHistory();

    const [accessToken, setAccessToken] = useState<string>('');
    const [authUser, setAuthUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    var [counter, setCounters] = useState(0);

    const navigateBasePage = useCallback(() =>
        history.push('/welcome'),
        [history]);

    const sqlStorage = async () => {
        const store = new Storage({
            name: 'db_users',
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await store.defineDriver(CordovaSQLiteDriver);
        await store.create();

        const access_token = await store.get('access_token');

        await axios.get('/endpoint/api/users').then((response: any) => {
            if (response.data.status) {
                setAllUsers(response.data.data);
                console.log('all users: ', response.data.data);
            }
        });

        await axios.get('/endpoint/api/user', { headers: getHeader(atob(JSON.parse(access_token))) }).then((response: any) => {
            if (response.status) {
                setAuthUser(response.data)
                console.log('sanctum user: ', response.data);
                setAccessToken(atob(JSON.parse(access_token)));
            }
        }).catch((error) => {
            if (error.response.status == 401) {
                navigateBasePage();
            } else {
                alert(error.response)
            }
        });
    }

    useIonViewDidEnter(() => {
        counter++;
        if (counter == 1) {
            sqlStorage();
        }
    });

    useIonViewDidLeave(() => {

    });

    useIonViewWillEnter(() => {

    });

    useIonViewWillLeave(() => {
        setCounters(counter = 0);
    });


    const [isAdding, setIsAdding] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const signupCtx = useContext(SignupContext);


    const signupAddHandler = (email: string, otpServer: string) => {
        signupCtx.addUserdata(email, otpServer);
        setIsAdding(false);
    };

    if (redirectToLogin == true) {

    }

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [alertsub, setAlertsub] = useState<string>('');
    const [selectedSegment, setSelectedSegment] = useState<string>('shopinfo');


    const validateEmail = (email: string) => {
        return email.match(
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        setEmail(value);

    };

    const navigatePage = useCallback(() =>
        history.push('/otp'),
        [history]);

    const navigatetologin = useCallback(() =>
        history.push('/home/account'),
        [history]);

    if (redirectToLogin == true) {
        navigatetologin();
        setError('');
        setRedirectToLogin(false);
    }

    const selectSegment = (tabs: any) => {
        setSelectedSegment(tabs);
        console.log(selectedSegment);
    };


    return (
        <>
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.4">
                                    <IonCol className='flex'>
                                        <IonButtons>
                                            <IonBackButton defaultHref="/home/account" />
                                        </IonButtons>
                                        <IonTitle><span className="header-title">Merchant</span></IonTitle>
                                    </IonCol>
                                    <IonSegment className="segementbutton" value={selectedSegment} scrollable={true} color="primary-cust-2">
                                        <IonSegmentButton value="shopinfo" onClick={() => selectSegment('shopinfo')}>
                                            <IonIcon icon={storefrontOutline} className="icon-toolbar"></IonIcon>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="shopcontent" onClick={() => selectSegment('shopcontent')}>
                                            <IonIcon icon={fileTrayOutline} className="icon-toolbar"></IonIcon>
                                        </IonSegmentButton>

                                    </IonSegment>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonToolbar>
                </IonHeader>
                <IonContent scroll-y="false">
                    <IonGrid className="nopad">
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3" >
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                            {selectedSegment == 'shopinfo' ? <ShopInfo /> : selectedSegment == 'shopcontent' ? <ShopContent />  : <div>please wait ...</div>}
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>

                            </IonCol>
                        </IonRow>
                    </IonGrid>


                </IonContent>

            </IonPage>
        </>
    );
};
export default Merchant;