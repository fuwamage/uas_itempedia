import React, { useRef, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonProgressBar, IonRow, IonText, IonTitle, IonToolbar, useIonToast, isPlatform, getPlatforms } from '@ionic/react';

import '../../css/Welcome.css';
import { arrowForward, eye, mail, mailOpenSharp } from 'ionicons/icons';
import axios, { Axios, AxiosResponse } from 'axios';
import { Redirect, Route, useHistory } from 'react-router';

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const SigninEmail: React.FC = () => {
    const [dummyNameStorage, setDummyNameStorage] = useState<string>('');
    
    const sqlStorage = async () => {
        const store = new Storage({
            name: 'db_users',
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await store.defineDriver(CordovaSQLiteDriver);
        
        await store.create();
        const name = await store.get('name');
        setDummyNameStorage(name)
    }
    sqlStorage()

    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loadingstatus, setLoadingstatus] = useState<boolean>(false);
    
    const goSigninEmail = () => {
        setLoadingstatus(true);
        const formData: any = {
            email: email,
            password: password
        }

        axios.post('https://api-itempedia.vercel.app/endpoint/api/users/signin', formData).then(response => {
            if (response.data.status) {
                history.push('/home');
                alert('sigin success: ' + response.data.message)
                console.log('auth: ', response.data.data)
                setLoadingstatus(false);

                const authData = {
                    name: response.data.data.name,
                    email: response.data.data.email,
                    access_token: btoa(response.data.access_token)
                }
                window.localStorage.setItem('dataUser', JSON.stringify(authData))
            }
        }).catch((error) => {
            setLoadingstatus(false);
            if(error.response.status === 401) {
                alert('error 401 on completing signin: CHECK CONSOLE !!')
                console.log('error validation: ', error.response.data.message)
            } else {
                alert('unknown error on completing signin')
            }      
        })
    }

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
                                            <IonBackButton defaultHref="/signin" />
                                        </IonButtons>
                                        <IonTitle><span className="header-title">Sign in</span></IonTitle>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        {loadingstatus === true && <IonProgressBar color="primary-cust" type="indeterminate"></IonProgressBar>}
                    </IonToolbar>                    
                </IonHeader>
                <IonContent scroll-y="false">
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.5">
                                <IonCol class="ion-text-center">
                                    <IonImg src='assets/images/imgsignin.png' alt='signin' className='imagez'></IonImg>
                                </IonCol>
                                <IonItem>
                                    <IonLabel class="title" position="stacked">Email</IonLabel>
                                    <IonInput className="input-box" placeholder={dummyNameStorage + '@wrathnet.com'} onIonInput={(e: any) => setEmail(e.target.value)}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel class="title" position="stacked">Password</IonLabel>
                                    <IonInput type="password" className="input-box" placeholder='********' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
                                    <IonIcon slot="end" className="icon password" icon={eye}></IonIcon>
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
                                            <IonButton fill="outline" className="btn-login email" onClick={() => goSigninEmail()}>
                                                Signin
                                            </IonButton>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol className='btn-center'>
                                        <IonItem lines="none">
                                            <IonLabel class="ion-text-wrap ion-text-center">
                                                <IonText className="text-default" ><span >Doesn’t have an account?</span>
                                                    <IonButton fill="clear" className="txt-signup" routerLink="/signup">Sign up</IonButton>
                                                </IonText>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    );
}

export default SigninEmail;