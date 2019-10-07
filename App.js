import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/components/HomeScreen";
import DetailScreen from "./src/components/DetailScreen";

const MainNavigator = createStackNavigator(
  {
    HomeScreen,
    DetailScreen
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
    defaultNavigationOptions: {
      title: "EmotionCamera",
      headerVisible: false
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
