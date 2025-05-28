import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 10,
    borderRadius:200
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;
