import * as React from "react";
import { View, StyleSheet, Platform, GestureResponderEvent, Image, Share } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Menu, Appbar, Divider, Button, List, TouchableRipple, useTheme, Text } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";
import { useGlobals } from "../context/RootContext";
import { PropsPost } from "../types/RootType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type ContextualMenuCoord = { x: number; y: number };

type MenuVisibility = {
    [key: string]: boolean | undefined;
};

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const HeaderPostComp = ({ navigation, route }: PropsPost) => {
    const { dispatch } = useGlobals();
    const { post_data } = route.params;
    const [visible, setVisible] = React.useState<MenuVisibility>({});

    const _toggleMenu = (name: string) => () => setVisible({ ...visible, [name]: !visible[name] });
    const _getVisible = (name: string) => !!visible[name];

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `${
                    post_data.title
                    // .trim()
                    // .toLowerCase()
                    // .replace(/\b\w/g, (match) => match.toUpperCase())
                }\n\nBaca Selengkapnya Di: ${post_data.redirect}\n\nPesan ini di share melalui aplikasi mobile SMANDA APP 😁🎉`,
            });
            if (result?.action) {
                // _toggleMenu("menu1");
                setVisible({ ...visible, ["menu1"]: !visible["menu1"] });
            }
        } catch (error) {
            return;
        }
    };
    const RippleKolor = "rgba(255, 255, 255, 0.3)";
    return (
        <View style={styles.screen}>
            <LinearGradient colors={["rgba(0, 0, 0, 0.88)", "rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.28)", "#0000"]}>
                <Appbar.Header style={{ backgroundColor: "transparent" }}>
                    {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
                    {/* <Appbar.Content style={{ alignItems: "flex-start" }} title /> */}
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
                        <Button
                            icon={({ size, color }) => <MaterialCommunityIcons name="chevron-left" size={35} color="white" />}
                            mode="text"
                            textColor="white"
                            rippleColor={RippleKolor}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            labelStyle={{ opacity: 1, fontSize: 24, letterSpacing: 0, lineHeight: 32, color: "white" }}
                            // contentStyle={{ backgroundColor: "#c0c0c0", opacity: 0.7 }}
                            style={{ borderRadius: 100 }}>
                            Kembali
                        </Button>

                        <Menu
                            visible={_getVisible("menu1")}
                            onDismiss={_toggleMenu("menu1")}
                            anchor={<Appbar.Action color="white" rippleColor={RippleKolor} icon={MORE_ICON} onPress={_toggleMenu("menu1")} />}>
                            <Menu.Item
                                leadingIcon="eye-refresh-outline"
                                onPress={() => {
                                    dispatch({ type: "switchTheme" });
                                }}
                                title="Readability"
                            />
                            {/* <Divider style={styles.md3Divider} />
                            <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" />
                            <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" disabled /> */}
                            <Divider style={styles.md3Divider} />
                            <Menu.Item trailingIcon="share-variant" onPress={onShare} title="Share" />
                        </Menu>
                    </View>
                </Appbar.Header>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    container: {
        paddingTop: 48,
    },
    list: {
        marginTop: 48,
    },
    alignCenter: {
        alignItems: "center",
    },
    md3Divider: {
        marginVertical: 8,
    },
});

export default HeaderPostComp;
