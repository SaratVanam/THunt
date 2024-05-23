import { IonButton,IonAlert, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter, IonText } from '@ionic/react';
import React, { useState } from 'react';
import {logInOutline, personCircleOutline} from "ionicons/icons";
import { Preferences } from '@capacitor/preferences';
import thuntIcon from "../assets/thunt-icon.jpg";

const Login: React.FC = () => {

    const router = useIonRouter();
    const doLogin = async(event: React.FormEvent) =>{
        event.preventDefault();
        console.log("do login")
        const result = await Preferences.get({key:email})
        if(result.value === password){
            console.log("entered right pass");
            router.push("/homepage", "root");
        }
        else{
            console.log("no password")
            setIsOpen(true);
        }
        
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle >Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className='ion-padding'>
                <IonText>
                    <h1 className="ion-text-center">Welcome to Thunt</h1>
                </IonText>
                <div className='ion-text-center ion-padding'>
                    <img src={thuntIcon}></img>
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput 
                                fill='outline' 
                                labelPlacement='floating' 
                                label='Email' 
                                type='email' 
                                placeholder='name@email.com' 
                                value={email} 
                                onIonChange={(e)=>setEmail(e.detail.value!)}>
                            </IonInput>
                            <IonInput 
                                className='ion-margin-top' 
                                fill='outline' 
                                labelPlacement='floating' 
                                label='Password' 
                                type='password' 
                                placeholder='Type your password' 
                                value={password} 
                                onIonChange={(e)=>setPassword(e.detail.value!)}>
                            </IonInput>
                            <IonButton 
                                className='ion-margin-top' 
                                expand='block' 
                                type='submit'>
                                Login
                            <IonIcon icon={logInOutline} slot='end' />
                            </IonButton>
                            <IonAlert
                                isOpen={isOpen}
                                header="Error logging in"
                                message="Please verify you details and retry"
                                buttons={['Ok']}
                                onDidDismiss={()=>setIsOpen(false)}
                                // onDidDismiss={() => {setIsOpen(false);
                                //     setPassword("");
                                //     setEmail("");
                                // }}
                            ></IonAlert>
                            <IonButton routerLink='/register' className='ion-margin-top' expand='block' type='button'>Create Account
                            <IonIcon icon={personCircleOutline} slot='end' /></IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;