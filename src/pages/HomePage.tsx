import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import bgMusic from '../assets/bg-music.mp3';
import "./Home.css";
import thuntIcon from "../assets/thunt-icon.jpg";


const HomePage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [clueNumber, setClueNumber] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [clueAnswer, setClueAnswer] = useState('');

  const clues = [
    "The _ center, which serves as a major transportation hub for both the New York City subway and the PATH train to New Jersey, with a striking architectural design reminiscent of a bird in flight. What is it?",
    "This young wizard grew up in the cupboard under the stairs, later discovering that he was part of a magical world. He's famous for defeating the Dark Lord when he was just a baby. Who is he?",
    "This landmark in New York City is known for its iconic Christmas tree and outdoor ice skating rink. It houses the famous Radio City Music Hall and is home to the 'Top of the Rock' observation deck. What is it?",
    "This museum hosts a glamorous annual event known for its extravagant red carpet and star-studded attendees. It's considered the biggest night in fashion, with unique themes each year. Which museum am I referring to?",
  ];

  const clueAnswers = ['Oculus', 'Harry Potter', 'Rockefeller Center', 'The Met'];
  const [music, setMusic] = useState<Howl | null>(null);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy');
      const data = await response.json();
      if (data.results.length > 0) {
        setQuestion(data.results[0].question);
        setAnswer(data.results[0].correct_answer);
      }
    } catch (error) {
      console.error(`Error fetching question: ${error}`);
    }
  };

  const handleAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = answer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setShowClue(true);
      setUserAnswer('');
    } else {
      alert('Incorrect answer. Try again!');
    }
  };

  const handleClue = () => {
    const normalizedClueAnswer = clueAnswer.trim().toLowerCase();
    const expectedClueAnswer = clueAnswers[clueNumber].toLowerCase();

    if (normalizedClueAnswer === expectedClueAnswer) {
      setClueNumber(clueNumber + 1);
      setShowClue(false);
      setClueAnswer('');
      fetchQuestion();

      if (clueNumber === 3) {
        alert('You have successfully collected all the clues, final treasure awaits you!');
      }
    } else {
      alert('Incorrect clue answer. Try again!');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    fetchQuestion();

    const backgroundMusic = new Howl({
      src: [bgMusic],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });

    setMusic(backgroundMusic);
  };

  return (
    <IonPage>
      {!gameStarted ? (
        <>
          <IonHeader>
            <IonToolbar color="primary">
            <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
              <IonTitle>Welcome to Treasure Hunt</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding background-image">
          <div className='ion-text-center ion-padding'>
                    <img src={thuntIcon}></img>
                </div>
            <div className="ion-text-center">
              <p>Socialize and Discover NYC's Most Iconic Landmarks in a Treasure Hunt Adventure!</p>
              <IonText><h1>Are you excited to play?</h1></IonText>
              <br></br>
              <IonButton expand="full" shape="round" onClick={startGame}>
                Let's Begin!
              </IonButton>
            </div>
          </IonContent>
        </>
      ) : (
        <>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Game Started</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding background-image">
            {!showClue ? (
              <><div className='ion-text-center ion-padding'>
              <img src={thuntIcon}></img>
          </div>
          {/* <IonCard color="primary">
                <IonCardContent>
                  <IonText>
                    Answer the following question to unlock the clue {clueNumber+1}!
                  </IonText>
                  <br></br>
                  <br></br>
                  <IonText className='ion-margin-top'>Question: {question}</IonText>
                  <br></br>
                  <br></br>
                  <IonInput
                    label="Your Answer:"
                    placeholder="Type your answer"
                    fill="outline"
                    value={userAnswer}
                    onIonChange={(e) => setUserAnswer(e.detail.value!)}
                  />
                  <br></br>
                  
                  <IonText>
                    Here is the answer: {answer}
                  </IonText>
                  <IonButton expand="full" shape="round" onClick={handleAnswer} className='ion-margin-top'>
                    Submit Answer
                  </IonButton>
                </IonCardContent>
              </IonCard> */}
              <IonCard color="primary">
                <IonCardContent>
                <IonText>
                    Answer the following question to unlock the clue {clueNumber+1}!
                  </IonText></IonCardContent></IonCard>

                  <IonCard color="primary">
                    <IonCardContent>
                    <IonText className='ion-margin-top'>Question: {question}</IonText>
                  <br></br>
                  <br></br>
                  <IonInput
                    label="Your Answer:"
                    placeholder="Type your answer"
                    fill="outline"
                    value={userAnswer}
                    onIonChange={(e) => setUserAnswer(e.detail.value!)}
                  />
                  <br></br>
                  
                  <IonText>
                    Here is the answer: {answer}
                  </IonText></IonCardContent></IonCard>
                  <IonButton expand="full" shape="round" onClick={handleAnswer} className='ion-margin-top' color="medium">
                    Submit Answer
                  </IonButton></>
              
            ) : (<><div className='ion-text-center ion-padding'>
            <img src={thuntIcon}></img>
        </div>
        {/* <IonCard>
                <IonCardContent>
                  <IonText>
                    Congratulations! Here's your clue {clueNumber+1}: 
                  </IonText>
                  <br></br>
                  <br></br>
                  <IonText>{clues[clueNumber]}</IonText>
                  <br></br>
                  <br></br>
                  <IonInput
                    label="Clue Answer:"
                    placeholder='Type your answer'
                    fill="outline"
                    value={clueAnswer}
                    onIonChange={(e) => setClueAnswer(e.detail.value!)}
                  />
                  <br></br>
                  <IonButton expand="full" shape="round" onClick={handleClue}>
                    Submit Clue
                  </IonButton>
                </IonCardContent>
              </IonCard> */}
              <IonCard color="primary">
                <IonCardContent>
                  <IonText>Congratulations! Here's your clue {clueNumber+1}:</IonText></IonCardContent></IonCard>
                  <IonCard color="primary">
                    <IonCardContent>
                    <IonText>Clue: {clues[clueNumber]}</IonText>
                    <br></br>
                  <br></br>
                  <IonInput
                    label="Clue Answer:"
                    placeholder='Type your answer'
                    fill="outline"
                    value={clueAnswer}
                    onIonChange={(e) => setClueAnswer(e.detail.value!)}
                  /></IonCardContent></IonCard>
                  <IonButton expand="full" shape="round" onClick={handleClue} color="medium">
                    Submit Clue
                  </IonButton></>
              
            )}
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default HomePage;