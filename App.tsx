import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import {View} from 'react-native'

import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import  AppBase  from "./AppBase";
import NotificationScreen from "./src/screens/AppScreens/Notification/NotificationScreen";
import NetInfo from "@react-native-community/netinfo";
export default class App extends Component {

  componentDidMount() {
    NetInfo.addEventListener(state => {



      if(state.isConnected == false) {
        showMessage({
          message: "İnternet Bağlantınız yok. Lütfen internet bağlantınızı kontrol edin.",
          type: "warning",
          icon: "auto"
      }
      );
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
          <AppBase  />
          </PersistGate>
        </Provider>
        <FlashMessage position="top" animated={true} />
      </View>
    );
  }
}