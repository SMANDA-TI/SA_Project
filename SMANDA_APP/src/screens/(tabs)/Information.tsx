import {
    View,
    ScrollView,
    Image,
    useWindowDimensions,
    ImageBackground,
    Dimensions,
} from "react-native";
import { RootTabScreenProps, TabNavigationProps } from "../../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { Text, Button, Surface, useTheme, IconButton, Card, List } from "react-native-paper";
import { FlatList, GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import {
    getEksul,
    getOrganisasi,
    getPostPenting,
    getS_slides,
    getYoutube,
} from "../../context/Slicer/WordpressProvider";
import YoutubePlayer from "react-native-youtube-iframe";
import { getTransparent } from "../../context/Slicer/GlobalEnvironment";
import * as Linking from "expo-linking";

type JustNavigation = {
    navigation: RootTabScreenProps<"Information">["navigation"];
};
const _spacing = 10;

export function InformationScreen(props: RootTabScreenProps<"Information">) {
    // const nav = useNavigation<typeUseNavigation>();
    const tema = useTheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ViewBack />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={
                    {
                        // paddingHorizontal: 20,
                        // flex: 1,
                        // flexWrap: "nowrap",
                    }
                }
                removeClippedSubviews={true}>
                <View
                    style={{
                        backgroundColor: tema.colors.background,
                        // backgroundColor: "blue",
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        marginTop: 250,
                    }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <BalokInformasi />
                        <InitComponent navigation={props.navigation} />
                        <YoutubeChip />
                        <YoutubeVideo />
                        <BalokYoutube />
                        <WebsiteFlatList />
                        <PeraturanAturan navigation={props.navigation} />
                        <EksulFlatList navigation={props.navigation} />
                        <OrganFlatList navigation={props.navigation} />
                        {/* <View style={{ height: 100 }} /> */}
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

function InitComponent({ navigation }: JustNavigation) {
    // const { width, height } = useWindowDimensions();
    const { width } = Dimensions.get("window");
    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ marginBottom: 20, marginTop: 30 }}>
                <Text variant="titleLarge">{"Informasi Terbaru"}</Text>
            </View>
            {/* <View style={{ borderRadius: 20, flex: 1 }}> */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => item.title + Math.random()}
                data={getInformationFromPP()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("(wordpress)", {
                                    screen: "PostOverview",
                                    params: { post_data: item },
                                })
                            }>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    justifyContent: "space-between",
                                    height: 175,
                                    marginRight: _spacing,
                                    width: width / 2.1,
                                }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <ImageBackground
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        imageStyle={{ borderRadius: 15 }}
                                        resizeMode="cover"
                                        source={{ uri: item.imageThumbnail }}>
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <LinearGradient
                                                style={{
                                                    paddingHorizontal: 16,
                                                    borderBottomLeftRadius: 14,
                                                    borderBottomRightRadius: 14,
                                                }}
                                                colors={[
                                                    "#0000",
                                                    "rgba(0, 0, 0, 0.7)",
                                                    "rgba(0, 0, 0, 0.88)",
                                                ]}>
                                                <View style={{ flex: 1, height: 50 }} />
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text
                                                        variant="titleLarge"
                                                        style={{
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            fontSize: 18,
                                                            color: "rgba(255, 255, 255, 0.9)",
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            {/* </View> */}
        </View>
    );
}

function BalokInformasi() {
    return (
        <View style={{ marginTop: 20 }}>
            <Surface style={{ borderRadius: 20, height: 175 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 1.3,
                            padding: 20,
                            paddingRight: 0,
                            justifyContent: "center",
                        }}>
                        <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
                            Informasi
                        </Text>
                        <Text style={{ lineHeight: 20 }}>
                            {
                                /* cspell: disable-next-line */
                                "Disini, anda dapat membaca dan melihat berbagai informasi dari SMAN 2 KUNINGAN."
                            }
                        </Text>
                    </View>
                    <View style={{ flex: 1, margin: 20 }}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="contain"
                            source={require("../../../assets/images/Logo-Smanda.png")}
                        />
                    </View>
                </View>
            </Surface>
        </View>
    );
}
function BalokYoutubeBlob() {
    return (
        <View style={{ marginTop: 20 }}>
            <Surface style={{ borderRadius: 20, height: 175 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 1.3,
                            padding: 20,
                            paddingRight: 0,
                            justifyContent: "center",
                        }}>
                        <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
                            Informasi
                        </Text>
                        <Text style={{ lineHeight: 20 }}>
                            {
                                /* cspell: disable-next-line */
                                "Disini, anda dapat membaca dan melihat berbagai informasi dari SMAN 2 KUNINGAN."
                            }
                        </Text>
                    </View>
                    <View style={{ flex: 1, margin: 20 }}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="contain"
                            source={require("../../../assets/images/Logo-Smanda.png")}
                        />
                    </View>
                </View>
            </Surface>
        </View>
    );
}

function BalokYoutube() {
    const isTransparent = getTransparent();
    return (
        <Surface
            elevation={2}
            style={{
                marginVertical: 10,
                padding: 20,
                borderRadius: 20,
            }}>
            <View style={{ flex: 1, height: 200 }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="contain"
                        source={require("../../../assets/images/youtube-logo-transparent.png")}
                    />
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                    }}>
                    {"Sekolah SMAN 2 KUNINGAN punya Channel Youtube yang wajib di cek nih di:\n\n"}
                    <Text
                        style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontFamily: "System",
                            fontWeight: "bold",
                        }}>
                        {"SMAN 2 KUNINGAN"}
                    </Text>
                </Text>
            </View>
            <Button
                style={{ borderRadius: 100 }}
                contentStyle={{ height: 50 }}
                labelStyle={{ fontSize: 15 }}
                mode={isTransparent ? "contained-tonal" : "contained"}
                // uppercase={true}
                onPress={() => Linking.openURL("https://www.youtube.com/@sman2kuningan671")}>
                Lihat Channel
            </Button>
        </Surface>
    );
}
function PeraturanAturan({ navigation }: JustNavigation) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Article")}>
            <View style={{ flex: 1, marginTop: 15 }}>
                <Surface
                    elevation={3}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 10,
                    }}>
                    <Text style={{ flex: 3, padding: 13 }}>
                        {
                            /* cspell: disable-next-line */
                            "Untuk Lagu, Mars, dan Hymne SMAN 2 KUNINGAN bisa di temukan di bagian Artikel."
                        }
                    </Text>
                    <View style={{ flex: 0.6 }}>
                        <IconButton icon="arrow-right" size={20} />
                    </View>
                </Surface>
            </View>
        </TouchableOpacity>
    );
}

