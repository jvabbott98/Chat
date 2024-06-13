import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
// import name and chatBackgroundColor from Start.js
  const { name } = route.params;
  const { chatBackgroundColor } = route.params;

// set screen title to the what the user typed in the textInput field in Start.js
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: chatBackgroundColor}]}>
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