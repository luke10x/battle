## Available Scripts

After clonning the repository you can run

### `make up install up logs`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Later you can run just:

### `make up logs`

This will just start the project, without installing dependencies

### To run tests:

	make into
	npm tests

You should see something like:

	 PASS  src/battle/BattleReducer.test.ts
	  Each roll may cost some health                                                                                                                                            
	    When they roll equal
	      ✓ player health stays the same (11ms)
	      ✓ monster health stays the same (3ms)
	    When monster rolls higher than player (%#
	      ✓ Player health is hit (3ms)
	      ✓ Player health is hit (3ms)
	      ✓ Monster health stays same (3ms)
	    When player rolls higher than monster
	      ✓ player health stays the same (3ms)
	      ✓ monster health is hit (3ms)
	      When player rolls higher than monster again (this time much higher)
		✓ player health stays the same still (3ms)
		✓ monster health is hit even more (4ms)
	      Revenge: When monster rolls higher than player
		✓ player health is hit this time (2ms)
		✓ monster health stays the same, since it was hit last time (1ms)
	  Resets battle state
	    ✓ It is back to initial state (4ms)
	  Cannot go lower than zero health
	    ✓ Monster health stays at least zero (2ms)
	  Stores last rolled dice in the state
	    ✓ Persons keep rolled dice (4ms)
	  Forgets last hit on next roll
	    ✓ player forgets its last hit (2ms)

	 PASS  src/App.test.tsx (6.202s)
	  ✓ renders learn react link (222ms)

	Test Suites: 2 passed, 2 total
	Tests:       16 passed, 16 total

## Learn More

- This app is deployed on [Heroku](https://hidden-taiga-69915.herokuapp.com/).
- There are more links on my web page [luke10x.dev](https://luke10x.dev/).
