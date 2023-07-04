import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text, Searchbar } from "react-native-paper";
import { RootScreenProps } from "../types/RootType";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function SearchButton(props: RootScreenProps) {
    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: 20,
                // paddingTop: 35,
                // marginBottom: 25,
            }}>
            <Button
                contentStyle={{ height: 60, justifyContent: "flex-start" }}
                labelStyle={{ opacity: 1, fontSize: 20, letterSpacing: 0, lineHeight: 32, color: "white" }}
                style={{ borderRadius: 100 }}
                onPress={() => props.navigation.navigate("(search)", { screen: "Search" })}
                mode="elevated"
                icon={({ size, color }) => <MaterialCommunityIcons name="magnify" size={22} color={color} />}>
                Pencarian
            </Button>

            {/* <Searchbar placeholder="Pencarian" style={{ marginVertical: 10 }} value={null} /> */}
        </View>
    );
}

const styles = StyleSheet.create({});
