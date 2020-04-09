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
import { Container, Header, Content, Form, Item, Input, Label,Icon, Button, Spinner } from 'native-base';

import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "./styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import Hr from "react-native-hr-component";
import { showMessage, hideMessage } from "react-native-flash-message";


// import Icon from 'react-native-vector-icons/Ionicons'
// import { Input } from "react-native-elements";

const logo = require("./water.png");


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished: boolean;
  isSucceed: boolean;
  isLoading: boolean;
  loginErrorMessage: string;
  loginUserService: (email: string, password: string) => void;
}

interface userData {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(4)
    .max(50)
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

class Login extends Component<Props, {}> {


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

    const { loginUserService, isSucceed } = this.props;
    loginUserService(values.email, values.password);
  };


  showSimpleMessage() {

    if (this.props.isFinished && (!this.props.isSucceed)) {

      showMessage({
        message: this.props.loginErrorMessage,
        type: "danger",
        icon: 'auto'
      }
      );
    }
  
  }



  render() {
    if(this.props.isSucceed) {
      this.props.navigation.navigate('AuthLoading')
    }
    
    return (
      <ImageBackground  source={require('../../../images/background.png')}style={[styles.container,{justifyContent:'flex-start'}]}>
        {/* <StatusBar backgroundColor="#2B6EDC" /> */}
        <SafeAreaView style={{flex:1}}>

       
        <KeyboardAvoidingView
        style={{flex:1}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={{flexGrow:1}} bounces={true}>
            <Formik
              initialValues={{ email: "", password: "" ,IsSecureText : true }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View style={{flex:1}}>
                    <View style={[styles.inputContainer,{justifyContent:'center'}]}>

                      
           
              <View style={{alignSelf:'center',borderColor:'white'}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:32,color:'white',fontWeight:'bold'}}>Giriş Yap</Text>
              </View>
              <View style={{marginTop:'5%'}}>
                

              <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.email && props.errors.email) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:0
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.email && props.errors.email) ? "#FD0D55" : 'white',marginTop:0,marginLeft:20,fontSize:20}} active name='ios-mail' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 
            
             value={props.values.email}
             onChangeText={props.handleChange("email")}
             onBlur={ (props.touched.email && props.errors.email) ? ()=> {
             
              props.setFieldValue('email',"") 
              props.handleChange("email")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("email")}

               onEndEditing={ (props.touched.email && props.errors.email) ? ()=> {
             
                props.setFieldValue('email',"") 
                props.handleChange("email")
                props.handleBlur("email")
  
               }
  
               
                 
                 :  props.handleBlur("email")}

             
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:Platform.OS === 'ios' ? 0 : 10}}
             placeholder= {(props.touched.email && props.errors.email) ? "Lütfen Emailinizi Giriniz." : "Email"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>

          <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.password && props.errors.password) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:0
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.password && props.errors.password) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20,fontSize:20}} active name='ios-lock' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.password}
             onChangeText={props.handleChange("password")}
             onBlur={ (props.touched.password && props.errors.password) ? ()=> {
             
              props.setFieldValue('password',"") 
              props.handleChange("password")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("password")}

               onEndEditing={ (props.touched.password && props.errors.password) ? ()=> {
             
                props.setFieldValue('password',"") 
                props.handleChange("password")
                props.handleBlur("password")
  
               }
  
               
                 
                 :  props.handleBlur("password")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:Platform.OS === 'ios' ? 0 : 10}}
             placeholder= {(props.touched.password && props.errors.password) ? "Lütfen Şifrenizi Giriniz." : "******"}
             placeholderTextColor="#dcdcdc"
             secureTextEntry = {props.values.IsSecureText}
             />
             <TouchableOpacity onPressIn ={()=> props.setFieldValue('IsSecureText',false)} onPressOut={()=> props.setFieldValue('IsSecureText',true)} >
               <Icon style={{color:'white',fontSize:20}} active name="ios-eye" />
             </TouchableOpacity>
            
          </Item>

          {/* <TouchableOpacity style={{alignSelf:'flex-end',marginTop:30}}>
            <Text style={{color:'white',fontFamily:"Avenir Next"}}>
            Şifremi unuttum?
            </Text>
          </TouchableOpacity> */}


                      </View>

                <View>
                <Button onPress={()=>props.handleSubmit()} style={{justifyContent:'center',marginTop:30,marginHorizontal:40,borderRadius:20,backgroundColor:'white',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#969696",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            {this.props.isLoading ? <Spinner /> : <Text style={{color:'#49B1FD',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Giriş Yap</Text>}
          </Button>
          <Hr hrPadding={50} hrStyles ={{marginTop:30}}lineColor="#eee" width={1}  text="Ya da" textStyles={{color:'white',fontFamily:"Avenir Next"}}/>

          <Button onPress={()=> this.props.navigation.navigate('SignUpFirst')} style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Üye Ol</Text>
          </Button>
                   <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                   <Text style={{fontFamily:'Avenir Next',fontSize:16,color:'white'}}>Üye olarak veya Giriş Yaparak </Text>
                     <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAgreement')}>
                       <Text  style={{fontFamily:'Avenir Next',fontSize:16,color:'#c2c2c2'}}>Kullanıcı Sözleşmesini </Text>
                       </TouchableOpacity>
                     <Text  style={{fontFamily:'Avenir Next',fontSize:16,color:'white'}}>Kabul Etmiş Sayılırsınız.</Text>
                   </View>
                </View>
</View>                      
                      


                    </View>

                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
        {this.showSimpleMessage()}
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


export default connect(mapStateToProps, bindToAction)(Login);
