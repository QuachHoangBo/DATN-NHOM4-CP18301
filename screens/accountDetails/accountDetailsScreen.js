import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountDetailsScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUserInfo();
  }, []);

  // Hàm để lấy thông tin người dùng từ AsyncStorage
  const getUserInfo = async () => {
    try {
      // Lấy thông tin người dùng từ AsyncStorage
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        // Nếu thông tin người dùng có trong AsyncStorage, trả về đối tượng người dùng
        return JSON.parse(userInfo);
      } else {
        // Nếu không có thông tin người dùng, trả về null
        console.log("User info not found in AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user info from AsyncStorage:", error);
      return null;
    }
  };
  const updateUserInfo = async () => {
    const updatedUser = {
      fullName: state.name,
      email: state.email, // Email dùng làm định danh
      phoneNumber: state.mobileNumber,
      password: state.password,
    };
    // Lưu thông tin mới vào AsyncStorage nếu thành công
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
    alert("Thông tin đã được cập nhật!");
  };

  const [state, setState] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    showBottomSheet: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { name, email, mobileNumber, password, showBottomSheet } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {profilePic()}
          {fullNameInfo()}
          {emailInfo()}
          {mobileNumberInfo()}
          {passwordInfo()}
          {saveButton()}
        </ScrollView>
      </View>
      {changeProfilePicOptionsSheet()}
    </View>
  );

  function changeProfilePicOptionsSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={() => {
          updateState({ showBottomSheet: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            updateState({ showBottomSheet: false });
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.changeProfilePicBottomSheetStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>Choose Option</Text>
                <View
                  style={{
                    marginTop: Sizes.fixPadding + 2.0,
                    flexDirection: "row",
                  }}
                >
                  {changeProfilePicOptionsSort({
                    bgColor: "#009688",
                    icon: (
                      <Entypo
                        name="camera"
                        size={22}
                        color={Colors.whiteColor}
                      />
                    ),
                    option: "Camera",
                  })}
                  <View style={{ marginHorizontal: Sizes.fixPadding * 3.0 }}>
                    {changeProfilePicOptionsSort({
                      bgColor: "#00A7F7",
                      icon: (
                        <MaterialCommunityIcons
                          name="image"
                          size={24}
                          color={Colors.whiteColor}
                        />
                      ),
                      option: "Gallery",
                    })}
                  </View>
                  {changeProfilePicOptionsSort({
                    bgColor: "#DD5A5A",
                    icon: (
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    ),
                    option: `Remove\nphoto`,
                  })}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function changeProfilePicOptionsSort({ bgColor, icon, option }) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ showBottomSheet: false })}
          style={{
            ...styles.changeProfilePicOptionsIconWrapStyle,
            backgroundColor: bgColor,
          }}
        >
          {icon}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          {option}
        </Text>
      </View>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={updateUserInfo()}
        style={styles.saveButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Password
        </Text>
        <TextInput
          value={user.password}
          onChangeText={(value) => updateState({ password: value })}
          style={styles.textFieldStyle}
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Mobile Number
        </Text>
        <TextInput
          placeholder="Your mobile Number"
          value={user.phoneNumber}
          onChangeText={(value) => updateState({ mobileNumber: value })}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
        />
      </View>
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Email
        </Text>
        <TextInput
          value={user.email}
          onChangeText={(value) => updateState({ email: value })}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Full Name
        </Text>
        <TextInput
          value={user.fullName}
          onChangeText={(value) => updateState({ name: value })}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function profilePic() {
    return (
      <View
        style={{
          alignSelf: "center",
          margin: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/users/user2.png")}
          style={{ width: 100.0, height: 100.0, borderRadius: 50.0 }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ showBottomSheet: true })}
          style={styles.changeProfilePicButtonStyle}
        >
          <MaterialIcons
            name="photo-camera"
            size={14}
            color={Colors.whiteColor}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding - 5.0,
              ...Fonts.whiteColor13Medium,
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
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
          Edit Profile
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
  changeProfilePicButtonStyle: {
    position: "absolute",
    bottom: 0.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding,
    borderColor: Colors.whiteColor,
    borderWidth: 1.5,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Regular,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
    elevation: 2.0,
    ...CommonStyles.shadow,
  },
  saveButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    ...CommonStyles.buttonShadow,
  },
  changeProfilePicBottomSheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  changeProfilePicOptionsIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountDetailsScreen;
