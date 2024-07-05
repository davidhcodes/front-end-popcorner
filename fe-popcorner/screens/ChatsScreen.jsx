import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { getChatbyChatId } from "../utils/api";

function chatMessage(message, user){
  const [newComment, setNewComment] = useState();
  const currentUser = "Brian"
  const messageObj = message[1]
  const messageKey = message[0]
  console.log(currentUser)
  if(messageObj.author === currentUser){
  return (
    <View style={styles.userChatBox}>
      <Text style={styles.commenter}>{messageObj.author}</Text>
      <Text style={styles.comment}>{messageObj.msg}</Text>
    </View>
  )
}
else{
    return(
      <View style={styles.replyChatBox}>
        <Text style={styles.commenter}>{messageObj.author}</Text>
        <Text style={styles.comment}>{messageObj.msg}</Text>
      </View>
    )
  }
}
function ChatScreen({user}) {
  const [currentChat, setCurrentChat] = useState()
  useEffect(() => {
    getChatbyChatId("001")
      .then((data) => {
        const chatArray = Object.entries(data[0])
        setCurrentChat(chatArray)

      })
      .catch((err) => {});
  }, []);
  return (
    <View style={styles.container}>
    <ScrollView>
    {/* <View style={styles.container}> */}
      <Text style={styles.header}>Chat</Text>
      {currentChat ? currentChat.map((message)=> chatMessage(message, user)): <Text style={styles.header}>No chat</Text>}
    {/* </View> */}
    </ScrollView>
      <TextInput
          style={styles.input}
          value={`Please type here, ${user.username}`}
        />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundcolor: '#160B07',
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  commenter: {
    textAlign: "left",
    fontSize: 12,
    color: '#4293AE',
    paddingLeft: 10
    // fontWeight: "bold",
  },
  comment: {
    textAlign: "left",
    fontSize: 18,
    color: '#160B07',
    paddingLeft: 10
    // fontWeight: "bold",
  },
  replyChatBox: {
    backgroundColor: "#D4C4AD",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 2,
    margin: 10,
    marginBottom: 20,
    marginLeft: 80
  },
  userChatBox: {
    backgroundColor: "#FEFBF2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 20,
    margin: 10,
    marginBottom: 20,
    marginRight: 80
  },
  input: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 2,
    borderColor: '#160B07',
    padding: 10,
    backgroundColor: '#FEFBF2',
    borderRadius: 5,
  },
});

export default ChatScreen;
