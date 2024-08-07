import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "./ChatScreen";
import CommunitiesScreen from "../../screens/CommunitiesScreen";
import { EventsList } from "./EventsList";
import { CommunitiesList } from "./CommunitiesList";
import CommunityDetails from "./CommunityDetails";
import EventDetail from "./EventDetail";
import CreateCommunity from "./CreateCommunity";
import { Header } from "../../components/Header";
import { BottomNavigation, Icon, PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { getUser } from "../../utils/api";

import { View, Text } from "react-native";
import Chat from "../../screens/Chat";
import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CommunitiesStack = ({ user }) => (
  <Stack.Navigator>
    <Stack.Screen name="CommunitiesList" options={{ headerShown: false }}>
      {(props) => <CommunitiesList {...props} user={user} />}
    </Stack.Screen>

    <Stack.Screen name="CommunityDetails" options={{ headerShown: false }}>
      {(props) => <CommunityDetails {...props} user={user} />}
    </Stack.Screen>
    <Stack.Screen name="CreateCommunity">
      {(props) => <CreateCommunity {...props} user={user} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const EventsStack = ({ user }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="EventsList"
      component={EventsList}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EventDetail" options={{ headerShown: false }}>
      {(props) => <EventDetail {...props} user={user} />}
    </Stack.Screen>
    <Stack.Screen name="CommunityDetails" options={{ headerShown: false }}>
      {(props) => <CommunityDetails {...props} user={user} />}
    </Stack.Screen>
  </Stack.Navigator>
);

function MainPage({
  isLoggedIn,
  user,
  userInfo,
  setUserInfo,
  newUserInput,
  setNewUserInput,
}) {
  useEffect(() => {
    if (user) {
      getUser(user.email)
        .then((fetchedUser) => {
          setUserInfo(fetchedUser);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <PaperProvider>
      <View className="flex-col justify-between items-center">
        <Header
          username={user?.username}
          title="PopCorner"
          avatar={userInfo?.avatar !== "" ? userInfo.avatar : undefined}
          isOnline={!!user}
          userInfo={userInfo}
          newUserInput={newUserInput}
        />
      </View>
      <Tab.Navigator
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.navigate(route.name, route.params);
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="HomeScreen"
          options={{
            title: "",
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ size }) => {
              return <Icon source="home" size={size} color="#F2055C" />;
            },
          }}
        >
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Events"
          options={{
            title: "",
            headerShown: false,
            tabBarLabel: "Events",

            tabBarIcon: ({ color, size }) => {
              return <Icon source="calendar" size={size} color="#F2055C" />;
            },
          }}
        >
          {(props) => <EventsStack {...props} user={userInfo} />}
        </Tab.Screen>

        <Tab.Screen
          name="Communities"
          options={{
            tabBarLabel: "Communities",
            title: "",
            headerShown: false,

            tabBarIcon: ({ size }) => {
              return (
                <Icon source="account-group" size={size} color="#F2055C" />
              );
            },
          }}
          initialParams={{ userInfo }}
        >
          {(props) => <CommunitiesStack {...props} user={userInfo} />}
        </Tab.Screen>

        <Tab.Screen
          name="ChatScreen"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ size }) => {
              return <Icon source="chat" size={size} color="#F2055C" />;
            },
          }}
        >
          {(props) => (
            <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Tab.Screen>
        {isLoggedIn ? (
          <Tab.Screen
            name="UserInfo"
            options={{
              title: "User profile",
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <Icon source="account-circle" size={size} color={color} />
                );
              },
            }}
            initialParams={{ isLoggedIn, user, userInfo }}
          >
            {(props) => (
              <UserInfo
                {...props}
                isLoggedIn={isLoggedIn}
                user={user}
                userInfo={userInfo}
              />
            )}
          </Tab.Screen>
        ) : (
          <></>
        )}
      </Tab.Navigator>
    </PaperProvider>
  );
}

export default MainPage;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F2055C",
  },
});
