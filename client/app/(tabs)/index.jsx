import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    { id: "1", title: "Tech Fest 2024", date: "2024-03-15" },
    { id: "2", title: "Cultural Fest 2024", date: "2024-04-20" },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search events or clubs"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/tabs/event/${item.id}`)}>
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// ✅ React Native Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
  },
  eventTitle: {
    fontSize: 16,
  },
  eventDate: {
    color: "gray",
  },
});

export default HomeScreen;
