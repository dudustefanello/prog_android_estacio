import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

type stockLayountProps = {
  title: string;
  children: React.ReactNode;
};

const StockLayount = ({ title, children }: stockLayountProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stockView}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
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
    paddingTop: 100,

  },
  stockView:{
    paddingHorizontal:20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 32,
    textAlign:'center'
  },
});

export default StockLayount;
