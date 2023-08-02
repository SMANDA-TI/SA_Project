import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Divider, Chip, useTheme } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { WPNestStackScreenProps } from "../../types/RootType";
import { WebView } from "react-native-webview";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";

const PostScreen = (props: WPNestStackScreenProps<"PostOverview">) => {
    const { post_data } = props.route.params;
    const [WebViewKey, setWebViewKey] = useState(0);
    const { width } = useWindowDimensions();

    const setWebViewKeyPlusOne = () => {
        setWebViewKey(WebViewKey + 1);
    };
    const tema = useTheme();
    const WebviewAudio = ({ audioTag }) => {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    androidHardwareAccelerationDisabled={true}
                    key={WebViewKey}
                    source={{
                        html: audioTag,
                    }}
                    originWhitelist={["*"]}
                    automaticallyAdjustContentInsets={false}
                    style={{
                        backgroundColor: "transparent",
                        flex: 1,
                        height: 50,
                        // width: "100%",
                        aspectRatio: 15,
                    }}
                    onContentProcessDidTerminate={setWebViewKeyPlusOne}
                />
            </View>
        );
    };

    // const [cssContent, setCssContent] = useState("");

    // useEffect(() => {
    //     const fetchCss = async () => {
    //         try {
    //             const response1 = await fetch("https://sman2kuningan.sch.id/wp-includes/css/dist/block-library/style.min.css?ver=5.4.13");
    //             const cssText1 = await response1.text();
    //             const response2 = await fetch("https://sman2kuningan.sch.id/wp-content/themes/mading/style.css?ver=5.4.13");
    //             const cssText2 = await response2.text();
    //             const cssText = cssText1 + "\n" + cssText2;
    //             setCssContent(cssText);
    //             if (cssText) {
    //                 console.log("Success to fetch CSS file:", cssText.length);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch CSS file:", error);
    //         }
    //     };

    //     fetchCss();
    // }, []);
    const renderers = {
        iframe: IframeRenderer,
    };

    const customHTMLElementModels = {
        iframe: iframeModel,
    };

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
                source={
                    post_data.imageThumbnail
                        ? {
                              uri: post_data.imageThumbnail,
                          }
                        : require("../../../assets/images/No-picture-600x600.jpg")
                }
            />
            <View style={{ flex: 1 }}>
                <ScreenWrapper
                    // directionalLockEnabled={true}
                    indicatorStyle={tema.dark ? "white" : "black"}
                    // bounces={false}
                    style={{ backgroundColor: "transparent" }}
                >
                    {/* CHATGPT!, I want this view below me to set the maximum hight able to be scroll is 200 */}
                    <View
                        style={{
                            backgroundColor: tema.colors.background,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            marginTop: 250,
                        }}
                    >
                        <View style={{ height: 24 }} />
                        {/* // ? Main Post Component ! */}
                        <View style={{ marginHorizontal: 20 }}>
                            <View>
                                <Text variant="titleLarge" style={{ fontSize: 20 }}>
                                    {post_data.title}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 10, marginTop: 15 }}>
                            <Divider
                                style={{ backgroundColor: tema.colors.onBackground }}
                                bold={true}
                            />
                        </View>

                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <Text variant="labelLarge">{`Ditulis Oleh: ${post_data.author.name}`}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-start", marginVertical: 10 }}>
                                <Chip icon="clock-edit-outline" style={{ borderRadius: 100 }}>
                                    {post_data.local_date}
                                </Chip>
                            </View>
                            <View>
                                {post_data.audio.exist && (
                                    <WebviewAudio audioTag={post_data.audio.audioTags} />
                                )}
                                <RenderHtml
                                    renderers={renderers}
                                    WebView={WebView}
                                    customHTMLElementModels={customHTMLElementModels}
                                    renderersProps={{
                                        iframe: {
                                            scalesPageToFit: true,
                                        },
                                        webViewProps: {
                                            androidHardwareAccelerationDisabled: false,
                                        },
                                    }}
                                    systemFonts={["SNL", "SNR", "SNM", "SNSB", "SNB"]}
                                    baseStyle={{
                                        fontFamily: "SNM",
                                        color: tema.colors.onBackground,
                                    }}
                                    contentWidth={width - 100}
                                    source={{
                                        html: post_data.audio.exist
                                            ? post_data.audio.sanitizeHtml
                                            : post_data.content.rendered,
                                        // `<style>${cssContent}</style>\n${post_data.content.rendered}`
                                    }}
                                    enableExperimentalMarginCollapsing={true}
                                    ignoredDomTags={["object"]}
                                />
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
