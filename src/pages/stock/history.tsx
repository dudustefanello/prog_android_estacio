import React from "react";
import { Text, View,StyleSheet } from "react-native";
import StockLayount from "../../components/layount/stockLayount";

const History = () => {
  return (
    <StockLayount title="Histórico">
      <View  style={styles.containerHistory}>
        <Text>Teste</Text>
      </View>
    </StockLayount>
  );
};

const styles = StyleSheet.create({
  containerHistory: {
    width: '80%',
    alignItems: "center",
    gap: 20,
    
  },
});

export default History;
