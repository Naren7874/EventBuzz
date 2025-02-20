"use client";
import { useOAuth } from "@clerk/clerk-expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Import Ionicons for the close button
import { useRouter } from "expo-router";
import { View, TextInput, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });

  const onSelectAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.push("/(tabs)/profile");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  // Function to handle closing the modal
  const handleClose = () => {
    router.back(); // Navigate back to the previous screen (index page)
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-4 right-4 z-10"
        >
          <Ionicons name="close-outline" size={28} color="#6b7280" />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="items-center mb-10 mt-10">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
          <Text className="text-gray-500 text-center">Sign in to continue to your account</Text>
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            placeholder="Enter your email"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50"
            placeholderTextColor="#6b7280"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Password</Text>
          <TextInput
            placeholder="Enter your password"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50"
            placeholderTextColor="#6b7280"
            secureTextEntry
          />
          <TouchableOpacity className="mt-2">
            <Text className="text-blue-500 text-right">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity className="h-12 bg-blue-500 rounded-lg items-center justify-center mb-4">
          <Text className="text-white font-semibold text-base">Sign In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-4 text-gray-500">or</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity
          className="h-12 border border-gray-300 gap-2 rounded-lg flex-row items-center justify-center space-x-3 bg-white"
          onPress={onSelectAuth}
        >
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text className="text-gray-700 font-medium">Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(modals)/signup")}>
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;