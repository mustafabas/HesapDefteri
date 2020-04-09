'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,

    View,
    Platform,
    FlatList,
    Animated,
    ScrollView,
    TouchableOpacity,
    Image,

    ActivityIndicator,
    Modal,
} from 'react-native';
import newStyles from "../../AuthScreens/Login/styles";

import {AsyncStorage } from 'react-native'


import { Icon,Text, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, ListItem, Left, Body, Right, Switch, Spinner, Radio } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';

import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import OrdersCustomer from '../../../pages/OrdersCustomer';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';
import { getUserInfo, UserInfo } from '../../../redux/actions/profileActions';
import { Dimensions } from 'react-native';






interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    getUserInfo : () => void;
    loading : boolean;
    userInfo : UserInfo
    message : string;

  }

  
  interface State {
    refreshing: boolean;
    ListView : [];
    viewState : number;
  }
  



class IntroductionScreen extends Component<Props,State>{

     

    constructor(props) {
        super(props);
        this.state = {viewState : 0};
      }
      

    renderContents() {
       

    
    }
    onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
    
        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log(pageNum);

        this.setState({viewState : pageNum
        })
      }

    render() {

        var list = []
        list.push(<View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
        <View style={{height:50,backgroundColor:'blue'}}>
            </View>

        </View>)
         list.push(<View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
         <View style={{height:50,backgroundColor:'yellow'}}>
             </View>
 
         </View>)
         list.push(<View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
         <View style={{height:50,backgroundColor:'green'}}>
             </View>
 
         </View>)
         list.push(<View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
         <View style={{height:50,backgroundColor:'black'}}>
             </View>
 
         </View>)
        return (
            <View style={{flex:1}}>
                <FlatList 
                horizontal={true}

                // contentContainerStyle={{width:'100%',height:Dimensions.get('screen').height * 5}}
                data = {list}
                pagingEnabled
                onMomentumScrollEnd= {(e)=> this.onScrollEnd(e)}
                alwaysBounceHorizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem= {({ item }) => (item)
                
                }
              
                />
                <View style={{position:'absolute',bottom:40,alignSelf:'center',flexDirection : 'row'}}>
                <View style={[styles.circleOutside,{marginLeft:0}]}>
               {this.state.viewState === 0 && <View style ={styles.circleInside}/>}

                
                </View>
                <View style={styles.circleOutside}>
                {this.state.viewState === 1 && <View style ={styles.circleInside}/>}
                </View>
                
                <View style={styles.circleOutside}>
                {this.state.viewState === 2 && <View style ={styles.circleInside}/>}
                </View>
                
                <View style={styles.circleOutside}>
                {this.state.viewState === 3 && <View style ={styles.circleInside}/>}
                </View>
                
                </View>
                </View>

        )
    }
}

const mapStateToProps = (state: AppState) => ({

  
  });
  
  function bindToAction(dispatch: any, ) {
    return {
 
    };
  }
  




const styles = StyleSheet.create({

    circleOutside : {
        borderWidth:2,width:20,height:20,borderRadius:10,borderColor:'blue',alignItems:'center',justifyContent:'center',marginLeft:20

    },
    circleInside : {
        width:10,height:10,borderRadius:5,backgroundColor:'blue'
  
    }
  })




export default connect(
    mapStateToProps,
    bindToAction
  )(IntroductionScreen);




