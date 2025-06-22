import React, {useState} from "react";
import {View, TextInput, StyleSheet, SafeAreaView, Text} from "react-native";
import CustomButton from "../../components/ui/customButton";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {UserModel} from "../../database/models/user.model";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Register = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegister = () => {
        const user = new UserModel(email, senha);
        user.register();
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />
                <CustomButton title="Registrar" onPress={handleRegister}/>
                <CustomButton title="Voltar" onPress={() => navigation.navigate('Login')}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    loginBox: {
        width: 200,
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 20,
        backgroundColor: "#f9f9f9",
    },
});

export default Register;
