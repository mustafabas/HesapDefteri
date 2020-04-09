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

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, Card, CardItem,Body } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesNew from "../../styles";
import styles from "../../styles";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore, GetCustomerDetail } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { ICustomerDetailItem } from '../../../redux/models/homeModel';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import { InfoItem } from '../../../components/InfoItem';

const title = "Home Screen"


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  orders: IOrderItem[];
  customerDetailModel?: ICustomerDetailItem;
  loadingMore: boolean;
  isSuccess: boolean;
  GetOrders: (customerId: number, pageIndex: number, pageSize: number) => void;
  GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) => void;
  AddCash: (orderId: number, customerId: number, amount: string) => void;
  orderDelete: (customerId: number, orderId: number) => void;
  GetCustomerDetail: (customerId: number) => void;
  RbSheet: RBSheet;
  Message: string;
  isSuccessAddCash: boolean;
  MessageAddCash: string;
  isCustomerDetailLoading: boolean;
  isOrderLoading: boolean;

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
  isPaid: boolean;
}

const girdiler = Yup.object().shape({

});

const initialValues: amountData = {
  amount: "",
}



function shouldShowBackButton(stackRouteNavigation: any) {
  let parent = stackRouteNavigation.dangerouslyGetParent();
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
}


class CustomerOrdersScreen extends Component<Props, State>{

  showSimpleMessage() {

    if (this.props.Message) {

      showMessage({
        message: this.props.Message,
        type: this.props.isSuccess ? "success" : "danger",
        icon: 'auto'
      }
      );
    }
    if (this.props.MessageAddCash) {
      showMessage({
        message: this.props.MessageAddCash,
        type: this.props.isSuccessAddCash ? "success" : "danger",
        icon: 'auto'
      }
      );
    }

  }


componentDidMount(){
  this.props.navigation.setParams({
    callingFun: this.callingFun,
})
}
  componentWillMount() {
    const customerId = this.props.navigation.getParam("customerId");
    this.props.GetCustomerDetail(customerId);
    this.props.GetOrders(customerId, 1, 10);

    this.setState({ refreshing: false });

  }

  callingFun = () => {
    this.CustomerSheet.open()
}

