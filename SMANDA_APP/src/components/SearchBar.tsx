import * as React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Searchbar } from "react-native-paper";

export function SearchBar(props: { style: StyleProp<TextStyle> }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => setSearchQuery(query);
    searchQuery != null && searchQuery != undefined && searchQuery != "" && console.log(searchQuery);
    return <Searchbar style={props.style} placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />;
}
