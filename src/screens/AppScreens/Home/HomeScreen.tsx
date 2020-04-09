'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    ScrollView,
    Image,
    Animated
,TouchableOpacity,
ActivityIndicator,Picker, Linking
} from 'react-native';
import {
    statusBarHeight,
    headerHeight,
    SafeAreaWithHeader,
} from './DimensionsHelper';
import stylesNew from "../../styles";

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, Card, CardItem, Body } from 'native-base';
import { Alert } from 'react-native';
import { NavigationScreenProps, NavigationState, NavigationScreenProp } from 'react-navigation';
import { Dimensions } from 'react-native';
import { ICustomerItem } from '../../../redux/models/homeModel';
import { connect } from 'react-redux';
import { GetCustomers, GetCustomerMore } from '../../../redux/actions/homeAction';
import { customerDelete } from '../../../redux/actions/customerDeleteAction';
import { AppState } from '../../../redux/store';

import RBSheet from "react-native-raw-bottom-sheet";

// import {} from '@react-native-community/picker';
import { logoutUserService } from '../../../redux/actions/loginAction';
import { showMessage } from 'react-native-flash-message';
import { InfoItem } from '../../../components/InfoItem';
import firebase from 'react-native-firebase';
import { NotificationOpen } from 'react-native-firebase/notifications';
import { getNotificationCount } from '../../../redux/actions/notificationAction';



const vw: number = SafeAreaWithHeader.vw;
const vh: number = SafeAreaWithHeader.vh;

const title = "Home Screen"




interface Props {
    title: title;
    children: any;
    data: Array<Object>;
    renderItem: () => mixed;
    navigation: NavigationScreenProp<NavigationState>;
    isHomeLoading: boolean | null;
    customers: ICustomerItem[];
  
    GetCustomers: (orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) => void;
    GetCustomerMore: (orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) => void;
    getNotificationCount: () => void;

    customerDelete: (customerId: number) =>  void;
    CustomerDeleteIsSuccess: boolean;
    isLoadingCustomerDelete:boolean;
    message : string;
    totalRecords : number;
    customerMoreLoading : boolean;
  }


  interface State {
    modalVisible: boolean;
    refreshing: boolean;
    customerId: number;
    nameSurname: string;
    companyName: string;
    orderType: number;
    dayOfWeek: number;
    searchText: string;
    dayOfWeekCustomer?: number;
    page: number;
    loading: boolean;
    loadingMore: boolean;
    error: boolean;
    customersData: ICustomerItem[];
    fountainCount?: number;
    dayOfWeeks?: string;
    scrollY: Animated.Value;
    scrollYNew : Animated.Value;
    HeaderTitle : String;
    selectedState :number;
    dayOfWeekChoose: boolean;
    dayList : String[];
    today  : Date;
    isShowDeleteView : boolean;
    isAnyCustomerValid : boolean;
  }





class HomeScreen extends Component<Props,State>{

   customerRemove : any

    showSimpleMessage() {

        if (this.props.message) {
    
          showMessage({
            message: this.props.message,
            type: this.props.CustomerDeleteIsSuccess ? "success" : "danger",
            icon: 'auto'
          }
          );
        }
      
      }

      
    openModal(item  : ICustomerItem) {
        
        this.setState({
          customerId : item.customerId
        });
        this.customerEdit.open()
      }


    static navigationOptions = (
        screenProps: NavigationScreenProps
      ) => {
    
        return {
    
          headerStyle: {
            // height : screenProps.navigation.getParam('headerHeight'),
            // backgroundColor:'#d67676'
          },
          header: null
        }
      }

    


