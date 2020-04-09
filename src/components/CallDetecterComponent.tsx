import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking
} from 'react-native';

var callDetector = undefined

import CallDetectorManager from 'react-native-call-detection'
import { FlatList } from 'react-native-gesture-handler';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props)


    this.state = {callStates : []} //call states
    this.startListenerTapped = this.startListenerTapped.bind(this);
  }

  startListenerTapped() {
    callDetector = new CallDetectorManager((event:any, number:any) => {

        var updatedCallStates = this.state.callStates
        updatedCallStates.push(event + ' - ' + number)
        var previousDS = this.state.ds
        this.setState({ callStates:  updatedCallStates});

        if (event === 'Disconnected') {
          // Do something call got disconnected
          } 
          else if (event === 'Connected') {
          // Do something call got connected
          // This clause will only be executed for iOS
          } 
          else if (event === 'Incoming') {
          // Do something call got incoming


          }
          else if (event === 'Dialing') {
          // Do something call got dialing
          // This clause will only be executed for iOS
          } 
          else if (event === 'Offhook') {
          //Device call state: Off-hook. 
          // At least one call exists that is dialing,
          // active, or on hold, 
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android

          }
          else if (event === 'Missed') {
            // Do something call got missed
            // This clause will only be executed for Android
          }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      ()=>{}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Telefon Durum İzni',
        message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
      } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    )
  }

  callFriendTapped() {

  }

  stopListenerTapped() {
    callDetector && callDetector.dispose();
  }

  render() {

    return (
      <View style={styles.container}>
        <Button
          onPress={this.startListenerTapped}
          title="Start Listener"
          color="#841584"
          style = {styles.bottomMargin}
        />

        <Button
          onPress={this.callFriendTapped}
          title="Call your friend"
          color="#341584"
          style = {styles.bottomMargin}
        />
        <Button
          onPress={this.stopListenerTapped}
          title="Stop Listener"
          color="#841584"
          style = {styles.bottomMargin}
        />

        <Text style = {styles.text}>
          Call State Logs
        </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomMargin: {
    marginBottom: 10
  },
  text: {
    marginTop: 30,
    textAlign:'center',
    fontSize: 20,
    color: '#341584'
  },
  callLogs: {
    textAlign:'center',
    fontSize: 15,
    color: '#333333',
    marginBottom: 5
  }
});