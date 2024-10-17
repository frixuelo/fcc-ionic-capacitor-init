import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { addOutline, trashBinOutline } from 'ionicons/icons';

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUsers, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonCardElement>(null);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page = useRef(null);
    const [activeSegment, setActiveSegment] = useState<any>('details');

    useEffect(() => {
        setPresentingElement(page.current);
    });

    useIonViewWillEnter(() => {
        const fetchData = async () => {
            const users = await getUsers();
            console.log('🚀 ~ file: List.tsx:10 ~ useIonViewWillEnter ~ users:', users)
            setUsers(users);
            setLoading(false);
        };
    
        fetchData();
    });


    /* Esta forma es la original de la prueba lo que hice fue hacerlo sin funcion async directa
        aunq el use de funciones async dentro de useIonViewWillEnter está bien, se puede intentar una refactorizacion
        del codigo para usar una funcion separada y luego llamarla dentro del hook. Esto podria evitar problemas
        de linting o de compilacion.
        Daba error en el async () => {

        useIonViewWillEnter(async () => {
        const users = await getUsers();
        setUsers(users);
        setLoading(false);
    });
    */
    

    const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results;
    };

    const clearList = () => {
        showAlert({
            header: 'Confirmar',
            message: '¿Estás seguro de querer borrar la lista?',
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                { 
                    text: 'Borrar',
                    handler: () => {
                        setUsers([]);
                        showToast({
                            message: 'La lista se ha vaciado.',
                            duration: 2000,
                            color: 'danger'
                        });
                    }
                }
               ]
        });
    };

        const doRefresh = async (event: any) => {
            const data = await getUsers();
            setUsers(data);
            event.detail.complete();
        }

        const openModal = (user: any) => {
            setSelectedUser(user);
            setIsOpen(true);
        };

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={'success'}>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>
                            <IonIcon slot="icon-only" icon={trashBinOutline} />                        
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color={'success'}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
                    <IonRefresherContent/>
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardContent className="ion-no-padding">
                        <IonItem lines="none">
                            <IonAvatar slot="start">
                                <IonSkeletonText/>
                            </IonAvatar>
                                <IonLabel>
                                    <IonSkeletonText animated style={{width: '150px'}} />
                                    <p>
                                        <IonSkeletonText/>
                                    </p>
                                </IonLabel>
                                <IonChip slot='end' color={'primary'}>                                 
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    ))
                )}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className="ion-no-padding">
                        <IonItem lines="none">
                            <IonAvatar slot="start">
                                <IonImg src={user.picture.thumbnail} />
                            </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color={'primary'}>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.5} ref={modal} isOpen={selectedUsers !== null} onIonModalDidDismiss={() => setSelectedUser(null)}
                    handle={true} canDismiss={true}> 
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Volver atrás</IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUsers?.name.first} {selectedUsers?.name.last}
                            </IonTitle>
                            </IonToolbar>
                            <IonToolbar color={'light'}>
                                <IonSegment value={activeSegment} onIonChange={(e) => setActiveSegment(e.detail.value)}>
                                    <IonSegmentButton value="details">Detalles</IonSegmentButton>
                                    <IonSegmentButton value="calendar">Calendario</IonSegmentButton>
                                </IonSegment>
                            </IonToolbar>
                            </IonHeader> 
                            <IonContent className='ion-padding'>
                                {activeSegment === 'details' && (
                                    <IonCard>
                                        <IonAvatar slot="start">
                                            <IonImg src={selectedUsers?.picture.large} />
                                        </IonAvatar>
                                        <IonCardContent className="ion-no-padding">
                                            <IonItem lines="none">
                                                <IonLabel class="ion-text-wrap">
                                                    {selectedUsers?.name.first} {selectedUsers?.name.last}                                                  
                                                    <p>Nacionalidad: {selectedUsers?.nat}</p> 
                                                    <p>Email: {selectedUsers?.email}</p> 
                                                    </IonLabel>
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                    )}
                                    {activeSegment === 'calendar' && <IonDatetime />}
                            </IonContent>
                </IonModal>
            </IonContent>

            {/* Esto es todo una refactorización del código original que era:
                const cardModal = useRef<HTMLIonCardElement>(null);
                    y en lo otro asi:
                        <IonModal ref={cardModal} trigger="card-modal" presentingElement={presentingElement!}>
                        <IonHeader>
                            <IonToolbar color={'success'}>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Volver atrás</IonButton>



                            </IonButtons>
                            <IonTitle>
                                {selectedUsers?.name.first} {selectedUsers?.name.last}
                            </IonTitle>
                            </IonToolbar>
                            </IonHeader> 
                            <IonContent>
                                La nacionalidad de este individuo es: {selectedUsers?.nat}
                            </IonContent>
            </IonModal>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton id="card-modal "color="primary">
                    <IonIcon icon={addOutline} />
                </IonFabButton
            </IonFab>
            */}

            {/* Modal controlado por el estado */}
            <IonModal
                isOpen={isOpen}
                presentingElement={presentingElement!} // Usar el presentingElement de la página
                onDidDismiss={() => setIsOpen(false)} // Cierra el modal cuando se despide
                breakpoints={[0, 0.3, 0.5, 1]} // Define los puntos de quiebre del modal
                initialBreakpoint={0.3} // Altura inicial del modal al abrir
                handle={true} 
            >
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setIsOpen(false)}>Volver atrás</IonButton>
                        </IonButtons>
                        <IonTitle>
                            Ejemplo de Carta Modal
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    Esto es un ejemplo de carta modal muy xd la verdad
                </IonContent>
            </IonModal>

            {/* Botón para abrir el modal */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="primary" onClick={() => setIsOpen(true)}>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        
        </IonPage>
    );
};

export default List;