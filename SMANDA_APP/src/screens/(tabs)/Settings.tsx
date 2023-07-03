import { View, SafeAreaView } from "react-native";
import { RootScreenProps, typeUseNavigation } from "../../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";

export function SettingsScreen(props: RootScreenProps) {
    // const nav = useNavigation<typeUseNavigation>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Penggaturan!</Text>
                <Button onPress={() => props.navigation.goBack()}>Go Backk</Button>
            </View>
        </SafeAreaView>
    );
}
