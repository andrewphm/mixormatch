# Card Matching Game
A spooky card matching game. Use your memory and skills to match pairs of cards. Match all cards before 100 seconds to win. 


## Features 
- Animations(3D animations/perspective/keyframes)
- Audio sounds triggered on events

<details>
	<summary>Logic to building the game</summary>
	HTML
    <ul>
        <li>Create the title header.</li>
        <li>Create a game container.</li>
        <li>Create the time and flip counter. Give IDs to allow JS to make them dynamic.</li>
        <li>Create 16 cards.</li>
        <li>Inside each card element, make front and back children.</li>
    </ul>
    CSS
    <ul>
        <li>Apply radial-gradient to the background.</li>
        <li>Apply styling to the title and counters.</li>
        <li>Use grid layout to create a 4 column grid.</li>
        <li>Style the front and back of the cards.</li>
        <li>Create CSS animations for cards</li>
        <li>Initial state of front card is rotatedX 180 to make it backfacing</li>
        <li>Initial state of back card is in view.</li>
        <li>Create special classes to be injected by javascript to flip the cards.</li>
        <li>Create gamestart, gameover, victory overlays for the lifecycle of the game.</li>
    </ul>
    JavaScript
    <ul>
        <li>Create Audio Controller class with methods to start and stop sounds</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</details>		    