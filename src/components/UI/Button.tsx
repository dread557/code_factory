import { StyleSheet, Text, TouchableOpacity, ButtonProps } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/theme";

interface ButtonProp extends ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProp) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
  },
  title: {
    color: COLORS.white,
    fontWeight: "500",
  },
});
