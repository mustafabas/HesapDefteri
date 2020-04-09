'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,

  ActivityIndicator,
  Modal,
  Linking,
} from 'react-native';
import {AsyncStorage } from 'react-native'

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, Card, CardItem,Body, Spinner } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesNew from "../../styles";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore, GetCustomerDetail } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import OrdersCustomer from '../../../pages/OrdersCustomer';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { ICustomerDetailItem } from '../../../redux/models/homeModel';
import customer from '../../../pages/customer';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import { InfoItem } from '../../../components/InfoItem';
import { getCustomerOrderDetail, orderDetail, OrderStatus, updateCustomerOrderStatus } from '../../../redux/actions/orderDetailActions';




interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getCustomerOrderDetail : (orderId : number) => void;
  loading : boolean | null;
  message : string;
  orderDetail : orderDetail;
  updateCustomerOrderStatus : (orderStatus : OrderStatus , orderId : number) => void;

  loadingOrderUpdate :boolean;
succeedOrderUpdate : boolean;
orderUpdateMessage : string;

}




interface State {
  orderStatus : OrderStatus;
  orderId : number;
  orderStatusString: string[];

}





class OrderDetailScreen extends Component<Props, State>{
     static navigationOptions = ({ navigation }) => ({
    title: 'Sipariş Detay',
    headerRight: () => {
        let orderId = navigation.getParam('orderId')
      return (
        <View style={{marginRight:10}} >
          <Text style={{color:'white',textAlign:'right'}}>Sipariş No</Text>
       
         <Text style={{textAlign:'right',color:'white'}}>{orderId}</Text>
        
        </View>
      )
    }
  })

