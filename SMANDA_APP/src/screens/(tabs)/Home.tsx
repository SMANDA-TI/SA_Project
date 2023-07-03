import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    ImageBackground,
    useWindowDimensions,
    Dimensions,
    Platform,
    StyleProp,
    TextStyle,
} from "react-native";
import { RootScreenProps, typeUseNavigation } from "../../types/RootType";
import { Text, Button, Searchbar, List, Card, Chip, IconButton, useTheme, Surface, TouchableRipple } from "react-native-paper";
// import { SearchBar } from "../../components/SearchBar";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useGlobals } from "../../context/RootContext";
// import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef } from "react";
import DefaultView from "../../components/DefaultContainerView";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { MappedPostData } from "../../types/PostTypes";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";

// * Random Words Generator nih bang
// const words = ["Artikel", "Mantap", "Aku", "🎉", "👋"];

// function getRandomWord() {
//     const randomIndex = Math.floor(Math.random() * words.length);
//     return words[randomIndex];
// }
type Props =
    // RootScreenProps &
    CarouselRenderItemInfo<MappedPostData>;
export function HomeScreen(props: RootScreenProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    searchQuery != null && searchQuery != undefined && searchQuery != "" && console.log(searchQuery);
    return (
        // <DefaultView>
        <GestureHandlerRootView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    // flex: 1,
                    // flexWrap: "nowrap",
                }}
                removeClippedSubviews={true}>
                {/* <Text style={{ fontFamily: "Belanosima-SemiBold", fontSize: 20 }}>Belanosima</Text> */}
                <Searchbar placeholder="Pencarian" onChangeText={onChangeSearch} style={{ marginVertical: 10 }} value={searchQuery} />
                {/* <Text style={{ fontFamily: "Belanosima-SemiBold", fontSize: 20 }}>Beranda!</Text> */}
                <ButtonHomeComp />
                <ArticleCarouselHome />
            </ScrollView>
        </GestureHandlerRootView>

        // </DefaultView>
    );
}

