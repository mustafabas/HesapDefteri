import React, { Component } from "react";
import { View,Text, AsyncStorage} from "react-native";
import { colors } from "../constants";
import { Icon } from "native-base";
import { WATER_GET_NOTIFICATIONS, WATER_GET_NEW_NOTIFICATION_COUNT } from "../redux/constants";
import {  getNotifications, INotificationItem } from '../redux/actions/notificationAction';

import axios from 'axios'
import { AppState } from '../redux/store';
import { connect } from "react-redux";
interface Props {
    name: string;
    focused :boolean;
    badgeCount:number;
}


export  class IconBadge extends Component<Props, {}> {

  render() {
    const { name } = this.props;
    return (
        <View style={{ width: 32, height: 32, margin: 5 }}>
          <Icon name={name}  style={{color: this.props.focused ? '#2069F3':'', fontSize:32}} />
          {this.props.badgeCount && this.props.badgeCount!=0 && (
            <View
              style={{
                // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 16,
                height: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
            >
            
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {this.props.badgeCount && this.props.badgeCount.toString()}
              </Text>
            </View>
          )}
        </View>
      );
  }
}

