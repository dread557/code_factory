import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/theme";
import { Feather, Entypo, EvilIcons } from "@expo/vector-icons";
import Button from "../components/UI/Button";
import { Props } from "../../App";
import { useSignIn } from "@clerk/clerk-expo";

const Login = ({ navigation }: Props) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [auth, setAuth] = useState({
    emailAddress: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string, name: string) => {
    setAuth({ ...auth, [name]: value });
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    const { emailAddress, password } = auth;
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });
      console.log(completeSignIn);

      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image source={require("../../assets/images/sitting.png")} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.headerSubText}>Login with social networks</Text>
          <View style={styles.socials}>
            <View style={styles.socialsBox}>
              <EvilIcons name="sc-facebook" size={30} color="#fff" />
            </View>
            <View style={styles.socialsBox}>
              <Feather name="instagram" size={24} color="#fff" />
            </View>
            <View style={styles.socialsBox}>
              <EvilIcons name="sc-google-plus" size={30} color="#fff" />
            </View>
          </View>
        </View>
        <View style={styles.authBox}>
          <TextInput
            style={styles.input}
            value={auth.emailAddress}
            placeholder="Email"
            onChangeText={(value) => handleChange(value, "emailAddress")}
          />
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.input}
              value={auth.password}
              placeholder="Password"
              onChangeText={(value) => handleChange(value, "password")}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={18}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.forgotPass}>Forgot Password?</Text>
          <Button
            title={loading ? "Loading..." : "Login"}
            disabled={loading}
            onPress={() => onSignInPress()}
          />
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("signup")}
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.dark,
  },
  headerSubText: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  socials: {
    gap: 8,
    flexDirection: "row",
  },
  socialsBox: {
    backgroundColor: COLORS.secondary,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  authBox: {
    marginTop: 16,
    gap: 16,
  },
  passwordBox: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: 20,
    top: "30%",
  },
  input: {
    borderColor: COLORS.gray,
    height: 53,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: COLORS.darkGray,
  },
  forgotPass: {
    color: COLORS.darkGray,
    textAlign: "center",
    fontWeight: "500",
  },
  signUp: {
    textAlign: "center",
    color: COLORS.darkGray,
    fontWeight: "500",
  },
});