    constructor(props: Props) {
        super(props);
  
        this.state = {
            scrollY: new Animated.Value(0.001),
            scrollYNew : new Animated.Value(0.001),
            HeaderTitle : "Müşteriler",
            selectedState :1,
            modalVisible: false,
      refreshing: false,
      customerId: 0,
      nameSurname: "",
      companyName: "",
      orderType: 1,
      dayOfWeek: 0,
      searchText: '',
      dayOfWeekCustomer: 0,
      page: 1,
      loading: true,
      loadingMore: false,
      error: false,
      customersData: [],
      fountainCount: 0,
      dayOfWeeks:"",
      dayOfWeekChoose:false,
      dayList : ["Tüm Günler","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],
      today : new Date(),
      isShowDeleteView : false,
      isAnyCustomerValid : false
        };
      }



     headerHeight: number = statusBarHeight + headerHeight;


     _getCustomerList(orderType: number, searchText: string, dayOfWeek: number, page: number) {
        this.props.GetCustomers(orderType, searchText, dayOfWeek, page);
    
      }

     componentWillMount() {
        this.setState({ refreshing: false });
        this._getCustomerList(this.state.orderType, this.state.searchText, this.state.dayOfWeek, this.state.page);


        this.routeNotification()
      }

       routeNotification(){

        firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body,
            } = notificationOpen.notification;
          // console.log("NotificationOpened Function")
          // console.log(notificationOpen.notification.data)
          let orderId = notificationOpen.notification.data.orderId
            this.props.navigation.navigate('OrderDetail',{orderId : orderId})

        });
    


       firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
    
          let orderId = notificationOpen.notification.data.orderId
          this.props.navigation.navigate('OrderDetail',{orderId : orderId})
        }
        }
      );

        
      }
     
      
      componentDidMount(){

        // firebase.messaging().onMessage((message: RemoteMessage) => {
        //   // Process your message as required
        //   console.log(message, "not message");
        //   showMessage({
        //     message: message.title,
        //     description: message.body,
        //     type: "info",
        //     backgroundColor: "#06005B", // background color
        //     color: "#ffff", // text color,
        //     onPress: () => {
        //       /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
        //     }
    
        //   }
        //   );

        // });
    
        firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          // Process your notification as required
          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          console.log(notification, "test not data");
        });
        firebase.notifications().onNotification((notification: Notification) => {
          // Process your notification as required
          console.log("diger mesage")
          showMessage({
            message: notification.title,
            description: notification.body,
            type: "info",
            backgroundColor: "#06005B", // background color
            color: "#ffff", // text color,
            onPress: () => {
                let orderId = notification.data.orderId
                if(orderId) {
                  this.props.navigation.navigate('OrderDetail',{orderId : orderId})
                }
               
            }
    
          }
          );
    
    
          console.log(notification, "test not data required");
          this.props.getNotificationCount();
    
        });

      
      }

    renderTitle = () => {

        if (this.state.HeaderTitle) {
             
                let title = this.state.HeaderTitle;
                if (this.state.HeaderTitle.length > 34) {
                    title = title.substr(0, 32) + "...";
                }
                let titleOpacity = this.state.scrollY.interpolate({
                    inputRange: [0, 41,45, 48],
                    outputRange: [0, 0,0, 1],
                    extrapolate: 'clamp'
                });
                let borderBottomColor = this.state.scrollY.interpolate({
                    inputRange: [56, 57],
                    outputRange: ["#ffffff", '#f2f2f2'],
                    extrapolate: 'clamp'
                });



                return (
                    <Animated.View
                    useNativeDriver ={true}
                     style={[styles.iOSTitleContainer, {
                        height: Platform.OS === "ios" ? this.headerHeight : this.headerHeight -30,
                        opacity: titleOpacity,
                        borderBottomColor: borderBottomColor,
                        zIndex:1,
                        borderBottomWidth:2

                    }]}>
                        <View>

                        </View>
                        <TouchableOpacity>
                        <Text style={styles.iOSTitle}>
                            {this.state.HeaderTitle}
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('addCustomer')}  style={{zIndex:-1,marginLeft:-40,marginRight:20,marginBottom:8}}>
                            <Icon style={{color:'#216AF4'}}  name="ios-add-circle" />
                        </TouchableOpacity>
                    </Animated.View>
                )

        }
    };

    renderIOSBigTitle = () => {

        
        if (this.state.HeaderTitle) {
            let title = this.state.HeaderTitle;
            if (this.state.HeaderTitle.length > 19) {
                title = title.substr(0, 17) + "...";
            }
            const fontSize = this.state.scrollY.interpolate({
                inputRange: [-15, 0,30],
                outputRange: [40,34, 30],
                extrapolate: 'clamp'
            });
            const top = this.state.scrollY.interpolate({
                inputRange: [-15,0 ,15 , 35,45, 70, 90],
                outputRange: [0,0,-15,-35,-45, -45,-90]
            });
            return (
                <Animated.View
                useNativeDriver ={true}
                 style={ [styles.iOSBigTitleContainer, {backgroundColor:'clear',zIndex:1,transform: [{translateY: top}]}]}
                               key="iosBigTitle">
                    <Animated.Text
                    useNativeDriver ={true}
                        allowFontScaling={false}
                        style={[styles.iOSBigTitle, {fontSize: fontSize}]}>
                        {this.state.HeaderTitle}
                    </Animated.Text>
                    


  <TouchableOpacity style={{}} 
  onPress={()=>this.props.navigation.navigate('addCustomer')}
    // onPress={()=> Linking.openURL('whatsapp://send?text=' + this.state.fcmToken + '&phone=905333728696')}
  >
  <Icon style={[styles.iOSBigTitle,{marginRight:20,fontSize:40}]}  name="ios-add-circle"/>
  </TouchableOpacity>
  




                    
                </Animated.View>
            )
        }
    };

    
    changePage(page) {
        if(this.props.customers.length >0) {
            this.flatListRef.getNode().scrollToOffset({animated: true, offset: 0})
        }

        // this.flatListRef.scrollToOffset({ animated: true, offset: 0 })


        this.setState({
            orderType : page ,
            selectedState : page,
            page : 1,
            scrollY :  new Animated.Value(0.001)})

        // this.forceUpdate()
            
        this._getCustomerList(page, this.state.searchText, this.state.dayOfWeek, 1);

        
    }


    onRefresh() {
        // this.setState({ page: 1 });
        this.setState({ refreshing: true ,page : 1},()=>{
          this._getCustomerList(this.state.orderType, this.state.searchText, this.state.dayOfWeek, 1);
          this.setState({ refreshing: false });
        });
       
      }


    renderGetPay() {
        const top = this.state.scrollY.interpolate({
            inputRange: [0 ,20, 70,90],
            outputRange: [0,-20, -110,-110]
        });

        const topThird = this.state.scrollY.interpolate({
            inputRange: [0 ,35, 70,90],
            outputRange: [0,0, -40,-40]
        });
        if(this.props.customers.length > 0 && !this.state.isAnyCustomerValid) {
          this.setState({isAnyCustomerValid : true})
        }
        
        return(
//paddingBottom basta olmali sonra azaltilacak animasyonla
            <Animated.FlatList
            useNativeDriver ={true}
            style={{ marginBottom:Platform.OS === "ios" ? -60 : -220,paddingTop:10,transform: [{translateY: top}]}}
            
           //  onScroll={
           //     Animated.event(
           //         [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           //     )}


           refreshing={this.state.refreshing}
             onRefresh={() => this.onRefresh()}
             ref={(ref) => { this.flatListRef = ref; }}

           data={this.props.customers}
        ListHeaderComponent= {()=> <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:-5,marginBottom:5,marginHorizontal:20}}><Text style={{fontWeight:"600",fontSize:14,color:  '#8F9599'}}>{this.state.orderType === 3 ? this.state.dayList[this.state.today.getDay()]  : this.state.dayList[this.state.dayOfWeek]}</Text>
        <Text style={{fontWeight:"600",fontSize:14,color:  '#8F9599'}}>{this.props.totalRecords}</Text>
       </View>}
             ItemSeparatorComponent = {({}) => <View style={{height:10}}></View>}
           renderItem={({ item }) => <TouchableOpacity onPress={()=>this.props.navigation.navigate("Customer", { customerId: item.customerId, nameSurname: item.nameSurname, companyName: item.companyName, displayTookTotalAmount: item.displayTookTotalAmount, restTotalAmount: item.displayRestTotalAmount, totalAmount: item.displayTotalAmount })} style={{ marginHorizontal: 5, backgroundColor: '#EFF3F9', paddingVertical: 10,paddingBottom:20, paddingHorizontal: 5,paddingRight:10,flex:1, justifyContent: 'space-between', borderRadius: 15 }}>
               <TouchableOpacity onPress={()=>this.openModal(item)}
                //    ()=> this.props.navigation.navigate('CustomerEdit',{customerId: item.customerId})
                   
                
                    style={{alignSelf:'flex-end',marginRight:10,marginBottom:0}}>
                   <Icon name="ios-more" />
               </TouchableOpacity>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
               <View style={{ width: 33, height: 33, borderRadius: 16.5, backgroundColor: '#2069F3', justifyContent: 'center', alignItems: 'center' }}>
                   <Text style={{ color: 'white' }}>{item.nameSurname.substring(0, 1)}</Text>
               </View>
               <View style={{flex:.3,marginTop:item.nameSurname.length > 6 ? 5 : 0}}>
                   
                   <Text style={{ color: '#2069F3', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' }}>
                       {item.nameSurname}
                   </Text>
               </View>

               <View style={{ width: 1, height: '80%', backgroundColor: '#CFD3D7',marginRight:10 }} />
               <View style={{flex:.2}}>
                   <Text style={{ color: '#404243', fontSize: 12, fontFamily: 'Avenir Next' }}>
                       Alınan
                   </Text>
                   <Text style={{ color: '#404243', fontWeight: '600', fontSize: 14, fontFamily: 'Avenir Next' }}>
                       {item.displayTookTotalAmount}
                   </Text>
               </View>
               <View style={{ width: 1, height: '90%', backgroundColor: '#CFD3D7' ,marginRight:10 }} />
               <View style={{flex:.2}}>
                   <Text style={{ color: '#404243', fontSize: 12, fontFamily: 'Avenir Next' }}>
                       Kalan
                   </Text>
                   <Text style={{ color: '#404243', fontWeight: '600', fontSize: 14, fontFamily: 'Avenir Next' }}>
                       {item.displayRestTotalAmount}
                   </Text>
               </View>
               <View style={{ width: 1, height: '80%', backgroundColor: '#CFD3D7',marginRight:10  }} />

               <View style={{flex:.2}}>
                   <Text style={{ color: '#404243', fontSize: 12, fontFamily: 'Avenir Next' }}>
                       Toplam
                   </Text>
                   <Text style={{ color: '#404243', fontWeight: '600', fontSize: 14, fontFamily: 'Avenir Next' }}>
                       {item.displayTotalAmount}
                   </Text>
               </View>
           
               </View>
               
           
           </TouchableOpacity>}
           
           keyExtractor={(item, index) => String(index)}
           onEndReached={() => {


           if(this.props.customers.length > 14 && !this.props.customerMoreLoading) {
            var pagenew = this.state.page + 1;
            this.setState({ page: pagenew });
            if (pagenew == 1) {
              pagenew = pagenew + 1;
              this.setState({ page: pagenew });
            }
            this.props.GetCustomerMore(this.state.orderType, this.state.searchText, this.state.dayOfWeek, pagenew);
          }
         
           }
          }
           onEndReachedThreshold={0.5}
           initialNumToRender={5}
           ListFooterComponent={
             this.props.customerMoreLoading ? (
               <View>
                 <ActivityIndicator />
               </View>
             ) : null
           }
           
           onScroll={
               Animated.event(
                   [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
               )}

         />

            
            


            
                
                
                
            

        )

               
    }
    deleteSelectedCustomer() {
        this.customerEdit.close()
         this.props.customerDelete(this.state.customerId);
        // this.setState({ page: 1 });

        //   this.props.GetCustomers(this.state.orderType, this.state.searchText, this.state.dayOfWeek, 1);
          

    
      }
    deleteCustomerAlert() {


            Alert.alert(
              //title
              'Müşteri Silme İşlemi',
              //body
              'Müşteriyi silmek istiyor musunuz?',
              [
                { text: 'Vazgeç' , onPress: () => this.customerEdit.close() },
                { text: 'Evet', onPress: () => this.deleteSelectedCustomer() },
              ],
              { cancelable: false }
            );
        

    }
    _renderCustomerSheetDeleteContent() {
      return (
  
        <View style={stylesNew.SheetContainer}>
          <Text>
            Gerçekten Silmek İstiyor Musunuz?
          </Text>
          {/* <TouchableOpacity style={[stylesNew.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
            onPress={() => {
              this.customerEdit.close();
            }}>
            <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, stylesNew.SheetItemIcon]}></Icon>
            
          </TouchableOpacity> */}
      <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              this.customerEdit.close();

            }}>
              <Icon type="FontAwesome" name="pencil"  style={[stylesNew.SheetItemIcon,{ fontSize:22}]} ></Icon>
            <Text style={stylesNew.SheetItemText}
            >Evet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              this.customerEdit.close();
              this.props.navigation.navigate('CustomerEdit',{customerId: this.state.customerId})
            }}>
              <Icon type="FontAwesome" name="pencil"  style={[stylesNew.SheetItemIcon,{ fontSize:22}]} ></Icon>
            <Text style={stylesNew.SheetItemText}
            >Hayır</Text>
          </TouchableOpacity>


          
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
           
              this.deleteCustomerAlert()
              // this.customerEdit.close();
            }}>
              <Icon type="FontAwesome" name="trash-o" style={[stylesNew.SheetItemIcon,{ fontSize:25}]}></Icon>
          
            <Text style={stylesNew.SheetItemText}
            >Sil</Text>
          </TouchableOpacity>
        </View>
      );
    }


    _renderCustomerSheetContent() {
      return (
  
        <View style={stylesNew.SheetContainer}>
          <TouchableOpacity style={[stylesNew.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
            onPress={() => {
              this.customerEdit.close();
            }}>
            <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, stylesNew.SheetItemIcon]}></Icon>
  
          </TouchableOpacity>
      
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              this.customerEdit.close();
              this.props.navigation.navigate('CustomerEdit',{customerId: this.state.customerId})
            }}>
              <Icon type="FontAwesome" name="pencil"  style={[stylesNew.SheetItemIcon,{ fontSize:22}]} ></Icon>
            <Text style={stylesNew.SheetItemText}
            >Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              // this.customerEdit.close();
              // this.deleteRb.open()
              this.setState({isShowDeleteView : true})
              // this.customerEdit.close();
            }}>
              <Icon type="FontAwesome" name="trash-o" style={[stylesNew.SheetItemIcon,{ fontSize:25}]}></Icon>
          
            <Text style={stylesNew.SheetItemText}
            >Sil</Text>
          </TouchableOpacity>
        </View>
      );
    }
    _renderCustomerDeleteContent() {
      return (
  
        <View style={stylesNew.SheetContainer}>
          <TouchableOpacity style={[stylesNew.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
            onPress={() => {
              this.setState({isShowDeleteView : false})
              this.customerEdit.close();
            }}>
            <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, stylesNew.SheetItemIcon]}></Icon>
  
          </TouchableOpacity>
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              this.setState({isShowDeleteView : false})
              this.customerEdit.close();
              this.deleteSelectedCustomer() 
              // this.customerEdit.close();
            }}>
              <Icon type="FontAwesome" name="trash-o" style={[stylesNew.SheetItemIcon,{ fontSize:25}]}></Icon>
          
            <Text style={stylesNew.SheetItemText}
            >Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesNew.SheetItemContainer}
            onPress={() => {
              this.setState({isShowDeleteView : false})
     
            }}>
              <Icon type="FontAwesome" name="chevron-left"  style={[stylesNew.SheetItemIcon,{ fontSize:22}]} ></Icon>
            <Text style={stylesNew.SheetItemText}
            >İptal Et</Text>
          </TouchableOpacity>

        </View>
      );
    }


    search() {
        this._getCustomerList(this.state.orderType, this.state.searchText, this.state.dayOfWeek, 1);
      }

     renderContentArea = () => {
        const top = this.state.scrollY.interpolate({
            inputRange: [-15,0 ,35, 70,90],
            outputRange: [0,0,-35, -105,-105]
        });

        const topSecond = this.state.scrollY.interpolate({
            inputRange: [0 ,35, 70,90],
            outputRange: [1,1, 0,0]
        });
        const topThird = this.state.scrollY.interpolate({
            inputRange: [-15,0 ,35, 70,90,500],
            outputRange: [0,0,0, -10,-10,-10]
        });


            let padding =  66
            return (
                <Animated.View
                useNativeDriver ={true}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{paddingTop: padding, transform: [{translateY: top}]}}
                    // onScroll={
                    //     Animated.event(
                    //         [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    //     )}
                        
                >
                    <View style={[styles.contentContainer, {paddingBottom: 0,marginBottom:-20}]}>
                           <View >
                          <Animated.View 
useNativeDriver ={true}
            style={{ transform: [{scaleY: topSecond}]}}

            >
                          <Item style={{borderBottomWidth:0,backgroundColor:'#EFF3F9',paddingVertical:0,paddingLeft:10,marginLeft:20,marginRight:20,borderRadius:15,height:40,marginBottom:-10}}>
                            <Icon name="ios-search" />
                            <Input onChangeText={e => 
    this.setState({ searchText: e })
  }
  returnKeyLabel='Go' returnKeyType='go' onSubmitEditing={()=>this.search()} 

                            value={this.state.searchText}
                            placeholder="Ara"  style={{fontFamily:'Avenir Next',fontSize:20}}>
                            
                            </Input>
                            </Item>
                          </Animated.View>

                           <Animated.View 
                           useNativeDriver ={true}
                           style={{flexDirection:'row' , transform: [{translateY: topThird}]}}>
                           <ScrollView alwaysBounceVertical={false} horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={true} style={{flexDirection:'row',marginVertical:30}}>
                           <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.changePage(2)} style={{marginHorizontal:10}}>
                                <Text style={{fontFamily:'Avenir Next',fontWeight:"600",fontSize:16,color: this.state.selectedState === 2 ? 'black': '#8F9599'}}>Ödeme Alınacaklar</Text>
                                <View style={{backgroundColor: this.state.selectedState === 1 ? 'black': '#8F9599',width:20,height:1,alignSelf:'center'}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.changePage(1)} style={{marginHorizontal:10}}>
                                <Text style={{fontFamily:'Avenir Next',fontWeight:"600",fontSize:16,color:this.state.selectedState === 1 ? 'black': '#8F9599'}}>Tüm Müşteriler</Text>
                                <View style={{backgroundColor:this.state.selectedState === 2 ? 'black': '#8F9599',width:20,height:1,alignSelf:'center'}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.changePage(3)} style={{marginHorizontal:10}}>
                                <Text style={{fontFamily:'Avenir Next',fontWeight:"600",fontSize:16,color:this.state.selectedState === 3 ? 'black': '#8F9599'}}>Bugünün Müşterileri</Text>
                                <View style={{backgroundColor:this.state.selectedState === 3 ? 'black': '#8F9599',width:20,height:1,alignSelf:'center'}}></View>
                            </TouchableOpacity>
                           </View>
                           </ScrollView>
                            <TouchableOpacity onPress={()=> this.OrderSheet.open()} style={{margin:20,justifyContent:'center',alignSelf:'center',marginTop:15}}>
                            <Image style={{width:21,height:21}} source={require('../../../images/filter1.png')}></Image>
                            </TouchableOpacity>

                           </Animated.View>
                           </View>


                           
             


                    </View>
                </Animated.View>
            )
        
    };

    renderContentAreaList = () => {

            let headerHeight = (Platform.OS === 'ios') ? 56 : 56;

          


            return (
               <View>

                   
                   
               </View>
            )

    };

    getDayOfMusteri(value: number) {

        if(this.props.customers.length > 0) {
            this.flatListRef.getNode().scrollToOffset({animated: true, offset: 0})
        }
    
        this.setState({
          dayOfWeek: value,
        });
        this.setState({ page: 1 });
        this._getCustomerList(this.state.orderType, this.state.searchText, value, 1);
    
      }



    renderTitleArea = () => {
        return (
            <View style={[styles.titleContainer, {zIndex:1,height: Platform.OS === "ios" ? this.headerHeight  : this.headerHeight - 30}]}>
                {
                    this.renderTitle()
                }
            </View>
        )
    };

    render() {
        return (
            <View style={styles.outerContainer}>
                {
                    this.renderIOSBigTitle()
                }
                {
                    this.renderTitleArea()
                }
                <View style={[styles.innerContainer, {height: 100 * vh}]}>
                    {
                         
                        // this.renderContentAreaList()
                        
                    }
                    {
                        this.renderContentArea()
                    }
                    {/* <Text>asdasdas</Text> */}
                    {this.props.customers.length > 0 && this.renderGetPay()} 
                    {this.props.isHomeLoading === false && this.props.customers.length<1 ? <View style={{justifyContent:'center',flex:1,marginBottom:150}} >


<InfoItem text={this.state.isAnyCustomerValid ? "Aradığınız kriterlerde müşteri bulunamadı." : "Sisteme eklediğiniz müşteri bulunmakatadır. Müşterilerinizi yönetmek için eklemeye şimdi başlayın!"} />

</View> : null
                    }

                            {this.props.isHomeLoading && <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}> 
                                <ActivityIndicator size="large" style={{flex:1}} />
                            </View>}
                   

                    {
                         <RBSheet
                         ref={ref => {
                           this.OrderSheet = ref;
                         }}
                         height={200}
                         duration={200}

                         customStyles={{
                           container: {
                             justifyContent: "flex-start",
                             alignItems: "flex-start",
                             paddingLeft: 0
                           }
                         }}
                       >
                         {/* {this._renderEmployeeSheetContent()} */}
                         <Picker
  selectedValue={this.state.dayOfWeek}
  style={{height: '100%', width: '100%'}}
  onValueChange={(itemValue, itemIndex) =>

    this.getDayOfMusteri(itemValue)

  }>
<Picker.Item label="Tüm Günler" value={0} />
  <Picker.Item label="Pazartesi" value={1} />
  <Picker.Item label="Salı" value={2} />
  <Picker.Item label="Çarşamba" value={3}/>
  <Picker.Item label="Perşembe" value={4}/>
  <Picker.Item label="Cuma" value={5} />
  <Picker.Item label="Cumartesi" value={6} />
  <Picker.Item label="Pazar" value={7} />
  {/* <Picker.Item label="cıkıs" value={8} /> */}
</Picker>
                       </RBSheet>
                    }

<RBSheet
              ref={ref => {
                this.customerEdit = ref;
              }}
              height={230}
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
              }
              }>
                    {this.state.isShowDeleteView ? this._renderCustomerDeleteContent() : this._renderCustomerSheetContent()}
                  </RBSheet>

                  <RBSheet
              ref={ref => {
                this.deleteRb = ref;
              }}
              height={230}
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
              }
              }>
                  {this._renderCustomerDeleteContent()}
                  </RBSheet>

                </View>
                {this.showSimpleMessage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        zIndex:1,
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    iOSTitleContainer: {
        width: 100 * vw,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
        flexDirection:'row'
    },
    iOSTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iOSTitle: {

        marginBottom: 13,
        fontSize: 18,
        // lineHeight: 20,
        // fontWeight: 'bold',

        fontWeight: "600",
        color: '#2069F3',
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily:'Avenir Next',


    },
    androidTitleContainer: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
    },
    androidTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    androidComponentContainer: {
        position: 'absolute',
        right: 16,
        bottom: 0,
        width: 100 * vw - 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    androidTitle: {
        marginBottom: 16,
        marginLeft: 72,
        fontSize: 16,
        lineHeight: 20,
        // fontWeight: 'bold',
        color: '#353535',
        fontWeight: "600",
        fontFamily:'Avenir Next',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    iOSBigTitleContainer: {

        flexDirection:'row',
        position: 'absolute',
        top: Platform.OS === "ios" ?  headerHeight + statusBarHeight : headerHeight + statusBarHeight -30,
        left: 0,
        width: 100 * vw,
        // height: 560,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
        justifyContent:'space-between'
    },
    iOSBigTitle: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 36,
        // lineHeight: 45,
        // fontWeight: 'bold',
        fontWeight: "600",
        fontFamily:'Avenir Next',
        color: '#2069F3',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    innerContainer: {
        position: 'relative',
        width: 100 * vw,
    },
    contentContainer: {
        width: 100 * vw,
        backgroundColor: '#fff',
    }
});

const mapStateToProps = (state: AppState) => ({
    isHomeLoading: state.home.isHomeLoading,
    customers: state.home.customers,
    CustomerDeleteIsSuccess: state.customerDelete.isSuccessCustomerDelete,
    isLoadingCustomerDelete : state.customerDelete.isLoadingCustomerDelete,
    message : state.customerDelete.message,
    totalRecords : state.home.totalRecords,
    customerMoreLoading : state.home.customerMoreLoading
  })
  function bindToAction(dispatch: any) {
    return {
      GetCustomers: (orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) =>
        dispatch(GetCustomers(orderType, searchText, dayOfWeek, pageIndex)),
      GetCustomerMore: (orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) =>
        dispatch(GetCustomerMore(orderType, searchText, dayOfWeek, pageIndex)),
  
      customerDelete: (customerId: number) =>
        dispatch(customerDelete(customerId)),
        getNotificationCount: () =>
        dispatch(getNotificationCount()),
    };
  }




  export default connect(
    mapStateToProps,
    bindToAction
  )(HomeScreen);