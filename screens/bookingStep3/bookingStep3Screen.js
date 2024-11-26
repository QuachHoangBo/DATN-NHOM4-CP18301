import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const BookingStep3Screen = ({ navigation }) => {

    const [state, setState] = useState({
        licenseNumber: null,
        licenseExpiry: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        licenseNumber,
        licenseExpiry,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {successIcon()}
                    {licenseNumberTextField()}
                    {licenseExpiryDateTextField()}
                    {idPhotoInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
        </View>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SelectPaymentMethod')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function idPhotoInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Regular }}>
                    Upload your ID photo
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding * 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.5, }}>
                        <View style={styles.frontAndBackPhotoUploadInfoWrapStyle}>
                            <MaterialIcons
                                name="add"
                                color={Colors.blackColor}
                                size={30}
                            />
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            Front
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.5, }}>
                        <View style={styles.frontAndBackPhotoUploadInfoWrapStyle}>
                            <MaterialIcons
                                name="add"
                                color={Colors.blackColor}
                                size={30}
                            />
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            Back
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function licenseExpiryDateTextField() {
        return (
            <View style={{ ...styles.textFieldInfoWrapStyle }}>
                <MaterialCommunityIcons name="calendar-month" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={licenseExpiry}
                    onChangeText={(value) => updateState({ licenseExpiry: value })}
                    placeholder="License Expiry Date"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                    keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : "number-pad"}
                />
            </View>
        )
    }

    function licenseNumberTextField() {
        return (
            <View style={{ ...styles.textFieldInfoWrapStyle }}>
                <MaterialCommunityIcons name="card-account-details" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={licenseNumber}
                    onChangeText={(value) => updateState({ licenseNumber: value })}
                    placeholder="License Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="number-pad"
                />
            </View>
        )
    }

    function successIcon() {
        return (
            <Ionicons
                name="checkmark-circle-outline"
                size={70}
                color={Colors.primaryColor}
                style={{ alignSelf: 'center', margin: Sizes.fixPadding * 2.0, }}
            />
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
                    Driving License
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
    textFieldInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    frontAndBackPhotoUploadInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderStyle: 'dashed',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        elevation: 3.0,
        ...CommonStyles.buttonShadow
    }
});

export default BookingStep3Screen;