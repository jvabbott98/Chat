import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { query, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  // import name and chatBackgroundColor from Start.js
  const { name } = route.params;
  const { chatBackgroundColor } = route.params;
  const { userID } = route.params;

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}
    />
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, []);

  // set screen title to the what the user typed in the textInput field in Start.js
  // useEffect(() => {
  //   navigation.setOptions({ title: name });
  // }, []);

  return (
    <View style={[styles.container, { backgroundColor: chatBackgroundColor }]}>
      <GiftedChat
        style={styles.chat}
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
      

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Chat;

{/* <View style={[styles.container, { backgroundColor: chatBackgroundColor }]}> */}