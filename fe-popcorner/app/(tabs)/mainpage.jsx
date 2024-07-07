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
import EventScreen from "./EventScreen";
import ChatScreen from "./ChatScreen";
import CommunitiesScreen from "../../screens/CommunitiesScreen";
import { CommunitiesList } from "./CommunitiesList";
import CommunityDetails from "./CommunityDetails";
import CreateCommunity from "./CreateCommunity";
import { Header } from "../../components/Header";
import { BottomNavigation, Icon, PaperProvider } from "react-native-paper";
import { getUser } from "../../utils/api";

import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();
// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CommunitiesStack = ({ user }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="CommunitiesList"
      component={CommunitiesList}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="CommunityDetails" options={{ headerShown: false }}>
      {(props) => <CommunityDetails {...props} user={user} />}
    </Stack.Screen>
    <Stack.Screen name="CreateCommunity">
      {(props) => <CreateCommunity {...props} user={user} />}
    </Stack.Screen>
  </Stack.Navigator>
);

function MainPage({
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
  setUserInfo,
  userInfo,
  newUserInput,
}) {
  useEffect(() => {
    if (user && user.username) {
      getUser(user.username)
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
          userInfo={userInfo} // Pass userInfo to Header
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
            tabBarIcon: ({ color, size }) => {
              return <Icon source="home" size={size} color={color} />;
            },
          }}
        >
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="ChatScreen"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => {
              return <Icon source="chat" size={size} color={color} />;
            },
          }}
          initialParams={{ isLoggedIn, user }}
        >
          {(props) => (
            <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Communities"
          options={{
            tabBarLabel: "Communities",
            title: "",
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon source="account-supervisor" size={size} color={color} />
              );
            },
          }}
          initialParams={{ user }}
        >
          {(props) => <CommunitiesStack {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen
            name="EventScreen"
            options={{ title: "Events" }}
            initialParams={{ isLoggedIn, user }}
            >
            {(props) => (
              <EventScreen {...props} isLoggedIn={isLoggedIn} user={user} />
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
    </PaperProvider>
  );
}

export default MainPage;
