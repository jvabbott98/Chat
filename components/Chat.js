import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  // import name and chatBackgroundColor from Start.js
  const { name } = route.params;
  const { chatBackgroundColor } = route.params;

  // set screen title to the what the user typed in the textInput field in Start.js
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: chatBackgroundColor }]}>
      <Text>Hello Chat!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Chat;