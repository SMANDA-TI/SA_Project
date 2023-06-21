import { View, Text, Button } from "react-native";
import { StackScreenProps } from "../types/NavigationType";

export function HomeScreen(props: StackScreenProps) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home Screen</Text>
            <Button title="Go to Details" onPress={() => props.navigation.navigate("Details")}></Button>
            <Text>Welcome Screen</Text>
            <Button title="Preview to Welcome" onPress={() => props.navigation.navigate("Welcome")}></Button>
        </View>
    );
}
