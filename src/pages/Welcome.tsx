import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';


/* Swiper Modules */
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/zoom';
import '../css/Welcome.css';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

/* Token */
import { getHeader } from '../store';
import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


const Welcome: React.FC = () => {

    const history = useHistory();
    
    const [accessToken, setAccessToken] = useState<string>('');
    const [authUser, setAuthUsers] = useState([]);
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

        await axios.get('/endpoint/api/user', {headers: getHeader(atob(JSON.parse(access_token)))}).then((response: any) => {
            if(response.status) {
                setAuthUsers(response.data.data);
                console.log('sanctum user: ', authUser);
                setAccessToken(atob(JSON.parse(access_token)));
                history.push('/home');
            }
        }).catch((error) => {
            if(error.response.status == 401) {
                navigateBasePage();
            } else {
                alert(error.response)
            }      
        });
    }

    useEffect(() => {
        counter++;
        if (counter == 1) {
            sqlStorage();            
        }
    }, []);

    return (
        <>
            <IonPage>
                <IonContent scroll-y="false">
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                <Swiper
                                    modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
                                    pagination={true}
                                >
                                    <SwiperSlide>
                                        <div className="container wrapper">
                                            <div className="container content">
                                                <img src="assets/images/slide1.png" alt="" />
                                            </div>

                                            <div className="container">
                                                <div className="welcome-title">
                                                    <h1>Beli item game termurah! test 33</h1>
                                                </div>
                                                <div className="desc-title">
                                                    <p>Beli banyak dengan harga termurah,
                                                        Bebas pilih sesukamu!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="container">
                                            <div className="container content">
                                                <img src="assets/images/slide2.png" alt="" />
                                            </div>
                                            <div className="container">
                                                <div className="welcome-title">
                                                    <h1>Bayar pake apa aja</h1>
                                                </div>
                                                <div className="desc-title">
                                                    <p>Semakin banyak pilihan metode pembayaran buat kamu.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="container">
                                            <div className="container content">
                                                <img src="assets/images/slide3.png" alt="" />
                                            </div>
                                            <div className="container">
                                                <div className="welcome-title">
                                                    <h1>Biaya admin termurah</h1>
                                                </div>
                                                <div className="desc-title">
                                                    <p>Hanya untuk kamu, biaya platform termurah dari yang lain!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="container">
                                            <div className="container content">
                                                <img src="assets/images/slide4.png" alt="" />
                                            </div>
                                            <div className="container">
                                                <div className="welcome-title">
                                                    <h1>Ready to begin?</h1>
                                                </div>

                                                <div className="desc-title" >
                                                    <IonButton routerLink="/signin" fill="clear">
                                                        <p className="but-icon">CONTINUE<IonIcon className="icon" slot="start" icon={arrowForwardOutline}></IonIcon></p>
                                                    </IonButton>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
};

export default Welcome;

