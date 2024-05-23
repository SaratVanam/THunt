import { Preferences } from '@capacitor/preferences';
import { IonBackButton, IonButton,IonText, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { checkmarkDoneCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import thuntIcon from "../assets/thunt-icon.jpg";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const doRegister = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log("Do Register");
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        Preferences.set({key:email,value:password});
        alert('Successfully Registered, Please go to login page!');
        
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="ion-padding">
            <IonText>
                    <h1 className="ion-text-center">Welcome to Thunt</h1>
                </IonText>
                <div className='ion-text-center ion-padding'>
                    <img src={thuntIcon}></img>
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput
                                fill="outline"
                                labelPlacement="floating"
                                label="Username"
                                placeholder="username"
                                value={username}
                                onIonChange={(e) => setUsername(e.detail.value!)}
                            />
                            <IonInput
                                className="ion-margin-top"
                                fill="outline"
                                labelPlacement="floating"
                                label="Email"
                                type="email"
                                placeholder="email@domain.com"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            />
                            <IonInput
                                className="ion-margin-top"
                                fill="outline"
                                labelPlacement="floating"
                                label="Password"
                                type="password"
                                placeholder="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            />
                            <IonButton
                                className="ion-margin-top"
                                expand="block"
                                type="submit" // This triggers the form submission
                            >
                                Create Account
                                <IonIcon icon={checkmarkDoneCircleOutline} slot="end" />
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;
