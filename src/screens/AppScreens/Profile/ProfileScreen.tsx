'use strict';
import React, { Component } from 'react';
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
import { AsyncStorage } from 'react-native'



import { Icon, Text, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, ListItem, Left, Body, Right, Switch, Spinner } from 'native-base';
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
import { AppState } from '../../../redux/store'
import { Formik } from 'formik';
import { getUserInfo, UserInfo, userType } from '../../../redux/actions/profileActions';
import { logoutUserService, logOut } from '../../../redux/actions/loginAction';

import Rate, { AndroidMarket } from 'react-native-rate'
import { Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'

import {deleteNotificaitonToken} from '../../../services/RequestService'



interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getUserInfo: () => void;
  loading: boolean;
  userInfo: UserInfo
  message: string;

}


interface State {
  refreshing: boolean;
  selectedPremium: number;
  premiumScreenIsFirst: boolean;

}




class ProfileScreen extends Component<Props, State>{



  static navigationOptions = ({ navigation }) => ({
    title: 'Profilim',

  })



  constructor(props: Props) {
    super(props);
    this.state = {
      selectedPremium: 0,
      premiumScreenIsFirst: true,
    };
  }


  logOut() {

    AsyncStorage.multiGet(['userToken', 'userId',"notificationToken"]).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      let notificationToken = res[2][1]


      AsyncStorage.removeItem("userToken").then(() => {

          AsyncStorage.removeItem("userId").then(() => {
         
            AsyncStorage.removeItem("notificationToken").then(() => {
                     AsyncStorage.removeItem("UserType").then(()=>{
                            deleteNotificaitonToken(userId,token,notificationToken);

                             this.props.navigation.navigate('AuthLoading');
                     })
                   })
                 })

        
      })

    })

  

  }
  componentWillMount() {
    this.props.getUserInfo()
  }


  renderPremiumChooseContent() {
    return (
      <View style={{ flex: 1, margin: 10, paddingVertical: 100}}>
        <TouchableOpacity style={{ position: 'absolute', left: 5, top: 10 }} onPress={() => this.setState({ premiumScreenIsFirst: true })}>
          <Icon name="arrowleft" type="AntDesign" style={{ fontSize: 30 }} />
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            justifyContent: 'center', marginHorizontal: 40, paddingVertical: 30, borderRadius: 5, backgroundColor: '#01C3E3',
            shadowRadius: 5.00,

            elevation: 12,

            shadowColor: "#006c7e",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: .5,


          }}>
          <Text style={{ color: 'white', textAlign: 'center', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >HAVALE İLE ÖDEME YAP</Text>
        </TouchableOpacity>
        <View style={{justifyContent:'center'}}>
            <View style={[styles.inputContainer,{marginTop:20,padding:20}]}>
                <Text  style={{fontFamily:'Avenir Next',fontSize:20,textAlign:'center'}}>Havale veya Eft yapilacak Banka</Text>
            <Text style={{textAlign:'center',marginTop:10,fontFamily:'Avenir Next'}}>{"Akbank"}</Text>
            </View>

            <View style={[styles.inputContainer,{marginTop:20,flexDirection:'row',padding:20}]}>
                <Text  style={{fontFamily:'Avenir Next',fontSize:20,textAlign:'center'}}>Siparis No: </Text>
            <Text style={{textAlign:'center',fontFamily:'Avenir Next',fontSize:20,color:'#800404'}}>{"Siparis Numarasi"}</Text>
            </View>
            <View style={[styles.inputContainer,{marginTop:20,flexDirection:'row',padding:20}]}>
                <Text  style={{fontFamily:'Avenir Next',fontSize:20,textAlign:'center'}}>Siparis Tutari: </Text>
            <Text style={{textAlign:'center',fontFamily:'Avenir Next',fontSize:20,color:'#800404'}}>{"300 TL"}</Text>
            </View>

            <View style={[styles.inputContainer,{marginTop:20,padding:20}]}>
                <Text  style={{fontFamily:'Avenir Next',fontSize:20,textAlign:'center'}}>Havale veya Eft yaparken sipariş numarasını açıklamaya ekleyiniz.</Text>

            </View>
            {/* <Button text="Tamamla" style={{marginHorizontal:10}} /> */}
        </View>


        {/* <TouchableOpacity
          style={{
            justifyContent: 'center', marginHorizontal: 40, paddingVertical: 30, borderRadius: 5, backgroundColor: '#01C3E3',
            shadowRadius: 5.00,

            elevation: 12,

            shadowColor: "#006c7e",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: .5,


          }}>
          <Text style={{ color: 'white', textAlign: 'center', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >KREDİ KARTI İLE ÖDEME YAP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {

        }}
          style={{
            justifyContent: 'center', marginHorizontal: 40, paddingVertical: 30, borderRadius: 5, backgroundColor: '#01C3E3',
            shadowRadius: 5.00,

            elevation: 12,

            shadowColor: "#006c7e",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: .5,


          }}>
          <Text style={{ color: 'white', textAlign: 'center', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >MARKET ÜZERİNDEN ÖDEME YAP</Text>
        </TouchableOpacity>
 */}



      </View>
    )
  }



  _renderCustomerSheetContent() {
    return (
      <View style={{ flex: 1, margin: 10 }}>

        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', flex: 1, marginLeft: 5 }}>
            <Text style={{ fontSize: 20, color: '#216AF4', fontFamily: 'Cabin-Bold', textAlign: 'center', marginTop: 10 }}>BayimSu Premium Al</Text>
          </View>
          <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => this.CustomerListSheet.close()}>
            <Icon name="ios-close" style={{ fontSize: 40 }} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 200 }}>
          <Swiper autoplay  >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image source={require('../../../images/premium/support.png')} />
              <Text style={{ marginTop: 20 }}>Sınırsız Müşteri Ekleme</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image source={require('../../../images/premium/report.png')} />
              <Text style={{ marginTop: 20 }}>Tüm Raporlamalara Erişim</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image source={require('../../../images/premium/worker.png')} />
              <Text style={{ marginTop: 20 }}>Çalışanlarını Yönetme</Text>
            </View>
          </Swiper>
        </View>
        <ScrollView >

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.setState({ selectedPremium: 1 })} style={{ width: '30%' }}>
              <View style={[styles.premiumContentView, { borderWidth: this.state.selectedPremium === 1 ? 4 : 2 }]}>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 20 }}>
                  12
        </Text>
                <Text style={{ fontFamily: 'Cabin-Regular' }}>ay</Text>
                <Text style={{ fontFamily: 'Cabin-Regular', color: '#b3b3b3' }}>49,99/ay</Text>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18, color: '#216AF4' }}>
                  52% indirim
        </Text>
                <View style={{ width: '80%', height: 1, backgroundColor: '#b3b3b3', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}></View>
                <Text>
                  599,99 TL
        </Text>

              </View>
              {this.state.selectedPremium === 1 && <View style={{ backgroundColor: '#216AF4', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 5 }} >
                <Text style={{ color: 'white', fontFamily: 'Roboto-Regular' }}>En Uygunu</Text>
              </View>}
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.setState({ selectedPremium: 2 })} style={{ width: '30%' }}>
              <View style={[styles.premiumContentView, { borderWidth: this.state.selectedPremium === 2 ? 4 : 2 }]}>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 20 }}>
                  6
        </Text>
                <Text style={{ fontFamily: 'Cabin-Regular' }}>ay</Text>
                <Text style={{ fontFamily: 'Cabin-Regular', color: '#b3b3b3' }}>53,33/ay</Text>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18, color: '#216AF4' }}>
                  32% indirim
        </Text>
                <View style={{ width: '80%', height: 1, backgroundColor: '#b3b3b3', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}></View>
                <Text>
                  319,99 TL
        </Text>

              </View>
              {this.state.selectedPremium === 2 && <View style={{ backgroundColor: '#216AF4', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 5 }} >
                <Text style={{ color: 'white' }}>En Popüler</Text>
              </View>}
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.setState({ selectedPremium: 3 })} style={{ width: '30%' }}>
              <View style={[styles.premiumContentView, { borderWidth: this.state.selectedPremium === 3 ? 4 : 2 }]}>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 20 }}>
                  1
        </Text>
                <Text style={{ fontFamily: 'Cabin-Regular' }}>ay</Text>
                <Text style={{ fontFamily: 'Cabin-Regular', color: '#b3b3b3' }}>59,99/ay</Text>

                <View style={{ width: '80%', height: 1, backgroundColor: '#b3b3b3', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}></View>
                <Text>
                  54,99 TL
        </Text>

              </View>
              {this.state.selectedPremium === 3 && <View style={{ backgroundColor: '#216AF4', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 5 }} >
                <Text style={{ color: 'white' }}>Denemelik</Text>
              </View>}
            </TouchableOpacity>



          </View>

          <Button disabled={this.state.selectedPremium === 0}
          onPress={() => this.setState({ premiumScreenIsFirst: false })}
            style={{
              opacity:this.state.selectedPremium === 0 ? .5 : 1,
              justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
              shadowRadius: 5.00,

              elevation: 12,

              shadowColor: "#006c7e",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: .5,


            }}>
            <Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >DEVAM ET</Text>


          </Button>


          <Button onPress={() => this.CustomerListSheet.close()}
            style={{
              justifyContent: 'center', marginHorizontal: 40, borderRadius: 20, backgroundColor: 'white',
              shadowRadius: 5.00,

              elevation: 12,

              shadowColor: "#969696",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: .5,


            }}>
            <Text style={{ color: '#49B1FD', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >HAYIR TEŞEKKÜRLER</Text>
          </Button>


        </ScrollView>

      </View>
    )
  }


  renderContent() {

    if (this.props.loading && !(this.props.userInfo)) {
      return (
        <Spinner />
      )

    } else if (this.props.userInfo) {
      var userInfo = this.props.userInfo;
      console.log(userInfo,"screen");
      return (

        <View style={[newStyles.inputContainer, { paddingTop: 10, marginTop: 10, paddingBottom: 10, justifyContent: 'flex-start', paddingRight: 0, paddingLeft: 10 }]}>
          {/* 
        <View style={{width:63,height:63,backgroundColor:'#2069F3',alignSelf:'center',borderRadius:31.5,justifyContent:'center'}}>
        <Text style={{alignSelf:'center',fontFamily:'Avenir Next',fontWeight:'600',fontSize:24,color:'white'}}>
          {this.props.userInfo.nameSurname ? this.props.userInfo.nameSurname.substr(0,1) : ""}
          </Text>
            </View> */}
          <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Avenir Next', marginTop: 10 }}>{userInfo ? userInfo.nameSurname : ""}</Text>

          {/* <Text style={[styles.profileTextStyle,{fontSize:16,marginTop:20,textAlign:'center',marginRight:20,flex:0}]}>Hakkinda</Text> */}

          <ScrollView>

            <View style={{ marginTop: 20 }}>

              <TouchableOpacity onPress={
                () => this.props.navigation.navigate('profileEditGeneral')

              } style={styles.profileContainer}>
                <Icon name="ios-person" type="Ionicons" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Profili Düzenle</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>



              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Securtiy')} style={styles.profileContainer}>
                <Icon name="ios-lock" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Güvenlik</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>

              {userInfo.userType === userType.companyUser && <View>
                <View style={styles.propsSeperator}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('companyInfo')} style={styles.profileContainer}>
                  <Icon name="ios-business" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                  <Text style={styles.profileTextStyle}>Şirket Bilgileri</Text>
                  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

                </TouchableOpacity></View>

              
              }


            {userInfo.userType === userType.companyUser && 
            <View>
                <View style={styles.propsSeperator}></View> 
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Employee')} style={styles.profileContainer}>
                <Icon name="ios-person" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Çalışanlar</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity></View>


              
              }


              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.profileContainer}>
                <Icon name="ios-basket" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Ürünlerim</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity style={styles.profileContainer}>
                <Icon name="ios-notifications" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Bildirim Ayarları</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Support')} style={styles.profileContainer}>
                <Icon name="ios-help-circle-outline" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Yardım ve Destek</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>

              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs')} style={styles.profileContainer}>
                <Icon name="ios-at" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Hakkımızda</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>

              <View style={styles.propsSeperator}></View>

              <RBSheet
                ref={ref => {
                  this.CustomerListSheet = ref;
                }}
                height={Dimensions.get('screen').height - 50}
                duration={200}
                customStyles={{
                  container: {


                    borderRadius: 20

                  }
                }}
              >
                {this.state.premiumScreenIsFirst ? this._renderCustomerSheetContent() : this.renderPremiumChooseContent()}
              </RBSheet>



              {/* <TouchableOpacity onPress={() => this.CustomerListSheet.open()} style={styles.profileContainer}>
                <Icon name="rss" type="Entypo" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Ek Özelliklere Sahip Ol</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>


              <View style={styles.propsSeperator}></View> */}

              <TouchableOpacity onPress={() => {

                const options = {
                  AppleAppID: "1495596894",
                      GooglePackageName:"com.bayimsu"
                  //     AmazonPackageName:"com.mywebsite.myapp",
                  //     OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                  //     preferredAndroidMarket: AndroidMarket.Google,
                  //     preferInApp:false,
                  //     openAppStoreIfInAppFails:true,
                  //     fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
                }

                AsyncStorage.getItem("IsRateCompleted", (err, value) => {
                  if (err) {

                    Rate.rate(options, success => {
                      if (success) {
                        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                        // this.setState({rated:true})
                        AsyncStorage.setItem("IsRateCompleted", JSON.stringify(true));

                      }
                    })

                  } else {
                    let val = JSON.parse(value) // boolean false
                    if (val) {


                    }
                    else {
                      Rate.rate(options, success => {
                        if (success) {
                          // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                          // this.setState({rated:true})
                          AsyncStorage.setItem("IsRateCompleted", JSON.stringify(true));

                        }
                      })
                    }
                  }
                })


              }

              }
                style={styles.profileContainer}>
                <Icon name="rate-review" type="MaterialIcons" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Bize Oy Verin</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>

              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={() => this.logOut()} style={styles.profileContainer}>
                <Icon name="ios-log-out" type="ionicon" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={styles.profileTextStyle}>Çıkış Yap</Text>
                <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{ fontSize: 20, marginTop: Platform.OS === 'ios' ? 5 : 0 }} />

              </TouchableOpacity>
              {/* <View style={styles.propsSeperator}></View> */}

            </View>


          </ScrollView>
        </View>


      )
    }
  }




  render() {

    // var nameSurname: string = this.props.navigation.getParam("nameSurname");
    // var companyName: string = this.props.navigation.getParam("companyName");

    // var restTotalAmount : string = this.props.navigation.getParam("restTotalAmount");
    // var displayTookTotalAmount : string = this.props.navigation.getParam("displayTookTotalAmount");
    // var totalAmount : string = this.props.navigation.getParam("totalAmount");
    return (
      <View style={{ flex: 1 }}>

        {this.renderContent()}
      </View>

    )
  }
}


const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,


  },
  profileTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "300",
    fontFamily: 'Avenir Next',
    color: '#5e5e5e',
    flex: .92, marginTop: Platform.OS === "ios" ? 5 : 0

  },
  propsSeperator: {
    width: '90%',
    backgroundColor: '#CFD3D7',
    height: .5,
    marginTop: 10,
    alignSelf: 'center'

  },
  premiumContentView: {
    width: '100%', height: 150, borderWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: '#216AF4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    justifyContent: "center",
    padding: 5,
    marginBottom:10,
    shadowColor: '#adadad',backgroundColor: 'white',
    marginLeft:10,marginRight:10,
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5
  },
  
})

const mapStateToProps = (state: AppState) => ({
  loading: state.profile.loading,
  userInfo: state.profile.userInfo,
  message: state.profile.message

});




function bindToAction(dispatch: any, ) {
  return {
    getUserInfo: () =>
      dispatch(getUserInfo())
  };
}


export default connect(
  mapStateToProps,
  bindToAction
)(ProfileScreen);




