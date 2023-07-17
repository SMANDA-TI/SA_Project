import { View, StyleSheet, useWindowDimensions, Image, StyleProp, TextStyle } from "react-native";
import { RootTabScreenProps, TabNavigationProps } from "../../types/RootType";
import {
    Text,
    Button,
    List,
    Card,
    Chip,
    IconButton,
    useTheme,
    Surface,
    TouchableRipple,
} from "react-native-paper";
// import { SearchBar } from "../../components/SearchBar";
// import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef } from "react";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { GestureHandlerRootView, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { MappedPostData } from "../../types/PostTypes";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { SearchButton } from "../../components/SearchButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTransparent } from "../../context/Slicer/GlobalEnvironment";
import { getArticleLatest } from "../../context/Slicer/WordpressProvider";

// * Random Words Generator nih bang
// const words = ["Artikel", "Mantap", "Aku", "🎉", "👋"];

// function getRandomWord() {
//     const randomIndex = Math.floor(Math.random() * words.length);
//     return words[randomIndex];
// }
type Props = RootTabScreenProps<"Home"> & CarouselRenderItemInfo<MappedPostData>;
type CarouselProps = RootTabScreenProps<"Home"> & CarouselRenderItemInfo<MappedPostData>;
const APP_LOGO = require("../../../assets/images/Profile_Logo_SMANDA_APP.png");

type JustNavigation = {
    navigation: RootTabScreenProps<"Home">["navigation"];
};

export function HomeScreen(props: RootTabScreenProps<"Home">) {
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
                <InitComponent />
                <SchoolInformationButton navigation={props.navigation} />
                <FirstText />
                <SearchButton />
                <CardIndicator navigation={props.navigation} />
                <NewestNews navigation={props.navigation} />
                <ButtonHomeComp navigation={props.navigation} />
                <ArticleCarouselHome navigation={props.navigation} route={props.route} />
            </ScrollView>
        </GestureHandlerRootView>

        // </DefaultView>
    );
}

function InitComponent() {
    return (
        <View style={{ marginTop: 20 }}>
            <Surface elevation={2} style={{ borderRadius: 20, flex: 1 }}>
                <Surface
                    elevation={3}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        height: 200,
                        borderRadius: 15,
                        margin: 15,
                    }}>
                    <View style={{ flex: 1, margin: 15 }}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="contain"
                            source={require("../../../assets/images/Logo-Smanda.png")}
                        />
                    </View>
                    <View style={{ flex: 1, margin: 15 }}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="contain"
                            source={APP_LOGO}
                        />
                    </View>
                </Surface>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                    }}>
                    <Text variant="titleLarge">{"SMAN 2 KUNINGAN"}</Text>
                    <Text variant="titleMedium">{"SMANDA APP"}</Text>
                </View>
            </Surface>
        </View>
    );
}

