import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Modal} from "react-native";
import StockLayount from "../../components/layount/stockLayount";
import ButtonStock from "../../components/ui/buttonStock";
import {CategoryModel} from "../../database/models/category.model";
import {Picker} from "@react-native-picker/picker";

const RegisterProducts = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [registerProducts, setRegisterProducts] = useState({
        name: "",
        category: new CategoryModel(""),
        value: "",
        amout: "",
        validity: "",
    });

    useEffect(() => {
        const loadCategories = () => {
            const categoryModels = CategoryModel.selectAll()
            setCategories(categoryModels);
        };
        loadCategories();
    }, []);

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
                            setRegisterProducts({...registerProducts, name: text})
                        }
                    />
                </View>
                <View style={styles.fieldInput}>
                    <Text style={styles.label}>Categoria</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={{paddingTop: 15}}>
                            {registerProducts.category.name || "Selecione uma categoria"}
                        </Text>
                    </TouchableOpacity>

                    <Modal
                        visible={showPicker}
                        transparent={true}
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerHeader}>
                                    <TouchableOpacity onPress={() => setShowPicker(false)}>
                                        <Text style={styles.pickerHeaderText}>Fechar</Text>
                                    </TouchableOpacity>
                                </View>
                                <Picker
                                    selectedValue={registerProducts.category.id}
                                    onValueChange={(itemValue) => {
                                        const selectedCategory = categories.find(cat => cat.id === itemValue);
                                        if (selectedCategory) {
                                            setRegisterProducts({...registerProducts, category: selectedCategory});
                                        }
                                        setShowPicker(false);
                                    }}
                                    itemStyle={{color: 'black', fontSize: 16}} // Adiciona cor e tamanho aos itens
                                >
                                    <Picker.Item label="Selecione uma categoria" value={0}/>
                                    {categories.map(category => (
                                        <Picker.Item
                                            key={category.id}
                                            label={category.name}
                                            value={category.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.fieldInput}>
                    <Text style={styles.label}>Valor</Text>
                    <TextInput
                        style={styles.input}
                        value={registerProducts.value}
                        onChangeText={(text) =>
                            setRegisterProducts({...registerProducts, value: text})
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
                            setRegisterProducts({...registerProducts, amout: text})
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
                            setRegisterProducts({...registerProducts, validity: text})
                        }
                    />
                </View>
            </View>
            <ButtonStock title="Registrar" onPress={saveValueRegister}/>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    pickerContainer: {
        backgroundColor: 'white',
        paddingBottom: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    pickerHeader: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8'
    },
    pickerHeaderText: {
        color: '#007AFF',
        fontSize: 16,
        textAlign: 'right'
    },
});

export default RegisterProducts;
