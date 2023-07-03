import PropTypes from "prop-types";
import React from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Platform } from "react-native";

export function SafeAreaDefaultView({ children, ...props }) {
    // const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{children}</View>
        </SafeAreaView>
    );
}
export function SafeAreaDefaultViewWithKeyboard({ children, ...props }) {
    // const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} enabled={true}>
                <View style={{ flex: 1 }}>{children}</View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
