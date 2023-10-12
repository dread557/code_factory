import { StyleSheet, Text, View, Image } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../../constants/theme";

const slides = [
  {
    id: 1,
    title: "Learn anytime and anywhere",
    desc: "Quarantine is the perfect time to spend your day learning something new, from anywhere!",
    image: require("../../assets/images/slide1.png"),
  },
  {
    id: 2,
    title: "Find a course for you",
    desc: "Quarantine is the perfect time to spend your day learning something new, from anywhere!",
    image: require("../../assets/images/slide2.png"),
  },
  {
    id: 3,
    title: "Improve your skills",
    desc: "Quarantine is the perfect time to spend your day learning something new, from anywhere!",
    image: require("../../assets/images/slide3.png"),
  },
];

interface OnboardingProps {
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
}

const Onboarding = ({ setShowHomePage }: OnboardingProps) => {
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => (
        <View style={styles.slideWrapper}>
          <Image
            style={styles.slideImage}
            source={item.image}
            resizeMode="contain"
          />
          <Text style={styles.slideHeaderText}>{item.title}</Text>
          <Text style={styles.slideBodyText}>{item.desc}</Text>
        </View>
      )}
      activeDotStyle={{
        backgroundColor: COLORS.secondary,
        width: 25,
      }}
      bottomButton
      onDone={() => setShowHomePage(true)}
    />
  );
};

export default Onboarding;
const styles = StyleSheet.create({
  slideWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  slideImage: {
    marginBottom: 16,
  },
  slideHeaderText: {
    fontSize: SIZES.xLarge,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 32,
    letterSpacing: -0.5,
    width: 200,
    color: COLORS.dark,
    fontFamily: "Rubik",
  },
  slideBodyText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Rubik",
    marginTop: 8,
  },
  nextBtn: {
    // width: 100,
    // backgroundColor: COLORS.primary,
    // height: 56,
    // borderRadius: 16,
  },
  nextBtnText: {
    // color: COLORS.white,
    fontWeight: "500",
    fontSize: 16,
  },
});
