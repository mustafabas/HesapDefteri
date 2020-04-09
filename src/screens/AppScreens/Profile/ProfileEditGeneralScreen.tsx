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
    AsyncStorage,
} from "react-native";
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
import { UserInfo, editUserInfoGeneral } from "../../../redux/actions/profileActions";
import styles from '../Customer/styles'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    userInfo : UserInfo;
    loading  : boolean;
    editUserInfoGeneral : (userGeneral : UserInfo) => void;
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


class ProfileEditGeneralScreen extends Component<Props, State> {
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
    var userInfo = this.props.userInfo
    userInfo.email  = values.email
    userInfo.nameSurname = values.nameSurname
    console.log(userInfo)
    this.props.editUserInfoGeneral(userInfo)
    
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
                                initialValues={{nameSurname : userInfo.nameSurname != null ? userInfo.nameSurname : '',email : userInfo.email ? userInfo.email : ''}}
                                validationSchema={girdiler}
                                onSubmit={values => this.handleUserUpdate(values)}
                            >
                                {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched, setFieldValue }) => {
                                    const propsNew = { trackColor: { true: "#2069F3", false: null } }
                                    return (
                                        <View style={[styles.containerNew,{marginLeft:20,marginRight:20}]} >
                                            <View style={[styles.input]}>
                                                <Item floatingLabel style={{ marginTop: 20, borderBottomColor: (touched.nameSurname && errors.nameSurname != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-person" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.nameSurname && errors.nameSurname != null) ? 'red' : '#959595' }}>Adı Soyadı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.nameSurname}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("nameSurname")}
                                                        onBlur={handleBlur("nameSurname")}
                                                    />
                           
                                                </Item>
                                          
                                            </View>
                                            <View style={[styles.input,{marginTop:20}]}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.email && errors.email != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-mail" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.email && errors.email != null) ? 'red' : '#959595' }}>Email Adresi</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"

                                                        value={values.email}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("email")}
                                                        onBlur={handleBlur("email")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.email}</Text>
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
    loading : state.profile.loadingUserInfoGeneralUpdate,
    isSucced : state.profile.IsSucceedUserInfoUpdate,

    message : state.profile.message
})

function bindToAction(dispatch: any) {
    return {
         editUserInfoGeneral : (userGeneral : UserInfo) => 
            dispatch(editUserInfoGeneral(userGeneral))
    };
}

export default connect(mapStateToProps, bindToAction)(ProfileEditGeneralScreen);