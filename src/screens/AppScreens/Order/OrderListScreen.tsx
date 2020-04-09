import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import {Icon} from 'native-base';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {AppState} from '../../../redux/store';
import {
  OrderStatus,
  orderListItem,
  getCustomerOrders,
  updateCustomerOrderStatus,
} from '../../../redux/actions/orderDetailActions';
import {InfoItem} from '../../../components/InfoItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import {showMessage} from 'react-native-flash-message';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  message: string;
  orderList: orderListItem[];
  loading: boolean | null;
  getCustomerOrders: (
    hasToTake: boolean,
    status: number | null,
    page?: number,
  ) => void;
  page: number;
  updateCustomerOrderStatus: (
    orderStatus: OrderStatus,
    orderId: number,
  ) => void;
  orderStatusMessage: string;

  // isTriedOrderStatus:boolean;
}
interface State {
  refreshing: boolean;
  userId: string | null;
  page: number;
  all: boolean;
  takebyUser: boolean;
  isWaiting: boolean;
  success: boolean;
  status: number | null;
  orderStatusString: String[];
  selectedOrderId: number;
  item: orderListItem;
}

class OrderListScreen extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: '',
      page: 0,
      refreshing: false,
      orderStatus: OrderStatus.null,
      orderStatusString: [
        'Sipariş Durumu Yok',
        'Sipariş Beklemede',
        'Sipariş Tamamlandı',
        'Sipariş İptal Edildi',
      ],
      selectedOrderId: 0,
      item: {} as orderListItem,
      all: true,
      takebyUser: false,
      isWaiting: false,
      success: false,
    };
  }

  static navigationOptions = {
    title: 'Siparişlerim',
  };
  showSimpleMessage() {
    if (this.props.orderStatusMessage) {
      showMessage({
        message: this.props.orderStatusMessage,
        type: 'info',
        icon: 'auto',
      });
    }
  }
  changeOrderStatusContent() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.changeOrderStatus.close()}
          style={{position: 'absolute', right: 0, zIndex: 20}}>
          <Icon name="ios-close" style={{fontSize: 35}} />
        </TouchableOpacity>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'Avenir Next',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
            }}>
            Sipariş Durumunu Güncelle
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({orderStatus: OrderStatus.Waiting})}
            style={{
              borderWidth: 3,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal: 10,
              paddingVertical: 5,
              borderColor: '#cbd25f',
              backgroundColor:
                this.state.orderStatus === OrderStatus.Waiting
                  ? '#cbd25f'
                  : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Avenir Next',
                fontSize: 16,
                paddingVertical: 5,
                textAlign: 'center',
                color:
                  this.state.orderStatus === OrderStatus.Waiting
                    ? 'white'
                    : 'black',
              }}>
              Sipariş Beklemede
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({orderStatus: OrderStatus.Exported})}
            style={{
              borderWidth: 3,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal: 10,
              paddingVertical: 5,
              borderColor: '#0f5f00',
              backgroundColor:
                this.state.orderStatus === OrderStatus.Exported
                  ? '#0f5f00'
                  : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Avenir Next',
                fontSize: 16,
                paddingVertical: 5,
                textAlign: 'center',
                color:
                  this.state.orderStatus === OrderStatus.Exported
                    ? 'white'
                    : 'black',
              }}>
              Siparişi Tamamla
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => {
              this.changeOrderStatus.close();
              this.props.updateCustomerOrderStatus(
                this.state.orderStatus,
                this.state.selectedOrderId,
              );
            }}
            disabled={
              this.state.orderStatus === OrderStatus.null ||
              this.state.item.orderStatus === this.state.orderStatus
            }
            style={{
              borderWidth: 3,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal: 10,
              paddingVertical: 5,
              borderColor: '#216AF4',
              backgroundColor: '#216AF4',
              opacity:
                this.state.orderStatus === OrderStatus.null ||
                this.state.item.orderStatus === this.state.orderStatus
                  ? 0.3
                  : 1,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir Next',
                fontSize: 16,
                paddingVertical: 5,
                textAlign: 'center',
                color: 'white',
              }}>
              Onayla
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderStatusbarOnlyIOS() {}
  renderItem(item: orderListItem) {
    var color = 'red';
    var colorInBasket = '#f25f5f';
    var colorMoneyApproved = '#E0B53E';
    var colorCompleted = '#72AA00';
    var colorWaitingForMoney = '#b38100';
    var textFirst = '';
    var textSecond = '';
    var moneyIsTaken = false;
    var basketId = item.orderId;
    var userId = this.state.userId;
    if (item.orderStatus === OrderStatus.Exported) {
      color = colorCompleted;
      textSecond = 'Başarılı';
      moneyIsTaken = true;
    } else if (item.orderStatus === OrderStatus.Waiting) {
      color = colorMoneyApproved;
      textSecond = 'Beklemede';
      moneyIsTaken = true;
    } else if (item.orderStatus === OrderStatus.Cannceled) {
      color = colorWaitingForMoney;
      textSecond = 'İptal Edildi';
      moneyIsTaken = true;
    } else {
      color = colorInBasket;
      textSecond = 'Atama Yapilmadi';
    }

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('OrderDetail', {orderId: item.orderId})
        }
        style={[
          styles.inputContainer,
          {
            paddingVertical: '5%',
            paddingHorizontal: '3%',
            justifyContent: 'flex-start',
          },
        ]}>
        <View style={{flex: 1}}>
 
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                fontFamily: 'Avenir Next',
                color: '#2069F3',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {item.companyName ? item.companyName : item.customerName}
            </Text>


            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    orderStatus: item.orderStatus,
                    selectedOrderId: item.orderId,
                    item: item,
                  },
                  () => this.changeOrderStatus.open(),
                );
              }}>
              <Icon name="ios-more" />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text
              style={{color: '#727272', flex: 0.6, fontFamily: 'Avenir Next'}}>
              {item.createdDate}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flex: 0.4,
                justifyContent: 'flex-end',
              }}>
              <Text style={{color: '#767676', fontFamily: 'Avenir Next'}}>
                Adet:
              </Text>
              <Text style={{marginLeft: 5, fontFamily: 'Avenir Next'}}>
                {item.count}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text
              style={{
                color: color,
                textAlign: 'left',
                fontFamily: 'Avenir Next',
                flex: 0.6,
              }}>
              {textSecond}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 0.4,
              }}>
              <Text style={{marginLeft: 5, fontFamily: 'Avenir Next'}}>
                {item.productName}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'flex-end',
            }}>
            <Text style={{color: '#767676', fontFamily: 'Avenir Next'}}>
              Toplam:
            </Text>
            <Text style={{marginLeft: 5, fontFamily: 'Avenir Next'}}>
              {item.displayTotalPrice}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
  refreshController() {
    this.setState({refreshing: true, page: 1});
    const hastotake: boolean = this.state.takebyUser ? true : false;
    this.props.getCustomerOrders(hastotake, this.state.status);
  }
  renderList() {
    if (this.props.loading === false && this.state.refreshing) {
      this.setState({refreshing: false});
    }
    if (this.props.loading && this.props.orderList.length < 1) {
      return <ActivityIndicator style={{flex: 1}} />;
    } else if (
      this.props.loading === false &&
      this.props.orderList.length < 1
    ) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <InfoItem text="Siparişiniz Bulunmamaktadır." />
        </View>
      );
    } else {
      return (
        <FlatList
          // contentContainerStyle={{margin:10}}
          //  style={{flex:1}}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={this.props.loading && this.state.refreshing}
              onRefresh={() => this.refreshController()}
            />
          }
          style={{paddingTop: 20}}
          data={this.props.orderList}
          extraData={this.props.orderList}
          // style={{flexGrow:0}}
          // keyExtractor={item => item.basketId.toString()}
          renderItem={({item}) => {
            return this.renderItem(item);
          }}
          onEndReached={() => {
            if (this.props.orderList && this.props.orderList.length > 14) {
              var pagenew = this.state.page + 1;
              this.setState({page: pagenew});
              if (pagenew == 1) {
                pagenew = pagenew + 1;
                this.setState({page: pagenew});
              }
              this.props.getCustomerOrders(
                this.state.takebyUser,
                this.state.status,
                pagenew,
              );
            }
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={5}
          ListFooterComponent={
            this.props.loading ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      );
    }
  }

  componentWillMount() {
    this.props.getCustomerOrders(false, this.state.status);
    AsyncStorage.getItem('userId').then(item => {
      this.setState({userId: item});
    });
  }
  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {justifyContent: 'flex-start', paddingTop: 0},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 10,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({takebyUser: false, all: true});
              this.props.getCustomerOrders(false, this.state.status);
            }}
            style={[
              styles.filterContainer,
              this.state.all == true ? styles.filterContainerActive : null,
            ]}>
            <Text
              style={
                this.state.takebyUser == false
                  ? styles.filterTextActive
                  : styles.filterText
              }>
              Tümü
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({takebyUser: true, all: false});
              this.props.getCustomerOrders(true, this.state.status);
            }}
            style={[
              styles.filterContainer,
              this.state.takebyUser == true
                ? styles.filterContainerActive
                : null,
            ]}>
            <Text
              style={
                this.state.takebyUser == true
                  ? styles.filterTextActive
                  : styles.filterText
              }>
              Bana Atananlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let statu: number | null = 1;
              if (this.state.isWaiting) {
                statu = null;
              }
              this.setState({
                isWaiting: !this.state.isWaiting,
                success: false,
                status: statu,
              });

              this.props.getCustomerOrders(this.state.takebyUser, statu);
            }}
            style={[
              styles.filterContainer,
              this.state.isWaiting == true ? styles.filterWaiting : null,
            ]}>
            <Text
              style={
                this.state.isWaiting == true
                  ? styles.filterTextActive
                  : styles.filterText
              }>
              Beklemede
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let statu: number | null = 2;
              if (this.state.success) {
                statu = null;
              }
              this.setState({
                isWaiting: false,
                success: !this.state.success,
                status: statu,
              });
              this.props.getCustomerOrders(this.state.takebyUser, statu);
            }}
            style={[
              styles.filterContainer,
              this.state.success == true ? styles.filterSucces : null,
            ]}>
            <Text
              style={
                this.state.success == true
                  ? styles.filterTextActive
                  : styles.filterText
              }>
              Teslim Edildi
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderList()}

        <RBSheet
          ref={ref => {
            this.changeOrderStatus = ref;
          }}
          height={400}
          duration={200}
          customStyles={{
            container: {
              borderRadius: 5,

              padding: 20,
            },
          }}>
          {this.changeOrderStatusContent()}
        </RBSheet>
        {this.showSimpleMessage()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 15,
  },
  profileTextStyle: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '300',
    fontFamily: 'Roboto-Regular',
    color: '#5e5e5e',
  },
  propsSeperator: {
    width: '90%',
    backgroundColor: '#b57b7b',
    height: 0.5,
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  headStyle: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputContainer: {
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#EFF3F9',
    shadowColor: '#EFF3F9',
    marginLeft: 10,
    marginRight: 10,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    borderRadius: 5,
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#3F51B5',
    fontWeight: '700',
  },
  forgotPassword: {
    color: '#c0c0c0',

    marginRight: 15,
    fontFamily: 'OpenSans-Regular',
  },
  filterContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  filterContainerActive: {
    backgroundColor: '#2069F3',
    borderBottomColor: '#2069F3',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterText: {
    color: '#2069F3',
  },
  filterSucces: {
    backgroundColor: '#72AA00',
  },
  filterWaiting: {
    backgroundColor: '#E0B53E',
  },
});

const mapStateToProps = (state: AppState) => ({
  orderList: state.orderDetail.orderList,
  loading: state.orderDetail.isLodingOrderList,
  message: state.orderDetail.messageOrderList,
});

function bindToAction(dispatch: any) {
  return {
    getCustomerOrders: (
      hasToTake: boolean,
      status: number | null,
      page?: number,
    ) => dispatch(getCustomerOrders(hasToTake, status, page)),
    updateCustomerOrderStatus: (orderStatus: OrderStatus, orderId: number) =>
      dispatch(updateCustomerOrderStatus(orderStatus, orderId)),
  };
}

export default connect(mapStateToProps, bindToAction)(OrderListScreen);
