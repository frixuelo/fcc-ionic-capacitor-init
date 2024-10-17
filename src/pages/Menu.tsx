import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Setting';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
    const paths = [
        { name: 'Casita', path: '/app/list', icon: homeOutline },
        { name: 'Ajustes', path: '/app/setting', icon: newspaperOutline }
    ];
    return (
        <IonPage>
            <IonSplitPane contentId="main" when="lg">
            <IonMenu contentId='main'>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
            {paths.map(( item, index ) => (
                <IonMenuToggle key={index} autoHide={false}>       
                    <IonItem detail={false} routerLink={item.path} routerDirection="none">
                        <IonIcon slot="start" icon={item.icon} /> 
                        {item.name}
                    </IonItem>
                </IonMenuToggle>               
                    ))}
                    <IonMenuToggle autoHide={false}>       
                    <IonButton expand='full' routerLink={'/'} routerDirection="root" color={'tertiary'}>
                        <IonIcon slot="start" icon={logOutOutline} /> 
                        Volver a pantalla de loggeo
                    </IonButton>
                </IonMenuToggle>
            </IonContent>
            </IonMenu>

            <IonRouterOutlet id='main'>
                <Route exact path="/app/list" component={List} />
                <Route path="/app/setting" component={Settings} />
                <Route exact path="/app">
                    <Redirect to="/app/list" />
                </Route>
                </IonRouterOutlet>
                </IonSplitPane>
        </IonPage>
    );
};

export default Menu;