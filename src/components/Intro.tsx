import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { Children } from 'react';
import { Swiper, SwiperSlide, useSwiper }  from 'swiper/react';
import 'swiper/css';
import Intro1Svg from '../assets/cristina.svg';
import Intro2Svg from '../assets/apple.svg';
import Intro3Svg from '../assets/android.svg';
import './Intro.css';

interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {

    return (
    <Swiper>
        <SwiperSlide>
            <img src={Intro1Svg} alt='Cristina' />
            <IonText>
                <h3>¡Crea la API más momento xd con Ionic UI Components!</h3>
            </IonText>
            <SwiperButtonNext>Siguiente</SwiperButtonNext>
        </SwiperSlide>

        <SwiperSlide>
            <img src={Intro2Svg} alt='Apel' />
            <IonText>
                <h3>¡Crea la API más momento xd con Ionic UI Components! Parte 2</h3>
            </IonText>
            <SwiperButtonNext>Siguiente</SwiperButtonNext>
        </SwiperSlide>

        <SwiperSlide>
            <img src={Intro3Svg} alt='Android' />
            <IonText>
                <h3>¡Crea la API más momento xd con Ionic UI Components! Parte 3... ¿Fin?</h3>
            </IonText>
            <IonButton onClick={() => onFinish()}>Finalizar</IonButton>
        </SwiperSlide>
    </Swiper>
    );
        
};

export default Intro;