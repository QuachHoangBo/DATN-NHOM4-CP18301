import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const BookingStep1Screen = ({ navigation }) => {
  const [state, setState] = useState({
    fullName: null,
    email: null,
    mobileNumber: null,
    address: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { fullName, email, mobileNumber, address } = state;

  const handleNext = async () => {
    try {
      // Gọi API để tạo booking mới
      const response = await fetch("http://192.168.1.6:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_id_here", // Thay bằng id người dùng hiện tại
          carId: "car_id_here", // Thay bằng id của xe được chọn
          startTrip: "15 April, 4:00 pm",
          endTrip: "17 April, 12:30 am",
          paymentMethod: "Credit Card",
          amount: 600,
        }),
      });

      if (response.ok) {
        alert("Booking created successfully!");
        navigation.push("BookingScreen");
      } else {
        alert("Failed to create booking.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        >
          {progressIndicator()}
          {fullNameTextField()}
          {emailTextField()}
          {mobileNumberTextField()}
          {addressTextField()}
          {nextButton()}
        </ScrollView>
      </View>
    </View>
  );

  function nextButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("BookingStep2")}
        style={styles.nextButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Next</Text>
      </TouchableOpacity>
    );
  }

  function addressTextField() {
    return (
      <View style={styles.textFieldInfoWrapStyle}>
        <MaterialIcons
          name="location-pin"
          size={22}
          color={Colors.primaryColor}
          style={{ marginRight: Sizes.fixPadding }}
        />
        <TextInput
          value={address}
          onChangeText={(value) => updateState({ address: value })}
          placeholder="Address"
          placeholderTextColor={Colors.grayColor}
          style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function mobileNumberTextField() {
    return (
      <View style={styles.textFieldInfoWrapStyle}>
        <MaterialIcons
          name="phone-android"
          size={22}
          color={Colors.primaryColor}
          style={{ marginRight: Sizes.fixPadding }}
        />
        <TextInput
          value={mobileNumber}
          onChangeText={(value) => updateState({ mobileNumber: value })}
          placeholder="Mobile Number"
          placeholderTextColor={Colors.grayColor}
          style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function emailTextField() {
    return (
      <View style={styles.textFieldInfoWrapStyle}>
        <MaterialIcons
          name="email"
          size={22}
          color={Colors.primaryColor}
          style={{ marginRight: Sizes.fixPadding }}
        />
        <TextInput
          value={email}
          onChangeText={(value) => updateState({ email: value })}
          placeholder="Email"
          placeholderTextColor={Colors.grayColor}
          style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function fullNameTextField() {
    return (
      <View style={styles.textFieldInfoWrapStyle}>
        <MaterialIcons
          name="person"
          size={22}
          color={Colors.primaryColor}
          style={{ marginRight: Sizes.fixPadding }}
        />
        <TextInput
          value={fullName}
          onChangeText={(value) => updateState({ fullName: value })}
          placeholder="Full Name"
          placeholderTextColor={Colors.grayColor}
          style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function progressIndicator() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/icons/progressStep1.png")}
          style={{ width: 50.0, height: 50.0, resizeMode: "contain" }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={Colors.blackColor}
          size={22}
          onPress={() => navigation.pop()}
          style={{ position: "absolute", left: 20.0, zIndex: 1 }}
        />
        <Text
          style={{ textAlign: "center", flex: 1, ...Fonts.blackColor18Bold }}
        >
          Personal Info
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  textFieldInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  nextButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    elevation: 3.0,
    ...CommonStyles.buttonShadow,
  },
});

export default BookingStep1Screen;
