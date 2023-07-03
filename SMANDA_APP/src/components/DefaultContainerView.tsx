import PropTypes from "prop-types";
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";
import { useTheme } from "react-native-paper";

function DefaultView({ children, background, keyboardAvoidView, styleView }) {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar barStyle={barStyle} backgroundColor={background || colors.background} animated /> */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                enabled={keyboardAvoidView}
                removeClippedSubviews={false}>
                <View style={[{ flex: 1 }, { backgroundColor: background || colors.background }, styleView]}>{children}</View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

DefaultView.propTypes = {
    background: PropTypes.string,
    styleView: PropTypes.object,
};

DefaultView.defaultProps = {
    keyboardAvoidView: true,
};

export default DefaultView;
