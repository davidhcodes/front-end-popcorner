import { StyleSheet, Image, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function UserInfo({ isLoggedIn, user, navigation, newUserInput, userInfo }) {
  const [interestsArray, setInterestsArray] = useState([]);

  const navigateToHome = () => {
    if (userInfo) {
      navigation.navigate("MainPage", { userInfo });
    }
  };

  useEffect(() => {
    if (userInfo?.interests && Object.keys(userInfo.interests).length > 0) {
      // Convert interests object to array
      const newInterestsArray = Object.values(userInfo.interests).flatMap(
        (category) => {
          return Object.values(category);
        }
      );
      setInterestsArray(newInterestsArray);
    } else {
      setInterestsArray([]);
    }
  }, [userInfo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {userInfo ? (
          <View className="w-full items-center justify-center bg-darkBackground ">
            <Text style={styles.mainTitle}>
              Hello {userInfo.firstName} {userInfo.lastName}
            </Text>

            {userInfo.avatar ? (
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            ) : (
              <Text>No avatar</Text>
            )}

            <Text style={styles.title}> Communities: </Text>
            {userInfo.communities &&
            Object.keys(userInfo.communities).length > 0 ? (
              Object.values(userInfo.communities).map((community, index) => (
                <Text style={styles.interestBox} key={index}>
                  {community}
                </Text>
              ))
            ) : (
              <Text>Not a member of any communities</Text>
            )}

            <Text style={styles.title}> Cinemas: </Text>
            {userInfo.cinemas && Object.keys(userInfo.cinemas).length > 0 ? (
              Object.values(userInfo.cinemas).map((cinema, index) => (
                <Text style={styles.interestBox} key={index}>
                  {cinema}
                </Text>
              ))
            ) : (
              <Text>No cinemas added</Text>
            )}

            <Text style={styles.title}> Events: </Text>
            {userInfo.events && Object.keys(userInfo.events).length > 0 ? (
              Object.values(userInfo.events).map((event, index) => (
                <Text style={styles.interestBox} key={index}>
                  {event}
                </Text>
              ))
            ) : (
              <Text>No events added</Text>
            )}

            <Text style={styles.title}> Interests: </Text>
            {interestsArray.length > 0 ? (
              interestsArray.map(
                (
                  specificInterest,
                  index // Ensure to specify the 'index' parameter in map function
                ) => (
                  <Text style={styles.interestBox} key={index}>
                    {/* Specify 'key' prop for each mapped element */}
                    {specificInterest}
                  </Text>
                )
              )
            ) : (
              <Text>No interests added</Text>
            )}

            <Text style={styles.title}> Moderator: </Text>
            {userInfo.moderator &&
            userInfo.moderator.moderatorOf &&
            userInfo.moderator.moderatorOf.length > 0 ? (
              userInfo.moderator.moderatorOf.map((moderatorOf, index) => (
                <Text style={styles.interestBox} key={index}>
                  {moderatorOf}
                </Text>
              ))
            ) : (
              <Text>Not a moderator of any communities</Text>
            )}

            <Text style={styles.title}> Banned From: </Text>
            {userInfo.isBannedFrom &&
            Object.keys(userInfo.isBannedFrom).length > 0 ? (
              Object.values(userInfo.isBannedFrom).map((bannedFrom, index) => (
                <Text style={styles.interestBox} key={index}>
                  {bannedFrom}
                </Text>
              ))
            ) : (
              <Text>Not banned from any events</Text>
            )}

            <TouchableOpacity
              onPress={navigateToHome}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}> Back to home </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Waiting for user info</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // color: "#260101",
    paddingTop: 30,
  },
  profileContainer: {
    width: "100%",
    // backgroundColor: "#fff",
    color: "#260101",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    paddingBottom: 50,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  interestBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    color: "white",
  },
  backButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default UserInfo;
