import {
    View,
    StyleSheet,
    Image,
    useWindowDimensions,
    ImageBackground,
    FlatList,
    ListRenderItemInfo as ListRenderItemInfoFlat,
} from "react-native";
import { RootTabScreenProps } from "../../types/RootType";
import { Text, useTheme, List, Surface, Card } from "react-native-paper";
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { MappedPostData } from "../../types/PostTypes";
import { getPostPenting, getPostingan } from "../../context/Slicer/WordpressProvider";

import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";

type PropsFlat = RootTabScreenProps<"Article"> &
    ListRenderItemInfoFlat<MappedPostData> & { typeMode: "one" | "two" };

type JustNavigation = {
    navigation: RootTabScreenProps<"Article">["navigation"];
};

type Props = RootTabScreenProps<"Article"> &
    ListRenderItemInfo<MappedPostData> & {
        width: number;
    };

const _spacing = 10;

export function ArticleScreen(props: RootTabScreenProps<"Article">) {
    // const nav = useNavigation<typeUseNavigation>();
    const { width } = useWindowDimensions();
    const tema = useTheme();
    return (
        <GestureHandlerRootView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ height: "100%" }}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    // flex: 1,
                    // flexWrap: "nowrap",
                }}
                removeClippedSubviews={true}>
                <MainComponentArticle />
                <Mars navigation={props.navigation} />
                {getPostingan().length !== 0 && (
                    <NewestArticle navigation={props.navigation} route={props.route} />
                )}
            </ScrollView>
        </GestureHandlerRootView>
    );
}

function Mars({ navigation }: JustNavigation) {
    const { width } = useWindowDimensions();
    const PostPenting = getPostPenting().filter((item) => item.categories.includes(22));

    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title={`Lagu Sekolah`}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => `${item.from}:${item.id}`}
                data={PostPenting}
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
function NewestArticle({ navigation, route }: RootTabScreenProps<"Article">) {
    const { width } = useWindowDimensions();
    const Postingan = getPostingan();
    return (
        <List.Section
            titleStyle={{ paddingLeft: 0, paddingTop: 0 }}
            title="Artikel Terbaru"
            style={{ paddingBottom: 20 }}>
            {/* <View style={{ borderRadius: 20, flex: 1 }}> */}
            <View style={{ height: 500, width: "100%" }}>
                <FlashList
                    numColumns={2}
                    nestedScrollEnabled={true}
                    estimatedItemSize={Postingan?.length}
                    keyExtractor={(item) => `${item.from}:${item.id}`}
                    data={Postingan}
                    renderItem={(props: Props) =>
                        ItemMapper({ navigation, route, width, ...props })
                    }
                />
            </View>
        </List.Section>
    );
}

function ItemMapper({ navigation, route, item, width, ...props }: Props) {
    const _spacing = 10;
    return (
        <View
            style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                height: 175,
                marginRight: item?.urutan % 2 === 0 ? 0 : 5,
                marginLeft: item?.urutan % 2 === 0 ? 5 : 0,
                width: "48.5%",
                marginBottom: _spacing,
            }}>
            <View style={{ width: "100%", height: "100%" }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("(wordpress)", {
                            screen: "PostOverview",
                            params: { post_data: item },
                        });
                    }}>
                    <ImageBackground
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        imageStyle={{ borderRadius: 15 }}
                        resizeMode="cover"
                        source={
                            item.imageThumbnail
                                ? { uri: item.imageThumbnail }
                                : require("../../../assets/images/No-picture-600x600.jpg")
                        }>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <LinearGradient
                                style={{
                                    paddingHorizontal: 16,
                                    borderBottomLeftRadius: 14,
                                    borderBottomRightRadius: 14,
                                }}
                                colors={["#0000", "rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.88)"]}>
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
                </TouchableOpacity>
            </View>
        </View>
    );
}

function MainComponentArticle() {
    return (
        <>
            <View>
                <Text style={{ textAlign: "center" }} variant="headlineLarge">
                    {"Selamat datang di Artikel 🤩."}
                </Text>
            </View>
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
                                Artikel
                            </Text>
                            <Text style={{ lineHeight: 20 }}>
                                {
                                    /* cspell: disable-next-line */
                                    "Disini, anda dapat membaca dan mengakses berbagai artikel yang diterbitkan oleh SMAN 2 KUNINGAN."
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
        </>
    );
}

function RenderArticle({ navigation, typeMode, item }: PropsFlat) {
    return (
        <View style={{ width: typeMode == "one" ? "100%" : "49%", marginBottom: 10 }}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("(wordpress)", {
                        screen: "PostOverview",
                        params: { post_data: item },
                    })
                }>
                <Card style={{ flex: 1 }} key={`${item.id}:${item.from}:${item.type}`}>
                    <ImageBackground
                        source={
                            item.imageThumbnail
                                ? { uri: item.imageThumbnail }
                                : require("../../../assets/images/No-camera-available.jpeg")
                        }>
                        <LinearGradient
                            colors={[
                                "rgba(0, 0, 0, 0.88)",
                                "rgba(0, 0, 0, 0.7)",
                                "rgba(0, 0, 0, 0.28)",
                                "#0000",
                            ]}>
                            <Card.Title
                                titleStyle={{
                                    paddingBottom: 10,
                                    fontSize: 14,
                                    color: "rgba(255, 255, 255, 0.9)",
                                }}
                                titleVariant="bodyLarge"
                                title={
                                    /* cspell: disable-next-line */
                                    item.title
                                }
                            />
                        </LinearGradient>

                        <LinearGradient
                            style={{ paddingHorizontal: 16 }}
                            colors={[
                                "#0000",
                                "#0000",
                                "#0000",
                                "#0000",
                                "rgba(0, 0, 0, 0.7)",
                                "rgba(0, 0, 0, 0.88)",
                            ]}>
                            <View style={{ flex: 1, height: 50 }} />
                            <View style={{ flexDirection: "column" }}>
                                <Text
                                    variant="labelLarge"
                                    style={{
                                        paddingTop: 15,
                                        fontSize: 12,
                                        color: "rgba(255, 255, 255, 0.9)",
                                    }}>
                                    {item.formatted_date}
                                </Text>
                                <Text
                                    style={{
                                        paddingBottom: 10,
                                        fontSize: 12,
                                        color: "rgba(255, 255, 255, 0.9)",
                                    }}
                                    variant="labelMedium">{`Artikel: ${
                                    item.from == "SMANDA" ? "SEKOLAH" : "OSIS"
                                }`}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </Card>
            </TouchableOpacity>
        </View>
    );
}

function ArticleDataArray(): any {
    // const state = useAppSelector((state) => state.WPData);
    return;
}

const styles = StyleSheet.create({
    buttonHome: {
        borderRadius: 10,
        marginVertical: 5,
        // height: 50,
    },
    buttonHomeContent: {
        height: 50,
    },
    buttonHomeContentLarge: {
        height: 65,
    },
});
