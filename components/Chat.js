import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar,  } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  // import name and chatBackgroundColor from Start.js
  const { name } = route.params;
  const { chatBackgroundColor } = route.params;
  const { userID } = route.params;

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const renderBubble = (props) => {
    // if (isConnected)
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#fff"
        }
      }}
    />;
  //   else return <Bubble
  //   {...props}
  //   wrapperStyle={{
  //     right: {
  //       backgroundColor: "red"
  //     },
  //     left: {
  //       backgroundColor: "red"
  //     }
  //   }}
  // />;
  }

  let unsubMessages
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      })
    } else loadCachedMessages();
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

 
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  return (
    <View style={[styles.container, { backgroundColor: chatBackgroundColor }]}>
      <GiftedChat
        style={styles.chat}
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Chat;

{/* <View style={[styles.container, { backgroundColor: chatBackgroundColor }]}> */ }