import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, ALert } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "9251e9799386b7b05bfcb92ec5c65886";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const { data: { main: { temp }, weather } } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({ isLoading: false, condition: weather[0].main, temp })
  };


  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      // Send to API and get weather 
      this.getWeather(latitude, longitude)


    } catch (error) {
      Alert.alert("사용불가능", "먼저 핸드폰 위치 사용을 허용 해주세요");
    }


  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (<Loading />) : <Weather temp={Math.round(temp)} condition={condition} />;
  }

}
