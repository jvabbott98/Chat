import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyDyTU56HfsL0L4iLgeatIeaKy0rCes95ig",
    authDomain: "chat-eff4c.firebaseapp.com",
    projectId: "chat-eff4c",
    storageBucket: "chat-eff4c.appspot.com",
    messagingSenderId: "221605350797",
    appId: "1:221605350797:web:25fc9f360d0b7fe18581c4"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
