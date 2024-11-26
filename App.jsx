import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
import { Icon } from "react-native-elements";

const colors = ["#1E2240", "#1E2240", "#1E2240"];
export default function App() {
  const [isWorking, setIsWorking] = useState(true);
  const [config, setConfig] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  const [number, onChangeNumber] = React.useState("");
  const [color, setColor] = React.useState("");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[stylesApp.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={stylesApp.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer
          time={time}
          currentTime={currentTime}
          handleStartStop={handleStartStop}
          isActive={isActive}
        />

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => setConfig((prev) => !prev)}
        >
          <Icon name="settings" color="#D7E0FF" />
        </TouchableOpacity>
      </View>
      {config && (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "95%",
              maxHeight: "100%",
              overflow: "auto",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                padding: 40,
                borderBottomColor: "#ededed",
                borderBottomWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "#161932" }}
              >
                Settings
              </Text>

              <TouchableOpacity onPress={() => setConfig((prev) => !prev)}>
                <Text style={{ fontSize: 20 }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 40 }}>
              <View
                style={{
                  borderBottomColor: "#ededed",
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#161932",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  TIME (MINUTES)
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#1E213F", marginBottom: 10 }}>
                      pomodoro
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: "#EFF1FA",
                        borderRadius: 10,
                        padding: 15,
                      }}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="25"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#1E213F", marginBottom: 10 }}>
                      short break
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: "#EFF1FA",
                        borderRadius: 10,
                        padding: 15,
                      }}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="15"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#1E213F", marginBottom: 10 }}>
                      long break
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: "#EFF1FA",
                        borderRadius: 10,
                        padding: 15,
                      }}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="5"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "#ededed",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <View style={{ width: 40 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#161932",
                      fontWeight: "bold",
                      flex: 0,
                    }}
                  >
                    FONT
                  </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#161932",
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>Aa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EFF1FA",
                      borderRadius: 10,
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#1E213F" }}>Aa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EFF1FA",
                      borderRadius: 10,
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#1E213F" }}>Aa</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <View style={{ width: 50 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#161932",
                      fontWeight: "bold",
                      flex: 0,
                    }}
                  >
                    COLOR
                  </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      stylesApp.theme.bg = "#F87070";
                      setColor("#F87070");
                    }}
                    style={{
                      backgroundColor: "#F87070",
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: `${
                        color === "#F87070" ? "#000" : "#F87070"
                      }`,
                    }}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      stylesApp.theme.bg = "#70F3F8";
                      setColor("#70F3F8");
                    }}
                    style={{
                      backgroundColor: "#70F3F8",
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: `${
                        color === "#70F3F8" ? "#000" : "#70F3F8"
                      }`,
                    }}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      stylesApp.theme.bg = "#D881F8";
                      setColor("#D881F8");
                    }}
                    style={{
                      backgroundColor: "#D881F8",
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: `${
                        color === "#D881F8" ? "#000" : "#D881F8"
                      }`,
                    }}
                  ></TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 140,
                  height: 53,
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: stylesApp.theme.bg,
                  borderRadius: 30,
                  position: "relative",
                  bottom: -25,
                }}
                onPress={() => setConfig((prev) => !prev)}
              >
                <Text style={{ color: "white" }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export const stylesApp = {
  container: {
    flex: 1,
  },
  theme: {
    bg: "#F87070",
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#333333",
    alignItems: "center",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
};
