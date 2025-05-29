import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StockLayount from "../../components/layount/stockLayount";

type products = {
  nome: string;
  quantidade: number;
  preco: number;
};

const productStart: products[] = [
  { nome: "Salgado", quantidade: 0, preco: 20 },
  { nome: "Energético", quantidade: 0, preco: 40 },
  { nome: "alface", quantidade: 0, preco: 10 },
];

const Sellers = () => {
  const [products, setproducts] = useState<products[]>(productStart);
  const [allPreco, setAllPreco] = useState(0);

  useEffect(() => {
    const total = products.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    setAllPreco(total);
  }, [products]);

  const somarProdutos = (index: number, mult: number = 1) => {
    const novosProdutos = [...products];
    novosProdutos[index].quantidade += 1 * mult;
    setproducts(novosProdutos);
  };

  return (
    <StockLayount title="Vendas">
      <View style={styles.containerSellers}>
        {products.map((product, index) => (
          <SafeAreaView style={styles.layountProducts} key={index}>
            <View style={styles.viewProducts}>
              <Text>
                {product.nome}
              </Text>
              <Text>
                {`${product.quantidade} x ${product.preco} = ${product.quantidade * product.preco}`}
              </Text>
            </View>
            <View style={styles.viewQuantidade}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => somarProdutos(index, -1)}
              >
                <Text style={styles.sinal}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => somarProdutos(index)}
              >
                <Text style={styles.sinal}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divisor}></View>
          </SafeAreaView>
        ))}
      </View>

      <View style={styles.totalPreco}>
        <Text>Total</Text>
        <Text>{`R$ ${allPreco}`}</Text>
      </View>
    </StockLayount>
  );
};

const styles = StyleSheet.create({
  containerSellers: {
    width: "80%",
    alignItems: "flex-start",
  },
  layountProducts: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  viewProducts: {
    flexDirection: "column",
    gap: 8,
  },
  viewQuantidade: {
    flexDirection: "row",
    gap: 8,
  },
  botao: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd4",
    justifyContent: "center",
    alignItems: "center",
  },
  sinal: {
    fontSize: 20,
    fontWeight: "medium",
  },
  divisor: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    bottom: 0,
  },
  totalPreco: {
    marginTop:10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
});

export default Sellers;