function ArticleLargeHome({ navigation, route, item, index, animationValue }: Props) {
    const isTransparent = getTransparent();
    const ButtonMode = isTransparent ? "contained-tonal" : "contained";
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
            <Card mode="elevated" key={item.id}>
                <Card.Title
                    titleStyle={{ paddingBottom: 10, paddingTop: 20 }}
                    titleVariant="bodyLarge"
                    title={item.title}
                    subtitleVariant="labelLarge"
                    // subtitleStyle={{ paddingVertical: 10 }}
                    // subtitle={props.item.url}
                />
                <Card.Content>
                    <Card.Cover style={{ zIndex: 0 }} source={{ uri: item.imageThumbnail }} />
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
                                    {item.local_date}
                                </Text>
                                <Text variant="labelMedium" style={{ paddingBottom: 15 }}>
                                    {`By: ${item.author.name}`}
                                </Text>
                            </View>

                            <View
                                style={{
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    flexWrap: "wrap",
                                }}>
                                <Chip
                                    textStyle={{ textTransform: "uppercase" }}
                                    icon={"information"}>
                                    {item.type}
                                </Chip>
                            </View>
                        </View>

                        {/* <Button mode={ButtonMode} contentStyle={{ height: 50 }} style={{ margin: 10, borderRadius: 15 }}>
                        Baca Artikel
                    </Button> */}
                        <Button
                            style={{ borderRadius: 10 }}
                            contentStyle={{ height: 50 }}
                            labelStyle={{ fontSize: 15 }}
                            mode={ButtonMode}>
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
                style={[
                    style,
                    { color: Type_Where == "hb" ? tema.colors.outline : null, paddingTop: 15 },
                ]}>
                {title}
            </Text>
        </View>
    );
}
function ArticleCarouselHome({ navigation, route }: RootTabScreenProps<"Home">) {
    const isTransparent = getTransparent();

    // const isCarousel = useRef(null);
    const ButtonMode = isTransparent ? "contained-tonal" : "contained";
    // const [width, setWidth] = useState(0);
    const { width, height } = useWindowDimensions();
    // const width = Dimensions.get("win,dow").width;
    const ref = useRef<ICarouselInstance>(null);
    return (
        <>
            <View style={{ marginTop: 40 }}>
                <Text variant="headlineLarge">{"Artikel Terbaru"}</Text>
            </View>
            <Carousel
                style={{
                    alignSelf: "center",
                    // paddingBottom: 350,
                    overflow: "visible",
                    // height: 240,
                    flex: 1,
                }}
                modeConfig={{
                    parallaxScrollingScale: 0.85,
                    parallaxScrollingOffset: 70,
                }}
                loop
                ref={ref}
                // pagingEnabled={true}
                width={width}
                height={360}
                autoPlay={true}
                autoPlayInterval={3000}
                data={PostDataArray()}
                scrollAnimationDuration={500}
                renderItem={(props: CarouselProps) =>
                    ArticleLargeHome({ navigation, route, ...props })
                }
                // snapEnabled={true}
                mode="parallax"
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
            />
        </>
    );
}

function PostDataArray(): any {
    const artikelLatest = getArticleLatest();
    return artikelLatest;
}

