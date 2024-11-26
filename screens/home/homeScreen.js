import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu } from "react-native-material-menu";
import { Calendar } from "react-native-calendars";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Suptember",
  "October",
  "November",
  "December",
];

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [hotDealsList, setHotDealsList] = useState([]);
  const [latestOfferList, setLatestOfferList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [state, setState] = useState({
    selectedPickupLocation: locationsList[0],
    showPickupLocationOptions: false,
    defaultStartDate: new Date().getDate(),
    defaultEndDate: new Date().getDate() + 5,
    selectedStartDate: `${new Date().getDate()} ${
      monthsList[new Date().getMonth()]
    }`,
    selectedEndDate: `${new Date().getDate() + 5} ${
      monthsList[new Date().getMonth()]
    }`,
    currentTabIndex: 0,
    selectedStartHour: 11,
    selectedStartMinute: 0,
    selectedStartAmPm: "AM",
    selectedEndHour: 5,
    selectedEndMinute: 0,
    selectedEndAmPm: "PM",
    showHoursOptions: false,
    showMinutesOptions: false,
    showAmPmOptions: false,
    showStartTripEndTripSheet: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    selectedPickupLocation,
    showPickupLocationOptions,
    defaultStartDate,
    defaultEndDate,
    selectedStartDate,
    selectedEndDate,
    currentTabIndex,
    selectedStartHour,
    selectedStartMinute,
    selectedStartAmPm,
    selectedEndHour,
    selectedEndMinute,
    selectedEndAmPm,
    showHoursOptions,
    showMinutesOptions,
    showAmPmOptions,
    showStartTripEndTripSheet,
  } = state;

  useEffect(() => {
    fetch(`${process.env.HOST}:3000/api/deals`)
      .then((response) => response.json())
      .then((data) => setHotDealsList(data))
      .catch((error) => console.error("Error fetching hot deals:", error));

    fetch(`${process.env.HOST}:3000/api/offers`)
      .then((response) => response.json())
      .then((data) => setLatestOfferList(data))
      .catch((error) => console.error("Error fetching latest offers:", error));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tripInfo()}
          {hotDealsInfo()}
          {availableCarsButton()}
          {latestOfferInfo()}
        </ScrollView>
      </View>
      {startTripEndTripSheet()}
    </View>
  );

  function latestOfferInfo() {
    const renderItem = ({ item, index }) => (
      <ImageBackground
        source={{ uri: item.offerBgImage }}
        style={styles.latestOfferBgImageStyle}
      >
        <View style={styles.latestOfferImageShadowStyle}>
          <View
            style={{
              width: 1.0,
              height: "55%",
              backgroundColor: Colors.whiteColor,
            }}
          />
          <View style={{ marginLeft: Sizes.fixPadding - 5.0 }}>
            {(index + 1) % 3 == 0 ? (
              <>
                {item.title ? (
                  <Text style={{ ...Fonts.whiteColor13Medium }}>
                    {item.title}
                  </Text>
                ) : null}
                {item.offer ? (
                  <Text style={{ ...Fonts.whiteColor18Bold }}>
                    {item.offer}
                  </Text>
                ) : null}
                {item.subTitle ? (
                  <Text style={{ ...Fonts.whiteColor11Regular }}>
                    {item.subTitle}
                  </Text>
                ) : null}
              </>
            ) : (
              <>
                {item.offer ? (
                  <Text style={{ ...Fonts.whiteColor18Bold }}>
                    {item.offer}
                  </Text>
                ) : null}
                {item.title ? (
                  <Text style={{ ...Fonts.whiteColor13Medium }}>
                    {item.title}
                  </Text>
                ) : null}
                {item.subTitle ? (
                  <Text style={{ ...Fonts.whiteColor11Regular }}>
                    {item.subTitle}
                  </Text>
                ) : null}
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    );

    return (
      <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Medium,
          }}
        >
          Latest Offers
        </Text>
        <FlatList
          data={latestOfferList}
          keyExtractor={(item, index) =>
            item.id ? `${item.id}` : `latest-offer-${index}`
          }
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function availableCarsButton() {
    return (
      <View style={styles.availableCarsButtonStyle}>
        <View>
          <Text style={{ ...Fonts.whiteColor18Medium }}>Available Cars</Text>
          <Text style={{ ...Fonts.whiteColor15Regular }}>
            Long term and short term
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("AvailableCars")}
          style={styles.availableCarsForwardIconWrapStyle}
        >
          <MaterialIcons
            name="arrow-forward-ios"
            color={Colors.primaryColor}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function tripInfo() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/images/home_bg.png")}
          style={{ height: 400 }}
        >
          <View style={styles.tripInfoImageShadowStyle}>
            <Text style={{ ...Fonts.whiteColor22Black }}>
              Own a car without actually buying it. So book now...
            </Text>
            {pickupLocationInfo()}
            {startTripInfo()}
            {endTripInfo()}
          </View>
        </ImageBackground>
        {findCarsButton()}
      </View>
    );
  }

  function hotDealsInfo() {
    const renderItem = ({ item }) => (
      <View style={styles.hotDealsCarInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Fonts.blackColor16Medium }}>{item.carBrand}</Text>
          <View
            style={{ marginLeft: Sizes.fixPadding + 5.0, flexDirection: "row" }}
          >
            <Text
              style={{ ...Fonts.primaryColor14Medium }}
            >{`$${item.amountPerDay}`}</Text>
            <Text style={{ ...Fonts.grayColor14Medium }}> | day</Text>
          </View>
        </View>
        <Text style={{ ...Fonts.grayColor12Regular }}>{item.carModel}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="location-pin"
            size={14}
            color={Colors.grayColor}
          />
          <Text style={{ ...Fonts.grayColor12Regular }}>{item.location}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Fonts.grayColor12Regular }}>
            {item.rating.toFixed(1)}
          </Text>
          <MaterialIcons name="star" size={14} color={Colors.yellowColor} />
        </View>
        <View style={styles.hotDealsOfferWrapStyle}>
          <Text style={{ ...Fonts.whiteColor11Bold }}>
            {item.discountInPercentage}% OFF
          </Text>
        </View>
        <View style={styles.hotDealCarImageWrapStyle}>
          <Image
            source={{ uri: item.carImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 4.0 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Medium,
          }}
        >
          Hot Deals
        </Text>
        <FlatList
          data={hotDealsList}
          keyExtractor={(item, index) =>
            item.id ? `${item.id}` : `hot-deal-${index}`
          }
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding * 2.0,
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function startTripEndTripSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showStartTripEndTripSheet}
        onRequestClose={() => {
          updateState({ showStartTripEndTripSheet: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            updateState({ showStartTripEndTripSheet: false });
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.startTripEndTripSheetWrapStyle}>
                <View style={styles.bottomSheetTimeInfoWrapStyle}>
                  <Text
                    style={{
                      marginBottom: Sizes.fixPadding + 5.0,
                      textAlign: "center",
                      ...Fonts.blackColor18Bold,
                    }}
                  >
                    Select Start Time
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ ...Fonts.primaryColor13Bold }}>
                      Start Trip
                    </Text>
                    <Text style={{ ...Fonts.primaryColor13Bold }}>
                      End Trip
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.99}
                      onPress={() => updateState({ currentTabIndex: 0 })}
                    >
                      <Text style={{ ...Fonts.blackColor14Regular }}>
                        {selectedStartDate}, {selectedStartHour}:
                        {selectedStartMinute.toString().length == 1
                          ? `0${selectedStartMinute}`
                          : selectedStartMinute}
                        {} {selectedStartAmPm}
                      </Text>
                      <View
                        style={{
                          marginTop: Sizes.fixPadding,
                          backgroundColor:
                            currentTabIndex == 0
                              ? Colors.primaryColor
                              : "transparent",
                          height: 1.5,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        ...Fonts.grayColor14Medium,
                      }}
                    >
                      to
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.99}
                      onPress={() => updateState({ currentTabIndex: 1 })}
                    >
                      <Text style={{ ...Fonts.blackColor14Regular }}>
                        {selectedEndDate}, {selectedEndHour}:
                        {selectedEndMinute.toString().length == 1
                          ? `0${selectedEndMinute}`
                          : selectedEndMinute}
                        {} {selectedEndAmPm}
                      </Text>
                      <View
                        style={{
                          marginTop: Sizes.fixPadding,
                          backgroundColor:
                            currentTabIndex == 1
                              ? Colors.primaryColor
                              : "transparent",
                          height: 1.5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      marginTop: Sizes.fixPadding,
                      textAlign: "center",
                      ...Fonts.grayColor13Regular,
                    }}
                  >
                    Select Pick-up Date
                  </Text>
                  {startTripCalender({ fromIndex: currentTabIndex })}
                  <View style={styles.bottomSheetDividerStyle} />
                  <Text
                    style={{
                      marginBottom: Sizes.fixPadding,
                      textAlign: "center",
                      ...Fonts.grayColor13Regular,
                    }}
                  >
                    Select Pick-up Time
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectHour({ fromIndex: currentTabIndex })}
                    {selectMinute({ fromIndex: currentTabIndex })}
                    {selectAmPm({ fromIndex: currentTabIndex })}
                  </View>
                </ScrollView>
                {confirmButton()}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function confirmButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ showStartTripEndTripSheet: false })}
        style={styles.confirmButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Confirm</Text>
      </TouchableOpacity>
    );
  }

  function selectAmPm({ fromIndex }) {
    return (
      <Menu
        visible={showAmPmOptions}
        anchor={
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ showAmPmOptions: true })}
            style={{
              marginHorizontal: Sizes.fixPadding * 2.5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
            <Text
              style={{
                marginVertical: Sizes.fixPadding,
                paddingHorizontal: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor14Regular,
              }}
            >
              {fromIndex == 0 ? selectedStartAmPm : selectedEndAmPm}
            </Text>
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
          </TouchableOpacity>
        }
        onRequestClose={() => updateState({ showAmPmOptions: false })}
      >
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            paddingTop: Sizes.fixPadding,
            maxHeight: height - 100.0,
          }}
        >
          <Text
            style={{
              width: 100.0,
              textAlign: "center",
              marginBottom: Sizes.fixPadding + 5.0,
              ...Fonts.whiteColor15Regular,
            }}
            onPress={() => {
              fromIndex == 0
                ? updateState({
                    selectedStartAmPm: "AM",
                    showAmPmOptions: false,
                  })
                : updateState({
                    selectedEndAmPm: "AM",
                    showAmPmOptions: false,
                  });
            }}
          >
            AM
          </Text>
          <Text
            style={{
              width: 100.0,
              textAlign: "center",
              marginBottom: Sizes.fixPadding + 5.0,
              ...Fonts.whiteColor15Regular,
            }}
            onPress={() => {
              fromIndex == 0
                ? updateState({
                    selectedStartAmPm: "PM",
                    showAmPmOptions: false,
                  })
                : updateState({
                    selectedEndAmPm: "PM",
                    showAmPmOptions: false,
                  });
            }}
          >
            PM
          </Text>
        </View>
      </Menu>
    );
  }

  function selectMinute({ fromIndex }) {
    return (
      <Menu
        visible={showMinutesOptions}
        anchor={
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ showMinutesOptions: true })}
            style={{
              marginHorizontal: Sizes.fixPadding * 2.5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
            <Text
              style={{
                marginVertical: Sizes.fixPadding,
                paddingHorizontal: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor14Regular,
              }}
            >
              {fromIndex == 0
                ? selectedStartMinute.toString().length == 1
                  ? `0${selectedStartMinute}`
                  : selectedStartMinute
                : selectedEndMinute.toString().length == 1
                ? `0${selectedEndMinute}`
                : selectedEndMinute}
            </Text>
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
          </TouchableOpacity>
        }
        onRequestClose={() => updateState({ showMinutesOptions: false })}
      >
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            paddingTop: Sizes.fixPadding,
            height: height / 2.0,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {minutesList.map((item, index) => (
              <Text
                key={index}
                style={{
                  width: 100.0,
                  textAlign: "center",
                  marginBottom: Sizes.fixPadding + 5.0,
                  ...Fonts.whiteColor15Regular,
                }}
                onPress={() => {
                  fromIndex == 0
                    ? updateState({
                        selectedStartMinute: item,
                        showMinutesOptions: false,
                      })
                    : updateState({
                        selectedEndMinute: item,
                        showMinutesOptions: false,
                      });
                }}
              >
                {`${item}`}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Menu>
    );
  }

  function selectHour({ fromIndex }) {
    return (
      <Menu
        visible={showHoursOptions}
        anchor={
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ showHoursOptions: true })}
            style={{
              marginHorizontal: Sizes.fixPadding * 2.5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
            <Text
              style={{
                marginVertical: Sizes.fixPadding,
                paddingHorizontal: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor14Regular,
              }}
            >
              {fromIndex == 0
                ? selectedStartHour.toString().length == 1
                  ? `0${selectedStartHour}`
                  : selectedStartHour
                : selectedEndHour.toString().length == 1
                ? `0${selectedEndHour}`
                : selectedEndHour}
            </Text>
            <View
              style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: "100%",
              }}
            />
          </TouchableOpacity>
        }
        onRequestClose={() => updateState({ showHoursOptions: false })}
      >
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            paddingTop: Sizes.fixPadding,
            height: height / 2.0,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {hoursList.map((item, index) => (
              <Text
                key={index}
                style={{
                  width: 100.0,
                  textAlign: "center",
                  marginBottom: Sizes.fixPadding + 5.0,
                  ...Fonts.whiteColor15Regular,
                }}
                onPress={() => {
                  fromIndex == 0
                    ? updateState({
                        selectedStartHour: item,
                        showHoursOptions: false,
                      })
                    : updateState({
                        selectedEndHour: item,
                        showHoursOptions: false,
                      });
                }}
              >
                {`${item}`}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Menu>
    );
  }

  function startTripCalender({ fromIndex }) {
    return (
      <Calendar
        monthFormat={`${
          fromIndex == 0 ? defaultStartDate : defaultEndDate
        } MMMM  yyyy`}
        renderArrow={(direction) =>
          direction == "left" ? (
            <MaterialIcons
              name="arrow-back-ios"
              color={Colors.blackColor}
              size={22}
            />
          ) : (
            <MaterialIcons
              name="arrow-forward-ios"
              color={Colors.blackColor}
              size={22}
            />
          )
        }
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        dayComponent={({ date, state }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                fromIndex == 0
                  ? updateState({
                      selectedStartDate: `${date.day} ${
                        monthsList[date.month - 1]
                      }`,
                      defaultStartDate: date.day,
                    })
                  : updateState({
                      selectedEndDate: `${date.day} ${
                        monthsList[date.month - 1]
                      }`,
                      defaultEndDate: date.day,
                    });
              }}
              style={{
                ...styles.calenderDateWrapStyle,
                borderColor:
                  fromIndex == 0
                    ? date.day == defaultStartDate
                      ? Colors.primaryColor
                      : "#D2D2D2"
                    : date.day == defaultEndDate
                    ? Colors.primaryColor
                    : "#D2D2D2",
                backgroundColor:
                  fromIndex == 0
                    ? date.day == defaultStartDate
                      ? Colors.primaryColor
                      : Colors.whiteColor
                    : date.day == defaultEndDate
                    ? Colors.primaryColor
                    : Colors.whiteColor,
              }}
            >
              <Text
                style={
                  fromIndex == 0
                    ? date.day == defaultStartDate
                      ? { ...Fonts.whiteColor12Medium }
                      : { ...Fonts.grayColor12Medium }
                    : date.day == defaultEndDate
                    ? { ...Fonts.whiteColor12Medium }
                    : { ...Fonts.grayColor12Medium }
                }
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
        theme={{
          calendarBackground: Colors.bodyBackColor,
          textSectionTitleColor: Colors.grayColor,
          monthTextColor: Colors.grayColor,
          textMonthFontFamily: "Roboto_Regular",
          textDayHeaderFontFamily: "Roboto_Medium",
          textMonthFontSize: 14,
          textDayHeaderFontSize: 14,
        }}
        style={{ marginHorizontal: Sizes.fixPadding - 5.0 }}
      />
    );
  }

  function tripInfo() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/images/home_bg.png")}
          style={{ height: 400.0 }}
        >
          <View style={styles.tripInfoImageShadowStyle}>
            <Text style={{ ...Fonts.whiteColor22Black }}>
              Own a car without actually buying it. So book now...
            </Text>
            {pickupLocationInfo()}
            {startTripInfo()}
            {endTripInfo()}
          </View>
        </ImageBackground>
        {findCarsButton()}
      </View>
    );
  }

  function findCarsButton() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.push("SearchResults", {
            item: {
              selectedLocation: selectedPickupLocation,
              selectedStartDate: selectedStartDate,
              selectedEndDate: selectedEndDate,
              selectedStartTime: `${selectedStartHour}:${
                selectedStartMinute.toString().length == 1
                  ? "00"
                  : selectedStartMinute
              } ${selectedStartAmPm}`,
              selectedEndTime: `${selectedEndHour}:${
                selectedEndMinute.toString().length == 1
                  ? "00"
                  : selectedEndMinute
              } ${selectedEndAmPm}`,
            },
          })
        }
        style={styles.findCarsButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>Find Cars</Text>
      </TouchableOpacity>
    );
  }

  function endTripInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          updateState({ currentTabIndex: 1, showStartTripEndTripSheet: true })
        }
        style={{ marginVertical: Sizes.fixPadding * 2.0 }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor14Regular,
          }}
        >
          End Trip
        </Text>
        <View style={styles.startAndEndTripInfoWrapStyle}>
          <Text style={{ ...Fonts.whiteColor15Regular }}>
            {selectedEndDate}, {selectedEndHour}:
            {selectedEndMinute.toString().length == 1
              ? `0${selectedEndMinute}`
              : selectedEndMinute}
            {} {selectedEndAmPm}
          </Text>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            color={Colors.whiteColor}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function startTripInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          updateState({ currentTabIndex: 0, showStartTripEndTripSheet: true })
        }
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor14Regular,
          }}
        >
          Start Trip
        </Text>
        <View style={styles.startAndEndTripInfoWrapStyle}>
          <Text style={{ ...Fonts.whiteColor15Regular }}>
            {selectedStartDate}, {selectedStartHour}:
            {selectedStartMinute.toString().length == 1
              ? `0${selectedStartMinute}`
              : selectedStartMinute}
            {} {selectedStartAmPm}
          </Text>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            color={Colors.whiteColor}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function pickupLocationInfo() {
    const pickupAddress = "";
    return (
      <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập điểm đón"
            value={pickupAddress} // Hiển thị địa chỉ trong ô nhập// Cập nhật nếu người dùng nhập thủ công
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Location")}
            style={styles.pickupLocationWrapStyle}
          >
            <Text
              numberOfLines={1}
              style={{ flex: 1, ...Fonts.whiteColor15Regular }}
            >
              {selectedPickupLocation && selectedPickupLocation.address
                ? selectedPickupLocation.address
                : "Select Location"}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={22}
              color={Colors.whiteColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 6.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    borderBottomLeftRadius: Sizes.fixPadding * 5.0,
    borderBottomRightRadius: Sizes.fixPadding * 5.0,
  },
  pickupLocationWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    borderWidth: 1.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  confirmButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    ...CommonStyles.buttonShadow,
  },
  startAndEndTripInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  findCarsButtonStyle: {
    zIndex: 1,
    position: "absolute",
    bottom: -25.0,
    left: Sizes.fixPadding * 7.0,
    right: Sizes.fixPadding * 7.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3.0,
    shadowColor: Colors.primaryColor,
  },
  tripInfoImageShadowStyle: {
    paddingTop: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  hotDealsCarInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding - 5.0,
    alignSelf: "flex-start",
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  hotDealsOfferWrapStyle: {
    position: "absolute",
    top: -7.5,
    alignSelf: "flex-start",
    paddingHorizontal: Sizes.fixPadding - 2.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  hotDealCarImageWrapStyle: {
    marginHorizontal: Sizes.fixPadding - 5.0,
    marginTop: -Sizes.fixPadding,
    width: 130.0,
    height: 60.0,
  },
  bottomSheetTimeInfoWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 10.0,
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 5.0,
    elevation: 2.0,
  },
  bottomSheetDividerStyle: {
    marginHorizontal: Sizes.fixPadding + 10.0,
    marginVertical: Sizes.fixPadding,
    backgroundColor: "#D2D2D2",
    height: 1.0,
  },
  startTripEndTripSheetWrapStyle: {
    elevation: 2.0,
    backgroundColor: Colors.bodyBackColor,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
  },
  calenderDateWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 25.0,
    height: 25.0,
    borderRadius: Sizes.fixPadding - 7.0,
    borderWidth: 1.0,
  },
  latestOfferBgImageStyle: {
    minWidth: 150.0,
    height: 80.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginRight: Sizes.fixPadding,
    overflow: "hidden",
  },
  latestOfferImageShadowStyle: {
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  availableCarsButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    shadowColor: Colors.primaryColor,
    ...CommonStyles.buttonShadow,
  },
  availableCarsForwardIconWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    width: 40.0,
    height: 40.0,
  },
});

export default HomeScreen;
