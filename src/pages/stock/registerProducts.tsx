import React, {useEffect, useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import StockLayout from "../../components/layout/stockLayout";
import ButtonStock from "../../components/ui/buttonStock";
import {CategoryModel} from "../../database/models/category.model";
import {Picker} from "@react-native-picker/picker";
import {ProductModel} from "../../database/models/product.model";

const defaultProduct = {
    name: "",
    category: new CategoryModel(""),
    price: 0,
    amout: 0,
    validity: "",
}

const RegisterProducts = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [registerProducts, setRegisterProducts] = useState(defaultProduct);

    useEffect(() => {
        const loadCategories = () => {
            const categoryModels = CategoryModel.selectAll()
            setCategories(categoryModels);
        };
        loadCategories();
    }, []);

    const saveValueRegister = () => {
        const product = new ProductModel(registerProducts.name, registerProducts.price, registerProducts.amout);
        product.insert(registerProducts.category, registerProducts.validity);
        setRegisterProducts(defaultProduct)
    };

    return (
        <StockLayout title="Cadastro de Produtos">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerProducts}>
                    <View style={styles.fieldInput}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>Nome do Produto</Text>
                            <Text style={styles.required}>*</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            value={registerProducts.name}
                            onChangeText={(text) =>
                                setRegisterProducts({...registerProducts, name: text})
                            }
                            autoCapitalize="words"
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
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>Preço</Text>
                            <Text style={styles.required}>*</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            value={registerProducts.price.toString()}
                            onChangeText={(text) => {
                                const numericValue = text.replace(/[^0-9]/g, '');
                                setRegisterProducts({
                                    ...registerProducts,
                                    price: numericValue ? parseInt(numericValue) : 0
                                });
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.fieldInput}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>Quantidade</Text>
                            <Text style={styles.required}>*</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            value={registerProducts.amout.toString()}
                            onChangeText={(text) => {
                                const numericValue = text.replace(/[^0-9]/g, '');
                                setRegisterProducts({
                                    ...registerProducts,
                                    amout: numericValue ? parseInt(numericValue) : 0
                                });
                            }}
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
            </TouchableWithoutFeedback>
            <ButtonStock title="Registrar" onPress={saveValueRegister}/>
        </StockLayout>
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
        flexDirection: 'row',
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
    required: {
        color: 'red',
        marginLeft: 4,
    },
});

export default RegisterProducts;
