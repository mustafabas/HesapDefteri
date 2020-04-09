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
import styles from '../Customer/styles'
import { UserInfo, editUserInfoGeneral, storeInfo, getStoreInfo, updateStore, updateStoreInfo } from "../../../redux/actions/profileActions";
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    storeInfo : storeInfo;
    loading  : boolean;
    loadingUpdate : boolean;
    isSuccedUpdate : boolean;

    getStoreInfo : () => void;
    updateStoreInfo : (store : storeInfo) => void;

    isSucced : boolean;
    message: string;

}

// interface State {
//     UserType: string | null
// }

// interface multi extends IEmployeeItem, IUserItem { }



const girdiler = Yup.object().shape({
    storeName: Yup.string()
       .min(3, "Şirket adı 3 karakterden kısa olamaz!")
       .max(30, "Şirket adı 30 karakterden uzun olamaz!")
       .required("Lütfen Şirket Adı Giriniz."),
       phoneNumber: Yup.number()
       .min(10),
       address : Yup.string()
        .required("Lütfen Adresinizi Giriniz.")

});


class CompanyEditScreen extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Şirket Bilgileri Düzenle',

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
        else if(this.props.isSuccedUpdate) {
            showMessage({
                message: 'Şirket Bilgileri Başarıyla Güncellendi.',
                type:  "success",
                icon: "auto"
            }
            );
        }
    }

    componentWillMount() {
        this.props.getStoreInfo()
    }
    handleUserUpdate(values) {
    var user = this.props.storeInfo
    user.phoneNumber = values.phoneNumber
    user.storeName = values.storeName
    user.address = values.address
    this.props.updateStoreInfo(user)
    }
    render() {
        if(this.props.isSuccedUpdate){
            this.props.navigation.goBack()
        }
        if(this.props.loading) {
            return(
                <Spinner />
            )
        }
        else {
            var storeInfo = this.props.storeInfo.storeName ? this.props.storeInfo : {} as storeInfo

            const propsNew = { trackColor: { true: "#2069F3", false: null } }
            return (

                <View style={styles.addCustomerContainer}>
                    <StatusBar backgroundColor="#2B6EDC" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView bounces={false} >
                            <Formik
                                enableReinitialize
                                initialValues={{storeName : storeInfo.storeName ? storeInfo.storeName : '' ,phoneNumber : storeInfo.phoneNumber ?storeInfo.phoneNumber : '' ,address : storeInfo.address ? storeInfo.address : ''}}
                                validationSchema={girdiler}
                                onSubmit={values => this.handleUserUpdate(values)}
                            >
                                {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched, setFieldValue }) => {
                                    const propsNew = { trackColor: { true: "#2069F3", false: null } }
                                    return (
                                        <View style={[styles.containerNew,{marginLeft:20,marginRight:20}]} >
                                            <View style={[styles.input]}>
                                                <Item floatingLabel style={{ marginTop: 20, borderBottomColor: (touched.storeName && errors.storeName != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-person" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.storeName && errors.storeName != null) ? 'red' : '#959595' }}>Şirket İsmi</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.storeName}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("storeName")}
                                                        onBlur={handleBlur("storeName")}
                                                    />
                           
                                                </Item>
                                          
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 20, borderBottomColor: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-mail" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595' }}>Telefon Numarasi</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"

                                                        value={values.phoneNumber}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("phoneNumber")}
                                                        onBlur={handleBlur("phoneNumber")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.phoneNumber}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.address && errors.address != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-mail" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.address && errors.address != null) ? 'red' : '#959595' }}>Adres</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"

                                                        value={values.address}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("address")}
                                                        onBlur={handleBlur("address")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.address}</Text>
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
                                                        this.props.loadingUpdate ?  <Spinner color='white'></Spinner>:<Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Düzenle</Text>
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

}

const mapStateToProps = (state: AppState) => ({
    loading : state.profile.loadingGetStoreInfo,
    isSucced : state.profile.IsSuceedGetStoreInfo,
    storeInfo : state.profile.storeInfo,
    loadingUpdate : state.profile.loadingUpdateStoreInfo,
    isSuccedUpdate : state.profile.IsSucceedUpdateStoreInfo,
    message : state.profile.message
})

function bindToAction(dispatch: any) {
    return {
        getStoreInfo : () => 
            dispatch(getStoreInfo()),
            updateStoreInfo : (store : storeInfo) =>
            dispatch(updateStoreInfo(store))
    };
}

export default connect(mapStateToProps, bindToAction)(CompanyEditScreen);