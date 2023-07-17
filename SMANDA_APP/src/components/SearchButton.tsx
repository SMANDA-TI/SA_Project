import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, useTheme, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigationType } from "../types/RootType";
import { useNavigation } from "@react-navigation/native";

export function SearchButton() {
    const navigation = useNavigation<useNavigationType>();
    const tema = useTheme();
    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: 20,
                // paddingTop: 3,
                // marginBottom: 25,
                // marginBottom: 25,
            }}>
            <Button
                disabled
                contentStyle={{ height: 60, justifyContent: "flex-start" }}
                labelStyle={{
                    opacity: 1,
                    fontSize: 20,
                    letterSpacing: 0,
                    lineHeight: 32,
                    color: tema.colors.onBackground,
                }}
                style={{ borderRadius: 100 }}
                onPress={() => navigation.navigate("(search)", { screen: "Search" })}
                mode="elevated"
                icon={({ size, color }) => (
                    <MaterialCommunityIcons name="magnify" size={22} color={color} />
                )}>
                Pencarian --- Coming Soon
            </Button>

            {/* <Searchbar placeholder="Pencarian" style={{ marginVertical: 10 }} value={null} /> */}
        </View>
    );
}

const styles = StyleSheet.create({});
