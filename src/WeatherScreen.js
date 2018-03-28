// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from "react-native";
import { getCurrentWeather, getWeatherForecast } from "./WeatherService";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import ForecastListItem from "./ForecastListItem";
import {
  Type,
  NavigationScreenProp
} from "react-navigation/src/TypeDefinition";

type Props = {
  navigation: NavigationScreenProp<*>
};

type State = {
  current: ?CurrentWeather,
  forecasts: WeatherForecast[]
};

class WeatherScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { city } = navigation.state.params;
    console.log(city);
    return {
      title: `${city.name}の天気`
    };
  };
  constructor(props: {}) {
    super(props);
    this.state = { current: null, forecasts: [] };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { city } = navigation.state.params;
    console.log(city);
    getCurrentWeather(city.en).then(current => this.setState({ current }));
    getWeatherForecast(city.en).then(forecasts => {
      console.log(forecasts);
      this.setState({ forecasts });
    });
  }

  renderForecasts() {
    return (
      <FlatList
        data={this.state.forecasts}
        renderItem={({ item }) => <ForecastListItem item={item} />}
        keyExtractor={item => item.date.toString()}
      />
    );
  }

  render() {
    const { current } = this.state;
    if (current == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    const { main, iconURL } = current;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{main}</Text>
        <Image source={{ uri: iconURL }} style={styles.icon} />
        {this.renderForecasts()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    marginVertical: 8
  },
  icon: {
    width: 100,
    height: 100
  }
};

export default WeatherScreen;
