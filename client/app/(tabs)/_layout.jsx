import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="wishlists"
        options={{
          tabBarLabel: "Wishlists",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="heart-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="message-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerShown:false,
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: "notifications",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="notifications-outline" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
