import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonProgressBar, IonRouterOutlet, IonRow, IonTab, IonText, IonTitle, IonToolbar } from '@ionic/react';

import '../../css/Welcome.css';
import { calculatorOutline, mail, mailOpenSharp, mailOutline, star } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';

import axios, { Axios, AxiosResponse } from 'axios';

import SignupContext from '../../data/signup-context';

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


const Signup: React.FC = () => {
    const [dummyNameStorage, setDummyNameStorage] = useState<string>('');

    const sqlStorage = async () => {
        // http://github.com/ionic-team/ionic-storage
        const store = new Storage({
            name: 'db_users',
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await store.defineDriver(CordovaSQLiteDriver);
        await store.create();

        await store.set('name', 'Mr.Ionitron');
        const name = await store.get('name');
        setDummyNameStorage(name)
    }
    sqlStorage()

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
    const [loadingstatus, setLoadingstatus] = useState<boolean>(false);
    const [alertsub, setAlertsub] = useState<string>('');
    const [btnStatus, setBtnStatus] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        setEmail(value);
        setIsValid(undefined);
        if (value === '') {
            return;
        }
        if (validateEmail(value) !== null) {
            setIsValid(true)
            setBtnStatus(false);
        } else {
            setIsValid(false)
            setBtnStatus(true);
        }
    };

    const history = useHistory();
    const navigatePage = useCallback(() =>
        history.push('/otp'),
        [history]);

    const navigatetologin = useCallback(() =>
        history.push('/signin'),
        [history]);

    if (redirectToLogin == true) {
        navigatetologin();
        setError('');
        setRedirectToLogin(false);
    }




    const checkEmail = () => {
        const formData = { email: email };
        setLoadingstatus(true);
        setBtnStatus(true);
        axios.post('https://itempedia.wrathnet.com/endpoint/api/users/checkemail', formData)
            .then(response => {
                if (response.data.status) {
                    const otp = response.data.otp;
                    signupAddHandler(email, otp);
                    setLoadingstatus(false);
                    if (response.data.data === "error") {
                        if (response.data.message.email[0] == 'The email has already been taken.') {
                            response.data.message.email[0] = "Email sudah terdaftar";
                            setAlertsub("Lanjut masuk dengan email ini <br/>" + email + "?");
                        }
                        setError("" + response.data.message.email[0]);
                    } else {
                        const localUserData = {
                            uEmail: formData.email,
                            uOTP: response.data.otp
                        }

                        const mailPayload = {
                            email: formData.email,
                            otp: response.data.otp
                        }
                        window.localStorage.setItem('dataUser', JSON.stringify(localUserData))
                        navigatePage();
                        axios.post('https://itempedia.wrathnet.com/endpoint/api/sendOTP', mailPayload).then((res) => {
                            if (res.data.status) {
                                console.log('otp has been sent to your email')
                                window.localStorage.setItem('dataUser', JSON.stringify(localUserData))
                                navigatePage();
                            }
                        })
                    }
                }
            })
    };


    return (
        <>
            {error == "Email sudah terdaftar" && <IonAlert
                isOpen={!!error}
                header={error}
                message={"" + alertsub}
                buttons={[
                    {
                        text: 'Ubah',
                        role: 'cancel',
                        handler: setError
                    },
                    {
                        text: 'Ya, Masuk',
                        role: 'confirm',
                        handler: () => {
                            setRedirectToLogin(true);
                        }
                    }
                ]} />}
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.4">
                                    <IonCol className='flex'>
                                        <IonButtons>
                                            <IonBackButton defaultHref="signin" />
                                        </IonButtons>
                                        <IonTitle><span className="header-title">Sign up</span></IonTitle>
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
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3" >
                                <IonCol class="ion-text-center">
                                    <IonImg src='assets/images/imgsignup.png' alt='signup' className='imagez'></IonImg>
                                </IonCol>
                                <IonItem lines="none">
                                    <IonLabel class="ion-text-wrap ion-text-center">
                                        <IonButton fill="outline" className="btn-login">
                                            <IonImg src="/assets/images/logo-google.png" alt="Google Login"></IonImg>
                                            Signup with Google</IonButton>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCol>
                                        <IonImg src="/assets/images/or.png" alt="or" className="or"></IonImg>
                                    </IonCol>
                                </IonItem>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                            <IonItem lines="none" className='h30'>
                                                <IonLabel class="ion-text-wrap ion-text-start">
                                                    <IonText className='txt-tittle'>Enter a valid email address</IonText>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" >
                                                <IonLabel class="ion-text-wrap ion-text-start">
                                                    <IonText className='txt-default'>Harap menggunakan email yang valid, kode OTP akan dikirim untuk verifikasi Email.</IonText>
                                                </IonLabel>
                                            </IonItem>
                                            <IonIcon slot="start" icon={mailOpenSharp}></IonIcon>
                                            <IonItem fill="outline" className={`${'font-regular'} ${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'}`}>
                                                <IonInput type="email" placeholder={dummyNameStorage + '@wrathnet.com'} onIonInput={(e) => validate(e)}></IonInput>
                                                <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                                <IonNote slot="error">Email tidak valid</IonNote>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>

                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonFab slot="fixed" vertical="bottom" className="btn-center" >
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                    <IonCol className='btn-center'>
                                        <IonItem lines="none" >
                                            <IonButton fill="outline" id="btn-continue" disabled={btnStatus} className="btn-login email" onClick={checkEmail}>
                                                Continue
                                            </IonButton>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='btn-center'>
                                        <IonText className="text-default" ><span >Have an account?</span>
                                            <IonButton fill="clear" className="txt-signup" routerLink="/signin">Sign in</IonButton>
                                        </IonText>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonFab>

                </IonContent>

            </IonPage>
        </>
    );
};
export default Signup;