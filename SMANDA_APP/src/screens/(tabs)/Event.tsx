import { View, SafeAreaView } from "react-native";
import { RootScreenProps, typeUseNavigation } from "../../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { Text, Card, Button } from "react-native-paper";

export function EventScreen(props: RootScreenProps) {
    // const nav = useNavigation<typeUseNavigation>();
    return (
        // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        //     <Text>Acara!</Text>
        //     <Button title="Go Back" onPress={() => props.navigation.goBack()}></Button>
        //     <Text>Welcome Screen</Text>
        //     <Button title="Preview to Welcome Again" onPress={() => props.navigation.navigate("Welcome")}></Button>
        // </View>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20, paddingVertical: 50 }}>
                <Card style={{}}>
                    <Card.Title
                        titleStyle={{ paddingBottom: 3, paddingTop: 20 }}
                        titleVariant="titleLarge"
                        title="Lorem ipsum dolor sit amet. 💻"
                        subtitleVariant="labelLarge"
                        subtitleStyle={{ paddingVertical: 10 }}
                        subtitle="Get Shipped 🤓"
                    />
                    <Card.Content>
                        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                        <Text variant="bodyMedium" style={{ paddingTop: 20 }}>
                            Lorem ipsum dolor sit amet.
                        </Text>
                        <Text variant="bodyMedium">By: Fulan</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => props.navigation.navigate("(tabs)", { screen: "Settings" })}>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </View>
        </SafeAreaView>
    );
}
