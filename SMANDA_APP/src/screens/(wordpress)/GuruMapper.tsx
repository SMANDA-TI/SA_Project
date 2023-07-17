import {
    View,
    SafeAreaView,
    Image,
    ImageBackground,
    useWindowDimensions,
    TouchableOpacity,
} from "react-native";
import { WPNestStackScreenProps } from "../../types/RootType";
import { Text, Surface, List, Divider } from "react-native-paper";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { MappedPostData } from "../../types/PostTypes";
import { getGuru } from "../../context/Slicer/WordpressProvider";
import { filter } from "lodash";

const APP_LOGO = require("../../../assets/images/Profile_Logo_SMANDA_APP.png");

type JustNavigation = {
    navigation: WPNestStackScreenProps<"GuruOverview">["navigation"];
};

type Props = WPNestStackScreenProps<"GuruOverview"> &
    ListRenderItemInfo<MappedPostData> & {
        width: number;
    };
export function GuruMapper(props: WPNestStackScreenProps<"GuruOverview">) {
    // const nav = useNavigation<typeUseNavigation>();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        // flex: 1,
                        // flexWrap: "nowrap",
                    }}
                    removeClippedSubviews={true}>
                    <ImageAPP />
                    <Main navigation={props.navigation} route={props.route} />
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
function ImageAPP() {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flex: 1, margin: 15, height: 200 }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    resizeMode="contain"
                    source={APP_LOGO}
                />
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Surface
                    style={{
                        padding: 20,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                    }}>
                    <Text variant="titleLarge">{"Profil Kependidikan"}</Text>
                    <Text variant="titleMedium">{"SMANDA APP"}</Text>
                </Surface>
            </View>
        </View>
    );
}

function Main(props: WPNestStackScreenProps<"GuruOverview">) {
    return (
        GetPendidik().guru.length !== 0 && (
            <>
                <ProfilGuru navigation={props.navigation} route={props.route} />
                <ProfilTU navigation={props.navigation} route={props.route} />
            </>
        )
    );
}

const GetPendidik = () => {
    const pendidik = getGuru();
    return {
        guru: filter(pendidik, function (item) {
            return item.categories.includes(23);
        }),
        tu: filter(pendidik, function (item) {
            return item.categories.includes(26);
        }),
    };
};

function ProfilGuru({ navigation, route }: WPNestStackScreenProps<"GuruOverview">) {
    const pendidik = GetPendidik()?.guru;
    const { width } = useWindowDimensions();
    return (
        <List.Section
            titleStyle={{ paddingLeft: 0, paddingTop: 0 }}
            title={`Profil Guru, Jumlah Guru: ${pendidik.length}`}
            style={{ paddingBottom: 20 }}>
            {/* <View style={{ borderRadius: 20, flex: 1 }}> */}
            <View style={{ height: 500, width: "100%" }}>
                <FlashList
                    numColumns={2}
                    nestedScrollEnabled={true}
                    estimatedItemSize={pendidik?.length}
                    keyExtractor={(item) => `${item.from}:${item.id}`}
                    data={pendidik}
                    renderItem={(props: Props) =>
                        ItemMapper({ navigation, route, width, ...props })
                    }
                />
            </View>
        </List.Section>
    );
}
function ProfilTU({ navigation, route }: WPNestStackScreenProps<"GuruOverview">) {
    const pendidik = GetPendidik().tu;
    const { width } = useWindowDimensions();
    return (
        <List.Section
            titleStyle={{ paddingLeft: 0, paddingTop: 0 }}
            title={`Profil Staff Tata Usaha, Jumlah TU: ${pendidik.length}`}>
            {/* <View style={{ borderRadius: 20, flex: 1 }}> */}
            <View style={{ height: 600, width: "100%" }}>
                <FlashList
                    numColumns={2}
                    nestedScrollEnabled={true}
                    estimatedItemSize={pendidik?.length}
                    keyExtractor={(item) => `${item.from}:${item.id}`}
                    data={pendidik}
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
                                : require("../../../assets/images/No-Image-300x400.png")
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

export default GuruMapper;
