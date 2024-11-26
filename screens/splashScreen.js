import React, { useCallback } from "react";
import { View, Image, Text, BackHandler } from "react-native";
import { Colors, Fonts, } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../components/myStatusBar";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ width: 80.0, height: 80.0, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.whiteColor22Medium }}>
                    Carental
                </Text>
            </View>
        </View>
    )
}

export default SplashScreen;