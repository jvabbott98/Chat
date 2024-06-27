import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
import { Alert } from 'react-native';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [chatBackgroundColor, setChatBackgroundColor] = useState();
  const auth = getAuth();

//Sign in user and use props passed from App.js
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { name: name, chatBackgroundColor: chatBackgroundColor, userID: result.user.uid });
        Alert.alert("Signed in Successfully");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.")
      })
  }

  return (

    <ImageBackground source={require('../assets/Background Image.png')} resizeMode='cover' style={styles.image}>
      <View style={styles.container}>

        <View style={styles.titleElement}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Chattery</Text>
          </View>
          <View style={styles.titleSpacer}></View>
        </View>

        <View style={styles.box}>

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder='Your Name'
            >
            </TextInput>
          </View>

          <View style={styles.selectorTextWrapper}>
            <Text style={styles.selectorText}
            >Choose Background Color
            </Text>
          </View>

          {/* setChatBackgroundColor matches color in stylesheet */}
          <View style={styles.opacityWrapper}>
            <TouchableOpacity
              style={[styles.opacity, styles.opacityBlack]}
              onPress={() => setChatBackgroundColor('#090C08')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.opacity, styles.opacityPurple]}
              onPress={() => setChatBackgroundColor('#474056')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.opacity, styles.opacityBlue]}
              onPress={() => setChatBackgroundColor('#8A95A5')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.opacity, styles.opacityGreen]}
              onPress={() => setChatBackgroundColor('#B9C6AE')}
            >
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={signInUser}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>




        </View>
        {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
      </View>


    </ImageBackground>


  );
}

const styles = StyleSheet.create({
  image: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleElement: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  titleSpacer: {
    flex: 1
  },
  box: {
    height: '44%',
    width: '88%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6%',
  },
  textInputWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5
  },
  selectorTextWrapper: {
    flex: .5,
    width: '88%',
    justifyContent: 'flex-end',
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1.0
  },
  opacityWrapper: {
    flex: 1,
    width: '88%',
    flexDirection: 'row',
    alignItems: 'left',
  },
  opacity: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    margin: 10,
    borderRadius: 50,
  },
  opacityBlack: {
    backgroundColor: '#090C08',
    marginLeft: 0,
  },
  opacityPurple: {
    backgroundColor: '#474056',
  },
  opacityBlue: {
    backgroundColor: '#8A95A5',
  },
  opacityGreen: {
    backgroundColor: '#B9C6AE'
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '88%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  }

});

export default Start;