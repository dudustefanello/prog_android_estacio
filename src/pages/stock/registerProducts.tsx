import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import StockLayount from "../../components/layount/stockLayount";
import ButtonStock from "../../components/ui/buttonStock";

const RegisterProducts = () => {
  const [registerProducts, setRegisterProducts] = useState({
    name: "",
    category: "",
    value: "",
    amout: "",
    validity: "",
  });

  const saveValueRegister = () => {
    console.log(registerProducts);
    
  };

  return (
    <StockLayount title="Cadastro de Produtos">
      <View style={styles.containerProducts}>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            value={registerProducts.name}
            onChangeText={(text) =>
              setRegisterProducts({ ...registerProducts, name: text })
            }
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            value={registerProducts.category}
            onChangeText={(text) =>
              setRegisterProducts({ ...registerProducts, category: text })
            }
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={registerProducts.value}
            onChangeText={(text) =>
              setRegisterProducts({ ...registerProducts, value: text })
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            value={registerProducts.amout}
            onChangeText={(text) =>
              setRegisterProducts({ ...registerProducts, amout: text })
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.fieldInput}>
          <Text style={styles.label}>Data de Validade</Text>
          <TextInput
            style={styles.input}
            value={registerProducts.validity}
            onChangeText={(text) =>
              setRegisterProducts({ ...registerProducts, validity: text })
            }
          />
        </View>
      </View>
      <ButtonStock title="Registrar" onPress={saveValueRegister} />
    </StockLayount>
  );
};

const styles = StyleSheet.create({
  containerProducts: {
    width: "auto",
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
    paddingLeft: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default RegisterProducts;