function FirstText() {
    return (
        <>
            <View style={{ marginVertical: 20 }}>
                <Text variant="titleLarge">{"Apa Sih SMANDA APP itu 🤔?"}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Surface style={{ borderRadius: 20, height: 175 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View
                            style={{
                                flex: 1.2,
                                padding: 20,
                                paddingTop: 15,
                                paddingRight: 0,
                                justifyContent: "center",
                            }}>
                            <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
                                SMANDA APP
                            </Text>
                            <Text style={{ lineHeight: 20 }}>
                                {
                                    /* cspell: disable-next-line */
                                    "Aplikasi mobile yang digunakan untuk berbagi informasi dan pendidikan tentang SMAN 2 Kuningan."
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
                                source={APP_LOGO}
                            />
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
}

function NewestNews({ navigation }: JustNavigation) {
    return (
        <>
            <View style={{ marginTop: 40 }}>
                <Text variant="headlineLarge">{"Informasi Terbaru"}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Surface style={{ borderRadius: 20, height: 175 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View
                            style={{
                                flex: 1.2,
                                padding: 20,
                                paddingTop: 15,
                                paddingRight: 0,
                                justifyContent: "center",
                            }}>
                            <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
                                SMANDA APP
                            </Text>
                            <Text style={{ lineHeight: 20 }}>
                                {
                                    /* cspell: disable-next-line */
                                    "Aplikasi mobile yang digunakan untuk berbagi informasi dan pendidikan tentang SMAN 2 Kuningan."
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
                                source={APP_LOGO}
                            />
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
}

function SchoolInformationButton({ navigation }: JustNavigation) {
    const ButtonMode = "elevated";
    const [tips, setTips] = useState(true);
    const tema = useTheme();
    const OnPressTips = () => {
        setTips(false);
    };
    return (
        <View style={{ flex: 1, marginVertical: 15 }}>
            {/* <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 50, textAlign: "center" }} variant="displayLarge">
                    {"Selamat Datang!"}
                </Text>
            </View> */}
            <List.Section titleStyle={{ paddingLeft: 0, paddingTop: 0 }} title="Quick Actions">
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="school" size={22} color={color} />
                            )}
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            labelStyle={{ fontSize: 17 }}
                            onPress={() => navigation.navigate("(tabs)", { screen: "School" })}
                            contentStyle={[styles.buttonHomeContentLarge]}>
                            Sekolah
                        </Button>
                    </View>
                    <View style={{ flex: 0.08 }} />
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="forum" size={22} color={color} />
                            )}
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            labelStyle={{ fontSize: 17 }}
                            onPress={() => navigation.navigate("(tabs)", { screen: "Information" })}
                            contentStyle={[styles.buttonHomeContentLarge]}>
                            Informasi
                        </Button>
                    </View>
                </View>
                {tips && (
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
                                    "Silakan tekan tombol di atas untuk menuju ke halaman terkait."
                                }
                            </Text>
                            <View style={{ flex: 0.6 }}>
                                <IconButton icon="close" size={20} onPress={OnPressTips} />
                            </View>
                        </Surface>
                    </View>
                )}
            </List.Section>
        </View>
    );
}

function CardIndicator({ navigation }: JustNavigation) {
    const [isJourney, setJourney] = useState(true);
    const tema = useTheme();
    const onPressJourney = () => {
        setJourney(false);
    };

    return (
        isJourney && (
            <>
                <View
                    style={{
                        flex: 1,
                        marginTop: 40,
                        marginBottom: 20,
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}>
                    <Text variant="headlineLarge">{"Your Journey"}</Text>
                    <IconButton icon="close" size={20} onPress={onPressJourney} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <View>
                            <IconButton
                                style={{ alignItems: "flex-start", marginRight: -5 }}
                                icon="checkbox-blank-circle-outline"
                                size={25}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 35,
                                    left: 18,
                                    right: 0,
                                    backgroundColor: tema.colors.onSurfaceVariant,
                                    width: 2,
                                    height: 188,
                                    marginRight: 5,
                                    zIndex: 0,
                                }}
                            />
                        </View>
                        <Card
                            style={{ borderRadius: 20, height: 175, flex: 1 }}
                            onPress={() => navigation.navigate("(tabs)", { screen: "School" })}>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <View
                                    style={{
                                        flex: 1,
                                        padding: 20,
                                        paddingTop: 15,
                                        paddingRight: 0,
                                        justifyContent: "center",
                                    }}>
                                    <Text
                                        variant="titleLarge"
                                        style={{ marginBottom: 10, marginRight: 10 }}>
                                        Melihat tab Sekolah
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 4,
                                        }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="school-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>Sekolah</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="clock-time-eight-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>3-10 menit</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, margin: 20 }}>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 15,
                                        }}
                                        resizeMode="cover"
                                        source={require("../../../assets/images/smandaku-lobby-buriq.jpg")}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 30,
                        }}>
                        <View>
                            <IconButton
                                style={{ alignItems: "flex-start", marginRight: -5 }}
                                icon="checkbox-blank-circle-outline"
                                size={25}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 35,
                                    left: 18,
                                    right: 0,
                                    backgroundColor: tema.colors.onSurfaceVariant,
                                    width: 2,
                                    height: 188,
                                    marginRight: 5,
                                    zIndex: 0,
                                }}
                            />
                        </View>

                        <Card
                            style={{ borderRadius: 20, height: 175, flex: 1 }}
                            onPress={() =>
                                navigation.navigate("(tabs)", { screen: "Information" })
                            }>
                            <View style={{ flexDirection: "row" }}>
                                <View
                                    style={{
                                        flex: 1,
                                        padding: 20,
                                        paddingTop: 15,
                                        paddingRight: 0,
                                        justifyContent: "center",
                                    }}>
                                    <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                                        Membaca Informasi
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 4,
                                        }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="forum-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>Informasi</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="clock-time-eight-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>2-6 menit</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, margin: 20 }}>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 15,
                                        }}
                                        resizeMode="cover"
                                        source={require("../../../assets/images/smandaku-sejarah.jpg")}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 30,
                        }}>
                        <View>
                            <IconButton
                                style={{ alignItems: "flex-start", marginRight: -5 }}
                                icon="checkbox-blank-circle-outline"
                                size={25}
                            />
                        </View>

                        <Card
                            style={{ borderRadius: 20, height: 175, flex: 1 }}
                            onPress={() => navigation.navigate("(tabs)", { screen: "Article" })}>
                            <View style={{ flexDirection: "row-reverse" }}>
                                <View
                                    style={{
                                        flex: 1,
                                        padding: 20,
                                        paddingTop: 15,
                                        paddingRight: 0,
                                        justifyContent: "center",
                                    }}>
                                    <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                                        Membaca Artikel
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 4,
                                        }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="newspaper-variant-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>Artikel</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons
                                            style={{ marginRight: 5 }}
                                            name="clock-time-eight-outline"
                                            size={20}
                                            color={tema.colors.onSurfaceVariant}
                                        />
                                        <Text>3-5 menit</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, margin: 20 }}>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 15,
                                        }}
                                        resizeMode="cover"
                                        source={require("../../../assets/images/smandaku_sunset-buriq.jpg")}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>
            </>
        )
    );
}

