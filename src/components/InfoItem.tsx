import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,Image
} from "react-native";
import { colors } from "../constants";
import { CardItem,Body, } from "native-base";

interface Props extends TouchableOpacityProps {
  text: string;
}

export class InfoItem extends Component<Props, {}> {
  render() {
    const { text,style } = this.props;
    return (
        <View style={style}>

        <CardItem>
          <Body style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
            <Image source={require('../images/error.png')} />
            <Text style={{marginTop:10,color:'#aaa',fontSize:18,fontFamily:'Avenir Next',textAlign:'center'}}>
              {text}
              </Text>
          </Body>
        </CardItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontWeight: "700",
    fontSize: 16
  }
});
