import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:"#928bc2",padding:10,alignItems:"center"}}>
      <KeyboardAvoidingView>
        <View style={{marginTop:100, justifyContent:"center" , alignItems:"center"}}>
            <Text style={{ fontSize: 20, fontWeight: "600" }} >Login</Text>
            <Text style={{ fontSize: 20, fontWeight: "600" , marginTop:15}} >Login to your Account</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
    
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({})