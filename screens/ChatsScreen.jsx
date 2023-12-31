import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
import React, { useContext,useEffect,useState,useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";


const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [reload, setReload] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons onPress={() => setReload([])} name="reload-outline" size={28} color="black" />
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `https://tsukimibackend.onrender.com/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data.reverse());
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, [reload]);
  console.log("friends",acceptedFriends)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
          {acceptedFriends.map((item,index) => (
              <UserChat key={index} item={item}/>
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});