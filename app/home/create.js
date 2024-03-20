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
    "#FF6868", // Red
    "#F5DD61", // Gold
    "#F6D6D6",
    "#86A7FC", // Medium Purple
    "#58A399", // Lime Green
    "#8E8FFA", // Tomato
    "#F875AA", // Royal Blue
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
        "http://10.5.72.63:3000/habits",
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
    <ScrollView style={{ paddingLeft:20, paddingRight:20, backgroundColor:"#222831"}}>
<TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={44} color="white" />
      </TouchableOpacity>
      <Text style={{ fontSize: 40,color:'#EEEEEE', padding: 90, fontWeight:"bold", marginTop: 10 }}>
        Create <Text style={{ fontSize: 40, fontWeight:"bold", color:'#EEEEEE' }}>Habit</Text>
      </Text>
      <View style={{ display: 'flex', justifyContent:"center", alignItems:'center' }}>
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
        <Text style={{ fontSize: 18, color:'#EEEEEE', fontSize:25, paddingTop: 30, fontWeight: "500" }}>Give your habit a color</Text>
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
                <AntDesign name="plussquare" size={55} color={item} />
              ) : (
                <FontAwesome name="square" size={55} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{width: "96%"}}>
      <Text style={{ fontSize: 18, color:'#EEEEEE', fontSize:25, alignSelf:"flex-start", fontWeight: "500"  }}>Repeat</Text>
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
      </View>
          <View  style={{width: '95%'}}>
      <Text style={{ fontSize: 18, color:'#EEEEEE', fontSize:25, alignSelf:"flex-start", fontWeight: "500"  }}>On these days</Text>

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
              width: 47,
              height: 47,
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
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
        <Text style={{ fontSize: 18, color:'#EEEEEE', fontSize:25, alignSelf:"flex-start", fontWeight: "500"  }}>Reminder</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={reminder ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setReminder(!reminder)}
          value={reminder}
        />
        </View>
      </View>

      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#76ABAE",
          paddingVertical: 20,
          width:400,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: "center", fontSize:25, color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
      </View>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({});
