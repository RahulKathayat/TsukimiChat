import { StyleSheet, Text, View ,Pressable,ScrollView, Alert} from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Pressable onPress={()=>{Alert.alert("Made with love ❤️, Rahul Kathayat","Fun Fact : The Japanese kanji Tsukimi, is a Moon viewing festival in Japan. Developer decided to go with this name because he began developing this app on a Full moon , nothing fancy.")}}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tsukimi Chat</Text>
        </Pressable>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friend Requests")}
            name="people-outline"
            size={24}
            color="black"
          />
          <Pressable
            onPress={()=>{navigation.replace("Login"); AsyncStorage.clear(); 
            Alert.alert("Logged Out Successfully","Hope to see you soon :) "); }}
            style={{
              width: 90,
              backgroundColor: "#88304E",
              padding: 4,
              borderRadius: 50,
              marginLeft:10
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Log out
            </Text>
          </Pressable>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`https://tsukimibackend.onrender.com/users/${userId}`)
        .then((response) => {
          setUsers(response.data.reverse());
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  //console.log("users", users);
  return (
    <View >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 13 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});