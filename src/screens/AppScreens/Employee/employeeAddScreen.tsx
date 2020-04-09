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
import styles from "../../styles";
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
// import { TextInputMask } from 'react-native-masked-text'



interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    EmployeeAddMessage: string;
    employee: IEmployeeItem;
    user: IUserItem;
    employeeAdd: (nameSurname: string, monthlySalary: number, email: string, password: string, phoneNumber: string, identityNumber: string, address: string, dailyPriceFood: number) => void;
    AddUser: (nameSurname: string, mail: string, password: string) => void;
    isLoading:boolean;
}

interface State {
    UserType: string | null
    simple : number 
}

interface multi extends IEmployeeItem, IUserItem { }

const initialValues: multi = {
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
    nameSurname: Yup.string()
        .min(3, "*Çalışan adı 3 karakterden kısa olamaz!")
        .max(30, "*Çalışan adı 30 karakterden uzun olamaz!")
        .required("*Zorunlu Alan"),
        mail: Yup.string()
        .email("E-posta Giriniz!"),
    monthlySalary: Yup.string(),
        identityNumber: Yup.number(),
    dailyPriceFood: Yup.string(),
      phoneNumber: Yup.number()


});


class employeeAddSceen extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Çalışan Ekle',
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
            simple : 0
        };
    }

    componentWillMount() {
        this.getUserType();
    }

    handleAddEmployee(values: multi) {
        const { employeeAdd, AddUser } = this.props;
        employeeAdd(values.nameSurname,Number(values.monthlySalary.replace(",",".")), values.mail, values.password, values.phoneNumber, values.identityNumber, values.address , Number(values.dailyPriceFood.replace(",",".")));
        // if (values.mail != "" && values.password != "") {
        //     AddUser(values.nameSurname, values.mail, values.password);
        // }      
  
    };
    showSimpleMessage() {
        if (this.props.EmployeeAddMessage) {

            showMessage({
                message: this.props.EmployeeAddMessage,
                type: this.props.isSuccees ? "success" : "danger",
                icon: "auto"
            }
            );
        }
    }
    getUserType() {
        //function to make three option alert
        AsyncStorage.getItem("UserType").then((value) => {
            this.setState({
                UserType: value,
            })
        });
    }
    renderPrice(value) {
        const hasValue = Boolean(value && value.length > 0);
        return (
          <ViewWix row center>
            
            <TextWix text30 dark10={hasValue} dark60={!hasValue}>
              {hasValue ? value : '00'}
            </TextWix>
            <TextWix text30 dark60>
            ₺
            </TextWix>
          </ViewWix>
        );
      }

    render() {
        if(this.props.isSuccees){
            this.props.navigation.navigate('Employee');
        }
        if (this.state.UserType === "2") {
            return (<View style={styles.musteribulunamadiContainer}>
                <Text style={styles.musteribulunamadiText}>Bu Sayfaya Erişim İzniniz Yok</Text>
            </View>);
        }
        else {
            const propsNew = { trackColor: { true: "#2069F3", false: null } }
            return (
                <View style={styles.addCustomerContainer}>
                    <StatusBar backgroundColor="#2B6EDC" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView bounces={false} >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={girdiler}
                                onSubmit={values => this.handleAddEmployee(values)}
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
                                           
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("nameSurname")}
                                                        onBlur={handleBlur("nameSurname")}
                                                    />
                           
                                                </Item>
                                          
                                            </View>

                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-menu" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#959595' }}>Kimlik Numarası</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        maxLength={11}
                                                        keyboardType="number-pad"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("identityNumber")}
                                                        onBlur={handleBlur("identityNumber")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.identityNumber}</Text>
                                            </View>
                          
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.monthlySalary && errors.monthlySalary != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-card" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.monthlySalary && errors.monthlySalary != null) ? 'red' : '#959595' }}>Aylik Maaş</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        keyboardType="numeric"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("monthlySalary")}
                                                        onBlur={handleBlur("monthlySalary")}
                                                    />

                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.monthlySalary}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.dailyPriceFood && errors.dailyPriceFood != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-pizza" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.dailyPriceFood && errors.dailyPriceFood != null) ? 'red' : '#959595' }}>Günlük Yemek Ücreti</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                             
                                                        keyboardType="numeric"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("dailyPriceFood")}
                                                        onBlur={handleBlur("dailyPriceFood")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.dailyPriceFood}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-call" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595' }}>0511 111 11 11</Label>
                                                    <Input
                                                     maxLength={11}
                                                        placeholderTextColor="#9A9A9A"
                                               
                                                        keyboardType="number-pad"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("phoneNumber")}
                                                        onBlur={handleBlur("phoneNumber")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.phoneNumber}</Text>
                                            </View>
                                            <Item  floatingLabel style={{maxHeight:80,marginTop:20,borderBottomColor: (touched.adress && errors.adress != null) ? 'red' : '#2069F3'}}>
                      
                                            <Icon name="ios-home" style={{minHeight:60,color:'#a5a5a5'}}/>
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.adress && errors.adress != null) ? 'red' : '#959595'}}>Adres</Label>
                   
