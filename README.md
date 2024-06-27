# Chat App
<P>This is a basic chat app built with React Native and Expo<p>

## Using the App
<p>Upon opening the app users may enter there name and select a background color before hitting the 'Start Chatting' button to move to the Chat screen. The background color of the chat screen will match the color users chose on the Start screen and their name will appear at the top of the page.<p>
<p>From within the chat screen, users can send text messages, select photos to send, take a photo directly within the app to send, and share their location by pressing the + symbol in the input bar.<p>
<p>Messages are stored in a google firebase database so that users can access their sent messages at anytime<p>

## Tech Used
- Expo: Used Expo and the Expo Go app to build an test the app. The expo framework also provided other essential functions like imagePicker and the ability to retrieve a device's location.
- React Native's navigation stack: Used to navigate between different screens.
- Gifted Chat: Used for the various chat functions allowed in the app.
- Firebase: Used to store messagesthat allows user's devices to retrieve those messages and update in real time.

## Setting up the App
<p>Clone this repository and then install:
- Node.js version 16.19.0
- Expo
- React Native
- GiftedChat
- Firebase 
- Android Studio (to run the app on desktop)
<p>
<p>Use the 'npx expo start' command after navigating to the project in your CLI to run the development environment<p>

### Database Configuration
- Sign into Google Firebase and create a project.
- Set up Firestore Databse in production mode
- Change rules to "allow read, write: if true"
- Register the app in Project Overview
_ Install firebase in your app using npm install firebase.
- Copy and paste configuration provided by Firebase into app.js