function getInformationFromPP() {
    const Slides = getPostPenting();
    return Slides.filter((item) => item.categories.includes(184));
}
function ViewBack() {
    const tema = useTheme();
    const { width, height } = useWindowDimensions();
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
                // resizeMode: "cover",
                // height: 275,
                width: "100%",
                alignSelf: "center",
                // backgroundColor: "red",
            }}>
            <Carousel
                loop
                width={width}
                height={275}
                style={{ width: "100%" }}
                autoPlay={true}
                autoPlayInterval={5000}
                scrollAnimationDuration={500}
                data={getInformationFromPP()}
                pagingEnabled={true}
                onSnapToItem={(index) => console.log("current index:", index)}
                // mode="parallax"
                // modeConfig={{
                //     parallaxScrollingScale: 1,
                //     parallaxScrollingOffset: 10,
                //     parallaxAdjacentItemScale: 20,
                // }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignSelf: "center" }}>
                            <Image
                                style={{
                                    width: width - 15,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    height: 275,
                                    resizeMode: "cover",
                                }}
                                source={{ uri: item.imageThumbnail }}
                            />
                            {/* <Text>{`Halo, di Index: ${index}`}</Text> */}
                        </View>
                    );
                }}
            />
        </View>
    );
}

const dataSlideSchool = () => {
    const youtube = getYoutube();
    return youtube;
};

function YoutubeVideo() {
    const { width } = Dimensions.get("window");
    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title={`Youtube Video`}>
            <FlatList
                keyExtractor={(item) => "youtubeSA://" + item}
                data={dataSlideSchool()}
                showsHorizontalScrollIndicator={false}
                // data={[...new Array(6).keys()]}
                // numColumns={3}
                // horizontal={true}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={{ width: "100%", justifyContent: "center" }}>
                        <YoutubePlayer
                            height={width - 150}
                            // width={}
                            // webViewStyle={{ marginRight: _spacing }}
                            play={false}
                            videoId={item}
                            // onChangeState={onStateChange}
                        />
                        {/* <Text>Hello</Text> */}
                    </View>
                )}
                // contentContainerStyle={{
                //     flex: 1,
                //     justifyContent: "center",
                //     alignItems: "center",
                // }}
                // columnWrapperStyle={{ justifyContent: "space-between" }}
            />
        </List.Section>
    );
}

function YoutubeChip() {
    const [tips, setTips] = useState(true);
    const tipsALWAYS = true;
    const OnPressTips = () => {
        setTips(false);
    };
    return (
        tipsALWAYS && (
            <View style={{ flex: 1, marginTop: 5 }}>
                <Surface
                    elevation={3}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 10,
                    }}>
                    <Text style={{ flex: 3, padding: 13 }}>
                        {
                            /* cspell: disable-next-line */
                            "Tonton juga berbagai video mengenai tata tertib dan aturan sekolah dibawah ini."
                        }
                    </Text>
                    <View style={{ flex: 0.6 }}>
                        <IconButton icon="close" size={20} onPress={OnPressTips} />
                    </View>
                </Surface>
            </View>
        )
    );
}

