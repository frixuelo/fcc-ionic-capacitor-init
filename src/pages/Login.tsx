import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, person, personCircleOutline } from 'ionicons/icons';
//eso importa lo necesario para cargar los iconos de Ionic
import FCC from '../assets/free-code-camp-logo.svg'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';


const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    }, []);

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present('Estás logeandote...');
        setTimeout(async() => {
            dismiss();
            router.push('/app', 'root');
        }, 2000);
    };
//esto es una prueba de login fake default para la prueba del curso prevent the DEFAULT

    const finishIntro = async() => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    };

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY });
    };

    return ( 
        <>
        {!introSeen ? (
            <Intro onFinish={finishIntro}/>
        ) : (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>Prueba login moment xd</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" scrollY={false}> 
                <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd='8' sizeLg='6' sizeXl='4'>
                        <div className='ion-text-center ion-padding'>
                        <img src={FCC} alt='FCC' width={'25%'}/>
                        </div>
                        </IonCol>
                    </IonRow>
                        
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd='8' sizeLg='6' sizeXl='4'>
                        <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput fill='outline' labelPlacement='floating' label="Email" type='email' placeholder='prueba@momento.xd'></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label="Contraseña" type='password'></IonInput>
                            <IonButton type='submit' expand="block" className='ion-margin-top'>
                                Logéate
                                <IonIcon icon={logInOutline} slot="end"/>
                            </IonButton>
                            <IonButton routerLink="/Register" color={'secondary'} type='button' expand="block" className='ion-margin-top'>
                                Crear una cuenta
                                <IonIcon icon={personCircleOutline} slot="end"/>
                            </IonButton>

                            <IonButton onClick={seeIntroAgain} fill="clear" size='small' color={'secondary'} type='button' expand="block" className='ion-margin-top'>
                                Volver a ver la intro
                                <IonIcon icon={personCircleOutline} slot="end"/>
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    La toolbar y el footer del ommento xd
                </IonToolbar>
            </IonFooter>
        </IonPage>
        )}
        </>
    );
};

export default Login;