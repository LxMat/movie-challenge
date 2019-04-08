### MovieChallenge
MovieChallenge is a project created for the course *DH2642 Interactionprogramming and the Dynamic Web* at KTH by Adel Bavey and Alexander Heikinaho.
This project uses the Movie Database API.

[Link to the App](https://test-f51e3.firebaseapp.com/)

#### Short description of your project

The Ultimate Movie Challenge is a quiz game where the user is asked questions about movies and the people involved. The amount of correct questions is added to a score, where the user has won after getting this many questions right. Questions can come in different forms, such as multiple choice, text boxes, or slider questions etc. The questions are gathered from the Movie Database API. The project is made in React.

#### What you have done

We have currently implemented some of the important screens for the web app, and the user can go through the app from the start page to the results page. The Css is also partially implemeted. We can fetch questions from the Movie Database and display them.

#### What you still plan to do

We plan to add more questions and question types. Add a scoring system. Complete the Css. Add different game modes (such as difficulty modes, and category questions or random question modes). Improve interaction.

#### Your project file structure (short description/purpose of each file)

The general structure of the app can be viewed as follows:
```javascript
<App>
  <StartScreen/>
  <SelectGame/>
  <Game>
    <QuestionManager>
      <CardSelection/>
      <Slider/>
    </QuestionManager>
  </Game>
  <ResultScreen/>
<App/>
```
**StartScreen** - Startscreen of the app 

**SelectGame** - Selects different game modes. at the moment there in only one game mode.

**Game** - The quiz. loads the data from the API and generates questions which is sent to the 

***QuestionManager*** - Keeps track of what type of questionComponent should be rendered. At the moment there are only _CardSelection_ and _Slider_ components

**ResultScreen** - Shows the users answer and the correct answer

Other files files of interest:

_movieDBAPI.js_ - fetches data from the API

_QuestionGenerator.js_ generates the questions for the quiz
