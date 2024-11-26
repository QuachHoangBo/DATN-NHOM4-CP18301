import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import MyStatusBar from "../../components/myStatusBar";

const AvailableCarsScreen = ({ navigation }) => {
  const [state, setState] = useState({
    availableCars: [],
    showSnackBar: false,
    snackBarMsg: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { availableCars, showSnackBar, snackBarMsg } = state;

  // Fetch data from API
  useEffect(() => {
    fetchAvailableCars();
  }, []);

  const fetchAvailableCars = async () => {
    try {
      const response = await fetch(`${process.env.HOST}:3000/api/available`);
      const data = await response.json();
      const dataWithIds = data.map((item, index) => ({
        ...item,
        id: item.id || index.toString(),
      })); // Đảm bảo mỗi mục có id duy nhất
      updateState({ availableCars: dataWithIds });
    } catch (error) {
      console.error("Failed to fetch available cars:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {availableCarsInfo()}
      </View>
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {snackBarMsg}
      </Snackbar>
    </View>
  );

  function updateAvailableCars({ id }) {
    const newList = availableCars.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, inSaved: !item.inSaved };
        updateState({
          snackBarMsg: updatedItem.inSaved
            ? `${updatedItem.carBrand} Added To Saved`
            : `${updatedItem.carBrand} Removed From Saved`,
        });
        return updatedItem;
      }
      return item;
    });
    updateState({ availableCars: newList });
  }

  function availableCarsInfo() {
    const renderItem = ({ item }) => (
      <View style={styles.vehicaleInfoWrapStyle}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Ionicons
              name={item.inSaved ? "heart" : "heart-outline"}
              size={18}
              color={Colors.blackColor}
              onPress={() => {
                updateAvailableCars({ id: item.id });
                updateState({ showSnackBar: true });
              }}
            />
            <Text>
              <Text style={{ ...Fonts.blackColor16Medium }}>
                {item.carBrand}
              </Text>
              <Text> </Text>
              <Text style={{ ...Fonts.grayColor12Regular }}>
                {item.carType}
              </Text>
            </Text>
            <Text style={{ ...Fonts.grayColor12Regular }}>{item.carModel}</Text>
            <Text style={{ marginVertical: Sizes.fixPadding - 8.0 }}>
              <Text style={{ ...Fonts.primaryColor16Medium }}>
                {`$`}
                {item.amountPerDay}
              </Text>
              <Text style={{ ...Fonts.grayColor14Regular }}>{} | day</Text>
            </Text>
          </View>
          <View style={{ width: 150.0, height: 70.0 }}>
            <Image
              source={{ uri: item.carImage }}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="location-pin"
            color={Colors.grayColor}
            size={14}
            style={{ marginLeft: Sizes.fixPadding - 13.0 }}
          />
          <Text style={{ ...Fonts.grayColor12Regular }}>{item.location}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Fonts.grayColor14Regular }}>
            {item.rating.toFixed(1)}
          </Text>
          <MaterialIcons name="star" color={Colors.yellowColor} size={14} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {vehicaleFunctionalityesSort({
            icon: require("../../assets/images/icons/seat.png"),
            value: `${item.seats} seats`,
          })}
          {vehicaleFunctionalityesSort({
            icon: require("../../assets/images/icons/petrolpump.png"),
            value: " Petrol",
          })}
          {vehicaleFunctionalityesSort({
            icon: require("../../assets/images/icons/auto.png"),
            value: " Auto",
          })}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("CarDetail")}
            style={styles.bookButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor16Medium }}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <FlatList
        data={availableCars}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  function vehicaleFunctionalityesSort({ icon, value }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={icon}
          style={{ width: 18.0, height: 18.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            marginLeft: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          {value}
        </Text>
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
          Available Cars
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
  snackBarStyle: {
    position: "absolute",
    alignSelf: "center",
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
    elevation: 0.0,
  },
  vehicaleInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  bookButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    shadowColor: Colors.primaryColor,
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 3.0,
    ...CommonStyles.buttonShadow,
  },
});

export default AvailableCarsScreen;
