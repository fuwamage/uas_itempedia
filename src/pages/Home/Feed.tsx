import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonicSlides, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';

import '../../css/Welcome.css';
import { cartOutline, close, notificationsOutline, searchOutline, time, timeOutline } from 'ionicons/icons';
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
import axios from 'axios';

/* Token */
import { getHeader } from '../../store';
import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { useHistory } from 'react-router';

const HomeFeed: React.FC = () => {

    const history = useHistory();

    const [accessToken, setAccessToken] = useState<string>('');
    const [authUser, setAuthUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    var [counter, setCounters] = useState(0);

    const navigateBasePage = useCallback(() =>
        history.push('/welcome'),
        [history]);

    const navigateCartPage = useCallback(() =>
        history.push('/home/cart'),
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

    const modalSearchbar = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    function confirm() {
        modalSearchbar.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            setMessage(`Hello, ${ev.detail.data}!`);
        }
    }



    const slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 6,

    };

    return (

        <><IonPage>
            <IonHeader>
                <IonToolbar color="primary-cust-2" className="toolbar-cust">
                    <IonGrid fixed={true}>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                <IonSearchbar id="open-modal-searchbar" color="light" class="searchbar" debounce={100} showClearButton="focus" searchIcon={searchOutline} animated={true} placeholder="Cari item kesukaan kamu"></IonSearchbar>
                            </IonCol>
                            <IonCol size='auto' onClick={() => navigateCartPage()}>
                                <IonBadge color="danger" className="badge-notif">17</IonBadge>
                                <IonIcon icon={cartOutline} className="icon-toolbar"></IonIcon>
                            </IonCol>
                            <IonCol size='auto'>
                                <IonBadge color="danger" className="badge-notif">99+</IonBadge>
                                <IonIcon icon={notificationsOutline} className="icon-toolbar">
                                </IonIcon>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>

            </IonHeader>
            <IonContent>
                <div color='primary-cust' className='toolbar-bottom' id='swiperhome'>
                    <Swiper className="feedslideradjsutment"
                        modules={[Pagination, Autoplay]}
                        autoplay={true}
                        pagination={true}
                        loop={true}
                        slidesPerView={1}
                    >
                        <SwiperSlide >
                            <IonItem lines="none" color="clear">
                                <IonCol>
                                    <IonImg src="assets/images/feedslide/slide1.png" alt="feedslide1" className="feedslider"></IonImg>
                                </IonCol>
                            </IonItem>
                        </SwiperSlide>
                        <SwiperSlide>
                            <IonItem lines="none" color="clear">
                                <IonCol>
                                    <IonImg src="assets/images/feedslide/slide2.png" alt="feedslide1" className="feedslider"></IonImg>
                                </IonCol>
                            </IonItem>
                        </SwiperSlide>
                        <SwiperSlide>
                            <IonItem lines="none" color="clear">
                                <IonCol>
                                    <IonImg src="assets/images/feedslide/slide3.png" alt="feedslide1" className="feedslider"></IonImg>
                                </IonCol>
                            </IonItem>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.5">
                            <div className='content'>
                                {allUsers.map(row => (
                                    <IonItem key={row['id']}>
                                        <p>{row['name']}</p>
                                    </IonItem>
                                ))}





                                {/* <IonButton onClick={getAllDataHandler}>Get All Data</IonButton> */}
                                {/* <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Card Title</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        Here's a small text description for the card content. Nothing more, nothing less.
                                    </IonCardContent>
                                </IonCard> */}




                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>




                {/* Modal Searchbar */}
                <IonModal className="full" ref={modalSearchbar} trigger="open-modal-searchbar" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar color="primary-cust-2" className="toolbar-cust">
                            <IonButtons slot="start" className="align-center" onClick={() => modalSearchbar.current?.dismiss()}>
                                <IonBackButton defaultHref="" disabled={true} class="back-button-searchbar" />
                            </IonButtons>
                            <IonGrid fixed={true}>
                                <IonRow>
                                    <IonCol >
                                        <IonSearchbar color="light" class="searchbar" debounce={100} showClearButton="focus" searchIcon={searchOutline} animated={true} placeholder="Cari item kesukaan kamu"></IonSearchbar>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.5" className='padding-unset'>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <IonText className='txt-tittle'>
                                                    Terakhir dicari
                                                </IonText>
                                            </IonCol>
                                            <IonCol className="right">
                                                <IonText className='txt-tittle delete'>
                                                    Hapus semua
                                                </IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                    <IonList>
                                        <IonItem lines='none'>
                                            <IonIcon slot="start" icon={timeOutline}></IonIcon>
                                            <IonText>Pokémon Yellow</IonText>
                                            <IonIcon slot="end" icon={close}></IonIcon>
                                        </IonItem>
                                        <IonItem lines='none'>
                                            <IonIcon slot="start" icon={timeOutline}></IonIcon>
                                            <IonText>Mega Man X</IonText>
                                            <IonIcon slot="end" icon={close}></IonIcon>
                                        </IonItem>
                                        <IonItem lines='none'>
                                            <IonIcon slot="start" icon={timeOutline}></IonIcon>
                                            <IonText>The Legend of Zelda</IonText>
                                            <IonIcon slot="end" icon={close}></IonIcon>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                                <IonCol size-sm="8" offset-sm="2" size-md="3" offset-md="4.5">
                                    <IonText className='txt-tittle'>
                                        Terakhir dilihat
                                    </IonText>
                                    <IonSlides pager={true} options={slideOpts}>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonItem lines="none" color="clear" className="imageframe">
                                                <IonImg src="assets/images/items/dummy1.png" alt="itemlast" className="itemlastseen"></IonImg>
                                            </IonItem>
                                        </IonSlide>
                                    </IonSlides>
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </IonContent>
                </IonModal>
                {/* End Modal Searchbar */}



            </IonContent>
        </IonPage>




        </>

    );
};
export default HomeFeed;