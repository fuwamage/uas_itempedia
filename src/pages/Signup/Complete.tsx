import React, { useContext, useRef, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

import '../../css/Welcome.css';
import { arrowForward, eye, mail, mailOpenSharp } from 'ionicons/icons';
import axios, { Axios, AxiosResponse } from 'axios';
import { Redirect, Route, useHistory } from 'react-router';

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import SignUpContext from '../../data/signup-context';

const Complete: React.FC = () => {

    const history = useHistory();

    const email = useRef<HTMLIonInputElement>(null);
    const [present] = useIonToast();

    const [namaLengkap, setNamaLengkap] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [referrer, setReferrer] = useState<string>('');

    const signupCtx = useContext(SignUpContext);


    const goSignUp = () => {
        const localStorage: any = window.localStorage.getItem('dataUser');
        const localData: any = JSON.parse(localStorage);
        
        const formData: any = {
            name: namaLengkap,
            email: localData.uEmail,
            password: password,
            repassword: rePassword,
            referrer: referrer
        }

        console.log('payload: ', formData)
        
        axios.post('/endpoint/api/users/signup', formData).then(response => {
            if (response.data.status) {
                history.push('/home');
                alert('signup success: ' + response.data.message)
                console.log('auth: ', response.data.data)

                const authData = {
                    name: response.data.data.user.name,
                    email: response.data.data.user.email,
                    access_token: btoa(response.data.data.access_token)
                }
                window.localStorage.setItem('dataUser', JSON.stringify(authData))

                const sqlStorage = async () => {
                    const store = new Storage({
                        name: 'db_users',
                        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
                    });
                    await store.defineDriver(CordovaSQLiteDriver);        
                    await store.create();
                    
                    await store.set('access_token', JSON.stringify(authData.access_token));
                    const access_token = await store.get('access_token');
                    console.log("sqlite access_token via sign up: ", access_token)
                }
                sqlStorage()
            }
        }).catch((error) => {
            if(error.response.status === 403) {
                alert('error 403 on completing signup: CHECK CONSOLE !!')
                console.log('error validation: ', error.response.data.message)
            } else if(error.response.status === 406) {
                alert('error 406 on completing signup: CHECK CONSOLE !!')
                console.log('error validation: ', error.response.data.message)
            } else {
                alert('unknown error on completing signup')
            }      
        })
    }

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        axios.get('/api/users/checkreferral/' + referrer).then(response => {
            if (response.data.status) {
                present({
                    message: 'This referral code belongs to ' + response.data.data.name,
                    duration: 1500,
                    position: position
                });
            }
        }).catch((error) => {
            if(error.response.status === 403) {
                present({
                    message: error.response.data.message,
                    duration: 1500,
                    position: position
                });
            } else {
                present({
                    message: 'Unknown Errors Detected ...',
                    duration: 1500,
                    position: position
                });
            }      
        })       
    };

    return (
        <>
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.4">
                                    <IonTitle><span className="header-title">Lengkapi Data Akunmu</span></IonTitle>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonToolbar>
                </IonHeader>
                <IonContent scroll-y="false">
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.5">
                                <IonItem>
                                    <IonLabel class="title" position="stacked">Nama Lengkap</IonLabel>
                                    <IonInput className="input-box" placeholder='Fuwamage将夜' onIonInput={(e: any) => setNamaLengkap(e.target.value)}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel class="title" position="stacked">Buat Password</IonLabel>
                                    <IonInput type="password" className="input-box" placeholder='********' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
                                    <IonIcon slot="end" className="icon password" icon={eye}></IonIcon>
                                </IonItem>
                                <IonItem>
                                    <IonLabel class="title" position="stacked">Ulangi Password</IonLabel>
                                    <IonInput type="password" className="input-box" placeholder='********' onIonInput={(e: any) => setRePassword(e.target.value)}></IonInput>
                                    <IonIcon slot="end" className="icon password" icon={eye}></IonIcon>
                                </IonItem>
                                <IonItem >
                                    <IonLabel class="" position="stacked">Kode Referral (Opsional)</IonLabel>
                                    <IonInput className="input-box" placeholder='FA3ECQ' onIonInput={(e: any) => setReferrer(e.target.value)}></IonInput>
                                    <IonButton slot='end' className="btn-login referral" onClick={() => presentToast('middle')}>Gunakan</IonButton>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonFab slot="fixed" vertical="bottom" className="btn-center" >
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                    <IonCol className='btn-center'>
                                        <IonItem lines="none" >
                                            <IonButton fill="outline" className="btn-login email " onClick={() => goSignUp()}>
                                                Continue
                                            </IonButton>
                                        </IonItem>
                                    </IonCol>                                 

                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonFab>
                    {/* <IonFab slot="fixed" vertical="bottom" className="btn-center" >
                        <IonItem lines="none">
                            <IonButton fill="outline" className="btn-login email" routerLink='/home'>
                                Continue
                            </IonButton>
                        </IonItem>
                    </IonFab> */}
                </IonContent>
            </IonPage>
        </>
    );
};
export default Complete;