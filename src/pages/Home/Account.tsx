import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonicSlides, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';

import '../../css/Welcome.css';
import { cartOutline, close, notificationsOutline, searchOutline, time, timeOutline, wallet, walletOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';


/* Swiper Modules */
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


/* Modal Overlay Import */
import { OverlayEventDetail } from '@ionic/core/components';
import axios, { AxiosResponse } from 'axios';


/* Token */
import { getHeader } from '../../store';
import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { useHistory } from 'react-router';
import OpenMerchant from '../../components/Account/OpenMerchant';

const Accoount: React.FC = () => {

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
    interface Merchant {
        userID: number,
        merchantBio: string,
        merchantName: string,
        merchantID: string,
        updated_at: string
        created_at: string
    }

    const history = useHistory();

    const [accessToken, setAccessToken] = useState<string>('');
    const [authUser, setAuthUser] = useState<User>();
    const [authMerchant, setAuthMerchant] = useState<Merchant>();
    const [authMerchantStatus, setAuthMerchantStatus] = useState<Boolean>(false);
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

        await axios.get('/endpoint/api/user', { headers: getHeader(atob(JSON.parse(access_token))) }).then((response: any) => {
            if (response.status) {
                setAuthUser(response.data)
                console.log('sanctum user: ', response.data);
                setAccessToken(atob(JSON.parse(access_token)));

                axios.get('/endpoint/api/auth/user/get/merchant', { headers: getHeader(atob(JSON.parse(access_token))) }).then((response: any) => {
                    if (response.data.status) {
                        setAuthMerchant(response.data.data);
                        setAuthMerchantStatus(true);
                    }
                }).catch((error) => {
                    if (error.response.status == 401) {
                        navigateBasePage();
                    } else {
                        setAuthMerchantStatus(false);
                    }
                });
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

    const sqlStorageStoreSelectedSegment = async (tabName: String) => {
        const store = new Storage({
            name: 'db_users',
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await store.defineDriver(CordovaSQLiteDriver);
        await store.create();

        await store.set('transaction_selected_segment', tabName);
        await navigatePageTransaction();
    }

    const navigatePageTransaction = useCallback(() =>
        history.push('/home/account/transactionhistory'),
        [history]);

    const navigatePageTransactionMerchant = useCallback(() =>
        history.push('/home/account/transactionmerchant'),
        [history]);

    const moveToTransactionHistory = (dataTab: String) => {
        sqlStorageStoreSelectedSegment(dataTab);
    }

    const moveToTransactionMerchant = (dataTab: String) => {
        console.log("move to transaction merchant");
        sqlStorageStoreSelectedSegment(dataTab);
    }

    const logoutAccount = () => {
        axios.delete('/endpoint/api/auth/user/tokensdestroy', { headers: getHeader(accessToken) }).then((response: any) => {
            if (response.status) {
                axios.get('/endpoint/api/auth/user/signout', { headers: getHeader(accessToken) }).then((response: any) => {
                    if (response.status) {
                        alert("You have successfully logged out.");
                        navigateBasePage();
                    }
                }).catch((logResponseErrors));
            }
        }).catch((logResponseErrors));
    }

    const logResponseErrors = (error: any) => {
        if (axios.isCancel(error)) {
            console.log("Request cancelled");
        } else {
            if (error.response.status == 401) {
                navigateBasePage();
                alert(error.response);
            } else if (error.response.status == 404) {
                alert(error.response);
            } else {
                alert(error.response);
            }
        }
    }
    const goAddItem = () => {

        const formData: Object = {

        }
    }

    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    const setMerchantStatus = () => {
        setAuthMerchantStatus(true);
    }


    return (

        <><IonPage>
            <IonHeader>
                <IonToolbar color="primary-cust-2" className="toolbar-cust">
                    <IonGrid fixed={true}>
                        <IonRow>
                            <IonCol>
                                <IonTitle>Account</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>

            </IonHeader>
            <IonContent>
                <IonCard color="primary-cust-2">
                    <IonCardContent className="accountinfo">
                        <IonGrid fixed={true}>
                            <IonRow>
                                <IonCol class="flex">
                                    <IonCol size="auto">
                                        <IonAvatar className="ava-outline" >
                                            <img alt="Silhouette of a person's head" src="/assets/images/profilepicture/avatar.jpg" />
                                        </IonAvatar>
                                    </IonCol>
                                    <IonCol >
                                        <IonCol size="auto">
                                            <span className="account-greet">Hello, </span><span className="account-name">{authUser?.name}</span> <span onClick={logoutAccount}>Logout</span>
                                        </IonCol>
                                        <IonCol class="block" className="nopad subaccinfo" >
                                            <IonCol size="auto" className="nopad">
                                                <IonIcon icon={wallet} className="icon-toolbar"></IonIcon>
                                                <span className="balance-adjust">Rp. 50.000</span>                                              
                                            </IonCol>
                                        </IonCol>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCol class="block">
                                <IonText className='txt-tittle'>
                                    Riwayat Transaksi
                                </IonText>
                            </IonCol>
                            <IonCol class="block">
                                <IonText className='txt-tittle sub'>
                                    Pembelian
                                </IonText>
                            </IonCol>
                            <IonCol class="flex">
                                <IonCol className="cat-acc" onClick={() => moveToTransactionHistory('waitingpayment')}>
                                    <IonCol className="adjustment-cat-acc">
                                        <IonImg src='assets/images/cardpayment.png' alt='signup' className="icon-acc-frame"></IonImg>
                                    </IonCol>
                                    <IonText className='txt-default'>
                                        <span className="txt-cat-acc">Waiting for</span><span className="txt-cat-acc">Payment</span>
                                    </IonText>
                                </IonCol>
                                <IonCol className="cat-acc" onClick={() => moveToTransactionHistory('delivery')}>
                                    <IonCol className="adjustment-cat-acc">
                                        <IonImg src='assets/images/delivery.png' alt='signup' className="icon-acc-frame"></IonImg>
                                    </IonCol>
                                    <IonText className='txt-default'>
                                        <span className="txt-cat-acc">Waiting for</span><span className="txt-cat-acc">Delivery</span>
                                    </IonText>
                                </IonCol>
                                <IonCol className="cat-acc" onClick={() => moveToTransactionHistory('itemsent')}>
                                    <IonCol className="adjustment-cat-acc">
                                        <IonImg src='assets/images/itemsent.png' alt='signup' className="icon-acc-frame"></IonImg>
                                    </IonCol>
                                    <IonText className='txt-default'>
                                        <span className="txt-cat-acc">Item</span><span className="txt-cat-acc">Sent</span>
                                    </IonText>
                                </IonCol>
                                <IonCol className="cat-acc" onClick={() => moveToTransactionHistory('successfulltransaction')}>
                                    <IonCol className="adjustment-cat-acc">
                                        <IonImg src='assets/images/successtransaction.png' alt='signup' className="icon-acc-frame"></IonImg>
                                    </IonCol>
                                    <IonText className='txt-default'>
                                        <span className="txt-cat-acc">Successful</span><span className="txt-cat-acc">Transaction</span>
                                    </IonText>
                                </IonCol>
                            </IonCol>
                            {authMerchantStatus === false ? <OpenMerchant onMerchantRegistered={setMerchantStatus} /> : null}
                        </IonCol>

                        {authMerchantStatus === true ?
                            <IonCol>
                                <IonCol class="block">
                                    <IonText className='txt-tittle'>
                                        Merchant Management
                                    </IonText>
                                </IonCol>
                                <IonCol class="block">
                                    <IonText className='txt-tittle sub'>
                                        Transaksi Merchant
                                    </IonText>
                                </IonCol>
                                <IonCol class="flex">
                                    <IonCol className="cat-acc" onClick={() => moveToTransactionMerchant('incomingorder')}>
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/incomingorder.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Incoming</span><span className="txt-cat-acc">Order</span>
                                        </IonText>
                                    </IonCol>
                                    <IonCol className="cat-acc" onClick={() => moveToTransactionMerchant('waitinguserconfirmation')}>
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/waitinguserconfirmation.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Waiting user</span><span className="txt-cat-acc">Confirmation</span>
                                        </IonText>
                                    </IonCol>
                                    <IonCol className="cat-acc" onClick={() => moveToTransactionMerchant('canceledorder')}>
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/canceledorder.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Canceled</span><span className="txt-cat-acc">Order</span>
                                        </IonText>
                                    </IonCol>
                                    <IonCol className="cat-acc" onClick={() => moveToTransactionMerchant('outofstock')}>
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/outofstock.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Out of</span><span className="txt-cat-acc">Stock</span>
                                        </IonText>
                                    </IonCol>
                                </IonCol>
                                <IonCol class="block">
                                    <IonText className='txt-tittle sub'>
                                        Atur Merchant
                                    </IonText>
                                </IonCol>
                                <IonCol class="flex">
                                    <IonCol className="cat-acc" id="open-addItem-modal">
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/incomingorder.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Add</span><span className="txt-cat-acc">Item</span>
                                        </IonText>
                                    </IonCol>
                                    <IonCol className="cat-acc">
                                        <IonCol className="adjustment-cat-acc">
                                            <IonImg src='assets/images/waitinguserconfirmation.png' alt='signup' className="icon-acc-frame"></IonImg>
                                        </IonCol>
                                        <IonText className='txt-default'>
                                            <span className="txt-cat-acc">Edit</span><span className="txt-cat-acc">Item</span>
                                        </IonText>
                                    </IonCol>
                                </IonCol>

                                <IonCol class="flex">
                                    <IonButton>Snap Midtrans</IonButton>
                                </IonCol>

                            </IonCol>
                            : null}
                    </IonRow>
                </IonGrid>

            </IonContent>
            <IonModal id="open-addItem-mod" ref={modal}
                trigger="open-addItem-modal"
                initialBreakpoint={0.75}
                handleBehavior="cycle"
            >

                <IonContent className="ion-padding">
                    <div className="ion-margin-top">
                        <IonItem>
                            <IonLabel class="title" position="stacked">Nama Merchant</IonLabel>
                            <IonInput className="input-box" placeholder='Jaden Shop' ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel class="title" position="stacked">Merchant Bio's</IonLabel>
                            <IonInput className="input-box" placeholder='Pasti murah meriah' ></IonInput>
                        </IonItem>
                        <IonCol className='btn-center openmerch'>
                            <IonItem lines="none" >
                                <IonButton fill="outline" className="btn-login email" >
                                    Mulai Berjualan
                                </IonButton>
                            </IonItem>
                        </IonCol>

                    </div>
                </IonContent>
            </IonModal>
        </IonPage>






        </>

    );
};
export default Accoount;