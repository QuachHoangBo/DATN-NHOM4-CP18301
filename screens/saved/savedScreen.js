import React, { useState } from "react";
import { View, TouchableOpacity, TouchableHighlight, Animated, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from "../../components/myStatusBar";

const savedList = [
    {
        key: '1',
        carImage: require('../../assets/images/cars/car5.png'),
        inSaved: false,
        carBrand: 'Mercedes',
        carType: 'SUV',
        carModel: 'CLS 450 Coupe 2020',
        amountPerDay: 120,
        location: 'Thornridge Cir. Syracuse, Connecticut',
        rating: 5.0,
        seats: 5,
    },
    {
        key: '2',
        carImage: require('../../assets/images/cars/car1.png'),
        inSaved: false,
        carBrand: 'Audi',
        carType: 'Sport',
        carModel: 'Audi Q5',
        amountPerDay: 190,
        location: 'Royal Ln. Mesa, New Jersey',
        rating: 5.0,
        seats: 4,
    },
    {
        key: '3',
        carImage: require('../../assets/images/cars/car2.png'),
        inSaved: false,
        carBrand: 'Mercedes',
        carType: 'Van',
        carModel: 'Bens w176',
        amountPerDay: 180,
        location: 'Washington Ave. Manchester, Kentucky',
        rating: 5.0,
        seats: 5,
    },
];

const rowSwipeAnimatedValues = {};

Array(savedList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const SavedScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(savedList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 50],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.vehicaleInfoWrapStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, }}>
                            <Text>
                                <Text style={{ ...Fonts.blackColor16Medium }}>
                                    {data.item.carBrand}
                                </Text>
                                <Text>
                                    {' '}
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.carType}
                                </Text>
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {data.item.carModel}
                            </Text>
                            <Text style={{ marginVertical: Sizes.fixPadding - 8.0, }}>
                                <Text style={{ ...Fonts.primaryColor16Medium }}>
                                    {`$`}{data.item.amountPerDay}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    { } | day
                                </Text>
                            </Text>
                        </View>
                        <View style={{ width: 150.0, height: 70.0, }}>
                            <Image
                                source={data.item.carImage}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="location-pin"
                            color={Colors.grayColor}
                            size={14}
                            style={{ marginLeft: Sizes.fixPadding - 13.0 }}
                        />
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {data.item.location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            {data.item.rating.toFixed(1)}
                        </Text>
                        <MaterialIcons
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/seat.png'), value: `${data.item.seats} seats` })}
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/petrolpump.png'), value: ' Petrol' })}
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/auto.png'), value: ' Auto' })}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('CarDetail')}
                            style={styles.bookButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                Book
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    function vehicaleFunctionalityesSort({ icon, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    {value}
                </Text>
            </View>
        )
    }

    function noFavoriteItemsInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons
                    name="heart-outline"
                    color={Colors.grayColor}
                    size={40}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Medium }}>
                    Your Saved List is Empty
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    {listData.length == 0 ?
                        <>
                            {noFavoriteItemsInfo()}
                        </>
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-60}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        Item Remove From Saved.
                    </Snackbar>
                </View>
            </View>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, zIndex: 1 }}
                />
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor18Bold }}>
                    Saved
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    vehicaleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    bookButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        ...CommonStyles.buttonShadow
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 60,
        backgroundColor: Colors.redColor,
        right: 0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
});

export default SavedScreen;
