import React, {useState} from "react";
import {View, TextInput, StyleSheet, SafeAreaView, Text} from "react-native";
import CustomButton from "../../components/ui/customButton";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {useStage} from "../../global/stages";
import {UserModel} from "../../database/models/user";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
    const navigation = useNavigation<NavigationProp>();
    const {setIsLoggedIn} = useStage();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = () => {
        if (email.length != 0 && senha.length != 0) {
            const user = new UserModel(email, senha);
            if (user.login())
                setIsLoggedIn(true);
            else
                console.warn('Login falhou: Email ou senha incorretos');
        } else
            console.warn("Valor necessario");
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>
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
        <CustomButton title="Login" onPress={handleLogin} />
        <CustomButton
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
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

export default Login;
