import React from "react";
import {Text, View, StyleSheet, FlatList, SafeAreaView} from "react-native";
import {ProductModel} from "../../database/models/product.model";
import {SellModel} from "../../database/models/sell.model";

const History = () => {
    const dataProducts: ProductModel[] = ProductModel.selectForHistory()
    const dataSells: SellModel[] = SellModel.selectForHistory()

    const renderItemProdutos = ({item}: { item: ProductModel }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, {flex: 0.5, color: 'black'}]}>{item.id}</Text>
            <Text style={[styles.cell, {flex: 2, color: 'black'}]}>{item.name}</Text>
            <Text style={[styles.cell, {flex: 1.5, color: 'black'}]}>{item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</Text>
            <Text style={[styles.cell, {flex: 1.5, color: 'black'}]}>{item.amount}</Text>
        </View>
    );

    const renderItemSells = ({item}: { item: SellModel }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, {flex: 0.5, color: 'black'}]}>{item.id}</Text>
            <Text style={[styles.cell, {flex: 3, color: 'black'}]}>{item.date?.toLocaleString('pt-BR')}</Text>
            <Text style={[styles.cell, {flex: 2, color: 'black'}]}>{item.total?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Produtos</Text>
            <View style={styles.tableContainer}>
                <View style={styles.header}>
                    <Text style={[styles.headerCell, {flex: 0.5}]}>Id.</Text>
                    <Text style={[styles.headerCell, {flex: 2}]}>Data</Text>
                    <Text style={[styles.headerCell, {flex: 1.5}]}>Preço</Text>
                    <Text style={[styles.headerCell, {flex: 1.5}]}>Estoque</Text>
                </View>
                <FlatList
                    data={dataProducts}
                    renderItem={renderItemProdutos}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            </View>
            <Text style={styles.title}>Vendas</Text>
            <View style={styles.tableContainer}>
                <View style={styles.header}>
                    <Text style={[styles.headerCell, {flex: 0.5}]}>Id</Text>
                    <Text style={[styles.headerCell, {flex: 3}]}>Data</Text>
                    <Text style={[styles.headerCell, {flex: 2}]}>Total</Text>
                </View>
                <FlatList
                    data={dataSells}
                    renderItem={renderItemSells}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 2,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    tableContainer: {
        flex: 1,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    headerCell: {
        flex: 1,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: 'black', // Garante que o texto seja preto
    },
    listContent: {
        flexGrow: 1,
    }
});

export default History;