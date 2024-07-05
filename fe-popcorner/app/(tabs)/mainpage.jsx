import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatsScreen";
// import { useAuth } from "./AuthContext";

const Tab = createBottomTabNavigator();

function MainPage({ isLoggedIn, setIsLoggedIn, user, setUser }) {
  // const  = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" options={{ title: "HomeScreen" }}>
        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
      {console.log(isLoggedIn)}
      <Tab.Screen
            name="ChatScreen"
            options={{ title: "" }}
            initialParams={{ isLoggedIn, user }}
          >
            {/* Pass props as children */}
            {(props) => (
              <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen>
      {isLoggedIn ? (
        <Tab.Screen
          name="UserInfo"
          options={{ title: "User profile" }}
          initialParams={{ isLoggedIn, user }}
        >
          {(props) => (
            <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Tab.Screen>
      ) : (
        <>
          <Tab.Screen
            name="SignUp"
            options={{ title: "SignUp" }}
            initialParams={{ setIsLoggedIn, user, setUser }}
          >
            {(props) => (
              <SignUp
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Interests"
            options={{ title: "Select interests" }}
            initialParams={{ isLoggedIn, user, setUser }}
          >
            {(props) => (
              <Interests
                {...props}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
              />
            )}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}

export default MainPage;
