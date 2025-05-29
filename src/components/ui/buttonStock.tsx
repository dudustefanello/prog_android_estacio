import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const ButtonStock = ({ title, onPress }: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    width: "auto",
    marginTop:10,
    paddingVertical: 10,
    borderRadius:200
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});

export default ButtonStock;