  showSimpleMessage() {
    if (this.props.message) {

        showMessage({
            message: this.props.message,
            type:  "danger",
            icon: "auto"
        }
        );
    }
    else if (this.props.orderUpdateMessage) {
      showMessage({
        message: this.props.orderUpdateMessage,
        type: this.props.succeedOrderUpdate ? "success" : "danger",
        icon: "auto"
    }
    );
    }

}


  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      modalVisible: false,
      orderId: this.props.navigation.getParam('orderId'),
      amount: 0,
      modalAmountVisible: false,
      modalPriceVisible: false,
      unitPrice: 0,
      count: 0,
      productId: 0,
      productName: "",
      page: 0,
      isPaid: false,
      orderStatus : OrderStatus.null,
      orderStatusString : ["Sipariş Durumu Yok",
      "Sipariş Beklemede",
      "Sipariş Tamamlandı",
       "Sipariş İptal Edildi"]

    };
  }

  componentWillMount(){
      this.props.getCustomerOrderDetail(this.props.navigation.getParam('orderId'));

  }

  renderContent(){

    if((this.props.loading || this.props.loading === null) && !(this.props.orderDetail)) {
        return (
            <Spinner />
        )
    }else if (this.props.orderDetail){
        let detail = this.props.orderDetail
    

      return( 
         <View>
              <View style={{padding:10,borderBottomWidth:1,borderBottomColor:"#eeeeee", flexDirection:'row'}}>
                <View style={{flex:.7}}>
                <Text style={{fontFamily:'Avenir Next',fontSize:18}}>{detail.customerName}</Text>
            <Text style={{color:"#8f8f8f",fontFamily:'Avenir Next'}}>{detail.companyName}</Text>
                </View>
                <View style={{flex:0.3}}>
             <Text style={{fontSize:12, color:'#AAAAAA' }}> {this.props.orderDetail.createdDate}</Text>
             <Text style={{color:'green', fontSize:20}}>{this.props.orderDetail.displayTotalPrice}</Text>
            {this.props.orderDetail.isPaid && <Text style={{color:'#333'}}>
              (Peşin Alınmalı)</Text>}

                </View>
          <View>

          </View>
          </View>

          <FlatList
               data={this.props.orderDetail.orderProducts}
               renderItem={({ item }) =>
               <View style={{padding:5,borderBottomWidth:1,borderBottomColor:"#eeeeee", marginHorizontal:10}}>
               <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:'Avenir Next',fontWeight:'600',fontSize:18,flex:1}}>{item.productName}</Text>
               <Text style={{fontFamily:'Avenir Next',color:'#8C8C8C',alignSelf:'center',marginLeft:10}}>Adet: {item.count}</Text>
               
               </View>
                
                
               <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              
               <Text style={{fontFamily:'Avenir Next',color:'#8C8C8C',marginTop:10,textAlign:'right'}}>Fiyat: {item.unitPrice}</Text>
               <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{fontFamily:'Avenir Next',color:'#8C8C8C',marginTop:10,textAlign:'right'}}>Toplam: </Text>
                <Text style={{fontFamily:'Avenir Next',color:'#8C8C8C',marginTop:10,textAlign:'right'}}>{item.totalPrice}</Text>
                </View>

               </View>
   
              </View>
              }
          ></FlatList>


          <View style={{padding:10}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:20,fontWeight:'700',color:'#8c8c8c',marginLeft:10}}>Teslimat Adresi</Text>
             <View style={{flexDirection:'row',marginTop:20,borderBottomWidth:1,borderBottomColor:"#eeeeee",paddingBottom:20,justifyContent:'space-between'}}>
               
          

                <View style={{flexDirection:'row',flex:.5}}>
                <Icon name="ios-pin" style={{fontSize:20,color:'#216AF4'}}/>
               
               
               
                <TouchableOpacity disabled={!detail.customerAddress}   onPress={() => {
            Platform.OS === "ios" ? Linking.openURL('http://maps.apple.com/maps?daddr=' + detail.customerAddress ): Linking.openURL('http://maps.google.com/maps?daddr=' + detail.customerAddress)


          }}>
      <Text style={{fontFamily:'Avenir Next',fontWeight:'500',color:'#8c8c8c',marginLeft:10}}>{detail.customerAddress ? detail.customerAddress : "Adres Bilgisi Bulunamadı."}</Text>
            </TouchableOpacity>

            </View>

            
        
           <TouchableOpacity disabled={!detail.customerAddress} 
           onPress={() => {
            Platform.OS === "ios" ? Linking.openURL('http://maps.apple.com/maps?daddr=' + detail.customerAddress ): Linking.openURL('http://maps.google.com/maps?daddr=' + detail.customerAddress)


          }}>
           <Icon name="ios-eye" style={{fontSize:20,color:'#216AF4'}}/>
           </TouchableOpacity>
             </View>
          </View>
       

          <View style={{padding:10}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:20,fontWeight:'700',color:'#8c8c8c',marginLeft:10}}>İletişim Bilgileri</Text>
             <View style={{flexDirection:'row',marginTop:20,borderBottomWidth:1,borderBottomColor:"#eeeeee",paddingBottom:20,justifyContent:'space-between'}}>
               
          

                <View style={{flexDirection:'row',flex:.5}}>
                <Icon name="ios-call" style={{fontSize:20,color:'#216AF4'}}/>
               
               
               
                <TouchableOpacity disabled={!detail.customerPhoneNumber}
                
                onPress={() => Linking.openURL(`tel:${detail.customerPhoneNumber}`)}>
            <Text style={{fontFamily:'Avenir Next',fontWeight:'500',color:'#8c8c8c',marginLeft:10}}>{detail.customerPhoneNumber ?detail.customerPhoneNumber : "İletişim Bilgisi Bulunamadı"}</Text>
            </TouchableOpacity>

            </View>

            
        
           <TouchableOpacity disabled={!detail.customerPhoneNumber}
           onPress={() => Linking.openURL(`tel:${detail.customerPhoneNumber}`)}>
           <Icon name="ios-eye" style={{fontSize:20,color:'#216AF4'}}/>
           </TouchableOpacity>
             </View>
          </View>
       


         </View>
      )
    }
  }
  // Waiting = 1,
  //       Exported =2,
  //       Cannceled = 3
  changeOrderStatusContent() {
    // var orderStatus = this.props.orderDetail ? (this.props.orderDetail.orderStatus ? this.props.orderDetail.orderStatus : 0 ) : 0
    console.log("stata",this.state.orderStatus)
    console.log("props",this.props.orderDetail.orderStatus)
    if(this.props.orderDetail && this.state.orderStatus === OrderStatus.null) {
      if(this.props.orderDetail.orderStatus) {
        this.setState({orderStatus : this.props.orderDetail.orderStatus});
        
      }
  }
  if(this.props.orderUpdateMessage ) {
  
    
  }

    return(
      <View>
        <TouchableOpacity onPress={()=> this.changeOrderStatus.close()}
         style={{position:'absolute',right:0,zIndex:20}}>
          <Icon name="ios-close" style={{fontSize:35}}/>
        </TouchableOpacity>
        <View style={{marginTop:5}}>
          <Text style={{fontFamily:'Avenir Next',textAlign:'center',fontSize:18,fontWeight:'600'}}>Sipariş Durumunu Güncelle</Text>
          <TouchableOpacity onPress={()=> this.setState({orderStatus : OrderStatus.Waiting})}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#cbd25f',backgroundColor:this.state.orderStatus === OrderStatus.Waiting ? '#cbd25f' : 'white'}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:this.state.orderStatus === OrderStatus.Waiting ? 'white' :'black'}}>
    Sipariş Beklemede
 
 </Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=> this.setState({orderStatus : OrderStatus.Exported})}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#0f5f00',backgroundColor: this.state.orderStatus === OrderStatus.Exported ? '#0f5f00' : 'white'}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:this.state.orderStatus === OrderStatus.Exported ? 'white' :'black'}}>
    Siparişi Tamamla
 
 </Text>
 </TouchableOpacity>



 <TouchableOpacity onPress={




   () => { this.changeOrderStatus.close();
     this.props.updateCustomerOrderStatus(this.state.orderStatus,this.state.orderId)}

 }
  disabled={this.state.orderStatus === OrderStatus.null || this.props.orderDetail.orderStatus === this.state.orderStatus}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor: '#216AF4', opacity : this.state.orderStatus === OrderStatus.null || this.props.orderDetail.orderStatus === this.state.orderStatus ? .3 : 1}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:'white'}}>
    Onayla
 
 </Text>
 </TouchableOpacity>

        </View>
      </View>
    )

  }

  renderButtonText(){
    if(!this.props.loadingOrderUpdate && !this.props.loading && this.props.orderDetail && this.props.orderDetail.orderStatus) {
return(
  <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >{this.props.orderDetail ? (this.props.orderDetail.orderStatus ? this.state.orderStatusString[Number(this.props.orderDetail.orderStatus)] : "Sipariş Durumu Girilmemiş") : "Sipariş Durumu Girilmemiş"}</Text>
)
    }
    else {
      return (
        <Spinner color="white" />
      )
    }

  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{}}>

        {this.renderContent()}


        </ScrollView>
        {/* {this.showSimpleMessage()} */}
        <View style={{backgroundColor:'#EFF3F9',justifyContent:'flex-end',paddingVertical:20}}>

        <RBSheet
          ref={ref => {
            this.changeOrderStatus = ref;
          }}
          height={400}
          duration={200}
          customStyles={{
            container: {
                borderRadius:5,

                padding:20
            }
          }}
        >
          {this.changeOrderStatusContent()}
        </RBSheet>


        <Button onPress={()=> this.changeOrderStatus.open()}  style={{justifyContent:'center',marginHorizontal:20,backgroundColor:'#216AF4',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#216AF4",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                  {this.renderButtonText()}
          </Button>
        </View>
        {this.showSimpleMessage()}
      </View>

    )
  }
}

const mapStateToProps = (state: AppState) => ({
loading : state.orderDetail.isLoading,
orderDetail : state.orderDetail.orderDetail,
message :state.orderDetail.message,
loadingOrderUpdate : state.orderDetail.isLoadingOrderStatus,
succeedOrderUpdate : state.orderDetail.isSuccedOrderStatusUpdate,
orderUpdateMessage : state.orderDetail.orderStatusMessage,


}
);

function bindToAction(dispatch: any) {
  return {
    getCustomerOrderDetail : (orderId : number) => 
                 dispatch(getCustomerOrderDetail(orderId)),
 updateCustomerOrderStatus : (orderStatus : OrderStatus , orderId : number) =>
 dispatch(updateCustomerOrderStatus(orderStatus,orderId))
  };
}



export default connect(
  mapStateToProps,
  bindToAction
)(OrderDetailScreen);




