import React from "react";
import {

  createAppContainer,
  createSwitchNavigator,

} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Dimensions, TouchableOpacity, View, Platform } from "react-native";

const { width } = Dimensions.get("window");
import Login from "../screens/AuthScreens/Login";
import SignUpFirstScreen from '../screens/AuthScreens/SignUp/SignUpFirstScreen'
import SignUpSecondScreen from '../screens/AuthScreens/SignUp/SignUpSecondScreen'
import PhoneVerificationScreen from "../screens/AuthScreens/SignUp/PhoneVerificationScreen";
import HomeScreen from '../screens/AppScreens/Home/HomeScreen'
import { Icon, Image, Text } from "native-base";
import CustomerOrdersScreen from '../screens/AppScreens/Customer/CustomerOrdersScreen'
import AuthLoading from "../screens/AuthLoading";
import orderAdd from "../screens/AppScreens/Customer/orderAdd"
import svgs from '../images/icomoon/SVG/svgs'
import SvgIcon from 'react-native-svg-icon';
import employee from '../screens/AppScreens/Employee/home';
import employeeAddScreen from '../screens/AppScreens/Employee/employeeAddScreen';
import employeeEditScreen from '../screens/AppScreens/Employee/employeeEditScreen';
import SecurtiyScreen from '../screens/AppScreens/Profile/SecurityScreen'

import RateUsScreen from '../screens/AppScreens/Profile/RateUsScreen'
import addCustomer from "../screens/AppScreens/Customer/addCustomer";
import productAdd from "../screens/AppScreens/Product/productAdd";
import ProfileScreen from "../screens/AppScreens/Profile/ProfileScreen";
import employeeCostScreen from "../screens/AppScreens/Employee/employeeCostScreen";

import products from "../screens/AppScreens/Product/produts";
import productEditScreen from "../screens/AppScreens/Product/productEdit";
import CustomerEditScreen from '../screens/AppScreens/Customer/CustomerEditScreen'
import AboutUsScreen from "../screens/AppScreens/Profile/AboutUsScreen";
import ProfileEditGeneralScreen from "../screens/AppScreens/Profile/ProfileEditGeneralScreen";
import CompanyEditScreen from "../screens/AppScreens/Profile/CompanyEditScreen";
import ReportScreen from "../screens/AppScreens/Report/ReportScreen";
import ReportTemplateScreen from '../screens/AppScreens/Report/ReportTemplateScreen'
import ReportNewScreen from '../screens/AppScreens/Report/ReportNewScreen'
import ReportAnotherScreen from '../screens/AppScreens/Report/ReportAnotherScreen'
import IntroductionScreen from '../screens/AuthScreens/Introduction/IntroductionScreen'
import UserAgreementScreen from "../screens/AuthScreens/Login/UserAgreementScreen";
import HomeScreenAndroid from "../screens/AppScreens/Home/HomeScreenAndroid";
import SupportScreen from "../screens/AppScreens/Profile/SupportScreen";
import CustomerDefinedPriceAddScreen from '../screens/AppScreens/Customer/CustomerDefinedPriceAddScreen'
import CustomerDefinedPricesScreen from '../screens/AppScreens/Customer/CustomerDefinedPricesScreen'
import ReportBaseScreen from '../screens/AppScreens/Report/ReportBaseScreen'
import productsWithImagesScreen from "../screens/AppScreens/Product/productsWithImagesScreen";
import NotificationScreen from "../screens/AppScreens/Notification/NotificationScreen";
import OrderDetailScreen from '../screens/AppScreens/Customer/orderDetailScreen'
import OrderListScreen from '../screens/AppScreens/Order/OrderListScreen'
import getLastCallsScreen from '../screens/AppScreens/Home/getLastCallsScreen'
import { IconBadge } from "../components/NotificationIconBadge";



const introductionStack = createStackNavigator({
  Introduction: IntroductionScreen

}, {
  headerMode: 'none'
})
// const EmployeeApp = createStackNavigator(
//   {
    
//     //     EditEmployeeCost: { screen: editEmployeeCost },

//   },
//   {
//     initialRouteName: "Employee",
//         // headerMode:"none"
//   });

const notificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
    OrderDetail: OrderDetailScreen
  }, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#216AF4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontFamily: 'Avenir Next',
      fontSize: 18
    },
  },
}
)
const orderStack = createStackNavigator(
  {
    OrderList: OrderListScreen,
    OrderDetail: OrderDetailScreen
  },
  {
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#216AF4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 18
      },
    },
  }
)



