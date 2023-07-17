import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, Searchbar, List } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";

type KomponenSearchAvailable = "Home" | "School" | "Information" | "Settings" | "Post";
type SearchVisibility = {
    [key: string]: boolean | undefined;
};

export default function SearchMapper() {
    const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    searchQuery != null && searchQuery != undefined && searchQuery != "" && console.log(searchQuery);
    const [expanded, setExpanded] = useState(true);
    const [visible, setVisible] = useState<SearchVisibility>({});

    const toggleVisible = (name: KomponenSearchAvailable) => () => setVisible({ ...visible, [name]: !visible[name] });
    const getVisible = (name: KomponenSearchAvailable) => !!visible[name];

    const handlePress = () => setExpanded(!expanded);
    return (
        <ScreenWrapper contentContainerStyle={{ paddingHorizontal: 20 }}>
            <View>
                <Searchbar placeholder="Cari Sesuatu ..." value={searchQuery} onChangeText={onChangeSearch} />
                <List.Section
                // title={"Komponen"}
                >
                    <List.Accordion
                        title="Beranda"
                        left={(props) => <List.Icon {...props} icon="home" />}
                        expanded={getVisible("Home")}
                        onPress={toggleVisible("Home")}>
                        <List.Item
                            style={styles.listChild}
                            left={(props) => <List.Icon {...props} icon="school" />}
                            title="First item"
                            onPress={() => alert("PRESSED")}
                        />
                        <List.Item style={styles.listChild} title="Second item" left={(props) => <List.Icon {...props} icon="paperclip" />} />
                    </List.Accordion>

                    <List.Accordion
                        title="Sekolah"
                        left={(props) => <List.Icon {...props} icon="school" />}
                        expanded={getVisible("School")}
                        onPress={toggleVisible("School")}>
                        <List.Item style={styles.listChild} title="First item" left={(props) => <List.Icon {...props} icon="calendar" />} />
                        <List.Item style={styles.listChild} title="Second item" left={(props) => <List.Icon {...props} icon="paperclip" />} />
                    </List.Accordion>
                    <List.Accordion
                        title="Informasi"
                        left={(props) => <List.Icon {...props} icon="forum" />}
                        expanded={getVisible("Information")}
                        onPress={toggleVisible("Information")}>
                        <List.Item style={styles.listChild} title="First item" left={(props) => <List.Icon {...props} icon="calendar" />} />
                        <List.Item style={styles.listChild} title="Second item" left={(props) => <List.Icon {...props} icon="paperclip" />} />
                    </List.Accordion>
                    <List.Accordion
                        title="Penggaturan"
                        left={(props) => <List.Icon {...props} icon="cog" />}
                        expanded={getVisible("Settings")}
                        onPress={toggleVisible("Settings")}>
                        <List.Item style={styles.listChild} title="First item" left={(props) => <List.Icon {...props} icon="calendar" />} />
                        <List.Item style={styles.listChild} title="Second item" left={(props) => <List.Icon {...props} icon="paperclip" />} />
                    </List.Accordion>
                    <List.Accordion
                        title="Post"
                        left={(props) => <List.Icon {...props} icon="newspaper-variant-multiple" />}
                        expanded={getVisible("Post")}
                        onPress={toggleVisible("Post")}>
                        <List.Item style={styles.listChild} title="First item" left={(props) => <List.Icon {...props} icon="calendar" />} />
                        <List.Item style={styles.listChild} title="Second item" left={(props) => <List.Icon {...props} icon="paperclip" />} />
                    </List.Accordion>
                </List.Section>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({ listChild: { paddingLeft: 25 } });
