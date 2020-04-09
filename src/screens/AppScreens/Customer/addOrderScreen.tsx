'use strict';
import React, {Component} from 'react';
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
} from 'react-native';
import {AsyncStorage } from 'react-native'

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from "../../styles";

import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';

import { AppState } from '../../../redux/store';
import { Formik } from 'formik';


const title = "Home Screen"


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    orders: IOrderItem[];
    takeTotalAmount: number;
    tookTotalAmount: number;
    restTotalAmount: number;
    isOrderLoading: boolean;
    loadingMore: boolean;
    isSuccess :boolean;
    GetOrders: (customerId: number, pageIndex: number, pageSize: number) => void;
    GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) => void;
    AddCash: (orderId: number, amount: string) => void;
    orderDelete: (orderId: number) => void;
    RbSheet: RBSheet;
  }
  

  interface amountData {
    amount: string
  }
  
  interface State {
    refreshing: boolean;
    modalVisible: boolean;
    orderId: number;
    amount: number;
    modalAmountVisible: boolean;
    modalPriceVisible: boolean;
    unitPrice: number;
    count: number;
    productId: number;
    productName: string;
    page: number;
    isPaid:boolean;
  }
  
const girdiler = Yup.object().shape({

});

const initialValues: amountData = {
  amount: "",
}






class CustomerOrdersScreen extends Component<Props,State>{

    componentWillMount() {
        this.props.GetOrders(this.props.navigation.getParam("customerId"), 1, 10);
        this.setState({ refreshing: false });
      }

      
      static navigationOptions = ({navigation}) => ({
        title: 'Sipariş Ekle',
        
    })


    OrderSheet: any;
    CustomerSheet: any;
    AmountSheet: any;
  
    constructor(props: Props) {
      super(props);
      this.state = {
        refreshing: false,
        modalVisible: false,
        orderId: 0,
        amount: 0,
        modalAmountVisible: false,
        modalPriceVisible: false,
        unitPrice: 0,
        count: 0,
        productId: 0,
        productName: "",
        page: 0,
        isPaid:false,
      };
    }

    deleteOrderAlert() {
        //function to make three option alert
        AsyncStorage.getItem("UserType").then((value) => {
          if (value === "2") {
    
            Alert.alert(
              //title
              'Hata',
              //body
              'Sipariş silme yetkiniz bulunmamaktadır',
              [
                { text: 'Tamam' },
              ],
              { cancelable: false }
            );
            this.closeModal();
    
    
          }
          else {
            Alert.alert(
              //title
              'Sipariş Silme İşlemi',
              //body
              'Siparişi silmek istiyor musunuz?',
              [
                { text: 'Geri Gel' },
                { text: 'Evet', onPress: () => this.deleteSelectedOrder() },
              ],
              { cancelable: false }
            );
          }
    
    
        });
    
    
      }

      editOrder() {
        this.closeModal();
        this.props.navigation.navigate("EditOrder", {
          customerId: this.props.navigation.getParam("customerId")
          , orderId: this.state.orderId,
          unitPrice: this.state.unitPrice,
          count: this.state.count,
          productId: this.state.productId,
          productName: this.state.productName
        });
      }
    
      addCash() {
        this.OrderSheet.close();
        this.AmountSheet.open();
    
      }

      openModal(orderId: number, unitPrice: number, count: number, productId: number, productName: string,isPaid:boolean) {
        this.setState({
          orderId: orderId,
          unitPrice: unitPrice,
          count: count,
          productId: productId,
          productName: productName,
          isPaid: isPaid,
        });
        this.OrderSheet.open();
      }
    
      closeModal() {
        this.setState({ modalVisible: false });
      }
    
      openAmountModal() {
        this.setState({ modalAmountVisible: true });
      }
    
      closeAmountModal() {
        this.setState({ modalAmountVisible: false });
      }
    
      closePriceModal() {
        this.setState({ modalPriceVisible: false });
      }
    
      openPriceModal() {
        this.setState({ modalPriceVisible: true });
      }
    
