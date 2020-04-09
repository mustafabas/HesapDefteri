import React, { Component } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    StatusBar,
    Alert,

} from "react-native";
import {AsyncStorage } from 'react-native'

import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import stylesNew from "../../styles";
import { employeeAdd } from "../../../redux/actions/employeeAddAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { IEmployeeItem } from "../../../redux/models/addEmployeeModel";
import { IUserItem } from "../../../redux/models/addUserModel";
import { AddUser } from "../../../redux/actions/addUserAction"
import { Item, Label, Input, Textarea, Button, Spinner, Switch, Icon } from "native-base";
import { stat } from "fs";
import { showMessage } from "react-native-flash-message";
import { GetEmployees } from "../../../redux/actions/employeeAction";
import { UserInfo, editUserSecurityInfo } from "../../../redux/actions/profileActions";

import styles from '../Customer/styles'
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    userInfo : UserInfo;
    loading  : boolean;
    editUserSecurityInfo : (userGeneral : UserInfo) => void;
    isSucced : boolean;
    message: string;

}

// interface State {
//     UserType: string | null
// }

// interface multi extends IEmployeeItem, IUserItem { }

const initialValues:  {
    nameSurname: "",
    monthlySalary: "",
    mail: "",
    password: "",
    phoneNumber: "",
    identityNumber: "",
    address: "",
    dailyPriceFood: "",
    AddAsUser:false
}

const girdiler = Yup.object().shape({
    // nameSurname: Yup.string()
    //     .min(3, "*Çalışan adı 3 karakterden kısa olamaz!")
    //     .max(30, "*Çalışan adı 30 karakterden uzun olamaz!")
    //     .required("*Zorunlu Alan"),
    //     mail: Yup.string()
    //     .email("E-posta Giriniz!"),



});

function equalTo(ref: any, msg: any) {
    return Yup.mixed().test({
      name: 'equalTo',
      exclusive: false,
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path,
      },
      test: function(value: any) {
        return value === this.resolve(ref);
      },
    });
  }
  Yup.addMethod(Yup.string, 'equalTo', equalTo);
  

const loginSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .min(4)
    .required("Eski Şifrenizi Giriniz."),
    newPassword : Yup.string()
    .required(),
    newPaswordSecond : Yup.string().equalTo(Yup.ref('newPassword'), 'Passwords must match').required(),

});



class SecurityScreen extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Profil Düzenle',
            headerStyle: {
                backgroundColor: '#216AF4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
        
    

    constructor(props: Props) {
        super(props);
        this.state = {
            UserType: "",
        };
    }


    showSimpleMessage() {
        if (this.props.message) {

            showMessage({
                message: this.props.message,
                type: this.props.isSucced ? "success" : "danger",
                icon: "auto"
            }
            );
        }
    }

    handleUserUpdate(values ) {

    if(this.props.userInfo.password != values.oldPassword) {
        showMessage({
            message: "Mevcut Şifrenizi Yanlış Girdiniz",
            type: "danger",
            icon: "auto"
        }
        );
    }
    else {
        var userInfo = this.props.userInfo
        userInfo.password  = values.newPassword
    
    
        this.props.editUserSecurityInfo(userInfo)
    }
  
    
    }
    render() {
        if(this.props.isSucced){
            this.props.navigation.goBack()
        }

            let userInfo = this.props.userInfo
            const propsNew = { trackColor: { true: "#2069F3", false: null } }
            return (

                <View style={styles.addCustomerContainer}>
                    <StatusBar backgroundColor="#2B6EDC" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView bounces={false} >
                            <Formik
                                // enableReinitialize
                                initialValues={{oldPassword : '',newPassword : '',newPaswordSecond : ''}}
                                validationSchema={loginSchema}
                                onSubmit={values => this.handleUserUpdate(values)}
                            >
                                {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched, setFieldValue }) => {
                                    const propsNew = { trackColor: { true: "#2069F3", false: null } }
                                    return (
                                        <View style={[styles.containerNew,{marginLeft:20,marginRight:20}]} >
                                            <View style={[styles.input]}>
                                                <Item floatingLabel style={{ marginTop: 20, borderBottomColor: (touched.oldPassword && errors.oldPassword != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-unlock" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.oldPassword && errors.oldPassword != null) ? 'red' : '#959595' }}>Mevcut Şifreniz</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.oldPassword}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("oldPassword")}
                                                        onBlur={handleBlur("oldPassword")}
                                                    />
                           
                                                </Item>
                                          
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.newPassword && errors.newPassword != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-lock" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.newPassword && errors.newPassword != null) ? 'red' : '#959595' }}>Yeni Şifreniz</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        secureTextEntry
                                                        value={values.newPassword}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("newPassword")}
                                                        onBlur={handleBlur("newPassword")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.newPassword}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.newPaswordSecond && errors.newPaswordSecond != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-lock" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.newPaswordSecond && errors.newPaswordSecond != null) ? 'red' : '#959595' }}>Yeni Şifre Tekrar</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        secureTextEntry
                                                        value={values.newPaswordSecond}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("newPaswordSecond")}
                                                        onBlur={handleBlur("newPaswordSecond")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{(touched.newPaswordSecond && errors.newPaswordSecond != null) ? errors.newPaswordSecond : ''}</Text>
                                            </View>
                          
                                            <Button onPress={() => { handleSubmit() }}
                                                style={{
                                                    justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
                                                    shadowRadius: 5.00,
                                                    elevation: 12,
                                                    shadowColor: "#006c7e",
                                                    shadowOffset: { width: 3, height: 3 },
                                                    shadowOpacity: .5,
                                                }}>
                                                    {
                                                        this.props.loading ?  <Spinner color='white'></Spinner>:<Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Düzenle</Text>
                                                    }

                                            </Button>
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
    userInfo : state.profile.userInfo,
    loading : state.profile.loadingUserSecurityInfo,
    isSucced : state.profile.IsSuceedUserSecurityInfo,

    message : state.profile.message
})

function bindToAction(dispatch: any) {
    return {
        editUserSecurityInfo : (userGeneral : UserInfo) => 
            dispatch(editUserSecurityInfo(userGeneral))
    };
}

export default connect(mapStateToProps, bindToAction)(SecurityScreen);