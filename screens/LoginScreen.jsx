import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState ,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res=await axios.get("https://tsukimibackend.onrender.com");
        console.log(res.data.message);
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Home");
        } else {
          // token not found , show the login screen itself
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://tsukimibackend.onrender.com/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        setLoading(false);
        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
      setLoading(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#424874",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FCD1D1", fontSize: 20, fontWeight: "600"}}>
            Log In
          </Text>

          <Text style={{ color:"#EEE0C9" ,fontSize: 16, fontWeight: "600", marginTop: 15 }}>
            Log in to your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                color: "white",
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"gray"}
              placeholder="enter your email ..."
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                color: "white",
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"gray"}
              placeholder="enter password ... "
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 150,
              backgroundColor: "#AA96DA",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 50,
            }}
          >
            {loading ? (
              <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Wait ...
            </Text>
            ) : (
              <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
            )}
            
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "#BDD2B6", fontSize: 16 }}>
              Dont't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});