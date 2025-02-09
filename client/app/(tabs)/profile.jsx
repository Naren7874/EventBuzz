"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? ""
  );
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(user?.imageUrl ?? "");

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setEmail(user.primaryEmailAddress?.emailAddress ?? "");
    setAvatar(user.imageUrl ?? "");
  }, [user]);

  // Save profile updates
  const onSaveUser = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await user.update({ firstName, lastName });
      setEdit(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Picture
  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        await user?.setProfileImage({ file: result.assets[0] });
        setAvatar(result.assets[0].uri);
        Alert.alert("Success", "Profile picture updated successfully");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        Alert.alert("Error", "Failed to update profile picture");
      } finally {
        setLoading(false);
      }
    }
  };

  // Logout Function
  const handleSignOut = async () => {
    await signOut();
    router.replace("/(modals)/login");
  };

  if (!isSignedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Please sign in to view your profile</Text>
        <Link href="/(modals)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/notifications")}>
          <Ionicons name="notifications-outline" size={26} />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity
          onPress={onCaptureImage}
          style={styles.changeAvatarButton}
        >
          <Text style={styles.changeAvatarText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            editable={edit}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            editable={edit}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} editable={false} />
        </View>
      </View>

      {edit ? (
        <TouchableOpacity
          onPress={onSaveUser}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setEdit(true)} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.logoutButton]}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: "#007AFF",
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
});

export default Profile;
