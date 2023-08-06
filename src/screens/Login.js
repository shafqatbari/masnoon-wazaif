import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  SafeAreaView,
} from "react-native";

const Login = ({ navigation }) => {
  const [reLoad, setReLoad] = useState(0)


  useEffect(() => {


  }, []);



  return (

    <SafeAreaView
      style={{ flex: 1 }}
    >

      <View
        style={{ flex: 1 }}>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Login;
