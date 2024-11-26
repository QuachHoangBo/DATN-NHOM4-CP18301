import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native";

export default function LocationPickerScreen() {
  const [currentLocation, setCurrentLocation] = useState(null); // Lưu vị trí hiện tại
  const [currentAddress, setCurrentAddress] = useState(null); // Lưu địa chỉ hiện tại
  const [pickupAddress, setPickupAddress] = useState("");
  const mapRef = useRef(null); // Tham chiếu tới MapView

  // Hàm lấy vị trí hiện tại
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Bạn cần cấp quyền truy cập vị trí!");
        return;
      }

      // Lấy tọa độ hiện tại
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      // Lấy địa chỉ từ tọa độ
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setCurrentAddress(address[0]); // Lưu địa chỉ đầu tiên
      setPickupAddress(address[0]); // Cập nhật ô TextInput cho Điểm đón

      // Di chuyển bản đồ đến vị trí hiện tại
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // Thời gian di chuyển
      );
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Có lỗi khi lấy vị trí.");
    }
  };

  return (
    <View style={styles.container}>
      {/* MapView */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 16.047079, // Default latitude
          longitude: 108.20623, // Default longitude
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Vị trí của bạn"
            description={
              currentAddress
                ? `${currentAddress.name}, ${currentAddress.city}`
                : ""
            }
          />
        )}
      </MapView>

      {/* Nút lấy vị trí hiện tại */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert;
        }}
      >
        <Text style={styles.buttonText}>Lấy vị trí hiện tại</Text>
      </TouchableOpacity>

      {/* Hiển thị địa chỉ */}
      {currentAddress && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Địa chỉ hiện tại:</Text>
          <Text style={styles.addressDetails}>
            {currentAddress.name}, {currentAddress.city},{" "}
            {currentAddress.region}, {currentAddress.country}
          </Text>
        </View>
      )}

      <Button
        title="Chọn "
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addressContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressDetails: {
    fontSize: 14,
    color: "#555",
  },
});
