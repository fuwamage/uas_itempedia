import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { IonAlert, IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonFab, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonProgressBar, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonTab, IonText, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';

import '../../css/Welcome.css';
import { calculatorOutline, mail, mailOpenSharp, mailOutline, star, trashBinOutline, trashOutline } from 'ionicons/icons';
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

import { Helmet } from "react-helmet";

import { MidtransClient } from 'midtrans-node-client'

declare const window: any;

const TopUpSaldo: React.FC = () => {

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
        const transaction_selected_segment = await store.get('transaction_selected_segment');
        setSelectedSegment(transaction_selected_segment);

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
    const [amount, setAmount] = useState<number>();
    const [selectedSegment, setSelectedSegment] = useState<string>('');


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

    const snapGo = () => {
        
        const parameter = {
            amount: amount
        };        
        
        axios.post("/endpoint/api/auth/user/topup/midtrans", parameter, { headers: getHeader(accessToken) }).then((response) => {
            if (response.data.status) {
                const token_midtrans = response.data.data
                console.log('asd: ', token_midtrans)
                window.snap.pay(token_midtrans, {
                    onSuccess: function(result: any){console.log('success');console.log(result);},
                    onPending: function(result: any){console.log('pending');console.log(result);},
                    onError: function(result: any){console.log('error');console.log(result);},
                    onClose: function(){console.log('customer closed the popup without finishing the payment');}
                })
            }
        }).catch(logResponseErrors);
    }

    const logResponseErrors = (error: any) => {
        if (error.response.status == 401) {
            navigateBasePage();
            alert(error.response);
        } else if (error.response.status == 404) {
            alert(error.response);
        } else {
            alert(error.response);
        }
    }


    return (
        <>
            <IonPage>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Top Up</title>
                    <script type="text/javascript" src="https://app.midtrans.com/snap/snap.js" data-client-key="Mid-client-e0BAu1YYpVOHO0WK"></script>
                </Helmet>         
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.4">
                                    <IonCol className='flex'>
                                        <IonButtons>
                                            <IonBackButton defaultHref="/home/feed" />
                                        </IonButtons>
                                        <IonTitle><span className="header-title">Top-up saldo itempedia</span></IonTitle>
                                    </IonCol>

                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonToolbar>
                </IonHeader>
                <IonContent scroll-y="true">
                    <IonGrid className="nopad">
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3" >

                                <IonCol>
                                    <IonCol class="block">
                                        <IonText className='txt-tittle'>
                                            Mau top-up berapa?
                                        </IonText>
                                        <IonItem fill="outline" className='font-regular top-up-box'>
                                            <IonInput clearInput={true} type="number" placeholder="" value={amount?.toLocaleString()} onIonInput={(e: any) => setAmount(e.target.value)}></IonInput>
                                            <IonLabel slot='start' class="rp-label">Rp. </IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol class="block">
                                        <IonText className='txt-tittle sub'>
                                            Nominal
                                        </IonText>
                                    </IonCol>
                                    <IonCol >
                                        <IonButton fill="outline" className="saldo-option" onClick={() => setAmount(10000)}>10rb</IonButton>
                                        <IonButton fill="outline" className="saldo-option" onClick={() => setAmount(50000)}>50rb</IonButton>
                                        <IonButton fill="outline" className="saldo-option" onClick={() => setAmount(500000)}>500rb</IonButton>
                                        <IonButton fill="outline" className="saldo-option" onClick={() => setAmount(750000)}>750rb</IonButton>
                                    </IonCol>

                                </IonCol>
                            </IonCol>
                        </IonRow>
                    </IonGrid>


                </IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonTitle>
                            <div className="flex">
                                <div>
                                    <IonCol class="block nopad" >
                                        <IonText className="tharga">Total Harga</IonText>
                                    </IonCol>
                                    <IonText className="thargap">Rp. {amount?.toLocaleString()}</IonText>

                                </div>
                                <IonCol class="ion-text-end">
                                    <IonButton className="cart-buy-btn" onClick={() => snapGo()}>Top-up</IonButton>
                                </IonCol>
                            </div>
                        </IonTitle>
                    </IonToolbar>
                </IonFooter>

            </IonPage>
        </>
    );
};
export default TopUpSaldo;