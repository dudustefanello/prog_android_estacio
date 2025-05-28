import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

type stockLayountProps = {
  title: string;
  children: React.ReactNode;
};

const StockLayount = ({ title, children }: stockLayountProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100
  },
  title: {
    fontWeight: "bold",
    marginBottom: 50,
    fontSize: 32,
  },
});

export default StockLayount;
