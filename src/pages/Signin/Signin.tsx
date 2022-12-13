import React from 'react';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonNavLink, IonPage, IonRouterOutlet, IonRow, IonSearchbar, IonTab, IonTabButton, IonText, IonTitle, IonToolbar } from '@ionic/react';

import '../../css/Welcome.css';
import { searchOutline, cartOutline, notificationsOutline } from 'ionicons/icons';

const Signin: React.FC = () => {
    return (
        <>
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>       
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="8" offset-sm="2"  size-md="3" offset-md="4.4">
                                    <IonCol className='flex'>
                                        <IonButtons>
                                            <IonBackButton defaultHref="welcome" />
                                        </IonButtons>
                                        <IonTitle><span className="header-title">Sign in</span></IonTitle>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonHeader>
                <IonContent scroll-y="false" >
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                <IonCol class="ion-text-center">
                                    <IonImg src='assets/images/imgsignin.png' alt='signin' className='imagez'></IonImg>
                                </IonCol>


                                <IonItem lines="none">
                                    <IonLabel class="ion-text-wrap ion-text-center">
                                        <h1 className='welcome-title'>Let's you in</h1>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonLabel class="ion-text-wrap ion-text-center">
                                        <IonButton fill="outline" className="btn-login">
                                            <IonImg src="/assets/images/logo-google.png" alt="Google Login"></IonImg>
                                            Continue with Google</IonButton>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCol>
                                        <IonImg src="/assets/images/or.png" alt="or" className="or"></IonImg>
                                    </IonCol>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonLabel class="ion-text-wrap ion-text-center">
                                        <IonButton fill="outline" className="btn-login email" routerLink="/signin/email">
                                            Signin with email
                                        </IonButton>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonLabel class="ion-text-wrap ion-text-center">
                                        <IonText className="text-default" ><span >Doesn’t have an account?</span>
                                            <IonButton fill="clear" className="txt-signup" routerLink="/signup">Sign up</IonButton>
                                        </IonText>
                                    </IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};
export default Signin;