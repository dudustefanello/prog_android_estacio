import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StockLayount from "../../components/layount/stockLayount";

const Sellers = () => {
  return (
    <StockLayount title="Vendas">
      <View style={styles.containerSellers}>
        <Text>Teste</Text>
      </View>
    </StockLayount>
  );
};

const styles = StyleSheet.create({
  containerSellers: {
    width: '80%',
    alignItems: "center",
    gap: 20,
    
  },
});

export default Sellers;
