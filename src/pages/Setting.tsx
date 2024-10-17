import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { square, triangle } from 'ionicons/icons';

const Settings: React.FC = () => {

    return (
        <IonTabs>
        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/app/setting/tab1">
                <IonIcon icon={triangle}/>
                <IonLabel>Pestaña 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/app/setting/tab2">
                <IonIcon icon={square}/>
                <IonLabel>Pestaña 2</IonLabel>
            </IonTabButton>
        </IonTabBar>

        <IonRouterOutlet>
            <Route path="/app/setting/tab1" component={Tab1} />
            <Route path="/app/setting/tab2" component={Tab2} />
            
            <Route exact path="/app/setting">
            <Redirect to="/app/setting/tab1" />
            </Route>
        </IonRouterOutlet>
        </IonTabs>
    );
};

export default Settings;