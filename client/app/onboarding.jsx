import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/(tabs)");
  };

  return (
    <Onboarding
      onDone={completeOnboarding}
      onSkip={completeOnboarding}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Text style={styles.emoji}>🎉</Text>,
          title: "Welcome to EventBuzz",
          subtitle: "Find and manage events easily!",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Text style={styles.emoji}>📅</Text>,
          title: "Organize Events",
          subtitle: "Create and manage events in one place!",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Text style={styles.emoji}>🚀</Text>,
          title: "Get Started",
          subtitle: "Join the community and explore now!",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  emoji: { fontSize: 50, textAlign: "center", marginBottom: 20 },
});

export default OnboardingScreen;
