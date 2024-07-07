import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Text,
  View,
} from "react-native";

const EventScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <View
      style={styles.container}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            defaultValue={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
          <TouchableHighlight onPress={this._onPressButton}>
            <View style={styles.searchButton}>
              <Text style={{ color: "#fff" }}>Search</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 4,
    height: 40,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#999",
  },
  searchButton: {
    backgroundColor: "#2196F3",
    borderRadius: 4,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 6,
  },
});

export default EventScreen;