function WebsiteFlatList() {
    const s_slides = getS_slides();
    const { width } = useWindowDimensions();
    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title={`Website`}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => item.title + Math.random()}
                data={[
                    {
                        title: "Website Sekolah",
                        image: require("../../../assets/images/smandaku-lobby-buriq.jpg"),
                        network: false,
                        url: "https://sman2kuningan.sch.id/",
                    },
                    {
                        title: "Website Osis",
                        image: s_slides[0],
                        network: true,
                        url: "https://osis-smandakng.org/",
                    },
                ]}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    justifyContent: "space-between",
                                    height: 175,
                                    marginRight: _spacing,
                                    width: width / 1.2,
                                }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <ImageBackground
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        imageStyle={{ borderRadius: 15 }}
                                        resizeMode="cover"
                                        source={!item.network ? item.image : { uri: item.image }}>
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <LinearGradient
                                                style={{
                                                    paddingHorizontal: 16,
                                                    borderBottomLeftRadius: 14,
                                                    borderBottomRightRadius: 14,
                                                }}
                                                colors={[
                                                    "#0000",
                                                    "rgba(0, 0, 0, 0.7)",
                                                    "rgba(0, 0, 0, 0.88)",
                                                ]}>
                                                <View style={{ flex: 1, height: 50 }} />
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text
                                                        variant="titleLarge"
                                                        style={{
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            fontSize: 18,
                                                            color: "rgba(255, 255, 255, 0.9)",
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </List.Section>
    );
}
function EksulFlatList({ navigation }: JustNavigation) {
    const eksul = getEksul();
    const { width } = useWindowDimensions();
    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title={`Ekstrakurikuler`}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => `${item.from}:${item.id}`}
                data={eksul}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            // activeOpacity={0.8}
                            onPress={() => {
                                // setTimeout(() => {
                                // dispatch({ type: "setActivePost", payload: props.item });

                                navigation.navigate("(wordpress)", {
                                    screen: "PostOverview",
                                    params: { post_data: item },
                                });
                                // }, 2000);
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    justifyContent: "space-between",
                                    height: 175,
                                    marginRight: _spacing,
                                    width: width / 1.2,
                                }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <ImageBackground
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        imageStyle={{ borderRadius: 15 }}
                                        resizeMode="cover"
                                        source={{ uri: item.imageThumbnail }}>
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <LinearGradient
                                                style={{
                                                    paddingHorizontal: 16,
                                                    borderBottomLeftRadius: 14,
                                                    borderBottomRightRadius: 14,
                                                }}
                                                colors={[
                                                    "#0000",
                                                    "rgba(0, 0, 0, 0.7)",
                                                    "rgba(0, 0, 0, 0.88)",
                                                ]}>
                                                <View style={{ flex: 1, height: 50 }} />
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text
                                                        variant="titleLarge"
                                                        style={{
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            fontSize: 18,
                                                            color: "rgba(255, 255, 255, 0.9)",
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </List.Section>
    );
}
function OrganFlatList({ navigation }: JustNavigation) {
    const organisasi = getOrganisasi();
    const { width } = useWindowDimensions();
    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title={`Keorganisasian`}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => `${item.from}:${item.id}`}
                data={organisasi}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            // activeOpacity={0.8}
                            onPress={() => {
                                // setTimeout(() => {
                                // dispatch({ type: "setActivePost", payload: props.item });

                                navigation.navigate("(wordpress)", {
                                    screen: "PostOverview",
                                    params: { post_data: item },
                                });
                                // }, 2000);
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    justifyContent: "space-between",
                                    height: 175,
                                    marginRight: _spacing,
                                    width: width / 1.2,
                                }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <ImageBackground
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        imageStyle={{ borderRadius: 15 }}
                                        resizeMode="cover"
                                        source={{ uri: item.imageThumbnail }}>
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <LinearGradient
                                                style={{
                                                    paddingHorizontal: 16,
                                                    borderBottomLeftRadius: 14,
                                                    borderBottomRightRadius: 14,
                                                }}
                                                colors={[
                                                    "#0000",
                                                    "rgba(0, 0, 0, 0.7)",
                                                    "rgba(0, 0, 0, 0.88)",
                                                ]}>
                                                <View style={{ flex: 1, height: 50 }} />
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text
                                                        variant="titleLarge"
                                                        style={{
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            fontSize: 18,
                                                            color: "rgba(255, 255, 255, 0.9)",
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </List.Section>
    );
}