      goToNewPricePage() {
        this.closePriceModal();
        this.props.navigation.navigate("NewPricePage", { customerId: this.props.navigation.getParam("customerId") });
      }
    
      goToDefinedPrice() {
        this.closePriceModal();
        this.props.navigation.navigate("CustomerDefinedPricePage", { customerId: this.props.navigation.getParam("customerId") });
      }
    
      odemeAl(values: amountData) {
        this.props.AddCash(this.state.orderId, values.amount.replace(",","."));
        this.AmountSheet.close();
        this.onRefresh();
    
      }
    
      deleteSelectedOrder() {
        const { orderDelete } = this.props;
        this.closeModal();
        orderDelete(this.state.orderId);
        this.props.GetOrders(this.props.navigation.getParam("customerId"), 1, 8);
        this.setState({ refreshing: false });
        this.onRefresh();
      }
    




      renderSeparator = () => (
        <View
          style={{

            height: 20,
          }}
        />
      );

    onRefresh() {
        this.setState({ refreshing: true });
        this.setState({ page: 1 });
        this.props.GetOrders(this.props.navigation.getParam("customerId"), 1, 10);
        this.setState({ refreshing: false });
      }

      _renderCustomerSheetContent(){
        return ( <View style={styles.SheetContainer}>
          <TouchableOpacity style={styles.SheetItemContainer}    onPress={() => {
                    this.CustomerSheet.close();
            this.goToNewPricePage();}}>
            <Icon name="ios-add" style={styles.SheetItemIcon}></Icon>
            <Text style={styles.SheetItemText}>
              Yeni Fiyat Ekle
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SheetItemContainer}   onPress={() => {
            this.CustomerSheet.close();
            this.goToDefinedPrice();}}>
            <Icon name="ios-list" style={styles.SheetItemIcon}></Icon>
            <Text style={styles.SheetItemText}>
              Tanımlı Fiyatlar
            </Text>
          </TouchableOpacity>
    
        </View>);
      }
    
      _renderAddAmountSheetContent(){
        return(<View style={styles.SheetAmountContainer}>
              <Formik
                initialValues={initialValues}
                validationSchema={girdiler}
                onSubmit={values => this.odemeAl(values)}
              >
                {props => {
                  return (
                    <View style={{flexDirection:"row",justifyContent:'flex-start'}}>

                        <Input
                          //containerStyle={{ width: '80%' }}
                          style={styles.input}
                          placeholder="Ürün Fiyatı"
                          placeholderTextColor="#9A9A9A"
                          value={props.values.amount + ""}
                          autoCapitalize="none"
                          keyboardType="numeric"
                          onChangeText={props.handleChange("amount")}
                          onBlur={props.handleBlur("amount")}
                        />

                      <Button onPress={()=>props.handleSubmit()}  style={styles.SheetButtonContainer}>
                       <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Ekle</Text>
                       
           
          </Button>
                    </View>
                  );
                }}
              </Formik>
        </View>);
    
      }
    
      _renderOrderSheetContent(){
        return ( <View style={styles.SheetContainer}>
                    <TouchableOpacity style={styles.SheetItemContainer}
                      onPress={() => {
                        this.OrderSheet.close();
                        this.addCash();
                      }}>
                        <Icon name="ios-add" size={30} style={styles.SheetItemIcon}></Icon>
                      <Text style={styles.SheetItemText}
                      >Ödeme Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SheetItemContainer}
                      onPress={() => {
                        this.OrderSheet.close();
                        this.editOrder();
                        }}>
                               <Icon name="ios-arrow-round-forward" size={30} style={styles.SheetItemIcon}></Icon>
                      <Text style={styles.SheetItemText}
                      >Düzenle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SheetItemContainer}
                      onPress={() => {
                        // this.OrderSheet.close();
                        this.deleteOrderAlert();
                      }}>
                             <Icon name="ios-trash" size={30} style={styles.SheetItemIcon}></Icon>
                      <Text style={styles.SheetItemText}
                      >Sil</Text>
                    </TouchableOpacity>
        </View>);
      }
    

      

      _renderView() {
        const { orders, isOrderLoading, navigation } = this.props;
        if (isOrderLoading) {
          return (<ActivityIndicator></ActivityIndicator>);
        }
        else {
          return (<FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            data={this.props.orders}
            ItemSeparatorComponent = {this.renderSeparator}

            
            renderItem={({ item }) =>
              
        
<View style={{marginHorizontal:0,flexDirection:'column',backgroundColor:'#EFF3F9',paddingVertical:10,paddingHorizontal:10,justifyContent:'space-between',borderRadius:15}}>
            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
 
            <View style={{justifyContent:'center'}}>
                 
                 <Text style={{color:'#2069F3',fontWeight:'600',fontSize:20,fontFamily:'Avenir Next'}}>

                        {item.productName}
                 </Text>
             </View>
             {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
             <View style={{alignItems:'flex-end'}}>
               <TouchableOpacity onPress={() => this.openModal(item.orderId, item.unitPrice, item.count, item.productId, item.productName,item.isPaid)}>
                 <Icon style={{color:"#2069F3"}} name="ios-more" />
               </TouchableOpacity>
                 <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                 {item.dateTime.slice(8, 10) + "/" + item.dateTime.slice(5, 7) + "/" + item.dateTime.slice(0, 4)
                  }
                 </Text> 
                 <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    {item.dateTime.slice(11, 16)}
                 </Text>
                 </View>
             
             
              </View>
 
 
              <View style={{width:"100%",height:1,backgroundColor:'#CFD3D7',marginVertical:10}} />
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View>
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Adet: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.count}
                 </Text>
 
                 </View>
 
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Birim Fiyat: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.unitPrice} TL
                 </Text>
 
                 </View>
 
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Toplam Fiyat: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    {item.totalPrice} TL
                 </Text>
 
                 </View>
 
 
               
             </View>
             {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
 
             <View>
             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Alınan: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.tookTotalPrice} TL
                 </Text>
 
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next',textAlign:"right"}}>
                     Kalan: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    {item.tookTotalPrice} TL
                 </Text>
 
                 </View>
 
 
             </View>
             </View>
            </View>
 
 
 
 
        }
            keyExtractor={(item, index) => String(index)}
            onEndReached={() => {
              var pagenew = this.state.page + 1;
              this.setState({ page: pagenew });
              if (pagenew == 1) {
                pagenew = pagenew + 1;
                this.setState({ page: pagenew });
              }
              this.props.GetOrdersMore(this.props.navigation.getParam("customerId"), pagenew, 3);
    
            }}
            onEndReachedThreshold={0.5}
            initialNumToRender={8}
            ListFooterComponent={
              this.props.loadingMore ? (
                <View>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />);
        }
      }


      
    render() {

        var nameSurname: string = this.props.navigation.getParam("nameSurname");
        var companyName: string = this.props.navigation.getParam("companyName");

        var restTotalAmount : string = this.props.navigation.getParam("restTotalAmount");
        var displayTookTotalAmount : string = this.props.navigation.getParam("displayTookTotalAmount");
        var totalAmount : string = this.props.navigation.getParam("totalAmount");
        return (
            <View style={{}}>
               <ScrollView style={{paddingHorizontal:10}}>

               <View style={{marginHorizontal:5,paddingTop:20,paddingHorizontal:5,justifyContent:'space-between',borderRadius:15}}>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               
                <Text style={{alignSelf:'center',color:'#2069F3',fontWeight:'600',fontSize:24,fontFamily:'Avenir Next'}}>
                    {nameSurname}
                </Text>
                <View>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Toplam Siparis
                </Text>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next',textAlign:'right'}}>
                    Adet: 
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next',textAlign:'right'}}>
                     22
                </Text>
            </View>
            </View>
            </View>


            <View style={{alignSelf:'center',width:'100%',height:1,backgroundColor:'#CFD3D7',marginVertical:5}} />


            <View style={{}}>
            <View style={{flexDirection:'row',flex:1}}>
                <Icon name="ios-call" style={{fontSize:20}}/>
                <Text style={{color:'#404243',fontSize:16,marginLeft:5,fontFamily:'Avenir Next',flex:.5}}>
                    0555 555 55 55
                </Text>

               <View style={{flexDirection:'row',flex:.5,justifyContent:'flex-end'}}>
               <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Alınan:
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    {displayTookTotalAmount}
                </Text>
               </View>

            </View>
            <View style={{flexDirection:'row',flex:1}}>
                <Icon name="ios-pin" style={{fontSize:20}}/>
                <Text style={{color:'#404243',fontSize:16,marginLeft:5,fontFamily:'Avenir Next',flex:.6}}>
                    Erzene, Gençlik Cd. no:25, 35200 Bornova/İzmir
                </Text>
            <View style={{flex:.5,justifyContent:'flex-end'}}>

          
               <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
               <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Kalan:
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    {restTotalAmount}
                </Text>
               </View>
               <View style={{flexDirection:'row',flex:.4,justifyContent:'flex-end'}}>
               <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Toplam:
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    {totalAmount}
                </Text>
               </View>
               </View>

            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
            </View>
            </View>
            
{/* Other Components */}

<View style={{height:30}}/>

<RBSheet
          ref={ref => {
            this.CustomerSheet = ref;
          }}
            height={250}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft:20
              }
            }}
          >
           {this._renderCustomerSheetContent()}
          </RBSheet>

          <RBSheet
          ref={ref => {
            this.OrderSheet = ref;
          }}
            height={250}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft:20
              }
            }}
          >
           {this._renderOrderSheetContent()}
          </RBSheet>

          
          <RBSheet
          ref={ref => {
            this.AmountSheet = ref;
          }}
            height={100}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft:20
              }
            }}
          >
           {this._renderAddAmountSheetContent()}
          </RBSheet>


          <Modal
            visible={this.state.modalAmountVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeAmountModal()}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closeAmountModal()}>
                  <Icon name="md-close" size={30} color={"#6E6E6E"} />
                </TouchableOpacity>
                <ScrollView bounces={false}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={girdiler}
                    onSubmit={values => this.odemeAl(values)}
                  >
                    {props => {
                      return (
                        <View>
                          <View style={styles.inputFiyatContainer}>
                            <Input
                              containerStyle={{ width: '70%' }}
                              style={styles.inputFiyat}
                              placeholder="Ürün Fiyatı"
                              placeholderTextColor="#9A9A9A"
                              value={props.values.amount + ""}
                              autoCapitalize="none"
                              keyboardType="numeric"
                              onChangeText={props.handleChange("amount")}
                              onBlur={props.handleBlur("amount")}
                            />
                            <Text style={styles.inputFiyatText}>TL</Text>
                          </View>
                          <TouchableOpacity
                            style={styles.amountButtonContainer}
                            onPress={props.handleSubmit}>
                            <Text style={styles.amountButtonText}> Ekle </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  </Formik>
                </ScrollView>
              </View>
            </View>
          </Modal>

   
         
{this._renderView()}

{/*  */}
             
          
{/*  */}

               </ScrollView>
                </View>

        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isOrderLoading: state.orders.isOrderLoading,
    orders: state.orders.orders,
    takeTotalAmount: state.orders.takeTotalAmount,
    tookTotalAmount: state.orders.tookTotalAmount,
    restTotalAmount: state.orders.restTotalAmount,
  
  });
  
  function bindToAction(dispatch: any, ) {
    return {
      GetOrders: (customerId: number, pageIndex: number, pageSize: number) =>
        dispatch(GetOrders(customerId, pageIndex, pageSize)),
      GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) =>
        dispatch(GetOrdersMore(customerId, pageIndex, pageSize)),
      AddCash: (orderId: number, amount: string) =>
        dispatch(AddCash(orderId, Number(amount))),
      orderDelete: (orderId: number) =>
        dispatch(orderDelete(orderId)),
    };
  }
  


export default connect(
    mapStateToProps,
    bindToAction
  )(CustomerOrdersScreen);




