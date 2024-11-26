import React, { useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const { height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  // Khởi tạo state với tất cả các giá trị cần thiết
  const [state, setState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secureText: true,
    confirmSecureText: true,
    agree: false,
  });

  // Hàm cập nhật state
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Truy cập các biến từ state
  const {
    fullName,
    email,
    password,
    confirmPassword,
    agree,
    secureText,
    confirmSecureText,
  } = state;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await fetch(`${process.env.HOST}:3000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const text = await response.text();
      console.log("Response Text:", text);

      const data = JSON.parse(text);
      if (response.ok) {
        alert("Đăng ký thành công");
        navigation.push("Login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
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
        >
          {registerTextWithBackArrow()}
          {fullNameTextField()}
          {emailTextField()}
          {passwordTextField()}
          {confirmPasswordTextField()}
          {agreeInfo()}
          {registerButton()}
          {orIndicator()}
          {continueWithInfo()}
          {alreadyAccountInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function alreadyAccountInfo() {
    return (
      <Text
        style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: "center" }}
      >
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Already have an account?
        </Text>
        <Text>{` `}</Text>
        <Text
          onPress={() => navigation.push("Login")}
          style={{ ...Fonts.primaryColor14Medium }}
        >
          Login Now
        </Text>
      </Text>
    );
  }

  function continueWithInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0, alignItems: "center" }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          continue via your social
        </Text>
        <View
          style={{
            marginVertical: Sizes.fixPadding,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {socialMediaOptionsSort({ bgColor: "#3B5998", iconName: "facebook" })}
          {socialMediaOptionsSort({ bgColor: "#EB4035", iconName: "google" })}
          {socialMediaOptionsSort({ bgColor: "#1DA1F2", iconName: "twitter" })}
        </View>
      </View>
    );
  }

  function socialMediaOptionsSort({ bgColor, iconName }) {
    return (
      <View
        style={{
          ...styles.socialMediaOptionsWrapStyle,
          backgroundColor: bgColor,
        }}
      >
        <FontAwesome name={iconName} size={24} color={Colors.whiteColor} />
      </View>
    );
  }

  function orIndicator() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 8.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1.0,
            backgroundColor: Colors.lightGrayColor,
          }}
        />
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding,
            ...Fonts.primaryColor16Medium,
          }}
        >
          or
        </Text>
        <View
          style={{
            flex: 1,
            height: 1.0,
            backgroundColor: Colors.lightGrayColor,
          }}
        />
      </View>
    );
  }

  function registerButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleRegister}
        style={styles.registerButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Register</Text>
      </TouchableOpacity>
    );
  }

  function agreeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ agree: !agree })}
          style={{
            ...styles.checkBoxStyle,
            backgroundColor: agree ? Colors.primaryColor : "transparent",
          }}
        >
          {agree ? (
            <MaterialIcons name="done" color={Colors.whiteColor} size={13} />
          ) : null}
        </TouchableOpacity>
        <Text style={{ marginLeft: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryColor13Regular }}>
            By creating an account you agree to our
            <Text style={{ ...Fonts.primaryColor13Medium }}>
              terms & conditions
            </Text>{" "}
            and
            <Text style={{ ...Fonts.primaryColor13Medium }}>
              privacy policy
            </Text>
          </Text>
        </Text>
      </View>
    );
  }

  function confirmPasswordTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="lock" color={Colors.primaryColor} size={20} />
          <TextInput
            value={confirmPassword}
            onChangeText={(value) => updateState({ confirmPassword: value })}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grayColor}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor14Medium,
              flex: 1,
              height: 20.0,
            }}
            secureTextEntry={confirmSecureText}
            textContentType="oneTimeCode"
          />
        </View>
        <MaterialIcons
          name={confirmSecureText ? "visibility-off" : "visibility"}
          color={Colors.grayColor}
          size={16}
          onPress={() => updateState({ confirmSecureText: !confirmSecureText })}
        />
      </View>
    );
  }

  function passwordTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="lock" color={Colors.primaryColor} size={20} />
          <TextInput
            value={password}
            onChangeText={(value) => updateState({ password: value })}
            placeholder="Create Password"
            placeholderTextColor={Colors.grayColor}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor14Medium,
              flex: 1,
              height: 20.0,
            }}
            secureTextEntry={secureText}
            textContentType="oneTimeCode"
          />
        </View>
        <MaterialIcons
          name={secureText ? "visibility-off" : "visibility"}
          color={Colors.grayColor}
          size={16}
          onPress={() => updateState({ secureText: !secureText })}
        />
      </View>
    );
  }

  function emailTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons name="email" color={Colors.primaryColor} size={20} />
        <TextInput
          value={email}
          onChangeText={(value) => updateState({ email: value })}
          placeholder="Email"
          placeholderTextColor={Colors.grayColor}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          style={{
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor14Medium,
            flex: 1,
            height: 20.0,
          }}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function fullNameTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.primaryColor} size={20} />
        <TextInput
          value={fullName}
          onChangeText={(value) => updateState({ fullName: value })}
          placeholder="Full Name"
          placeholderTextColor={Colors.grayColor}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          style={{
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor14Medium,
            flex: 1,
            height: 20.0,
          }}
        />
      </View>
    );
  }

  function registerTextWithBackArrow() {
    return (
      <View
        style={{ margin: Sizes.fixPadding * 2.0, justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center", ...Fonts.blackColor22Bold }}>
          Register
        </Text>
        <MaterialIcons
          name="arrow-back"
          color={Colors.blackColor}
          size={22}
          onPress={() => navigation.pop()}
          style={{ position: "absolute", left: 0.0, zIndex: 1 }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: height / 8.0,
            height: height / 8.0,
            resizeMode: "contain",
          }}
        />
        <Text style={{ ...Fonts.whiteColor22Medium }}>Carental</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    height: height / 4.0,
    borderBottomLeftRadius: Sizes.fixPadding * 3.0,
    borderBottomRightRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20.0,
    shadowColor: Colors.primaryColor,
  },
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  checkBoxStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    width: 16.0,
    height: 16.0,
    borderRadius: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    ...CommonStyles.buttonShadow,
  },
  socialMediaOptionsWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding - 3.0,
  },
});

export default RegisterScreen;
