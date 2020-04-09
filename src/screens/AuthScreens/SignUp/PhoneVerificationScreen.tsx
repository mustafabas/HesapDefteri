import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label,Icon, Button } from 'native-base';

import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "../Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import Hr from "react-native-hr-component";
import ProgressCircle from 'react-native-progress-circle'
import { Dimensions } from "react-native";

// import Icon from 'react-native-vector-icons/Ionicons'
// import { Input } from "react-native-elements";

// const logo = require("./water.png");

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished: boolean;
  isSucceed: boolean;
  isLoading: boolean;
  loginErrorMessage: string;
  loginUserService: (email: string, password: string) => void;
}

interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  NameSurname :Yup.string()
  .min(4)
  .max(30)
  .required(),
  email: Yup.string()
    .email()
    .min(4)
    .max(50)
    .required(),
  password: Yup.string()
    .min(6)
    .max(16)
    .required()
});

export default class PhoneVerificationScreen extends Component<Props, {}> {



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


  
    handleLogin = (values: userData) => {
        const { navigation, } = this.props;
        this.props.loginUserService(values.activationCode);
    
      };
    
      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval)
      }
        
    
      constructor(props){
        super(props);
        this.state = {
          countDown:50
        }
     
      }
      tick() {
          if(this.state.countDown!=0){
            this.setState(prevState => ({
                countDown: prevState.countDown -1
            }));
          }}
    
    
          confirmAgain(){
            this.setState({countDown:60})
    
        }
      progressCircleRender(){
        return(
            <ProgressCircle
            percent={100*this.state.countDown/60}
            radius={50}
            borderWidth={8}
            color="#2069F3"
            shadowColor="#527FD6"
            bgColor="#2069F3"
            outerCircleStyle={{borderColor:'white',borderWidth:1}}
            containerStyle={{borderColor:'white',borderWidth:.5}}
        >
    
        
            <Text style={{ fontSize: 25 ,}}>{this.state.countDown}</Text>
        </ProgressCircle>
    
        );
    }

  render() {
    if (this.props.isSucceed) {
      this.props.navigation.navigate("Customer");
    }
    return (
      <ImageBackground  source={require('../../../images/background.png')}style={[styles.container,{justifyContent:'flex-start'}]}>
          <SafeAreaView>


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false} contentContainerStyle={{flexGrow:1}}>

          
          <Formik
              initialValues={{ activationCode: ""}}
              // validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)
              
              }

            >
              {props => {
          
                return (
                  <View style={{}}>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    <Text style={{alignSelf: 'center', marginTop: 30,color:'white',fontFamily:"Avenir Next",fontSize:18}}>Lütfen Telefonunuza Gönderilen</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 5,color:"white",fontFamily:"Avenir Next",fontSize:18}}>Onay Kodunu Giriniz.</Text>
                    <View style={{alignSelf:"center",margin:50}}>
                    <View style={{width:Dimensions.get('window').width/2,height:Dimensions.get('window').width/2,justifyContent:'center',alignItems:'center',borderRadius:Dimensions.get('window').width/4,borderWidth:.25,borderColor:'white'}}>

                    <View style={{width:Dimensions.get('window').width/2-40,height:Dimensions.get('window').width/2-40, borderRadius:Dimensions.get('window').width/4-20,borderWidth:.5,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:'Avenir Next',fontSize:48,color:'white'}}>{this.state.countDown}</Text>
                        </View> 

                    </View> 
                    </View>
                    <View style={[styles.inputContainer,{padding:10}]}>
                        
                    <Item style={{borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,paddingLeft:20,borderColor: (props.touched.phoneNumber && props.errors.phoneNumber) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:5
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>

            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 
                maxLength={6}
             value={props.values.activationCode}
             onChangeText={props.handleChange("activationCode")}
             onBlur={ (props.touched.activationCode && props.errors.activationCode) ? ()=> {
             
              props.setFieldValue('activationCode',"") 
              props.handleChange("activationCode")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("activationCode")}

               onEndEditing={ (props.touched.activationCode && props.errors.activationCode) ? ()=> {
             
                props.setFieldValue('activationCode',"") 
                props.handleChange("activationCode")
                props.handleBlur("activationCode")
  
               }
  
               
                 
                 :  props.handleBlur("activationCode")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:0}}
             placeholder= {(props.touched.activationCode && props.errors.activationCode) ? "Lütfen Activasyon Kodunu Giriniz" : "Activasyon Kodu"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>


          <Button onPress={()=>this.props.navigation.navigate('Home')}  style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Devam Et</Text>
          </Button>
         <TouchableOpacity></TouchableOpacity> 
                      
                    </View>
                   
                    <View style={{alignItems:'center',marginTop:20}}>

                    </View>
                    
                  </View>
                );
              }}
            </Formik>

         
         
          </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}



const mapStateToProps = (state: AppState) => ({
  isFinished: state.login.isFinished,
  isSucceed: state.login.isSucceed,
  isLoading: state.login.isLoading,
  loginErrorMessage: state.login.loginErrorMessage
})

function bindToAction(dispatch: any) {
  return {
    loginUserService: (email: string, password: string) =>
      dispatch(loginUserService(email, password))
  };

}


// export default connect(mapStateToProps, bindToAction)(Login);
