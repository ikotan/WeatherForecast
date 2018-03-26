// @flow
import React, { Component } from "react";
import { Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CITIES from "./cities.json";
import {
  Type,
  NavigationScreenProp
} from "react-navigation/src/TypeDefinition";

type Props = {
  navigation: NavigationScreenProp<*>
};

class CityListScreen extends Component<{}> {
  onPress(item: *) {
    console.log("onPress props", this.props);
    const { navigation } = this.props;
    navigation.navigate("Weather", { city: item });
    console.log("onPress", item);
  }
  render() {
    return (
      <FlatList
        data={CITIES}
        keyExtractor={item => item.en}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.onPress(item)}
            style={styles.itemContainer}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    height: 48,
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});

export default CityListScreen;
