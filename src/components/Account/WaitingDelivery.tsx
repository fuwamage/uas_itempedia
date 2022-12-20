import React from "react";
import { IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useLottie } from "lottie-react";
import astroAnimate from "../../Lottie/31631-astronautcopy.json";

const WaitingDelivery: React.FC = () => {
    const options = {
        animationData: astroAnimate,
        loop: true
    };

    const { View } = useLottie(options);
    return (
        <>
            <IonRow class="ion-text-center">
                <IonCol>
                    <IonCol className="lottie-frame">
                        {View}
                    </IonCol>
                    <IonCol class="block">
                        <IonText className='txt-tittle'>
                            Belum ada pesanan yang dikirim nih :(
                        </IonText>
                        <p>
                        <IonText className='txt-default'>
                            Yuk belanja terlebih dahulu untuk melengkapi <br></br>game favoritmu bersama itempedia!
                        </IonText>
                        </p>                       
                    </IonCol>
                </IonCol>
            </IonRow>
        </>

    );
};

export default WaitingDelivery;
