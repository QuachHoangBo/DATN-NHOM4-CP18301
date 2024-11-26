import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const paymentMethodsList = [
    {
        id: '1',
        paymentMethodIcon: require('../../assets/images/paymentMethods/credit_card.png'),
        paymentMethod: 'Credit Card',
    },
    {
        id: '2',
        paymentMethodIcon: require('../../assets/images/paymentMethods/paypal.png'),
        paymentMethod: 'Paypal',
    },
    {
        id: '3',
        paymentMethodIcon: require('../../assets/images/paymentMethods/google_pay.png'),
        paymentMethod: 'Google Pay',
    },
    {
        id: '4',
        paymentMethodIcon: require('../../assets/images/paymentMethods/stripe.png'),
        paymentMethod: 'Stripe',
    },
    {
        id: '5',
        paymentMethodIcon: require('../../assets/images/paymentMethods/payU.png'),
        paymentMethod: 'PayU Money',
    },
];

const SelectPaymentMethodScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedPaymentMethodIndex: 0,
        cardNumber: '9874 4569 45698 4569',
        nameOfCard: 'Ronald Richards',
        expiryDate: '12/23',
        securityCode: '779',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedPaymentMethodIndex,
        cardNumber,
        nameOfCard,
        expiryDate,
        securityCode,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {paymentMethodsInfo()}
                            {cardDetailsInfo()}
                            {continueButton()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        </View>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Confirmation')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function cardDetailsInfo() {
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Medium }}>
                    Card Details
                </Text>
                {cardNumberInfo()}
                {nameOfCardInfo()}
                {expiryDateAndSecurityCodeInfo()}
            </View>
        )
    }

    function expiryDateAndSecurityCodeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                <View style={{ flex: 1, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Expiry Date
                    </Text>
                    <TextInput
                        value={expiryDate}
                        onChangeText={(value) => updateState({ expiryDate: value })}
                        selectionColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Security Code
                    </Text>
                    <TextInput
                        value={securityCode}
                        onChangeText={(value) => updateState({ securityCode: value })}
                        selectionColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function nameOfCardInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Name on Card
                </Text>
                <TextInput
                    value={nameOfCard}
                    onChangeText={(value) => updateState({ nameOfCard: value })}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function cardNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Card Number
                </Text>
                <TextInput
                    value={cardNumber}
                    onChangeText={(value) => updateState({ cardNumber: value })}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function paymentMethodsInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedPaymentMethodIndex: index })}
                style={{
                    ...styles.paymentMethodInfoWrapStyle,
                    shadowColor: selectedPaymentMethodIndex == index ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedPaymentMethodIndex == index ? Colors.primaryColor : Colors.whiteColor,
                }}
            >
                <Image
                    source={item.paymentMethodIcon}
                    style={{ width: 40.0, height: 40.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 2.0, }}
                />
                <Text numberOfLines={1} style={selectedPaymentMethodIndex == index ? { ...Fonts.whiteColor15Regular } : { ...Fonts.blackColor15Regular }}>
                    {item.paymentMethod}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={paymentMethodsList}
                    keyExtractor={(item) => `${item.id}`}
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
                    style={{ position: 'absolute', left: 20.0, zIndex: 1 }}
                />
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor18Bold }}>
                    Select Payment Method
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
    paymentMethodInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: 100.0,
        alignItems: 'center',
        elevation: 3.0,
        paddingTop: Sizes.fixPadding + 10.0,
        marginRight: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 2.0,
        ...CommonStyles.shadow
    },
    textFieldStyle: {
        ...Fonts.blackColor15Regular,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        padding: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding - 5.0,
        ...CommonStyles.shadow
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        ...CommonStyles.buttonShadow
    }
});

export default SelectPaymentMethodScreen;
