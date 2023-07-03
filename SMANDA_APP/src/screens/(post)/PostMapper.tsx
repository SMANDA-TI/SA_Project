import * as React from "react";
import { View, StyleSheet, Platform, GestureResponderEvent, Image, ImageBackground } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Menu, Text, Divider, Button, List, TouchableRipple, useTheme } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useGlobals } from "../../context/RootContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MappedPostData } from "../../types/PostTypes";

type ContextualMenuCoord = { x: number; y: number };

type Props = {
    navigation?: StackNavigationProp<{}>;
    post_data: MappedPostData;
};

type MenuVisibility = {
    [key: string]: boolean | undefined;
};

const PostScreen = ({ navigation, post_data }: Props) => {
    const { state, dispatch } = useGlobals();
    const [visible, setVisible] = React.useState<MenuVisibility>({});
    const { isV3 } = useTheme();

    const _toggleMenu = (name: string) => () => setVisible({ ...visible, [name]: !visible[name] });

    const _getVisible = (name: string) => !!visible[name];

    const tema = useTheme();
    return (
        <View style={styles.screen}>
            <Image
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    // resizeMode: "cover",
                    height: 275,
                    width: "100%",
                    alignSelf: "center",
                }}
                source={{
                    uri: post_data.imageThumbnail,
                }}
            />
            <View style={{ flex: 1 }}>
                <ScreenWrapper
                    // directionalLockEnabled={true}
                    indicatorStyle={state.isDarkMode ? "white" : "black"}
                    bounces={false}
                    style={{ backgroundColor: "transparent" }}>
                    {/* CHATGPT!, I want this view below me to set the maximum hight able to be scroll is 200 */}
                    <View
                        style={{
                            backgroundColor: tema.colors.background,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            marginTop: 250,
                        }}>
                        <View style={{ height: 30 }} />
                        {/* // ? Main Post Component ! */}
                        <View style={{ alignItems: "flex-start", marginHorizontal: 20 }}>
                            <View>
                                <Text variant="titleLarge" style={{ fontSize: 24 }}>
                                    {post_data.title}
                                </Text>
                            </View>
                            <View style={{ height: 20 }} />
                            <View>
                                <Text>{post_data.content.rendered}</Text>
                            </View>
                        </View>
                    </View>
                </ScreenWrapper>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
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

export default PostScreen;
