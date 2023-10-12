import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/theme";
import Button from "../components/UI/Button";
import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Props } from "../../App";
import { useSignUp } from "@clerk/clerk-expo";
import {
  ValidateEmail,
  ValidateName,
  validatePassword,
} from "../../utils/validations";

interface FormProps {
  name: string;
  emailAddress: string;
  password: string;
  nameIsValid: boolean;
  emailIsValid: boolean;
  passwordIsValid: boolean;
  nameIsFocus: boolean;
  emailIsFocus: boolean;
  passwordIsFocus: boolean;
}

const initialFormState: FormProps = {
  name: "",
  emailAddress: "",
  password: "",
  nameIsValid: false,
  emailIsValid: false,
  passwordIsValid: false,
  nameIsFocus: false,
  emailIsFocus: false,
  passwordIsFocus: false,
};

const SignUp = ({ navigation }: Props) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState<FormProps>(initialFormState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ hasError: boolean; message: string }>({
    hasError: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const emailOnChangeHandler = (value: string) => {
    setForm((prev) => ({
      ...prev,
      emailAddress: value,
      emailIsValid: ValidateEmail(value),
    }));
  };

  const nameOnChangeHandler = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      nameIsValid: ValidateName(value),
    }));
  };
  const passwordOnChangeHandler = (value: string) => {
    setForm((prev) => ({
      ...prev,
      password: value,
      passwordIsValid: validatePassword(value),
    }));
  };

  const emailOnBlurHandler = () => {
    setForm((prev) => ({ ...prev, emailIsFocus: true }));

    const isValid = ValidateEmail(form.emailAddress);
    setForm((prev) => ({ ...prev, emailIsValid: isValid }));
  };

  const nameOnBlurHandler = () => {
    setForm((prev) => ({ ...prev, nameIsFocus: true }));

    const isValid = ValidateName(form.name);
    setForm((prev) => ({ ...prev, nameIsValid: isValid }));
  };
  const passwordOnBlurHandler = () => {
    setForm((prev) => ({ ...prev, passwordIsFocus: true }));

    const isValid = validatePassword(form.password);
    setForm((prev) => ({ ...prev, passwordIsValid: isValid }));
  };

  const verificationSuccessToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Account succesfully verified!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    const { emailAddress, password, name } = form;
    setIsLoading((prev) => true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError((prev) => ({ hasError: true, message: error.message }));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      verificationSuccessToast();
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image source={require("../../assets/images/standing.png")} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign up</Text>
          {pendingVerification ? (
            <Text style={styles.headerSubText}>
              Check your mail for verification code
            </Text>
          ) : (
            <Text style={styles.headerSubText}>Create your account</Text>
          )}
        </View>
        <View style={styles.authBox}>
          {!pendingVerification ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChangeText={(value) => nameOnChangeHandler(value)}
                onBlur={nameOnBlurHandler}
              />
              {form.nameIsFocus && !form.nameIsValid && (
                <Text style={styles.error}> Name too short</Text>
              )}
              <TextInput
                style={styles.input}
                value={form.emailAddress}
                placeholder="Email"
                onChangeText={(value) => emailOnChangeHandler(value)}
                onBlur={emailOnBlurHandler}
              />
              {form.emailIsFocus && !form.emailIsValid && (
                <Text style={styles.error}> Please enter a valid email</Text>
              )}
              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.input}
                  value={form.password}
                  placeholder="Password"
                  onChangeText={(value) => passwordOnChangeHandler(value)}
                  onBlur={passwordOnBlurHandler}
                  secureTextEntry={showPassword}
                />
                {form.passwordIsFocus && !form.passwordIsValid && (
                  <Text style={styles.error}>Password too short</Text>
                )}
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
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </>
          )}

          <Button
            title={pendingVerification ? "Verify email" : "Sign up"}
            disabled={
              !form.emailIsValid || !form.nameIsValid || !form.passwordIsValid
            }
            onPress={() => {
              pendingVerification ? onPressVerify() : onSignUpPress();
            }}
          />
          <Text
            style={styles.signIn}
            onPress={() => navigation.navigate("login")}
          >
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  error: {
    color: "red",
    fontSize: 14,
  },
  signIn: {
    textAlign: "center",
    color: COLORS.darkGray,
    fontWeight: "500",
  },
});