function ButtonHomeComp({ navigation }: JustNavigation) {
    const ButtonMode = "elevated";
    const tema = useTheme();
    return (
        <View style={{ marginBottom: 10, marginTop: 5 }}>
            <List.Section titleStyle={{ paddingLeft: 0 }} title="Quick Actions">
                {/* <TextHome title="Quick Action" type="heading" where="between" style={{ paddingBottom: 10 }} /> */}
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon="book-education"
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            onPress={() => navigation.navigate("(tabs)", { screen: "Information" })}
                            contentStyle={[styles.buttonHomeContent]}>
                            PPDB
                        </Button>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("(wordpress)", {
                                            screen: "GuruOverview",
                                        });
                                    }}>
                                    <Surface style={styles.buttonHome}>
                                        <IconButton
                                            style={[{ alignSelf: "center", height: 50 }]}
                                            // onPress={() => alert("dipencet!")}
                                            // mode={ButtonMode}
                                            icon={"card-account-details-outline"}
                                            iconColor={tema.colors.primary}
                                            containerColor={tema.colors.elevation.level1}
                                        />
                                    </Surface>
                                </TouchableOpacity>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ position: "absolute", textAlign: "center" }}>
                                        Pendidik
                                    </Text>
                                </View>
                            </View>

                            {/* <View style={{ flex: Platform.OS == "ios" ? 0.2 : 0.5 }} /> */}
                            <View style={{ flex: 0.1 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("(tabs)", {
                                            screen: "School",
                                            params: { scrollTo: "Filosofi" },
                                        });
                                    }}>
                                    <Surface style={styles.buttonHome}>
                                        <IconButton
                                            style={[{ alignSelf: "center", height: 50 }]}
                                            // mode={ButtonMode}
                                            icon={"account-group"}
                                            iconColor={tema.colors.primary}
                                            containerColor={tema.colors.elevation.level1}
                                        />
                                    </Surface>
                                    <View style={{ alignItems: "center" }}>
                                        <Text>{"Filosofi\n"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.08 }} />
                    <View style={{ flex: 1 }}>
                        <Button
                            // onPress={() => alert("dipencet!")}
                            icon="book-information-variant"
                            mode={ButtonMode}
                            style={[styles.buttonHome, { flex: 1 }]}
                            onPress={() => navigation.navigate("(tabs)", { screen: "Information" })}
                            contentStyle={[styles.buttonHomeContent]}>
                            PLS
                        </Button>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("(tabs)", {
                                            screen: "School",
                                            params: { scrollTo: "Lokasi" },
                                        });
                                    }}>
                                    <Surface style={styles.buttonHome}>
                                        <IconButton
                                            style={[{ alignSelf: "center", height: 50 }]}
                                            // onPress={() => alert("dipencet!")}
                                            // mode={ButtonMode}
                                            icon={"map-marker-radius-outline"}
                                            iconColor={tema.colors.primary}
                                            containerColor={tema.colors.elevation.level1}
                                        />
                                    </Surface>
                                    <View
                                        style={{
                                            alignItems: "center",
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                            }}>
                                            Tempat dan Lokasi
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("(tabs)", {
                                            screen: "School",
                                            params: { scrollTo: "Denah" },
                                        });
                                    }}>
                                    <Surface style={styles.buttonHome}>
                                        <IconButton
                                            style={[{ alignSelf: "center", height: 50 }]}
                                            // onPress={() => alert("dipencet!")}
                                            // mode={ButtonMode}
                                            icon={"apps"}
                                            iconColor={tema.colors.primary}
                                            containerColor={tema.colors.elevation.level1}
                                        />
                                    </Surface>
                                    <View style={{ alignItems: "center" }}>
                                        <Text>{"Denah\n"}</Text>
                                    </View>
                                </TouchableOpacity>
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
    buttonHomeContentLarge: {
        height: 65,
    },
});
