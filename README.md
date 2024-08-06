# Simple Note Management App

This project is a simple note management application that allows users to log in, take notes, edit them, delete them, organize them under categories, and see a version history of all notes.

## Features

- User authentication (login and registration)
- Note creation, editing, and deletion
- Organize notes into categories
- Real-time updates
- View and restore previous versions of notes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- A Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/YardenSeriLevi/Note-taking-project_new.git
    cd Note-taking-project_new
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Configure Firebase:**
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore and Authentication in your Firebase project.
    - Replace the Firebase config object in `src/firebase.js` with your Firebase project's config object.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Structure and Components

### Project Structure

- `src/`
  - `components/` - Contains React components.
  - `firebase.js` - Firebase configuration and initialization.
  - `App.js` - Main app component.

### Key Components

- `Login` - Handles user authentication.
- `NoteList` - Displays a list of notes.
- `CommentTable` - Holds all responses and is responsible for their management 
- `CategoryList` - Manages note categories.
- `VersionHistory` - Shows version history of notes.

## Using the App

1. **Start the app:**
    ```bash
    npm start
    ```

2. **Log in:**
   - Enter your credentials to log in or register a new account.

3. **Manage Notes:**
   - Add, edit, and delete notes.
   - Organize notes into categories.
   - View and restore previous versions of notes.

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)

[Link to an explanatory video about the project](https://ooo.mmhmm.app/watch/z_B4SLPW2c0eJ1PgUPANcT)
