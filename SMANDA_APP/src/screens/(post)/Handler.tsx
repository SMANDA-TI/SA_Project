import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "./PostMapper";
import HeaderPostComp from "../../components/HeaderPost";
import { RootScreenProps } from "../../types/RootType";
import { useGlobals } from "../../context/RootContext";

const Stack = createNativeStackNavigator();
export default function PostStack(props: RootScreenProps<"(post)">) {
    const { state } = useGlobals();
    return (
        <Stack.Navigator>
            {state.data_SMANDA_APP.activePost && (
                <Stack.Screen
                    name={`Post:${state.data_SMANDA_APP.activePost.id}`}
                    // component={() => <PostScreen post_data={state.data_SMANDA_APP.activePost as any} navigation={props.navigation as any} />}
                    options={{
                        header: () => <HeaderPostComp navigation={props.navigation as any} />,
                        headerTransparent: true,
                    }}>
                    {() => <PostScreen post_data={state.data_SMANDA_APP.activePost as any} navigation={props.navigation as any} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
}
