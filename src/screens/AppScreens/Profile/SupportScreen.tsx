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
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import stylesNew from "../../styles";
import {Input,CheckBox, Item, Label, ListItem,Body, Switch, Textarea, Button,Spinner,Icon } from 'native-base'

import { AppState } from '../../../redux/store'
import { connect } from "react-redux";

import { showMessage } from "react-native-flash-message";
import { sendSupportMessage } from "../../../redux/actions/profileActions";
import styles from '../Customer/styles'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees: boolean;
  message : string;
  loading : boolean;
  sendSupportMessage : (subject : string , message : string) => void

}








const girdiler = Yup.object().shape({
  message : Yup.string()
  .required(),
  subject : Yup.string().required()
})


class SupportScreen extends Component<Props, CustomerInserState> {



  showSimpleMessage() {

    if (this.props.message) {

      showMessage({
        message: this.props.message,
        type: this.props.isSuccees ? "success" : "danger",
        icon: 'auto'
      }
      );
    }
    else if (this.props.isSuccees) {

        showMessage({
          message: "Mesajınız Başarıyla Gönderildi",
          type:"success" ,
          icon: 'auto'
        }
        );
      }
  
  }




  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Yardım ve Destek',
      //       headerRight: <TouchableOpacity style={{marginRight:20}}  onPress={()=> navigation.navigate('CustomerAdd')}>
      // <Icon name="ios-add" size={40} style={{color:'white'}} />
      //       </TouchableOpacity>,


    }


  };




 
  handleSendMessage(values) {

    this.props.sendSupportMessage(values.subject, values.message)
  }


  render() {
    if(this.props.isSuccees) {
      this.props.navigation.goBack()
    }
    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>

            <Formik
              initialValues={{subject: '',message : ''}}
              validationSchema={girdiler}
              onSubmit={values => this.handleSendMessage(values)}
            >

              {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm,touched,setFieldValue }) => {




                return (
                  <View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.FormLabel}>Adı Soyadı</Text> */}

                      <View style={styles.input}>
                       <Item  floatingLabel style={{marginTop:0,borderBottomColor: (touched.subject && errors.subject != null) ? 'red' : '#2069F3'}}>
                        <Icon name="ios-person" style={{color:'#a5a5a5'}}  />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.subject && errors.subject != null) ? 'red' : '#959595'}}>Konu</Label>
                       <Input

                        
                        // underlineColorAndroid="transparent"
                        style={{fontFamily:'Avenir Next',fontSize:18}}
                        placeholderTextColor="#9A9A9A"
                        value={values.subject}
                        autoCapitalize="words"
                        onChangeText={handleChange("subject")}
                        onBlur={handleBlur("subject")}
                      />
                       </Item>
                      </View>
                      <View style={styles.input}>
                       
                      <Item  floatingLabel style={{marginTop:20,borderBottomColor: (touched.message && errors.message != null) ? 'red' : '#2069F3',paddingBottom:20}}>
                        <Icon name="ios-home" style={{color:'#a5a5a5',marginTop:-50}}/>
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.message && errors.message != null) ? 'red' : '#959595'}}>Açıklama</Label>
                   
                       <Input

                        multiline
                        style={{minHeight:100,maxHeight:100,fontFamily:'Avenir Next',fontSize:18}}

                        // underlineColorAndroid="transparent"

                        placeholderTextColor="#9A9A9A"
                        value={values.message}
                        autoCapitalize="words"
                        onChangeText={handleChange("message")}
                        onBlur={handleBlur("message")}

                      />
                       </Item>
                    

                      </View>
                    
                    
                      <Button onPress={() => { handleSubmit() }} style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#216AF4',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#216AF4",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                       {this.props.loading ? <Spinner  color='01C3E3' /> :   <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Gönder</Text>}
                       
           
          </Button>

                    </View>
                  </View>
                );
              }}
            </Formik>
         
         
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isSuccees: state.profile.IsSuceedUserSupportAction,
message : state.profile.message,
 loading : state.profile.loadingSupportAction

})

function bindToAction(dispatch: any) {
  return {
    sendSupportMessage : (subject : string , message : string) => 
    dispatch(sendSupportMessage(subject,message))
  };
}

export default connect(mapStateToProps, bindToAction)(SupportScreen);