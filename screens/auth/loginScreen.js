import React, { useState } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  // Khởi tạo state để lưu trữ email, mật khẩu và trạng thái nhớ mật khẩu
  const [state, setState] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    secureText: true,
    rememberPassword: false,
  });

  // Hàm để cập nhật state
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const {
    fullname,
    email,
    password,
    secureText,
    rememberPassword,
    phoneNumber,
  } = state;

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      const response = await fetch(`${process.env.HOST}:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json(); // Đọc phản hồi từ API
      console.log("Response Data:", data);
      if (response.ok) {
        alert("Đăng nhập thành công");
        // Lưu thông tin người dùng vào AsyncStorage
        const user = data?.user; // Lấy thông tin người dùng từ API
        console.log(user);
        if (user) {
          await AsyncStorage.setItem("userInfo", JSON.stringify(user)); // Lưu thông tin người dùng
        }
        navigation.navigate("BottomTabBar");
      } else {
        alert(data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
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
          {loginTitle()}
          {emailTextField()}
          {passwordTextField()}
          {rememberPassordAndForgetInfo()}
          {loginButton()}
          {orIndicator()}
          {continueWithInfo()}
          {dontAccountInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function dontAccountInfo() {
    return (
      <Text
        style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: "center" }}
      >
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Don’t have an account?
        </Text>
        <Text>{` `}</Text>
        <Text
          onPress={() => navigation.push("Register")}
          style={{ ...Fonts.primaryColor14Medium }}
        >
          Register Now
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

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleLogin} // Gọi hàm xử lý đăng nhập khi người dùng nhấn nút
        style={styles.loginButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Login</Text>
      </TouchableOpacity>
    );
  }

  function rememberPassordAndForgetInfo() {
    return (
      <View style={styles.rememberPassordAndForgetInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ rememberPassword: !rememberPassword })}
            style={{
              ...styles.checkBoxStyle,
              backgroundColor: rememberPassword
                ? Colors.primaryColor
                : "transparent",
            }}
          >
            {rememberPassword ? (
              <MaterialIcons name="done" color={Colors.whiteColor} size={13} />
            ) : null}
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: Sizes.fixPadding - 3.0,
              ...Fonts.primaryColor13Regular,
            }}
          >
            Remember password
          </Text>
        </View>
        <Text style={{ ...Fonts.redColor13Regular }}>Forget password?</Text>
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
            placeholder="Password"
            placeholderTextColor={Colors.grayColor}
            cursorColor={Colors.primaryColor}
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor14Medium,
              flex: 1,
              height: 20.0,
            }}
            secureTextEntry={secureText}
            selectionColor={Colors.primaryColor}
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
          style={{
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor14Medium,
            flex: 1,
            height: 20.0,
          }}
          keyboardType="email-address"
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function loginTitle() {
    return (
      <Text
        style={{
          textAlign: "center",
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.blackColor22Bold,
        }}
      >
        Login
      </Text>
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
    elevation: 20.0, // Độ cao của bóng đổ, giúp tạo hiệu ứng nổi khối cho phần tử
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
  rememberPassordAndForgetInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 3.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Sizes.fixPadding - 5.0,
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
  loginButtonStyle: {
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

export default LoginScreen;
