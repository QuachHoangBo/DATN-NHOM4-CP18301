import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const companyPoliciesList = [
  "Chính sách bảo mật của chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và chỉ sử dụng thông tin này cho mục đích cung cấp dịch vụ. Chúng tôi sẽ không chia sẻ thông tin của bạn với bên thứ ba nếu không có sự đồng ý.",
  "Chúng tôi bảo vệ quyền lợi của người dùng trong mọi giao dịch và luôn cung cấp hỗ trợ khi cần thiết. Tất cả các dịch vụ đều được đảm bảo chất lượng và sẽ được hoàn tiền nếu không đạt yêu cầu.",
  "Chúng tôi luôn cập nhật các chính sách liên quan đến quyền lợi của người dùng để phù hợp với những thay đổi của luật pháp. Vui lòng kiểm tra định kỳ để đảm bảo bạn nắm rõ các quy định mới.",
];

const termsOfUseList = [
  "Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và chính sách bảo mật của chúng tôi. Bạn cũng cam kết không sử dụng dịch vụ cho mục đích vi phạm pháp luật.",
  "Chúng tôi có quyền thay đổi các điều khoản sử dụng này vào bất kỳ thời điểm nào mà không cần thông báo trước. Vui lòng kiểm tra trang này thường xuyên để cập nhật các thay đổi.",
  "Dịch vụ của chúng tôi có thể bị gián đoạn do bảo trì hệ thống hoặc các yếu tố khách quan. Chúng tôi sẽ thông báo trước nếu có sự thay đổi lớn ảnh hưởng đến trải nghiệm của bạn.",
];

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {companyPoliciesInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function companyPoliciesInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor18Medium,
          }}
        >
          Company Policies
        </Text>
        {companyPoliciesList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              textAlign: "justify",
              ...Fonts.grayColor13Regular,
            }}
          >
            {item}
          </Text>
        ))}
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor18Medium,
          }}
        >
          Terms of Use
        </Text>
        {termsOfUseList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              textAlign: "justify",
              ...Fonts.grayColor13Regular,
            }}
          >
            {item}
          </Text>
        ))}
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
          Terms & Conditions
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
});

export default TermsAndConditionsScreen;
