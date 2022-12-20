import React from "react";
import { IonRow, IonCol, IonButton, IonIcon, IonText, IonCardContent, IonGrid, IonAvatar, IonCard, IonItem } from '@ionic/react';
import { calculatorOutline, refreshOutline, wallet } from 'ionicons/icons';
import { useLottie } from "lottie-react";
import astroAnimate from "../../Lottie/31631-astronautcopy.json";

const WaitingPayments: React.FC = () => {
    const options = {
        animationData: astroAnimate,
        loop: true
    };

    const { View } = useLottie(options);
    return (
        <>
            <IonRow class="ion-text-center">
                {/* <IonCol>
                    <IonCol className="lottie-frame">
                        {View}
                    </IonCol>
                    <IonCol class="block">
                        <IonText className='txt-tittle'>
                            Belum ada tagihan yang masuk nih :(
                        </IonText>
                        <p>
                        <IonText className='txt-default'>
                            Yuk belanja terlebih dahulu untuk melengkapi <br></br>game favoritmu bersama itempedia!
                        </IonText>
                        </p>                       
                    </IonCol>
                </IonCol> */}
                <IonCard>
                    <IonCardContent className="itemtransaction">
                        <IonGrid fixed={true}>
                            <IonRow>
                                <div style={{ width: "100%" }}>
                                    <IonCol class="flex">
                                        <IonCol size="auto">
                                            <IonAvatar className="itemicon" >
                                                <img alt="Item Icon" src="/assets/images/items/itemexample.jpg" />
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol size="auto" className="nopad">
                                                <span className="itemname">Crux of Perplex </span><span className="">x1 (Item Trade)</span>
                                            </IonCol>
                                            <IonCol class="block" className="nopad subiteminfo" >
                                                <IonCol size="auto" className="nopad">
                                                    <span style={{}}>Harga </span> <span className="price">Rp. 300.000</span>
                                                </IonCol>
                                            </IonCol>
                                        </IonCol>
                                    </IonCol>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <IonCol class="flex">
                                        <IonCol size="auto">
                                            <IonAvatar className="itemicon" >
                                                <img alt="Item Icon" src="/assets/images/items/itemexample.jpg" />
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol size="auto" className="nopad">
                                                <span className="itemname">Crux of Perplex </span><span className="">x1 (Item Trade)</span>
                                            </IonCol>
                                            <IonCol class="block" className="nopad subiteminfo" >
                                                <IonCol size="auto" className="nopad">
                                                    <span style={{}}>Harga </span> <span className="price">Rp. 300.000</span>
                                                </IonCol>
                                            </IonCol>
                                        </IonCol>
                                    </IonCol>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <IonCol class="flex">
                                        <IonCol size="auto">
                                            <IonAvatar className="itemicon" >
                                                <img alt="Item Icon" src="/assets/images/items/itemexample.jpg" />
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol size="auto" className="nopad">
                                                <span className="itemname">Crux of Perplex </span><span className="">x1 (Item Trade)</span>
                                            </IonCol>
                                            <IonCol class="block" className="nopad subiteminfo" >
                                                <IonCol size="auto" className="nopad">
                                                    <span style={{}}>Harga </span> <span className="price">Rp. 300.000</span>
                                                </IonCol>
                                            </IonCol>
                                        </IonCol>
                                    </IonCol>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <IonCol class="flex">
                                        <IonCol size="auto">
                                            <IonAvatar className="itemicon" >
                                                <img alt="Item Icon" src="/assets/images/items/itemexample.jpg" />
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol size="auto" className="nopad">
                                                <span className="itemname">Crux of Perplex </span><span className="">x1 (Item Trade)</span>
                                            </IonCol>
                                            <IonCol class="block" className="nopad subiteminfo" >
                                                <IonCol size="auto" className="nopad">
                                                    <span style={{}}>Harga </span> <span className="price">Rp. 300.000</span>
                                                </IonCol>
                                            </IonCol>
                                        </IonCol>
                                    </IonCol>
                                </div>
                            </IonRow>
                            <div className="subinfotransaction">
                                <IonCol class="ion-text-start">
                                    <span style={{}}>Lakukan pembayaran sebelum </span> <span className="price">00:00:00</span>
                                </IonCol>
                            </div>
                        </IonGrid>
                    </IonCardContent>
                    <div className="subinfotransaction payment">
                        <IonCol class="ion-text-start">
                            <span style={{}}>Total Harga </span> <span className="price">Rp. 1.200.000</span>
                        </IonCol>
                        <IonCol class="ion-text-start">
                            <span style={{}}>Total Harga </span> <span className="price">Rp. 1.200.000</span>
                        </IonCol>
                    </div>
                </IonCard>
            </IonRow>
        </>

    );
};

export default WaitingPayments;
