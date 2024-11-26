import React from "react";
import { View, FlatList, TouchableOpacity, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const bookingsList = [
    {
        id: '1',
        carImage: require('../../assets/images/cars/car5.png'),
        carBrand: 'Mercedes',
        carType: 'SUV',
        carModel: 'CLS 450 Coupe 2020',
        location: 'Đà Nẵng',
        startTrip: '15 April, 4:00 pm',
        endTrip: '17 April, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 600,
    },
    {
        id: '2',
        carImage: require('../../assets/images/cars/car3.png'),
        carBrand: 'Ford',
        carType: 'Jeep',
        carModel: 'Ford Ranger Raptor 2020',
        location: 'Hồ Chí Minh',
        startTrip: '17 May, 6:00 pm',
        endTrip: '19 May, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 900,
    },
    {
        id: '3',
        carImage: require('../../assets/images/cars/car4.png'),
        carBrand: 'Audi',
        carType: 'Sport',
        carModel: 'Audi Q5',
        location: 'Đà Nẵng',
        startTrip: '15 Jun, 6:00 pm',
        endTrip: '17 Jun, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 800,
    }
];

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                {bookings()}
            </View>
        </View>
    )

    function bookings() {
        const renderItem = ({ item }) => (
            <View style={styles.bookingsInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <Text>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.carBrand}
                            </Text>
                            <Text>
                                {`  `}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {item.carType}
                            </Text>
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.carModel}
                        </Text>
                    </View>
                    <Image
                        source={item.carImage}
                        style={styles.carImageStyle}
                    />
                </View>
                <View style={{ marginBottom: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="location-pin"
                        color={Colors.primaryColor}
                        size={14}
                        style={{ marginLeft: Sizes.fixPadding - 13.0, }}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.blackColor14Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ maxWidth: width / 2.4, marginRight: Sizes.fixPadding * 3.0, }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Tirp Start
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.startTrip}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Tirp End
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.endTrip}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Paid via {item.paymentMethod}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14Medium }}>
                            {`$`}{item.amount.toFixed(2)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('BookingSuccessfull')}
                        style={styles.viewReceiptButtonWrapStyle}
                    >
                        <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Medium }}>
                            View
                        </Text>
                        <Image
                            source={require('../../assets/images/icons/receipt.png')}
                            style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
        return (
            <FlatList
                data={bookingsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    My Booking
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    viewReceiptButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 7.0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding - 5.0,
        ...CommonStyles.shadow
    },
    carImageStyle: {
        alignSelf: 'flex-start',
        width: 120.0,
        height: 50.0,
        resizeMode: 'contain',
        marginRight: Sizes.fixPadding - 20,
    },
    bookingsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...CommonStyles.shadow
    }
});

export default BookingScreen;