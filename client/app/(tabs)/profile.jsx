"use client"

import { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"

const Profile = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const [firstName, setFirstName] = useState(user?.firstName ?? "")
  const [lastName, setLastName] = useState(user?.lastName ?? "")
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress ?? "")
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(user?.imageUrl ?? "")

  useEffect(() => {
    if (!user) return
    setFirstName(user.firstName ?? "")
    setLastName(user.lastName ?? "")
    setEmail(user.primaryEmailAddress?.emailAddress ?? "")
    setAvatar(user.imageUrl ?? "")
  }, [user])

  const onSaveUser = async () => {
    if (!user) return
    setLoading(true)
    try {
      await user.update({ firstName, lastName })
      setEdit(false)
      Alert.alert("Success", "Profile updated successfully")
    } catch (error) {
      console.error("Error updating user:", error)
      Alert.alert("Error", "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setLoading(true)
      try {
        await user?.setProfileImage({ file: result.assets[0] })
        setAvatar(result.assets[0].uri)
        Alert.alert("Success", "Profile picture updated successfully")
      } catch (error) {
        console.error("Error updating profile picture:", error)
        Alert.alert("Error", "Failed to update profile picture")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut()
          router.replace("/(modals)/login")
        },
      },
    ])
  }

  if (!isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 p-6 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Please sign in to view your profile</Text>
        <Link href="/(modals)/login" asChild>
          <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg">
            <Text className="text-white  font-semibold text-lg">Go to Login</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-gray-200 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Profile</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/notifications")}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 pt-6">
        {/* Avatar Section */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image source={{ uri: avatar }} className="w-28 h-28 rounded-full" />
            <TouchableOpacity
              onPress={onCaptureImage}
              className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full items-center justify-center"
            >
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-lg font-semibold text-gray-800">
            {firstName} {lastName}
          </Text>
          <Text className="text-gray-500">{email}</Text>
        </View>

        {/* Form */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="mb-4">
            <Text className="text-gray-600 mb-2 font-medium">First Name</Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-gray-700 ${
                edit ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-50"
              }`}
              value={firstName}
              onChangeText={setFirstName}
              editable={edit}
              placeholder="Enter first name"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-2 font-medium">Last Name</Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-gray-700 ${
                edit ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-50"
              }`}
              value={lastName}
              onChangeText={setLastName}
              editable={edit}
              placeholder="Enter last name"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2 font-medium">Email</Text>
            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-3 text-gray-500 bg-gray-50"
              value={email}
              editable={false}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {edit ? (
          <TouchableOpacity
            onPress={onSaveUser}
            disabled={loading}
            className="bg-blue-500 rounded-lg py-4 items-center mb-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-lg">Save Changes</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEdit(true)} className="bg-blue-500 rounded-lg py-4 items-center mb-4">
            <Text className="text-white font-semibold text-lg">Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleSignOut} className="bg-red-500 rounded-lg py-4 items-center">
          <Text className="text-white font-semibold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

