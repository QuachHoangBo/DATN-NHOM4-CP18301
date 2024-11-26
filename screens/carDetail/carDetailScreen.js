import React, { useState } from "react";
import { View, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const carSpeciaficationsList = [
    {
        id: '1',
        specificationIcon: require('../../assets/images/icons/seat.png'),
        specification: '5 seats',
    },
    {
        id: '2',
        specificationIcon: require('../../assets/images/icons/conditioner.png'),
        specification: 'Conditioner',
    },
    {
        id: '3',
        specificationIcon: require('../../assets/images/icons/location.png'),
        specification: 'Navigation',
    },
    {
        id: '4',
        specificationIcon: require('../../assets/images/icons/USB_input.png'),
        specification: 'USB Input',
    },
    {
        id: '5',
        specificationIcon: require('../../assets/images/icons/bluetooth.png'),
        specification: 'Bluetooth',
    },
    {
        id: '6',
        specificationIcon: require('../../assets/images/icons/auto.png'),
        specification: 'Auto TX',
    },
    {
        id: '7',
        specificationIcon: require('../../assets/images/icons/auto_temp.png'),
        specification: 'Auto Temp',
    },
    {
        id: '8',
        specificationIcon: require('../../assets/images/icons/keyless.png'),
        specification: 'Keyless',
    },
];

const CarDetailScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showSnackBar: false,
        inSaved: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSnackBar,
        inSaved,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {carImage()}
                            {carDetailInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                />
            </View>
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {inSaved ? 'Added To Saved' : 'Removed From Saved'}
            </Snackbar>
        </View>
    )

    function carDetailInfo() {
        return (
            <View style={styles.carDetailInfoWrapStyle}>
                {carBriefDetail()}
                <View style={{ backgroundColor: '#E6E6E6', height: 1.0, }} />
                {ownerInfo()}
                <View style={{ backgroundColor: '#E6E6E6', height: 1.0, }} />
                {carSpeciaficationsInfo()}
                <View style={{ backgroundColor: '#E6E6E6', height: 1.0, }} />
                {carDesciptionInfo()}
                {bookNowButton()}
            </View>
        )
    }

    function bookNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookingStep1')}
                style={styles.bookNowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Book Now
                </Text>
            </TouchableOpacity>
        )
    }

    function carDesciptionInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
                    Car Description
                </Text>
                <Text style={{ textAlign: 'justify', ...Fonts.grayColor13Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas feugiat bibendum sed pretium lacinia sit sit egestas. Sagittis vel purus est, tincidunt amet.
                </Text>
            </View>
        )
    }

    function carSpeciaficationsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.carSpeciaficationsInfoWrapStyle}>
                <Image
                    source={item.specificationIcon}
                    style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {item.specification}
                </Text>
            </View>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                    Car Specifications
                </Text>
                <View style={{ marginRight: Sizes.fixPadding - 15.0, }}>
                    <FlatList
                        data={carSpeciaficationsList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        numColumns={4}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }

    function ownerInfo() {
        return (
            <View style={styles.ownerInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={styles.userImageStyle}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            Owner- { }
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            Amir Kamal
                        </Text>
                    </Text>
                </View>
                <View style={styles.phoneIconWrapStyle}>
                    <MaterialIcons
                        name="phone"
                        color={Colors.whiteColor}
                        size={18}
                    />
                </View>
            </View>
        )
    }

    function carBriefDetail() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            Mercedes
                        </Text>
                        <Text style={{ lineHeight: 12.0, ...Fonts.grayColor12Regular }}>
                            Bens w176
                        </Text>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.primaryColor16Bold }}>
                            $200
                        </Text>
                        <Text style={{ lineHeight: 13.0, ...Fonts.grayColor13Regular }}>
                            per day
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.grayColor13Regular }}>
                        5.0
                    </Text>
                    <MaterialIcons
                        name="star"
                        color={Colors.yellowColor}
                        size={15}
                    />
                </View>
                <Text style={{ ...Fonts.grayColor13Regular }}>
                    Location: Royal Ln. Mesa, New Jersey
                </Text>
                <Text style={{ ...Fonts.primaryColor13Regular }}>
                    Insured during the rental period
                </Text>
            </View>
        )
    }

    function carImage() {
        return (
            <View style={styles.carImageWrapStyle}>
                <Image
                    source={require('../../assets/images/cars/car8.png')}
                    style={{ flex: 1, resizeMode: 'contain', marginLeft: Sizes.fixPadding - 22.5, }}
                />
                <View style={{}}>
                    <View style={styles.carAngleImagesWrapStyle}>
                        <Image
                            source={require('../../assets/images/cars/car8.png')}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{
                        ...styles.carAngleImagesWrapStyle,
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        marginVertical: Sizes.fixPadding - 5.0,
                    }}>
                        <Image
                            source={require('../../assets/images/cars/car9.png')}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={styles.carAngleImagesWrapStyle}>
                        <Image
                            source={require('../../assets/images/cars/car10.png')}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name={inSaved ? "heart" : "heart-outline"} size={20} color={Colors.blackColor}
                        onPress={() => {
                            updateState({ inSaved: !inSaved, showSnackBar: true })
                        }}
                    />
                    <Ionicons name="share-social-outline" color={Colors.blackColor} size={20} style={{ marginLeft: Sizes.fixPadding + 5.0 }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: Colors.whiteColor,
    },
    carAngleImagesWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        ...CommonStyles.shadow
    },
    ownerInfoWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userImageStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
    },
    phoneIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 10.0,
        shadowColor: Colors.primaryColor,
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    carSpeciaficationsInfoWrapStyle: {
        maxWidth: width / 5.0,
        marginRight: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center',
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
        ...CommonStyles.buttonShadow
    },
    snackBarStyle: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    carDetailInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        ...CommonStyles.shadow
    }
});

export default CarDetailScreen;
