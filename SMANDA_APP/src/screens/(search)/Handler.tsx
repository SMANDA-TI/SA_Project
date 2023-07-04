import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchMapper from "./SearchMapper";
import HeaderSearch from "../../components/HeaderSearch";
import { RootScreenProps, RootStackScreen } from "../../types/RootType";
import { useGlobals } from "../../context/RootContext";

const Stack = createNativeStackNavigator();
export default function SearchStack(props: RootScreenProps) {
    const { state } = useGlobals();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Search"}
                component={SearchMapper}
                options={{
                    header: (props) => <HeaderSearch />,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