const reportStack = createStackNavigator(
  {
    ReportBase: ReportBaseScreen,
    ReportNew: ReportNewScreen,
    ReportTemplate: ReportTemplateScreen,
    ReportOld: ReportScreen,
    ReportAnother: ReportAnotherScreen
  },
  {
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#216AF4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 18
      },
    },
  }
)

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: ProfileScreen,
    products: products,
    productEditScreen: productEditScreen,
    AboutUs: AboutUsScreen,
    profileEditGeneral: ProfileEditGeneralScreen,
    Securtiy: SecurtiyScreen,
    AddProduct: { screen: productAdd },
    companyInfo: CompanyEditScreen,
    Support: SupportScreen,
    RateUs: RateUsScreen,
    Employee: { screen: employee },
    AddEmployee: { screen: employeeAddScreen },
    EditEmployee: { screen: employeeEditScreen },
    EmployeeCost: { screen: employeeCostScreen },

    //AddEmployee: { screen: employeeAdd },
    //     EditEmployee: { screen: editEmployee },
    //     EmployeeCost: { screen: employeeCost },
    //     EditEmployeeCost: { screen: editEmployeeCost },

  },
  {
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#216AF4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 18
      },
    },
  });

const CustomerStack = createStackNavigator(
  {
    CustomerOrders: CustomerOrdersScreen
  },
  {
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#216AF4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 18
      },
    },
  }

);

const HomeStack = createStackNavigator({
  Home: Platform.OS === 'ios' ? HomeScreenAndroid : HomeScreenAndroid,
  Customer: CustomerOrdersScreen,
  addCustomer: addCustomer,
  orderAdd: orderAdd,
  CustomerEdit: CustomerEditScreen,
  CustomerDefinedPriceAdd: CustomerDefinedPriceAddScreen,
  CustomerDefinedPrices: CustomerDefinedPricesScreen,
  OrderDetail: OrderDetailScreen,
  getLastCalls : getLastCallsScreen

}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2069F3',
      fontFamily: 'Avenir Next'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})


const AgreementStack = createStackNavigator({
  UserAgreement: UserAgreementScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2069F3',
      fontFamily: 'Avenir Next'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})
const IconNew = (props) => <SvgIcon {...props} style={{ marginTop: 55, marginLeft: 55 }} svgs={svgs} />

const MainStack = createBottomTabNavigator(
  {
    Customer: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Müşteriler',
        tabBarIcon: ({ focused }) => {

          return (
            <IconNew stroke={focused ? '#2069F3' : 'black'} strokeWidth={3} fill={focused ? '#2069F3' : 'black'} width="80" height="80" name="User" svgs={svgs} />
          )
        }
      }
    },
    Order: {
      screen: orderStack,
      navigationOptions: {
        tabBarLabel: 'Siparişler',
        tabBarIcon: ({ focused }) => {
          return (
            <Icon name="ios-basket" style={{ color: focused ? "#2069F3" : "" }}  ></Icon>
          )
        }
      }
    },
    Settings: {
      screen: reportStack,
      navigationOptions: {
        tabBarLabel: 'Rapor',
        tabBarIcon: ({ focused }) => {
          return (
            <IconNew fill={focused ? '#2069F3' : 'black'} width="80" height="80" name="Report" svgs={svgs} />
          )
        }

      }
    },

    Notification: {
      screen: notificationStack,
      navigationOptions: ({ screenProps}) => ({
        tabBarLabel : "Bildirimler",
        tabBarIcon: ({focused}) =>
        <IconBadge badgeCount={screenProps.badgeCount} focused={focused} name="ios-notifications-outline"/>

      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profil',
        tabBarIcon: ({ focused }) => {
          return (
            <IconNew stroke={focused ? '#2069F3' : 'black'} strokeWidth={3} fill={focused ? '#2069F3' : 'black'} width="80" height="80" name="Profile" svgs={svgs} />
          )
        }
      }
    },
  },
  {
    initialRouteName: "Customer",
  }
);



const LoginScreen = createStackNavigator(
  {
    Login: { screen: Login },
    SignUpFirst: SignUpFirstScreen,
    SignUpSecond: SignUpSecondScreen,
    PhoneVerification: PhoneVerificationScreen,
    Home: HomeScreen,
    UserAgreement: UserAgreementScreen
  },
  {
    initialRouteName: "Login",
    // headerMode: "none"
  }
);


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      LoginScreen: LoginScreen,
      introductionStack: introductionStack,
      MainStack: MainStack,

      // AddCustomer: CustomerApp,
    },
    {
      initialRouteName: "AuthLoading" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
