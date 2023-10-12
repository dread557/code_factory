import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignOut from "../src/screens/SignOut";
import SignUp from "../src/screens/SignUp";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",

        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "tomato",
        },
      }}
    >
      <Tab.Screen
        name="Courses"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="library" size={24} color={COLORS.primary} />
          ),
        }}
      >
        {() => <SignOut />}
      </Tab.Screen>

      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
