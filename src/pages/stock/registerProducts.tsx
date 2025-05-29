import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import StockLayount from "../../components/layount/stockLayount";

const RegisterProducts = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [validity, setValidity] = useState("");

  return (
    <StockLayount title="Cadastro de Produtos">
      <View style={styles.containerProducts}>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            value={nameProduct}
            onChangeText={setNameProduct}
          />
        </View>
        <View  style={styles.fieldInput}>
          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Data de Validade</Text>
          <TextInput
            style={styles.input}
            value={validity}
            onChangeText={setValidity}
          />
        </View>
      </View>
    </StockLayount>
  );
};

const styles = StyleSheet.create({
  containerProducts: {
    width: 'auto',
    alignItems: "center",
    gap: 20,
    
  },
  fieldInput: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft:10,
    backgroundColor: "#f9f9f9",
  },
});

export default RegisterProducts;
