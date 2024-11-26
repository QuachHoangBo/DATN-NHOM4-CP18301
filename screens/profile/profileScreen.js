import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation, changeTab }) => {
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

  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          {profileInfo()}
          {profileOptions()}
        </ScrollView>
        {logoutDialog()}
      </View>
    </View>
  );

  function logoutDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setshowLogoutDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowLogoutDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{ width: "80%", alignSelf: "center" }}
            >
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: Sizes.fixPadding - 5.0,
                  backgroundColor: Colors.whiteColor,
                }}
              >
                <Text
                  style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    textAlign: "center",
                    ...Fonts.blackColor16Medium,
                  }}
                >
                  Are you sure you want to logout?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.primaryColor,
                  }}
                >
                  <Text
                    onPress={() => setshowLogoutDialog(false)}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      ...Fonts.whiteColor16Medium,
                    }}
                  >
                    Cancel
                  </Text>
                  <View
                    style={{
                      backgroundColor: Colors.whiteColor,
                      width: 1.0,
                      height: 40.0,
                    }}
                  />
                  <Text
                    onPress={() => {
                      setshowLogoutDialog(false);
                      navigation.push("Login");
                    }}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      ...Fonts.whiteColor16Medium,
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function profileOptions() {
    return (
      <View style={styles.profileOptionsWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Booking")}
        >
          {profileOptionSort({
            option: "My Booking",
            icon: (
              <MaterialIcons
                name="directions-car"
                size={20}
                color={Colors.grayColor}
              />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("AccountDetails")}
        >
          {profileOptionSort({
            option: "My Profile",
            icon: (
              <MaterialIcons name="person" size={20} color={Colors.grayColor} />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("Notifications")}
        >
          {profileOptionSort({
            option: "Notifications",
            icon: (
              <MaterialIcons
                name="notifications"
                size={20}
                color={Colors.grayColor}
              />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("Saved")}
        >
          {profileOptionSort({
            option: "Saved",
            icon: (
              <MaterialIcons
                name="favorite"
                size={20}
                color={Colors.grayColor}
              />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("Support")}
        >
          {profileOptionSort({
            option: "Support",
            icon: (
              <MaterialIcons
                name="headset-mic"
                size={20}
                color={Colors.grayColor}
              />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("TermsAndConditions")}
        >
          {profileOptionSort({
            option: "Terms & Conditions",
            icon: (
              <MaterialCommunityIcons
                name="file-document"
                size={20}
                color={Colors.grayColor}
              />
            ),
          })}
        </TouchableOpacity>
        {divider()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("Faqs")}
        >
          {profileOptionSort({
            option: "FAQs",
            icon: (
              <MaterialIcons name="help" size={20} color={Colors.grayColor} />
            ),
          })}
        </TouchableOpacity>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGrayColor,
          height: 1.0,
          marginVertical: Sizes.fixPadding + 5.0,
        }}
      />
    );
  }

  function profileOptionSort({ option, icon }) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon}
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor16Regular,
            }}
          >
            {option}
          </Text>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={Colors.blackColor}
        />
      </View>
    );
  }

  function profileInfo() {
    return (
      <View style={styles.profileInfoWrapStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/users/user2.png")}
            style={{ width: 60.0, height: 60.0, borderRadius: 30.0 }}
          />
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor16Medium }}>{user.fullName}</Text>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
              {user.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setshowLogoutDialog(true)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <AntDesign name="logout" size={15} color={Colors.primaryColor} />
          <Text
            style={{
              marginLeft: Sizes.fixPadding - 2.0,
              ...Fonts.primaryColor14Medium,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor18Bold }}>Profile</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  profileInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  profileOptionsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow,
  },
  logoutDialogStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    width: width - 40,
    padding: 0.0,
  },
});

export default ProfileScreen;
