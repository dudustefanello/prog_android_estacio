import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import StockLayount from "../../components/layount/stockLayount";
import ButtonStock from "../../components/ui/buttonStock";
import {ProductModel} from "../../database/models/product.model";
import db from "../../database/database";
import {SellItemModel, SellModel} from "../../database/models/sell.model";

const productStart: ProductModel[] = ProductModel.selectForSell()

const Sellers = () => {
    const [products, setproducts] = useState<ProductModel[]>(productStart);
    const [allPreco, setAllPreco] = useState(0);

    useEffect(() => {
        const total = productStart.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
        );
        setAllPreco(total);
    }, [products]);

    const somarProdutos = (index: number, mult: number = 1) => {
        const novosProdutos: ProductModel[] = [...products];
        if (novosProdutos[index].amount <= 0 && mult < 0) {
            return;
        }
        const valueUpdate = (novosProdutos[index].amount += mult);
        if (valueUpdate >= 0) {
            setproducts(novosProdutos);
        }
    };

    const saveValue = () => {
        db.withTransactionSync(() => {
            const sell = new SellModel();
            sell.insert(allPreco)

            for (const produto of products) {
                const sellItem = new SellItemModel(sell.id)
                sellItem.insert(produto.id, produto.amount, produto.price);
                ProductModel.decrementAmount(produto.id, produto.amount);
                console.log(produto);
            }
        })
    };

    return (
        <StockLayount title="Vendas">
            <ScrollView>
                <View style={styles.containerSellers}>
                    {products.map((product, index) => (
                        <SafeAreaView style={styles.layountProducts} key={index}>
                            <View style={styles.viewProducts}>
                                <Text>{product.name}</Text>
                                <Text>
                                    {`${product.amount} x ${product.price} = ${
                                        product.amount * product.price
                                    }`}
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
            </ScrollView>

            <View style={styles.totalPreco}>
                <Text>Total</Text>
                <Text>{`R$ ${allPreco}`}</Text>
            </View>

            <ButtonStock title="Salvar" onPress={saveValue}/>
        </StockLayount>
    );
};

const styles = StyleSheet.create({
    containerSellers: {
        width: "100%",
        alignItems: "flex-start",
        paddingHorizontal: 20,
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
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
    },
});

export default Sellers;
