import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { checkmarkOutline, logInOutline, person, personCircleOutline } from 'ionicons/icons';

const Register: React.FC = () => {
    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>

                    <IonButtons slot="start">      
                        <IonBackButton defaultHref='/' />                 
                    </IonButtons>

                    <IonTitle>Crear cuenta en momento xd</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" scrollY={false}> 
            <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd='8' sizeLg='6' sizeXl='4'>
                        <IonCard>
                    <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput fill='outline' labelPlacement='floating' label="Email" type='email' placeholder='prueba@momento.xd'></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label="Contraseña" type='password'></IonInput>
                            <IonButton type='submit' expand="block" className='ion-margin-top'>
                                Crear mi cuenta xd
                                <IonIcon icon={checkmarkOutline} slot="end"/>
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
    );
};

export default Register;