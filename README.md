# Card Matching Game
A spooky card matching game. Use your memory and skills to match pairs of cards. Match all cards before 100 seconds to win. 

## Built With
- CSS3
- HTML5
- JavaScript(ES6)

## Features 
- OOJS - use of classes and object instances 
- CSS Animations(3D animations/perspective/keyframes)
- Audio sounds triggered on events
- [Fisher-Yates shuffling algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

<details>
	<summary>Game logic</summary>
    JavaScript
    <ul>
        <li>Create Audio Controller Class to handle sounds</li>
        <li>Create Game Class to handle all game logic</li>
        <li>Game should begin anytime overlay is clicked</li>
        <li>Game will shuffle cards</li>
        <li>Allow user to click on two cards and compare</li>
        <li>If mismatched, then reset cards</li>
        <li>If matched, push cards into a matched array and keep visible</li>
        <li>If matched arrays is same length as cards array then display victory overlay</li>
        <li>If time runs out, display gameover overlay</li>
    </ul>
</details>		

Click [here](http://andrewpham.ca/mixormatch/) to view.

<img src="./preview">