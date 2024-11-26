import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { stylesApp } from "../../App";

const options = ["Pomodoro", "Short Break", "Long Break"];
export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 30,
        backgroundColor: "#161B30",
        padding: 5,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={
            [
              styles.itemStyle,
              currentTime === index && { backgroundColor: stylesApp.theme.bg },
            ] // con esto solo tiene el border el componente seleccionado por el index
          }
          onPress={() => handlePress(index)}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: currentTime === index ? "#161B30" : "white",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
    height: 40,
  },
});