<Input

multiline
style={{minHeight:100,maxHeight:100,fontFamily:'Avenir Next',fontSize:18}}

// underlineColorAndroid="transparent"

placeholderTextColor="#9A9A9A"
value={values.address}
autoCapitalize="words"
onChangeText={handleChange("address")}
onBlur={handleBlur("address")}

/>
</Item>

                                 <View style={[styles.input, {flexDirection:'row',marginTop:20}]}>
                        <Switch 
                        {...propsNew}
                        onChange = {() => {{setFieldValue('AddAsUser', !values.AddAsUser)}}}
                        value={values.AddAsUser}
                         />
                         <Text style={{marginLeft:10,fontFamily:'Avenir Next',fontSize:18,marginTop:-3}}>Sisteme Giris Bilgileri Ekle</Text>
                         </View>
                         {
                            values.AddAsUser && <View>

                      <View style={[styles.input,{marginTop:10}]}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.mail && errors.mail != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-mail" style={{color:'#a5a5a5'}} />
                                                    <Label style={{ marginTop:-10,color: (touched.mail && errors.mail != null) ? 'red' : '#959595' }}>Mail Adresi</Label>
                                                    
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("mail")}
                                                        onBlur={handleBlur("mail")}
                                                    />
                                                </Item>
                         <Text style={{color:'red'}}>{errors.mail}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.password && errors.password != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-lock" style={{color:'#a5a5a5'}} />
                                                    <Label style={{marginTop:-10, color: (touched.password && errors.password != null) ? 'red' : '#959595' }}>Sifre</Label>
                                                    <Input
                                            
                                                     secureTextEntry={true}
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("password")}
                                                        onBlur={handleBlur("password")}
                                                    />
                                                </Item>
                                                <Text style={{width:'100%', color:'red'}}>{errors.phoneNumber}</Text>
                                            </View>
                            </View>
                         }
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
                                                        this.props.isLoading ?  <Spinner color='white'></Spinner>:<Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Ekle</Text>
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
    isSuccees: state.addEmployee.isSuccess,
    EmployeeAddMessage: state.addEmployee.EmployeeAddMessage,
    isSucceesUser: state.addUser.isSuccess,
    isLoading : state.addEmployee.isLoading
})

function bindToAction(dispatch: any) {
    return {
        employeeAdd: (nameSurname: string, monthlySalary: number, mail: string, password: string, phoneNumber: string, identityNumber: string, address: string, dailyPriceFood: number) =>
            dispatch(employeeAdd(nameSurname, monthlySalary, mail, password, phoneNumber, identityNumber, address, dailyPriceFood)),
        AddUser: (nameSurname: string, mail: string, password: string) =>
            dispatch(AddUser(nameSurname, mail, password)),
    };
}

export default connect(mapStateToProps, bindToAction)(employeeAddSceen);