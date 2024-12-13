import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const faqsList = [
  {
    id: "1",
    question: "What happens if I return car late?",
    answer:
      "Nếu bạn trả xe muộn, sẽ có phí phạt được tính theo giờ trễ và theo điều kiện của hợp đồng thuê. Đảm bảo bạn trả xe đúng giờ để tránh những khoản phí không mong muốn.",
    isExpanded: true,
  },
  {
    id: "2",
    question: "Is there a km limit how much can I drive?",
    answer:
      "Tùy vào loại xe bạn thuê, chúng tôi sẽ có các giới hạn về số km bạn có thể lái mỗi ngày. Vượt quá giới hạn này sẽ tính thêm phí.",
    isExpanded: false,
  },
  {
    id: "3",
    question: "How to book car?",
    answer:
      "Để đặt xe, bạn chỉ cần truy cập vào trang web hoặc ứng dụng, chọn loại xe, thời gian thuê, và địa điểm nhận xe. Sau khi hoàn tất, bạn sẽ nhận được xác nhận đặt xe.",
    isExpanded: false,
  },
  {
    id: "4",
    question: "Can I message DJ?",
    answer:
      "Có, bạn có thể nhắn tin cho DJ qua ứng dụng của chúng tôi nếu cần sự hỗ trợ trong suốt thời gian sử dụng dịch vụ.",
    isExpanded: false,
  },
  {
    id: "5",
    question: "How can I edit my profile?",
    answer:
      'Để chỉnh sửa hồ sơ của bạn, hãy vào phần "Tài khoản" trong ứng dụng và thay đổi thông tin theo nhu cầu. Bạn có thể cập nhật ảnh đại diện, thông tin liên hệ và các cài đặt cá nhân.',
    isExpanded: false,
  },
  {
    id: "6",
    question: "How to change pick-up location?",
    answer:
      'Bạn có thể thay đổi địa điểm nhận xe trong phần "Quản lý đơn đặt xe" trước khi quá trình thuê bắt đầu. Sau khi thay đổi, địa điểm mới sẽ được cập nhật trong hợp đồng thuê.',
    isExpanded: false,
  },
  {
    id: "7",
    question:
      "Do I have to return the car to the same location where I picked it up?",
    answer:
      "Không nhất thiết. Bạn có thể trả xe ở một địa điểm khác trong cùng mạng lưới của chúng tôi. Tuy nhiên, việc này có thể đi kèm với một khoản phí dịch vụ.",
    isExpanded: false,
  },
  {
    id: "8",
    question: "What happens if I return car late?",
    answer:
      "Nếu bạn trả xe muộn, sẽ có phí phạt được tính theo giờ trễ và theo điều kiện của hợp đồng thuê. Đảm bảo bạn trả xe đúng giờ để tránh những khoản phí không mong muốn.",
    isExpanded: false,
  },
  {
    id: "9",
    question: "Is there a km limit how much can i drive?",
    answer:
      "Tùy vào loại xe bạn thuê, chúng tôi sẽ có các giới hạn về số km bạn có thể lái mỗi ngày. Vượt quá giới hạn này sẽ tính thêm phí.",
    isExpanded: false,
  },
  {
    id: "10",
    question: "How to book car?",
    answer:
      "Để đặt xe, bạn chỉ cần truy cập vào trang web hoặc ứng dụng, chọn loại xe, thời gian thuê, và địa điểm nhận xe. Sau khi hoàn tất, bạn sẽ nhận được xác nhận đặt xe.",
    isExpanded: false,
  },
  {
    id: "11",
    question: "How can I edit my profile?",
    answer:
      'Để chỉnh sửa hồ sơ của bạn, hãy vào phần "Tài khoản" trong ứng dụng và thay đổi thông tin theo nhu cầu. Bạn có thể cập nhật ảnh đại diện, thông tin liên hệ và các cài đặt cá nhân.',
    isExpanded: false,
  },
  {
    id: "12",
    question: "How to change pick-up location?",
    answer:
      'Bạn có thể thay đổi địa điểm nhận xe trong phần "Quản lý đơn đặt xe" trước khi quá trình thuê bắt đầu. Sau khi thay đổi, địa điểm mới sẽ được cập nhật trong hợp đồng thuê.',
    isExpanded: false,
  },
  {
    id: "13",
    question:
      "Do I have to return the car to the same location where I picked it up?",
    answer:
      "Không nhất thiết. Bạn có thể trả xe ở một địa điểm khác trong cùng mạng lưới của chúng tôi. Tuy nhiên, việc này có thể đi kèm với một khoản phí dịch vụ.",
    isExpanded: false,
  },
];

const FaqsScreen = ({ navigation }) => {
  const [state, setState] = useState({
    faqsData: faqsList,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { faqsData } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {faqs()}
      </View>
    </View>
  );

  function updateFaqs({ id }) {
    const newList = faqsData.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, isExpanded: !item.isExpanded };
        return updatedItem;
      }
      return item;
    });
    updateState({ faqsData: newList });
  }

  function faqs() {
    const renderItem = ({ item }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateFaqs({ id: item.id })}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flex: 1, marginRight: Sizes.fixPadding - 5.0 }}>
            <Text style={{ ...Fonts.blackColor15Regular }}>
              {item.question}
            </Text>
            {item.isExpanded ? (
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 8.0,
                  marginLeft: Sizes.fixPadding,
                  ...Fonts.grayColor13Regular,
                }}
              >
                {item.answer}
              </Text>
            ) : null}
          </View>
          <View style={styles.arrowUpDownIconWrapStyle}>
            <MaterialCommunityIcons
              name={item.isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={Colors.grayColor}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.lightGrayColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
    return (
      <FlatList
        data={faqsData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
      />
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
          FAQs
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

export default FaqsScreen;
