import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Switch,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook


const Create = () => {
  const navigation = useNavigation(); // Get navigation object

  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [repeatMode, setRepeatMode] = useState("daily");
  const [reminder, setReminder] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: repeatMode,
        reminder: reminder,
        days: selectedDays,
      };

      const response = await axios.post(
        "http://10.5.73.68:3000/habits",
        habitDetails
      );

      if (response.status === 200) {
        setTitle("");
        setSelectedColor("");
        setRepeatMode("daily");
        setReminder(false);
        setSelectedDays([]);
        Alert.alert("Habit added successfully", "Enjoy Practicing");
      }

      console.log("habit added", response);
    } catch (error) {
      console.log("error adding a habit", error);
    }
  }

  const toggleDay = (day) => {
    const index = selectedDays.indexOf(day);
    if (index !== -1) {
      setSelectedDays((prevDays) =>
        prevDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays((prevDays) => [...prevDays, day]);
    }
  };

  return (
    <ScrollView style={{ padding: 10, backgroundColor:"#497abf"}}>
<TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE",
        }}
        placeholder="Title"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: repeatMode === "daily" ? "#AFDBF5" : "#E0E0E0",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
          onPress={() => setRepeatMode("daily")}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: repeatMode === "weekly" ? "#AFDBF5" : "#E0E0E0",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
          onPress={() => setRepeatMode("weekly")}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>On these days</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {days?.map((item, index) => (
          <Pressable
            onPress={() => toggleDay(item)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: selectedDays.includes(item)
                ? "#AFDBF5"
                : "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={reminder ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setReminder(!reminder)}
          value={reminder}
        />
      </View>

      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({});
