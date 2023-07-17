import { View, SafeAreaView, Image } from "react-native";
import { RootTabScreenProps } from "../../types/RootType";
import { Text, Surface, List, Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getPostPenting, getPostingan } from "../../context/Slicer/WordpressProvider";
import { MappedPostData } from "../../types/PostTypes";

const APP_LOGO = require("../../../assets/images/Profile_Logo_SMANDA_APP.png");

type JustNavigation = {
    navigation: RootTabScreenProps<"Settings">["navigation"];
};

export function SettingsScreen(props: RootTabScreenProps<"Settings">) {
    // const nav = useNavigation<typeUseNavigation>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                <MainSettings navigation={props.navigation} />
            </ScrollView>
        </SafeAreaView>
    );
}

const GetAboutSMANDAPP = (): MappedPostData => {
    const posts = getPostPenting();
    return posts.find((item) => item.id === 4637);
};
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
                    <Text variant="titleLarge">{"PENGATURAN"}</Text>
                    <Text variant="titleMedium">{"SMANDA APP"}</Text>
                </Surface>
            </View>
        </View>
    );
}

function MainSettings({ navigation }: JustNavigation) {
    return (
        <>
            <GeneralSettings navigation={navigation} />
            {/* <AdvancedSettings navigation={navigation} /> */}
        </>
    );
}

function GeneralSettings({ navigation }: JustNavigation) {
    const AboutThis = GetAboutSMANDAPP();
    return (
        <List.Section titleStyle={{ paddingLeft: 0, paddingTop: 0 }} title="Pengaturan Umum">
            <List.Item
                left={(props) => <List.Icon {...props} icon="information" />}
                title="About this App"
                right={(props) => (
                    <MaterialCommunityIcons {...props} name="chevron-right" size={30} />
                )}
                onPress={
                    AboutThis
                        ? () =>
                              navigation.navigate("(wordpress)", {
                                  screen: "PostOverview",
                                  params: { post_data: AboutThis },
                              })
                        : () => alert("Mohon Bersabar, Sedang di ambil dari Website!")
                }
            />
            <Divider />
        </List.Section>
    );
}
function AdvancedSettings({ navigation }: JustNavigation) {
    return (
        <List.Section titleStyle={{ paddingLeft: 0, paddingTop: 0 }} title="Advance Settings">
            <List.Item
                left={(props) => <List.Icon {...props} icon="school" />}
                title="Go to"
                right={(props) => (
                    <MaterialCommunityIcons {...props} name="chevron-right" size={30} />
                )}
                onPress={() => navigation.navigate("GetStarted")}
            />
            <Divider />
        </List.Section>
    );
}
