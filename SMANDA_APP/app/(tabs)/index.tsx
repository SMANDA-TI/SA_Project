import { StyleSheet, Button } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
    const router = useRouter();
    // Men-deklarasi variable router
    // const params = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="app/(tabs)/index.tsx" />
            <Button
                title="CHANGE PARAMS"
                onPress={() => {
                    // Contoh dari Penggunaan router di expo-router
                    // router.back();
                    // router.push("modal");
                    // router.setParams({ name: "Updated" });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
