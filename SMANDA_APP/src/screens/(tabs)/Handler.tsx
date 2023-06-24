import React from "react";
import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, useTheme } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { HomeScreen } from "./Home";
import { InformationScreen } from "./Information";
import { EventScreen } from "./Event";
import { SettingsScreen } from "./Settings";
import { AppHeaderComponent } from "../../components/AppHeaderComponent";

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                        return label as string;
                    }}
                />
            )}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Beranda",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="home" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Home" />,
                }}
            />
            <Tab.Screen
                name="Event"
                component={EventScreen}
                options={{
                    tabBarLabel: "Event",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="school" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Event" />,
                }}
            />
            <Tab.Screen
                name="Information"
                component={InformationScreen}
                options={{
                    tabBarLabel: "Informasi",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="forum" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Information" />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Penggaturan",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="cog" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Settings" />,
                }}
            />
        </Tab.Navigator>
    );
}

// function HomeScreen() {
//     return (
//         <View style={styles.container}>
//             <Text variant="headlineMedium">Home!</Text>
//         </View>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View style={styles.container}>
//             <Text variant="headlineMedium">Settings!</Text>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
