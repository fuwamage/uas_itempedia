import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

import '../../css/Welcome.css';
import { arrowForward, arrowBack, mail, mailOpenSharp } from 'ionicons/icons';

import OtpInput from '../../components/OtpInput';
import SignupContext from '../../data/signup-context';
import { useHistory } from 'react-router';

import axios from 'axios';

const Otp: React.FC = () => {
    const signupCtx = useContext(SignupContext);
    const [otp, setOtp] = useState('');
    const [minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(30);
    const [counterState, setCounterState] =  useState(true);
    
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                        setCounterState(false)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)

        return ()=> {
            clearInterval(myInterval);
        };
    });

    const onChange = (value: string, serverOTP: string) => {
        if (value !== serverOTP) {
            setBtnStatus(true);
            console.log("OTP Tidak Sama");
        }
        if (value == serverOTP) {
            setBtnStatus(false);
            console.log("OTP Sama");
        }
        setOtp(value);
    };

    const clearSignupContext = () => {
        signupCtx.removeUserdata();
        console.log('context signup cleared');
        history.push('/signup');
    };

    const resendOTP = () => {
        signupCtx.removeUserdata();

        const localData = JSON.parse(window.localStorage.getItem('dataUser') as any);
        const mailPayload = {
            email: localData.uEmail,
            otp: localData.uOTP
        }

        signupCtx.addUserdata(mailPayload.email, mailPayload.otp);

        axios.post('https://itempedia.wrathnet.com/endpoint/api/sendOTP', mailPayload).then((res) => {
            if (res.data.status) {
                alert('otp has been sent again to your email');
            }
        })
    };

    const [btnStatus, setBtnStatus] = useState<boolean>(true);


    const history = useHistory();
    const navigatePage = useCallback(() =>
        history.push('/complete'),
    [history]);
    
    
    return (
        <>
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.4">
                                    <IonCol className='flex'>
                                        <IonButtons onClick={clearSignupContext}>
                                            <IonIcon icon={arrowBack}></IonIcon>
                                        </IonButtons>
                                        <IonTitle>
                                            <span className="header-title">OTP</span>
                                        </IonTitle>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonHeader>
                <IonContent scroll-y="false">
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3" >
                                <IonCol class="ion-text-center">
                                    <IonImg src='assets/images/otpsignup.png' alt='signup' className='imagez'></IonImg>
                                </IonCol>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                            <IonItem lines="none" className='h30'>
                                                <IonLabel class="ion-text-wrap ion-text-start">
                                                    <IonText className='txt-tittle'>Masukkan kode OTP</IonText>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" >
                                                <IonLabel class="ion-text-wrap ion-text-start">
                                                    <IonText className='txt-default'>Silahkan cek inbox atau spam email kamu,
                                                        kami baru saja mengirim 6 digit kode OTP
                                                        ke <br /></IonText>
                                                    {signupCtx.userdata.map(row => (
                                                        <IonText key={row.id} className='txt-default' color="primary" >{row.email} {row.otpServer}</IonText>
                                                    ))}
                                                </IonLabel>
                                            </IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <OtpInput value={otp} valueLength={6} onChange={onChange} />
                                                </IonRow>
                                            </IonGrid>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonFab slot="fixed" vertical="bottom" className="btn-center" horizontal="start">
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                                <IonItem lines="none" >
                                                    <IonLabel class="ion-text-wrap ion-text-start">
                                                        <IonText className='txt-default'>{ minutes === 0 && seconds === 0 ? null : <span > {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span> } lagi untuk mengirim kode OTP</IonText>
                                                        <div><IonButton fill="clear" className="txt-signup txt-kirimulang" disabled={counterState} onClick={resendOTP}>Kirim Ulang</IonButton></div>
                                                    </IonLabel>
                                                    <IonFabButton disabled={btnStatus} className="otp" color="primary-cust" routerLink="/complete" size="small">
                                                        <IonIcon icon={arrowForward}></IonIcon>
                                                    </IonFabButton>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    );
};
export default Otp;