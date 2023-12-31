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
  const [reload, setReload] = useState([]);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Pressable style={{flexDirection: "row" , gap: 5}} onPress={()=>{Alert.alert("Made with love ❤️, Rahul Kathayat","Fun Fact : The Japanese kanji Tsukimi, is a Moon viewing festival in Japan. Developer decided to go with this name because he began developing this app on a Full moon , nothing fancy.")}}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tsukimi Chat</Text>
        <Ionicons name="moon" size={20} color="black" />
        </Pressable>
        
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons onPress={() => setReload([])} name="reload-outline" size={24} color="black" />
          <MaterialIcons onPress={() => navigation.navigate("Chats")} name="message" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friend Requests")}
            name="people"
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
      setLoading(true);
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
      setLoading(false);
    };

    fetchUsers();
  }, [reload]);

  //console.log("users", users);
  return (
    <View >
      {loading? (<Text style={{padding:10}}>Loading....</Text>) :(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems:"center",padding: 13 }}>
          <Text style={{fontWeight:"600"}}>All Users of Tsukimi Chat</Text>
          {users.map((item, index) => (
            <User key={index} item={item} />
          ))}
        </View>
        </ScrollView>
      )}
      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});