   static navigationOptions = ({ navigation }) => ({
    title: 'Müşteri Siparişleri',
    headerRight: () => {
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => navigation.getParam('callingFun')() } style={{ marginRight: 20 }}>
          <Icon style={{ color: 'white' }} type="AntDesign" name="edit" />

        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("orderAdd", { customerId: navigation.getParam("customerId") })} style={{ marginRight: 20 }}>
          <Icon style={{ color: 'white' }} name="ios-add-circle" />

        </TouchableOpacity>
        
        </View>
      )
    }
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
      isPaid: false,
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

  openModal(orderId: number, unitPrice: number, count: number, productId: number, productName: string, isPaid: boolean) {
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
    this.props.navigation.navigate("CustomerDefinedPriceAdd", { customerId: this.props.navigation.getParam("customerId") });
  }

  goToDefinedPrice() {
    this.closePriceModal();
    this.props.navigation.navigate("CustomerDefinedPrices", { customerId: this.props.navigation.getParam("customerId") });
  }

  odemeAl(values: amountData) {

    this.props.AddCash(this.props.navigation.getParam("customerId"), this.state.orderId, values.amount.replace(",", '.'));
    this.AmountSheet.close();
    // this.onRefresh();

  }

  deleteSelectedOrder() {
    const { orderDelete } = this.props;
    this.closeModal();
    this.OrderSheet.close();
    orderDelete(this.props.navigation.getParam("customerId"), this.state.orderId);
    // this.props.GetOrders(this.props.navigation.getParam("customerId"), 1, 8);
    this.setState({ refreshing: false });
    // this.onRefresh();
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

  _renderCustomerSheetContent() {
    return (<View style={styles.SheetContainer}>
              <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.CustomerSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer} onPress={() => {
        this.CustomerSheet.close();
        this.goToNewPricePage();
      }}>
        <Icon name="ios-add"  style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}>
          Yeni Fiyat Ekle
            </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer} onPress={() => {
        this.CustomerSheet.close();
        this.goToDefinedPrice();
      }}>
        <Icon name="ios-list"  style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}>
          Tanımlı Fiyatlar
            </Text>
      </TouchableOpacity>

    </View>);
  }

  _renderAddAmountSheetContent() {
    return (<View style={styles.SheetAmountContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={girdiler}
        onSubmit={values => this.odemeAl(values)}
      >
        {props => {
          return (
            <View style={{  justifyContent: 'flex-start' }}>
                        <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.AmountSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>
            <View style={{flexDirection: "row",}}>
              <Input
                //containerStyle={{ width: '80%' }}
                style={styles.input}
                placeholder="Ödeme Miktarı"
                placeholderTextColor="#9A9A9A"
                value={props.values.amount + ""}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={props.handleChange("amount")}
                onBlur={props.handleBlur("amount")}
              />

              <Button onPress={() => props.handleSubmit()} style={styles.SheetButtonContainer}>
                <Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Ekle</Text>


              </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>);

  }

  _renderOrderSheetContent() {
    return (<View style={styles.SheetContainer}>
              <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.OrderSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.OrderSheet.close();
          this.addCash();
        }}>
        <Icon name="ios-add" style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Ödeme Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          // this.OrderSheet.close();
          // this.OrderSheet.close();
          this.deleteOrderAlert();
        }}>
        <Icon name="ios-trash" style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Sil</Text>
      </TouchableOpacity>
    </View>);
  }




  _renderView() {
    const { orders, isOrderLoading, navigation } = this.props;
    if (isOrderLoading) {
      var dataArray: any[] = [1, 2, 3];

      return (
        <FlatList renderItem={({ item }) =>
          <Placeholder

            style={{ borderBottomColor: '#e1e1e1', borderBottomWidth: 1, marginBottom: 20 }}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
        }
          data={dataArray}
          keyExtractor={(item, index) => String(index)}
        ></FlatList>);
    }
    else if(this.props.isOrderLoading !== true && this.props.orders.length < 1){
      return (<TouchableOpacity style={{marginTop:100}} onPress={() => navigation.navigate("orderAdd", { customerId: navigation.getParam("customerId") })}>

     
  
        <InfoItem text="Sisteme eklediğiniz müşteri siparişi bulunmakatadır. Müşterinize sipariş ekleyebilirsiniz!" />


      </TouchableOpacity>);
    }
    else {
      return (<FlatList
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
        data={this.props.orders}
        ItemSeparatorComponent={this.renderSeparator}


        renderItem={({ item }) =>


          <TouchableOpacity onPress={()=> this.props.navigation.navigate('OrderDetail', {orderId: item.orderId})}
           style={{ marginHorizontal: 0, flexDirection: 'column', backgroundColor: '#EFF3F9', paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'space-between', borderRadius: 15 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#2069F3', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' ,alignSelf:'center',flex:.8}}>

                  {item.productName}
                </Text>

              {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.openModal(item.orderId, item.unitPrice, item.count, item.productId, item.productName, item.isPaid)}>
                  <Icon style={{ color: "#2069F3" }} name="ios-more" />
                </TouchableOpacity>
                <Text style={{ color: '#AAAA', fontSize: 14, fontFamily: 'Avenir Next' }}>
                  {item.dateTime.slice(8, 10) + "/" + item.dateTime.slice(5, 7) + "/" + item.dateTime.slice(0, 4)
                  }
                </Text>
                <Text style={{ color: '#404243', fontSize: 14, fontFamily: 'Avenir Next' }}>
                  {item.dateTime.slice(11, 16)}
                </Text>
              </View>


            </View>


            <View style={{ width: "100%", height: 1, backgroundColor: '#CFD3D7', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
                    Adet:
                 </Text>
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir Next' }}>
                    {item.count}
                  </Text>

                </View>

                <View style={{ flexDirection: 'row' }}>
    
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
                    Toplam Fiyat:
                 </Text>
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir Next' }}>
                    {item.totalPrice} TL
                 </Text>

                </View>



              </View>
              {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
                    Alınan:
                 </Text>
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir Next' }}>
                    {item.tookTotalPrice} TL
                 </Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next', textAlign: "right" }}>
                    Kalan:
                 </Text>
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir Next' }}>
                    {item.restAmount} TL
                 </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={item => item.orderId.toString()}

        onEndReached={() => {
          var pagenew = this.state.page + 1;
          this.setState({ page: pagenew });
          if (pagenew == 1) {
            pagenew = pagenew + 1;
            this.setState({ page: pagenew });
          }
          this.props.GetOrdersMore(this.props.navigation.getParam("customerId"), pagenew, 10);

        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
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

  _renderTopCustomerDetail() {
   
    if(this.props.isCustomerDetailLoading){
    return ( <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#CFD3D7', paddingBottom: 5, borderBottomWidth: 1 }}>
        {this.props.isCustomerDetailLoading && <PlaceholderLine width={10} />}
        <View>

        </View>
        <View style={{ flexDirection: 'row' }}>
        {this.props.isCustomerDetailLoading && <PlaceholderLine width={20} />}

        </View>
      </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
  
          <View style={{ flexDirection: 'column', flex: 0.6 }}>
  
            {this.props.isCustomerDetailLoading && <PlaceholderLine width={20} />}
  
 
            <View style={{ flex: 1 }}>
              {this.props.isCustomerDetailLoading && <PlaceholderLine width={30} />}

            </View>
  
  
          </View>
          <View style={{ flexDirection: 'column', flex: .4 }}>
  
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

              {this.props.isCustomerDetailLoading && <PlaceholderLine width={30} />}

  
  
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

              {this.props.isCustomerDetailLoading && <PlaceholderLine width={30} />}
     
  
  
            </View>
            <View style={{ flexDirection: 'row', flex: .4, alignSelf: 'flex-end' }}>
 
              {this.props.isCustomerDetailLoading && <PlaceholderLine width={30} />}

            </View>
  
  
          </View>
  
        </View>
        </View>
        );
    }
   
    return (

    <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#CFD3D7', paddingBottom: 5, borderBottomWidth: 1 }}>

  
      <View style={{flex:.7}}>
        {this.props.customerDetailModel?.nameSurname && !this.props.isCustomerDetailLoading &&
          <Text style={{ textAlign:'left', color: '#2069F3', fontWeight: '600', fontSize: 24, fontFamily: 'Avenir Next' }}>
            {this.props.customerDetailModel.nameSurname}
          </Text>

        }
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
          Toplam Sipariş:
                           </Text>
        {!this.props.isCustomerDetailLoading && this.props.customerDetailModel && this.props.customerDetailModel.totalOrderCount &&
          <Text style={{ color: '#404243', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next', textAlign: 'right' }}>
            {this.props.customerDetailModel.totalOrderCount}

          </Text>

        }
      </View>
    </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
        <View style={{ flexDirection: 'column', flex: 0.6 }}>
          {this.props.customerDetailModel && this.props.customerDetailModel.phoneNumber!=null && this.props.customerDetailModel.phoneNumber!=="" &&
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Icon name="ios-call" style={{ fontSize: 20 }} />
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.props.customerDetailModel?.phoneNumber}`)}>
                <Text style={{ color: '#404243', textDecorationLine: 'underline', fontSize: 16, marginLeft: 5, fontFamily: 'Avenir Next' }}>
                  {this.props.customerDetailModel.phoneNumber}
                </Text>
              </TouchableOpacity>
            </View>
          }
          
          <View style={{ flex: 1 }}>

            {!this.props.isCustomerDetailLoading && this.props.customerDetailModel && this.props.customerDetailModel.adress != null && this.props.customerDetailModel.adress!=="" &&
              <View style={{ flexDirection: 'row',marginTop:5 }}>
                <Icon name="ios-pin" style={{ fontSize: 20 }} />
                <TouchableOpacity onPress={() => {
                  Platform.OS === "ios" ? Linking.openURL('http://maps.apple.com/maps?daddr=' + this.props.customerDetailModel?.adress) : Linking.openURL('http://maps.google.com/maps?daddr=' + this.props.customerDetailModel?.adress)


                }}>
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline', marginLeft: 5, fontFamily: 'Avenir Next' }}>
                    {this.props.customerDetailModel.adress}
                  </Text>
                </TouchableOpacity>
              </View>


            }
            {!this.props.isCustomerDetailLoading && this.props.customerDetailModel && this.props.customerDetailModel.fountainCount != null && this.props.customerDetailModel.fountainCount!==0 &&
              <View style={{ flexDirection: 'row', marginTop:5,marginLeft:-5}}>
                <Icon name="cup-water" type="MaterialCommunityIcons" style={{ fontSize: 20 }} />
              
                  <Text style={{ color: '#404243', fontSize: 16, fontWeight: '600', marginLeft: 5, fontFamily: 'Avenir Next' }}>
                    {this.props.customerDetailModel.fountainCount}
                  </Text>

              </View>


            }
          </View>


        </View>
        <View style={{ flexDirection: 'column', flex: .4 }}>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
              Alınan:
      </Text>

            {this.props.customerDetailModel && this.props.customerDetailModel.displayTookTotalAmount &&
              <Text style={{ color: '#404243', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' }}>{this.props.customerDetailModel.displayTookTotalAmount} </Text>
            }


          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
              Kalan:
      </Text>

            {this.props.customerDetailModel && this.props.customerDetailModel.displayRestTotalAmount &&
              <Text style={{ color: '#404243', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' }}>{this.props.customerDetailModel.displayRestTotalAmount} </Text>
            }


          </View>
          <View style={{ flexDirection: 'row', flex: .4, alignSelf: 'flex-end' }}>
            <Text style={{ color: '#404243', fontSize: 16, fontFamily: 'Avenir Next' }}>
              Toplam:
      </Text>
 
            {this.props.customerDetailModel && this.props.customerDetailModel.displayTotalAmount &&
              <Text style={{ color: '#404243', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' }}>{this.props.customerDetailModel.displayTotalAmount} </Text>
            }

          </View>


        </View>

      </View>
      </View>

    );
  }
  render() {
    return (
      <View style={{}}>
        <ScrollView style={{ paddingHorizontal: 10 }}>


          <View style={{ marginHorizontal: 5, paddingTop: 20, paddingHorizontal: 5, borderRadius: 15 }}>
            {this._renderTopCustomerDetail()}

            <View>

              <View style={{ height: 30 }} />

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
                    paddingLeft: 20,
                    backgroundColor: '#EFF3F9',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
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
                    paddingLeft: 20,
                    backgroundColor: '#EFF3F9',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                  }
                }}
              >
                {this._renderOrderSheetContent()}
              </RBSheet>


              <RBSheet
                ref={ref => {
                  this.AmountSheet = ref;
                }}
                height={250}
                duration={200}
                customStyles={{
                  container: {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingLeft: 20,
                    backgroundColor: '#EFF3F9',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                  }
                }}
              >
                {this._renderAddAmountSheetContent()}
              </RBSheet>

              {this._renderView()}

            </View>
          </View>
        </ScrollView>
        {this.showSimpleMessage()}
      </View>

    )
  }
}

const mapStateToProps = (state: AppState) => ({

  isOrderLoading: state.orders.isOrderLoading,
  orders: state.orders.orders,
  customerDetailModel: state.orders.customerDetail,
  isCustomerDetailLoading: state.orders.isCustomerDetailLoading,
  Message: state.deleteOrder.Message,
  isSuccess: state.deleteOrder.isSuccess,
  isSuccessAddCash: state.addCash.isSuccess,
  MessageAddCash: state.addCash.AddCashMessage,

}
);

function bindToAction(dispatch: any) {
  return {
    GetOrders: (customerId: number, pageIndex: number, pageSize: number) =>
      dispatch(GetOrders(customerId, pageIndex, pageSize)),
    GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) =>
      dispatch(GetOrdersMore(customerId, pageIndex, pageSize)),
    AddCash: (customerId: number, orderId: number, amount: string) =>
      dispatch(AddCash(customerId, orderId, Number(amount))),
    orderDelete: (customerId: number, orderId: number) =>
      dispatch(orderDelete(customerId, orderId)),
    GetCustomerDetail: (customerId: number) =>
      dispatch(GetCustomerDetail(customerId)),
  };
}



export default connect(
  mapStateToProps,
  bindToAction
)(CustomerOrdersScreen);




