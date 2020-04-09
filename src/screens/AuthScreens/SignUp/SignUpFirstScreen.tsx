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
// import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "../Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import Hr from "react-native-hr-component";
import { controlEmail } from "../../../redux/actions/signUpActions";
import { showMessage } from "react-native-flash-message";

// import Icon from 'react-native-vector-icons/Ionicons'
// import { Input } from "react-native-elements";

// const logo = require("./water.png");

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished: boolean;
  isSucceed: boolean;
  isLoading: boolean;
  loginErrorMessage: string;
  controlEmail : (NameSurname: string,password:string , email:string) => void;
}

interface userDataFirst {
  NameSurname: string;
  email: string;
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

class SignUpFirstScreen extends Component<Props, {}> {


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




  handleLogin = (values: userDataFirst) => {
    const { isSucceed } = this.props;
    // this.props.navigation.setParams({NameSurname : values.NameSurname , email : values.email,password : values.password})

    this.props.controlEmail(values.NameSurname,values.password,values.email);
   
  };

  render() {
    
    if(this.props.isSucceed) {
      this.props.navigation.navigate('SignUpSecond')
    }
    return (
      <ImageBackground  source={require('../../../images/background.png')}style={[styles.container,{justifyContent:'flex-start'}]}>
        <SafeAreaView>
          
      
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false} contentContainerStyle={{flexGrow:1}}>
            <Formik
              initialValues={{ NameSurname: "", email: "" ,password:"",IsSecureText : true}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View style={{justifyContent:'center'}}>
                   
                    <View style={[styles.inputContainer,]}>

                      
           
              <View style={{alignSelf:'center',borderBottomWidth:1,borderColor:'white'}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:32,color:'white'}}>Üye Ol</Text>
              </View>
              <View style={{marginTop:'20%'}}>
                
              <Item style={{borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.NameSurname && props.errors.NameSurname) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:0
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.NameSurname && props.errors.NameSurname) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20,fontSize:20}} active name='ios-person' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.NameSurname}
             onChangeText={props.handleChange("NameSurname")}
             onBlur={ (props.touched.NameSurname && props.errors.NameSurname) ? ()=> {
             
              props.setFieldValue('NameSurname',"") 
              props.handleChange("NameSurname")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("NameSurname")}

               onEndEditing={ (props.touched.NameSurname && props.errors.NameSurname) ? ()=> {
             
                props.setFieldValue('NameSurname',"") 
                props.handleChange("NameSurname")
                props.handleBlur("NameSurname")
  
               }
  
               
                 
                 :  props.handleBlur("NameSurname")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:Platform.OS === 'ios' ? 0 : 10}}
             placeholder= {(props.touched.NameSurname && props.errors.NameSurname) ? "Lütfen İsim Soyisminizi Giriniz" : "İsim Soyisim"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>


          <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.email && props.errors.email) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3'
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.email && props.errors.email) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20,fontSize:20}} active name='ios-mail' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.email}
             onChangeText={props.handleChange("email")}
             onBlur={ (props.touched.email && props.errors.email) ? ()=> {
             
              props.setFieldValue('email',"") 
              props.handleChange("email")
              props.handleBlur("email")

             }

             
               
               :  props.handleBlur("email")}
               onEndEditing={ (props.touched.email && props.errors.email) ? ()=> {
             
              props.setFieldValue('email',"") 
              props.handleChange("email")
              props.handleBlur("email")

             }

             
               
               :  props.handleBlur("email")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:Platform.OS === 'ios' ? 0 : 10}}
             placeholder= {(props.touched.email && props.errors.email) ? "Lütfen Emailinizi Giriniz" : "Email"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>


          <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.password && props.errors.password) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3'
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


style={{color:'white',fontFamily:"Avenir Next",paddingTop:Platform.OS=== 'ios' ? 0 : 10}}
placeholder= {(props.touched.password && props.errors.password) ? "Lütfen Şifrenizi Giriniz." : "******"}
placeholderTextColor="#dcdcdc"
secureTextEntry = {props.values.IsSecureText}
/>
<TouchableOpacity onPressIn ={()=> props.setFieldValue('IsSecureText',false)} onPressOut={()=> props.setFieldValue('IsSecureText',true)} >
  <Icon style={{color:'white',fontSize:20}} active name="ios-eye" />
</TouchableOpacity>

</Item>


         


                      </View>
</View>                      
         
          <Button onPress={()=>props.handleSubmit()}  style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                      {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Devam Et</Text>}
                       
           
          </Button>

          <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf:'center',borderBottomWidth:1,borderColor:'white',marginTop:20}}>
            <Text style={{color:'white',fontFamily:"Avenir Next",fontSize:16}}>
            Hesabınız Varsa Giriş Yapın
            </Text>
          </TouchableOpacity>

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
  isFinished: state.signUp.isFinished,
  isSucceed: state.signUp.isSucceed,
  isLoading: state.signUp.isLoading,
  loginErrorMessage: state.signUp.loginErrorMessage

})

function bindToAction(dispatch: any) {
  return {
    controlEmail : (NameSurname: string,password:string , email:string) =>
      dispatch(controlEmail(NameSurname,password,email))
  };

}


export default connect(mapStateToProps, bindToAction)(SignUpFirstScreen);
