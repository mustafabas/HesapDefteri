import React, { Component } from "react";
import {
  View,
  
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, Text,StatusBar,StyleSheet,  ActivityIndicator
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";

import newStyles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { getAboutUs } from "../../../redux/actions/profileActions";
import HTML from 'react-native-render-html'






interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getAboutUs : () => void;
  context : string;
  loading : boolean;
  message :string;
}


class AboutUsScreen extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Hakkımızda',

  };


  
  renderScrollViewContent() {
    if(this.props.loading) {
      return(
        <View>
                   <ActivityIndicator
                       color = '#e83537'
                       size = "large"
                       style = {{flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 80}}/>
                </View>
              )
    }else {
      return(
        <View style={[newStyles.inputContainer,{marginTop:5,padding:20}]}>

                <HTML html={this.props.context} />
        
      </View>
      )
    }
  }

  componentWillMount() {
    this.props.getAboutUs()
  }
  render() {
    return (
      <SafeAreaView style={{justifyContent:'flex-start',flex:1}} >

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView bounces={false} >
          {this.renderScrollViewContent()}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}




const mapStateToProps = (state: AppState) => ({
  context : state.profile.context,
  loading : state.profile.loading,
  message : state.profile.message
})

function bindToAction(dispatch: any) {
  return {
    getAboutUs : () => 
    dispatch(getAboutUs())
      
  };
}


export default connect(mapStateToProps,bindToAction)(AboutUsScreen)
