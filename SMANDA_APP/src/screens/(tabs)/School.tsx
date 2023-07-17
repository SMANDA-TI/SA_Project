import { View, SafeAreaView, Image, useWindowDimensions, ImageBackground } from "react-native";
import { RootTabScreenProps } from "../../types/RootType";
import { CommonActions } from "@react-navigation/native";
import { Text, Card, Button, List, useTheme, Surface, Divider } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useRef, useState } from "react";
import * as Linking from "expo-linking";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getGuru, getS_slides } from "../../context/Slicer/WordpressProvider";
import { getTransparent } from "../../context/Slicer/GlobalEnvironment";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { MappedPostData } from "../../types/PostTypes";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
type CarouselProps = RootTabScreenProps<"School"> & CarouselRenderItemInfo<MappedPostData>;

type SlideSchool = string[];

const dataSlideSchool = () => {
    const s_slides = getS_slides();
    return s_slides;
};

type Props = RootTabScreenProps<"School"> &
    ListRenderItemInfo<MappedPostData> & {
        width: number;
    };

export function SchoolScreen(props: RootTabScreenProps<"School">) {
    // const nav = useNavigation<typeUseNavigation>();
    let scrollTo = props.route?.params?.scrollTo;
    // const [doneScrollParam, setDoneScroll] = useState(false);
    const [dataSourceCords, setDataSourceCords] = useState([]);
    const ref = useRef<ICarouselInstance>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const targetViewRef = useRef(null);
    const { navigation } = props;
    const scrollHandler = (props: "Filosofi" | "Denah" | "Lokasi") => {
        console.log(dataSourceCords[props], props);
        scrollViewRef.current.scrollTo({
            x: 0,
            y: dataSourceCords[props],
            animated: true,
        });
        navigation.setParams({ scrollTo: null });
    };
    // console.log("doneScrollParam: ", doneScrollParam);
    if (scrollTo != undefined || scrollTo != null) {
        try {
            setTimeout(() => {
                scrollHandler(scrollTo);
            }, 1500);
        } catch {
            setTimeout(() => {
                scrollHandler(scrollTo);
            }, 1500);
        }
    }
    const tema = useTheme();
    const { width, height } = useWindowDimensions();
    const isTransparent = getTransparent();
    return (
        <View style={{ flex: 1 }}>
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
                    ref={ref}
                    testID={"xxx"}
                    width={width}
                    height={275}
                    style={{ width: "100%" }}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    scrollAnimationDuration={500}
                    data={dataSlideSchool()}
                    pagingEnabled={true}
                    // mode="parallax"
                    // modeConfig={{
                    //     parallaxScrollingScale: 1,
                    //     parallaxScrollingOffset: 10,
                    //     parallaxAdjacentItemScale: 20,
                    // }}
                    renderItem={({ item }) => (
                        <View style={{ alignSelf: "center" }}>
                            <Image
                                style={{
                                    width: width - 15,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    height: 275,
                                    resizeMode: "cover",
                                }}
                                source={{ uri: item }}
                            />
                            {/* <Text>{`Halo, di Index: ${index}`}</Text> */}
                        </View>
                    )}
                />
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    ref={scrollViewRef}
                    indicatorStyle={tema.dark ? "white" : "black"}
                    // bounces={false}
                    style={{ backgroundColor: "transparent" }}>
                    {/* CHATGPT!, I want this view below me to set the maximum hight able to be scroll is 200 */}
                    <View
                        style={{
                            backgroundColor: tema.colors.background,
                            // backgroundColor: "blue",
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            marginTop: 250,
                        }}>
                        <View style={{ height: 24 }} />
                        {/* // ? Main Post Component ! */}
                        <View style={{ marginHorizontal: 20 }}>
                            <Surface
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 20,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }}>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        source={require("../../../assets/images/Logo-Smanda.png")}
                                        style={{
                                            resizeMode: "contain",
                                            height: 100,
                                            width: 200,
                                            marginBottom: 15,
                                        }}
                                    />
                                    <Text variant="titleLarge" style={{ fontSize: 20 }}>
                                        {"SMAN 2 KUNINGAN"}
                                    </Text>
                                    <Text variant="labelMedium">{`"Simpati, Prestasi!"`}</Text>
                                </View>
                                <Divider
                                    style={{
                                        backgroundColor: tema.colors.onBackground,
                                        marginVertical: 15,
                                    }}
                                    bold={true}
                                />
                                <Surface elevation={2} style={{ padding: 20, borderRadius: 20 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ textAlign: "center" }}>
                                            {
                                                "Definisi/arti kata 'sekolah' di Kamus Besar Bahasa Indonesia (KBBI) adalah\n"
                                            }
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontStyle: "italic",
                                                fontFamily: "System",
                                            }}>
                                            "bangunan atau lembaga untuk belajar dan mengajar serta
                                            tempat menerima dan memberi pelajaran."
                                        </Text>
                                    </View>
                                </Surface>
                                <View>
                                    <Button
                                        mode="contained"
                                        onPress={() => scrollHandler("Filosofi")}>
                                        {" "}
                                        Click ME!
                                    </Button>
                                    <List.Section
                                        titleStyle={{ paddingLeft: 0 }}
                                        title="Tentang Sekolah">
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: 20,
                                            }}>
                                            <Image
                                                style={{
                                                    height: 300,
                                                    width: "100%",
                                                    resizeMode: "cover",
                                                }}
                                                source={require("../../../assets/images/smandaku-lobby.png")}
                                            />
                                            <Text style={{ marginTop: 4 }}>
                                                Lobby SMAN 2 KUNINGAN
                                            </Text>
                                        </View>
                                        <Surface
                                            elevation={2}
                                            style={{ padding: 20, borderRadius: 20 }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Text>
                                                    {
                                                        /* cSpell:disable */
                                                        "SMA Negeri (SMAN) 2 Kuningan, merupakan salah satu  Sekolah Menengah Atas Negeri yang ada di  Provinsi  Jawa Barat,  Indonesia.\n\nSama dengan SMA pada umumnya di  Indonesia masa  pendidikan  sekolah di SMAN 2 Kuningan ditempuh dalam waktu tiga tahun pelajaran, mulai dari Kelas X sampai Kelas XII.\n\nDan SMAN 2 Kuningan merupakan satu-satunya SMA Negeri yang Berstatus  Rintisan Sekolah Bertaraf Internasional ( RSBI) di Kabupaten Kuningan.\n\nSMAN 2 dianggap sebagai salah satu sekolah menengah atas paling unggul di kabupaten Kuningan.\n\n"
                                                    }
                                                </Text>
                                            </View>
                                        </Surface>
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 30,
                                            }}>
                                            <Image
                                                style={{
                                                    height: 300,
                                                    width: "100%",
                                                    resizeMode: "cover",
                                                }}
                                                source={require("../../../assets/images/smandaku_sunset.png")}
                                            />
                                            <Text style={{ marginTop: 4 }}>
                                                Lapangan SMAN 2 KUNINGAN
                                            </Text>
                                        </View>
                                    </List.Section>
                                    <List.Section
                                        titleStyle={{ paddingLeft: 0 }}
                                        title="Sejarah Pendirian">
                                        <Image
                                            style={{
                                                height: 200,
                                                width: 200,
                                                resizeMode: "contain",
                                                alignSelf: "center",
                                                marginVertical: 20,
                                            }}
                                            source={require("../../../assets/images/smandaku-sejarah.jpg")}
                                        />
                                        {/* cSpell:disable */}
                                        <Text>
                                            {
                                                "SMA Negeri 2 Kuningan berdiri sejak tanggal 1 Juli 1982 dengan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor : 0298/0/1982 tanggal 9 Oktober 1982 yang secara resmi dianggap penunggalan dari SMA Negeri Kuningan.\n"
                                            }
                                        </Text>
                                        <Text>
                                            {
                                                "Langkah awal berdirinya SMA Negeri 2 Kuningan adalah merupakan gagasan dan usulan Kepala SMA Negeri Kuningan, yaitu Bapak Drs. H. Subandhi yang memandang perlu menambah SMA Negeri di Ibu Kota Kabupaten Kuningan, mengingat hanya dengan 3 (tiga) SMA Negeri dan 2 (dua) SMA Swasta (SMA Negeri Kuningan, SMA Negeri Cilimus, SMA Negeri Ciawigebang, SMA KOSGORO Kuningan dan SMA Bhakti Pakuan Kuningan) yang pada saat itu sudah tidak bisa memenuhi kebutuhan masyarakat Kabupaten Kuningan untuk menyekolahkan putra - putrinya di SMA.\n"
                                            }
                                        </Text>
                                        <Text>
                                            {
                                                "Akhirnya atas usulan Kepala SMA Negeri Kuningan melalui Kantor Wilayah Departemen Pendidikan dan Kebudayaan Provinsi Jawa Barat, terbitlah Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia tersebut di atas yang secara administratif menyebutkan Penunggalan SMA Negeri 2 Kuningan dari filial SMA Negeri Kuningan. Padahal secara nyata sebelumnya tidak ada SMA Negeri 2 Kuningan filial SMA Negeri Kuningan.\n"
                                            }
                                        </Text>
                                        <Text>
                                            {
                                                "Maka berdasarkan SK Mendikbud Nomor : 0298 tersebut mulai tahun pelajaran 1982/1983 dikembangkanlah yang tadinya SMA Negeri Kuningan yang berlokasi di dua tempat menjadi dua SMA yaitu SMA Negeri 1 Kuningan yang berlokasi di Jalan Siliwangi No.55 dan SMA Negeri 2 Kuningan yang berlokasi di Jalan Aruji Kartawinata No. 16 Kuningan, segalanya dibagi dua secara adil, mulai dari Siswa, Guru, Pegawai Tata Usaha dan lain sebagainya."
                                            }
                                        </Text>
                                    </List.Section>
                                    <List.Section
                                        key={"Lokasi"}
                                        onLayout={(event) => {
                                            const layout = event.nativeEvent.layout;
                                            dataSourceCords["Lokasi"] = layout.y + 630;
                                            setDataSourceCords(dataSourceCords);
                                        }}
                                        titleStyle={{ paddingLeft: 0 }}
                                        title="Alamat Lokasi">
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                            <Image
                                                style={{
                                                    height: 200,
                                                    width: "100%",
                                                    resizeMode: "cover",
                                                }}
                                                source={require("../../../assets/images/smadaku_gapura_gerbang.jpg")}
                                            />
                                            <Text style={{ marginTop: 4 }}>
                                                Gerbang Utama SMAN 2 KUNINGAN
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginVertical: 20,
                                            }}>
                                            <Image
                                                style={{
                                                    height: 200,
                                                    width: "100%",
                                                    resizeMode: "cover",
                                                }}
                                                source={require("../../../assets/images/smandaku_gmaps_atas.png")}
                                            />
                                            <Text style={{ marginTop: 4 }}>
                                                Gambar SMANDAKU di Google Maps
                                            </Text>
                                        </View>
                                        <Surface
                                            elevation={2}
                                            style={{
                                                marginVertical: 10,
                                                padding: 20,
                                                borderRadius: 20,
                                            }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        marginBottom: 15,
                                                    }}>
                                                    {
                                                        "Sekolah SMAN 2 KUNINGAN Berlokasi di:\n\nJl. Aruji Kartawinata No.16, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511"
                                                    }
                                                </Text>
                                            </View>
                                            <Button
                                                style={{ borderRadius: 100 }}
                                                contentStyle={{ height: 50 }}
                                                labelStyle={{ fontSize: 15 }}
                                                mode={
                                                    isTransparent ? "contained-tonal" : "contained"
                                                }
                                                // uppercase={true}
                                                onPress={() =>
                                                    Linking.openURL(
                                                        "https://goo.gl/maps/6ujvkcPm2cxtiwWc6"
                                                    )
                                                }>
                                                Lihat Lokasi
                                            </Button>
                                        </Surface>
                                    </List.Section>
                                    <List.Section
                                        key={"Filosofi"}
                                        onLayout={(event) => {
                                            const layout = event.nativeEvent.layout;
                                            dataSourceCords["Filosofi"] = layout.y + 600;
                                            setDataSourceCords(dataSourceCords);
                                        }}
                                        titleStyle={{ paddingLeft: 0 }}
                                        title="Filosofi Sekolah">
                                        <Surface
                                            elevation={2}
                                            style={{ padding: 20, borderRadius: 20 }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={require("../../../assets/images/Logo-Smanda.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        height: 100,
                                                        width: 200,
                                                        marginBottom: 15,
                                                    }}
                                                />
                                                <Text
                                                    variant="titleLarge"
                                                    style={{ marginBottom: 10 }}>
                                                    VISI
                                                </Text>
                                                <Text style={{ textAlign: "center" }}>
                                                    {
                                                        "Terdepan dalam Prestasi, Simpati dalam Perilaku, dan Siap Menghadapi Tantangan Global.\n"
                                                    }
                                                </Text>
                                            </View>
                                        </Surface>
                                        <Surface
                                            elevation={2}
                                            style={{
                                                padding: 20,
                                                borderRadius: 20,
                                                marginVertical: 20,
                                            }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={require("../../../assets/images/Logo-Smanda.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        height: 100,
                                                        width: 200,
                                                        marginBottom: 15,
                                                    }}
                                                />
                                                <Text
                                                    variant="titleLarge"
                                                    style={{ marginBottom: 10 }}>
                                                    MISI
                                                </Text>
                                                <Text>
                                                    {
                                                        "1. Melaksanakan pembelajaran dengan iklim kondusif untuk mengembangkan potensi siswa.\n\n2. Mengembangkan ilmu pengetahuan dan teknologi untuk dapat bersaing di tingkat nasional maupun internasional.\n\n3. Memelihara dan melestarikan budaya lokal dalam rangka mengembangkan budaya bangsa.\n\n4. Mewujudkan warga sekolah yang cerdas, beriman, dan bertaqwa kepada Tuhan Yang Maha Esa, berbudi luhur, dan berakhlak mulia.\n\n5. Mewujudkan suasana proses pembelajaran yang aktif, kreatif, efektif, menyenangkan,dan religius.\n"
                                                    }
                                                </Text>
                                            </View>
                                        </Surface>
                                        <Surface
                                            elevation={2}
                                            style={{
                                                padding: 20,
                                                borderRadius: 20,
                                                marginVertical: 20,
                                            }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={require("../../../assets/images/Logo-Smanda.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        height: 100,
                                                        width: 200,
                                                        marginBottom: 15,
                                                    }}
                                                />
                                                <Text
                                                    variant="titleLarge"
                                                    style={{ marginBottom: 10 }}>
                                                    STRATEGI
                                                </Text>
                                                <Text>
                                                    {
                                                        "1. Mewujudkan lingkungan belajar yang kondusif.\n\n2. Menyedlakan sumber belajar yang maksimal bagi guru dan siswa.\n\n3. Meningkatkan SDM yang berkualitas.\n\n4. Sukses Ujian Nasional maupun Internasional.\n\n5. Sukses Perguruan Tinggi dalam negeri maupun luar negeri.\n\n6. Meningkatkan kepedulian terhadap kelestarian lingkuan.\n\n7. Menjalin hubungan dan kerjasama yang baik dengan masyarakat dan dunia usaha.\n"
                                                    }
                                                </Text>
                                            </View>
                                        </Surface>
                                        <Surface
                                            elevation={2}
                                            style={{
                                                padding: 20,
                                                borderRadius: 20,
                                                marginVertical: 20,
                                            }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={require("../../../assets/images/Logo-Smanda.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        height: 100,
                                                        width: 200,
                                                        marginBottom: 15,
                                                    }}
                                                />
                                                <Text
                                                    variant="titleLarge"
                                                    style={{ marginBottom: 10 }}>
                                                    TARGET
                                                </Text>
                                                <Text>
                                                    {
                                                        "1. Menghasilkan lulusan yang memiliki integritas kepribadian yang baik.\n\n2. Tersedianya sumber belajar yang optimal.\n\n3. Menghasilkan lulusan yang mampu melanjutkan keperguruan tinggi negeri baik dalam maupun luar negeri.\n\n4. Para lulusan mampu hidup bermasyarakat dengan menjunjung nama baik almamater.\n\n5. Para lulusan mampu berkiprah di tingkat Nasional dan Internasional.\n\n6. Para lulusan memiliki kepedulian terhadap kelestarian lingkuan.\n\n7. Terwujudnya kerjasama yang baik dengan dunia usaha.\n"
                                                    }
                                                </Text>
                                            </View>
                                        </Surface>
                                    </List.Section>
                                    <GuruFlash navigation={props.navigation} route={props.route} />
                                    <List.Section
                                        key={"Denah"}
                                        onLayout={(event) => {
                                            const layout = event.nativeEvent.layout;
                                            dataSourceCords["Denah"] = layout.y + 600;
                                            setDataSourceCords(dataSourceCords);
                                        }}
                                        titleStyle={{ paddingLeft: 0 }}
                                        title="Denah Sekolah">
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                            <Image
                                                style={{
                                                    height: 300,
                                                    width: "100%",
                                                    resizeMode: "cover",
                                                }}
                                                source={require("../../../assets/images/coming-soon.jpg")}
                                            />
                                            <Text style={{ marginTop: 4 }}>
                                                Denah SMAN 2 KUNINGAN
                                            </Text>
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    fontStyle: "italic",
                                                    fontFamily: "System",
                                                }}>
                                                Coming Soon{" "}
                                            </Text>
                                        </View>
                                    </List.Section>
                                </View>
                            </Surface>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

function GuruFlash({ navigation, route }: RootTabScreenProps<"School">) {
    const pendidik = getGuru();
    const { width } = useWindowDimensions();
    return (
        <List.Section titleStyle={{ paddingLeft: 0 }} title="Profil Kependidikan">
            {/* <View style={{ borderRadius: 20, flex: 1 }}> */}
            <View style={{ height: 250, width: "100%", marginBottom: 30 }}>
                {pendidik.length != 0 && (
                    <FlashList
                        // numColumns={2}
                        horizontal={true}
                        nestedScrollEnabled={true}
                        estimatedItemSize={pendidik?.length}
                        keyExtractor={(item) => `${item.from}:${item.id}`}
                        data={pendidik}
                        renderItem={(props: Props) =>
                            GuruSchool({ navigation, route, width, ...props })
                        }
                    />
                )}
            </View>
            <Surface
                elevation={2}
                style={{
                    padding: 20,
                    borderRadius: 20,
                }}>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            textAlign: "center",
                            marginBottom: 15,
                        }}>
                        {
                            "\nDirektori Pendidik Sekolah SMAN 2 KUNINGAN dapat di akses melalui tombol dibawah ini:\n"
                        }
                    </Text>
                </View>
                <Button
                    style={{ borderRadius: 100 }}
                    contentStyle={{ height: 50 }}
                    labelStyle={{ fontSize: 15 }}
                    mode={"contained"}
                    // uppercase={true}
                    onPress={() => {
                        navigation.navigate("(wordpress)", {
                            screen: "GuruOverview",
                        });
                    }}>
                    Lihat Direktori Pendidik
                </Button>
            </Surface>
        </List.Section>
    );
}

function GuruSchool({ navigation, route, item, width, ...props }: Props) {
    const _spacing = 10;
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
            <View style={{ marginRight: 10, width: 250, height: "100%" }}>
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
            </View>
        </TouchableOpacity>
    );
}
