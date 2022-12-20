import React, { useCallback, useRef, useState } from "react";
import { IonRow, IonCol, IonButton, IonIcon, IonText, IonContent, IonLabel, IonModal, IonButtons, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useLottie } from "lottie-react";
import astroAnimate from "../../Lottie/122867-catch-the-fish.json";
import axios from "axios";
import { getHeader } from "../../store";
import { useHistory } from "react-router";

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const OpenMerchant: React.FC<{ onMerchantRegistered: () => void }> = props => {
    interface User {
        id: number,
        name: string,
        avatar: string,
        referral: string,
        referrer: string,
        email: string
        email_verified_at: string
        updated_at: string
        created_at: string
    }

    const options = {
        animationData: astroAnimate,
        loop: true
    };

    const { View } = useLottie(options);

    const history = useHistory();

    const [accessToken, setAccessToken] = useState<string>('');
    const [authUser, setAuthUser] = useState<User>();
    const [allUsers, setAllUsers] = useState([]);
    var [counter, setCounters] = useState(0);

    const [namaMerchant, setNamaMerchant] = useState<string>('');
    const [bioMerchant, setBioMerchant] = useState<string>('');
    const [currentStoredMerchant, setCurrentStoredMerchant] = useState<Object>({});

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

        await axios.get('https://itempedia.wrathnet.com/endpoint/api/user', { headers: getHeader(atob(JSON.parse(access_token))) }).then((response: any) => {
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


    const goOpenMerchant = () => {
        
        const formData: Object = {
            userID: authUser?.id,
            merchantName: namaMerchant,
            merchantBio: bioMerchant,
        }

        console.log(authUser)

        axios.post('https://itempedia.wrathnet.com/endpoint/api/auth/user/store/merchant', formData, { headers: getHeader(accessToken) }).then((response: any) => {
            if (response.status) {
                console.log('current stored merchant: ', response.data.data);
                setCurrentStoredMerchant(response.data.data)
                
                dismiss();
                props.onMerchantRegistered();
            }
        }).catch((error) => {
            if (error.response.status == 401) {
                dismiss();
                navigateBasePage();
            } else {
                alert(`Validation Error Occured. Check Console !!`);
                alert(Object.keys(error.response.data.message)[0] + " got a validation error !");
                dismiss();
            }
        });
    }

    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <>
            <IonRow class="ion-text-center">
                <IonCol>
                    <IonCol className="lottie-frame">
                        {View}
                    </IonCol>
                    <IonCol class="block">
                        <IonText className='txt-tittle'>
                            Ingin berjualan ? Daftar sebagai Merchant !
                        </IonText>
                        <div>
                            <IonButton id="open-merchant-modal" slot='end' className="btn-login referral">Buka Toko</IonButton>
                        </div>
                    </IonCol>
                </IonCol>
            </IonRow>

            <IonModal id="open-merchant-mod" ref={modal}
                trigger="open-merchant-modal"
                initialBreakpoint={0.35}

                handleBehavior="cycle"
            >

                <IonContent className="ion-padding">
                    <div className="ion-margin-top">
                        <IonItem>
                            <IonLabel class="title" position="stacked">Nama Merchant</IonLabel>
                            <IonInput className="input-box" placeholder='Jaden Shop' onIonInput={(e: any) => setNamaMerchant(e.target.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel class="title" position="stacked">Merchant Bio's</IonLabel>
                            <IonInput className="input-box" placeholder='Pasti murah meriah' onIonInput={(e: any) => setBioMerchant(e.target.value)}></IonInput>
                        </IonItem>
                        <IonCol className='btn-center openmerch'>
                            
                            <IonItem lines="none" >
                                <IonButton fill="outline" className="btn-login email" onClick={() => goOpenMerchant()}>
                                    Mulai Berjualan
                                </IonButton>
                            </IonItem>
                        </IonCol>

                    </div>
                </IonContent>
            </IonModal>
        </>

    );
};

export default OpenMerchant;
