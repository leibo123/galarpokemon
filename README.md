# Galar Region Pokemon
Heroku Deployment Link: (https://galar-pokemon.herokuapp.com/)

This App allows users to browse all 400 Pokemon in the Galar Region (presented in the new Pokemon Sword and Shield video games). Users can search for and filter Pokemon by their different Types (e.g. Fire, Water, Grass) or by their base stats, as well as sort them by Pokedex number or by total base stats. 

Through this app, users will be able to efficiently look up the image and stats of a Pokemon in the Galar Pokedex, as well as quickly determine which Pokemon have the highest base stats and etc.

The interface is designed with user efficiency in mind, e.g. by providing a compact area in which all the pokemon's stats are visible at a glance as well as keeping a search feature for quick lookup of a given Pokemon. The dropdowns provided for filtering and sorting are intuitive to use and descriptive enough that users will have an idea of what effect applying each filter or sort would have. Furthermore, the filters, sort, and search can be applied together in any combination such that there is no inconsistent behavior. A message is also displayed that makes clear to the user which filters have already been applied. The App uses several React components, most importantly a `FilteredList` component which is passed in several props containing Pokemon stats and image data from the main `App.js`. Changes in this component's state can be triggered by selecting which filters/sort to use, or by typing in the Search bar. Additional components used include a `Pokemon` component which has props for a individual Pokemon's data/images, as well as a state for keeping track of whether a given Pokemon has been toggled or not (to display its shiny form). There is also a `RainbowHeader` component that takes as a prop the text used to create the header, and has a state to keep track of the current color and cycle through a list of colors. Changes in both of these component's states can be triggered when the respective components are clicked.

All images of Pokemon used are courtesy of serebii.net

Note that not all pokemon shiny forms have been downloaded yet because of lack of time, but the Component is working as expected.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
