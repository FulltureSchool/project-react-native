import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { stylesApp } from "../../App";

export default function Timer({
  time,
  handleStartStop,
  isActive,
  currentTime,
}) {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  function totalSeconds(time) {
    var parts = time.split(":");
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  const newTime = currentTime === 0 ? 25 : currentTime === 1 ? 5 : 15;

  let now = totalSeconds(`00:00:00`) - totalSeconds(`00:${formattedTime}`);

  let totalTime =
    totalSeconds(`00:00:00`) -
    (totalSeconds(`00:00:00`) - totalSeconds(`00:${newTime}:00`));

  let progress =
    now - (totalSeconds(`00:00:00`) - totalSeconds(`00:${newTime}:00`));
  let percentage = ((progress / totalTime) * 100).toFixed(0);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={280}
        width={6}
        fill={+percentage}
        tintColor={stylesApp.theme.bg}
      >
        {(fill) => (
          <View style={styles.time}>
            <Text style={{ color: "white", fontSize: 80, fontWeight: "bold" }}>
              {formattedTime}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleStartStop}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {isActive ? "STOP" : "START"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "8rem 0 5rem",
    width: 300,
    height: 300,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 1000,
    backgroundColor: "#161932",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to bottom right, #0e112a, #2e325a)",
    boxShadow: "-5px -5px 10px 0 #272c5a, 5px 5px 10px 0 #121530",
    borderRadius: "50%",
    color: "white",
  },
  time: {
    width: 250,
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 1000,
    color: "white",
    backgroundColor: "#0e112a",
    position: "relative",
  },
});
