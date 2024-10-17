import { CreateAnimation, createGesture, Gesture, GestureDetail, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React, { useRef } from 'react';

const Tab2: React.FC = () => {
    const animation = useRef<CreateAnimation | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useIonViewDidEnter(() => {
        animation.current?.animation.play();
        const gesture: Gesture = createGesture({
        el: elementRef.current!,
        threshold: 0,
        gestureName: 'my-gesture',
        onStart: ev => onStartHandler(ev),
        onMove: ev => onMoveHandler(ev),
        onEnd: ev => onEndHandler(ev)
        });
        gesture.enable();
    });

    const onStartHandler = (detail: GestureDetail) => {
        elementRef.current!.style.transition = 'none';
    };

    const onMoveHandler = (detail: GestureDetail) => {
        const x = detail.currentX - detail.startX;
        const y = detail.currentY - detail.startY;

        elementRef.current!.style.transform=`translate(${x}px, ${y}px)`;
    };

    const onEndHandler = (detail: GestureDetail) => {
        elementRef.current!.style.transition = '500ms ease-out';
        elementRef.current!.style.transition = `translate(0px, 0px)`;
    };

    return (
        <IonPage>
            <IonHeader>
            <IonToolbar color={'success'}>
                <IonButtons slot="start">
                    <IonMenuButton>
                        
                    </IonMenuButton>
                </IonButtons>
                    <IonTitle>Pestaña Nº2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={false}>
                <CreateAnimation
                ref={animation}
                duration={2000}
                iterations={Infinity}
                delay={1000}
                keyframes={[
                    { offset: 0, transform: 'scale(1)', opacity: '1' },
                    { offset: 0.5, transform: 'scale(1.5)', opacity: '0.5' },
                    { offset: 1, transform: 'scale(1)', opacity: '1' },
                ]}
                >
                    <IonButton expand="block" color={'tertiary'} className='ion-margin'>Unete al momentaso xd</IonButton>
                    </CreateAnimation>
                    <div ref={elementRef} style={{width: 50, height: 50, backgroundColor: 'red'}} />
            </IonContent>
        </IonPage>
    );
};

export default Tab2;