function ArticleLargeHome(props: Props) {
    const { state, dispatch } = useGlobals();
    const ButtonMode = state.isTransparent ? "contained-tonal" : "contained";
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigation<typeUseNavigation>();

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    // console.log(props.item);
    // console.log("id: ", props.item.id);
    // return <ActivityIndicator animating={true} />;
    // const onSingleTapEvent = (event) => {
    //     dispatch({ type: "setActivePost", payload: props.item });
    //     // setTimeout(() => {
    //     nav.navigate("(post)", { screen: `Post:${props.item.id}` });
    // };

    const onSingleTapEvent = (event: any) => {
        console.log(event.nativeEvent.state);
        // if (event.nativeEvent.state === State.ACTIVE) {
        //   alert('Hey single tap!');
        // }
    };
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                // setTimeout(() => {
                dispatch({ type: "setActivePost", payload: props.item });

                nav.navigate("(post)", { screen: `Post:${props.item.id}` });
                // }, 2000);
            }}>
            <Card mode="elevated" key={props.item.id}>
                <Card.Title
                    titleStyle={{ paddingBottom: 10, paddingTop: 20 }}
                    titleVariant="bodyLarge"
                    title={props.item.title}
                    subtitleVariant="labelLarge"
                    // subtitleStyle={{ paddingVertical: 10 }}
                    // subtitle={props.item.url}
                />
                <Card.Content>
                    <Card.Cover style={{ zIndex: 0 }} source={{ uri: props.item.imageThumbnail }} onLoadEnd={handleImageLoad} />
                    {/*  */}
                    {/* {isLoading && <ActivityIndicator style={{ paddingVertical: 95 }} animating={true} />} */}
                    {/* {isLoading && (
                    <>
                        <ActivityIndicator
                            animating={true}
                            style={{
                                position: "absolute",
                                top: "25%",
                                left: "50%",
                                zIndex: 2,
                            }}
                        />
                        <View style={{ paddingVertical: 95, position: "absolute", zIndex: 1 }} />
                    </>
                )}
                <Card.Cover style={{ position: "relative", zIndex: 0 }} source={{ uri: props.item.image.thumbnail[0] }} onLoadEnd={handleImageLoad} /> */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text variant="labelLarge" style={{ paddingTop: 15 }}>
                                    {props.item.local_date}
                                </Text>
                                <Text variant="labelMedium" style={{ paddingBottom: 15 }}>
                                    {`By: ${props.item.author.name}`}
                                </Text>
                            </View>

                            <View style={{ alignSelf: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                                <Chip textStyle={{ textTransform: "uppercase" }} icon={"information"}>
                                    {props.item.type}
                                </Chip>
                            </View>
                        </View>

                        {/* <Button mode={ButtonMode} contentStyle={{ height: 50 }} style={{ margin: 10, borderRadius: 15 }}>
                        Baca Artikel
                    </Button> */}
                        <Button style={{ borderRadius: 10 }} contentStyle={{ height: 50 }} labelStyle={{ fontSize: 15 }} mode={ButtonMode}>
                            Baca Artikel
                            {/* <Text variant="titleMedium" style={{ color: tema.colors.onPrimary }}>
                        Get Started
                    </Text> */}
                        </Button>
                    </View>
                </Card.Content>
                {/* <Card.Actions>
            </Card.Actions> */}
            </Card>
        </TouchableOpacity>
    );
}

function TextHome({
    title,
    type,
    where,
    style,
}: {
    title: string;
    type: "heading" | "title" | "subtitle" | "caption";
    where: "general" | "between";
    style?: StyleProp<TextStyle>;
}) {
    // Function implementation
    const tema = useTheme();
    const Type_Where: "hb" | "g" = type == "heading" && where == "between" ? "hb" : "g";
    return (
        <View style={{ flex: 1 }}>
            <Text
                variant={Type_Where == "hb" ? "titleMedium" : null}
                style={[style, { color: Type_Where == "hb" ? tema.colors.outline : null, paddingTop: 15 }]}>
                {title}
            </Text>
        </View>
    );
}
function ArticleCarouselHome() {
    const { state } = useGlobals();
    // const isCarousel = useRef(null);
    const ButtonMode = state.isTransparent ? "contained-tonal" : "contained";
    // const [width, setWidth] = useState(0);
    const { width, height } = useWindowDimensions();
    // const width = Dimensions.get("win,dow").width;
    const ref = useRef<ICarouselInstance>(null);
    return (
        <View style={{ flex: 1, overflow: "visible" }}>
            <Carousel
                style={{
                    alignSelf: "center",
                    // paddingBottom: 350
                    overflow: "visible",
                    // height: 240,
                }}
                modeConfig={{ parallaxScrollingScale: 0.85, parallaxScrollingOffset: 75 }}
                loop
                ref={ref}
                // pagingEnabled={true}
                width={width}
                height={width}
                autoPlay={true}
                autoPlayInterval={3000}
                data={PostDataArray()}
                scrollAnimationDuration={500}
                // onSnapToItem={(index) => console.log("current index:", index, width)}
                renderItem={(props: Props) => ArticleLargeHome(props)}
                // snapEnabled={true}
                mode="parallax"
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
            />
        </View>
    );
}

function PostDataArray(): any {
    const { state } = useGlobals();
    const { data_SMANDA_APP } = state;
    // let ArtikelArray = [];
    // data_SMANDA_APP.artikel.map((obj) => {})
    return data_SMANDA_APP?.artikel;
}

function ButtonHomeComp() {
    const { state } = useGlobals();
    const ButtonMode = "elevated";
    const tema = useTheme();
    return (
        <View style={{ flex: 1, marginBottom: 10 }}>
            <List.Section titleStyle={{ paddingLeft: 0 }} title="Quick Actions">
                {/* <TextHome title="Quick Action" type="heading" where="between" style={{ paddingBottom: 10 }} /> */}
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon="school"
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            contentStyle={[styles.buttonHomeContent]}>
                            Sekolah
                        </Button>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Surface style={styles.buttonHome}>
                                    <IconButton
                                        style={[{ alignSelf: "center" }]}
                                        // onPress={() => alert("dipencet!")}
                                        // mode={ButtonMode}
                                        icon={"bus-school"}
                                        iconColor={tema.colors.primary}
                                        containerColor={tema.colors.elevation.level1}
                                    />
                                </Surface>
                            </View>

                            {/* <View style={{ flex: Platform.OS == "ios" ? 0.2 : 0.5 }} /> */}
                            <View style={{ flex: 0.2 }} />
                            <View style={{ flex: 1 }}>
                                <Surface style={styles.buttonHome}>
                                    <IconButton
                                        style={[{ alignSelf: "center" }]}
                                        // onPress={() => alert("dipencet!")}
                                        // mode={ButtonMode}
                                        icon={"account-box-multiple"}
                                        iconColor={tema.colors.primary}
                                        containerColor={tema.colors.elevation.level1}
                                    />
                                </Surface>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.08 }} />
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon="book"
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            contentStyle={[styles.buttonHomeContent]}>
                            Artikel
                        </Button>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Surface style={styles.buttonHome}>
                                    <IconButton
                                        style={[{ alignSelf: "center" }]}
                                        // onPress={() => alert("dipencet!")}
                                        // mode={ButtonMode}
                                        icon={"chair-school"}
                                        iconColor={tema.colors.primary}
                                        containerColor={tema.colors.elevation.level1}
                                    />
                                </Surface>
                            </View>
                            <View style={{ flex: 0.2 }} />
                            <View style={{ flex: 1 }}>
                                <Surface style={styles.buttonHome}>
                                    <IconButton
                                        style={[{ alignSelf: "center" }]}
                                        // onPress={() => alert("dipencet!")}
                                        // mode={ButtonMode}
                                        icon={"anchor"}
                                        iconColor={tema.colors.primary}
                                        containerColor={tema.colors.elevation.level1}
                                    />
                                </Surface>
                            </View>
                        </View>
                    </View>
                </View>
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    customImage: {
        // width: 143,
        // height: 153,
        width: "100%",
        // height: "100%",
        // flex: 1,
        aspectRatio: 2,
        marginHorizontal: 2,
        // resizeMode: "contain",
    },
    customButton: {
        position: "absolute",
        right: 0,
    },
    layout: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    MainContainer: {
        margin: 20,
        marginTop: 20,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 4,
    },
    card: {
        margin: 4,
    },
    chip: {
        margin: 4,
    },
    preference: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    buttonHome: {
        borderRadius: 10,
        marginVertical: 5,
        // height: 50,
    },
    buttonHomeContent: {
        height: 50,
    },
});
