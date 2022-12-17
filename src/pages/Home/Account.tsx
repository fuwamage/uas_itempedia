import React, { useEffect, useRef, useState } from 'react';
import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonicSlides, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToolbar } from '@ionic/react';

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

const Accoount: React.FC = () => {

    /* Buat nampilin hasil fetch */
    // const [data, setData] = useState<AxiosResponse>();
    // const url = "https://dev.wrathnet.com/api/patch_note";
    // const [students, setStudents] = useState<Array<AxiosResponse>>([]);

    // useEffect(() => {
    //     axios.get(url).then((response) => {
    //         setData(response);
    //         console.log(data);
    //     });
    // }, []);

    const [data, setData] = useState<AxiosResponse>();
    const URL = "https://api-itempedia.vercel.app/endpoint/api/users";
    const [students, setStudents] = useState([]);
    var [counter, setCounters] = useState(0);

    useEffect(() => {
        counter++;
        if (counter == 1) {
            axios.get(URL).then((response: any) => {
                if (response.data.status) {
                    setStudents(response.data.data);
                    console.log('all users: ', response.data.data);
                }
            });

            axios.get('https://api-itempedia.vercel.app/endpoint/api/user', { headers: getHeader() }).then((response: any) => {
                if (response.status) {
                    console.log('sanctum user: ', response.data);
                }
            });
        }
    }, []);

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
                                        <IonAvatar className="ava-outline">
                                            <img alt="Silhouette of a person's head" src="http://192.168.100.65:8100/assets/images/profilepicture/avatar.jpg" />
                                        </IonAvatar>
                                    </IonCol>
                                    <IonCol >
                                        <IonCol size="auto">
                                            <span className="account-greet">Hello, </span><span className="account-name">Fuwamage将夜</span>
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
                                    Pembeli
                                </IonText>
                            </IonCol>
                            <IonCol>
                                <IonCol>
                                    <IonImg src='assets/images/cardpayment.png' alt='signup' className=''></IonImg>
                                    <IonText className='txt-default'>
                                        Waiting for Payment
                                    </IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText className='txt-default'>
                                        Waiting for Delivery
                                    </IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText className='txt-default'>
                                        Item Sent
                                    </IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText className='txt-default'>
                                        Successful Transaction
                                    </IonText>
                                </IonCol>
                            </IonCol>


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
export default Accoount;