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

import { NavigationScreenProp, NavigationState, NavigationEvents, } from "react-navigation";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import stylesNew from "../../styles";
import { employeeAdd } from "../../../redux/actions/employeeAddAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { IEmployeeItem } from "../../../redux/models/addEmployeeModel";
import { IUserItem } from "../../../redux/models/addUserModel";
import { AddUser } from "../../../redux/actions/addUserAction"
import { Item, Label, Input, Textarea, Button, Spinner, Switch, CheckBox, Icon } from "native-base";
import { stat } from "fs";
import { showMessage } from "react-native-flash-message";
import { getEmployeeById, employeeEdit, employe } from "../../../redux/actions/editEmployeeAction";
import { IEmployeeItemBaseResponseModel } from "../../../redux/models/employeeModel";
import styles from '../Customer/styles'
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    EmployeeUpdateMessage: string;
    employee: IEmployeeItemBaseResponseModel;
    user: IUserItem;
    employeeEdit: (nameSurname: string, monthlySalary: number, email: string, password: string, phoneNumber: string, identityNumber: string, address: string, dailyPriceFood: number, employeeId: number, active:boolean,addAsAUser:boolean) => void;
    AddUser: (nameSurname: string, mail: string, password: string) => void;
    isLoading: boolean;
    GetEmployees: () => void;
    getEmployeeById: (employeeId: number) => void;
    isLoadignGetEmployee: boolean;
}

interface State {
    UserType: string | null
}

interface multi extends IEmployeeItem, IUserItem { }



const girdiler = Yup.object().shape({
    nameSurname: Yup.string()
        .matches(/./g, " ")
        .min(3, "*Çalışan adı 3 karakterden kısa olamaz!")
        .max(30, "*Çalışan adı 30 karakterden uzun olamaz!")
        .required("*Zorunlu Alan"),
    monthlySalary: Yup.number(),
    identityNumber: Yup.number()
        .positive("Pozitif değer giriniz!"),
    dailyPriceFood: Yup.string(),
    phoneNumber: Yup.number()
        .positive("Pozitif değer giriniz!"),
        mail: Yup.string()
        .email("Email Adresini girin")
        .min(4)
        .max(50),
      password: Yup.string()
        .min(6)
        .max(16)
    
});


class employeeEditScreen extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Çalışan Düzenle',
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

    componentWillMount() {
        this.getUserType();
        const employeeId: number = Number(this.props.navigation.getParam('employeeId'));
        this.props.getEmployeeById(employeeId);
        console.log(this.props.employee);

    }
    componentDidMount(){
        const employeeId: number = Number(this.props.navigation.getParam('employeeId'));
        this.props.getEmployeeById(employeeId);
    }

    handleAddEmployee(values: multi) {
        const { employeeEdit, AddUser } = this.props;
        const employeeId: number = Number(this.props.navigation.getParam('employeeId'));
        employeeEdit(values.nameSurname,Number(values.monthlySalary.replace(",",".")), values.mail, values.password, values.phoneNumber, values.identityNumber, values.address,Number(values.dailyPriceFood.replace(",",".")), employeeId, values.Active,values.AddAsUser);
        // if (values.mail != "" && values.password != "") {
        //     AddUser(values.nameSurname, values.mail, values.password);
        // }     

    };
    showSimpleMessage() {
        if (this.props.EmployeeUpdateMessage) {

            showMessage({
                message: this.props.EmployeeUpdateMessage,
                type: this.props.isSuccees ? "success" : "danger",
                icon: "auto"
            }
            );
        }
        if (this.props.isSuccees) {
            this.props.navigation.navigate('Employee');
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

    render() {
        if (this.props.isSuccees) {
            this.props.navigation.navigate('Employee');
        }
        if (this.state.UserType === "2") {
            return (<View style={styles.musteribulunamadiContainer}>
                <Text style={styles.musteribulunamadiText}>Bu Sayfaya Erişim İzniniz Yok</Text>
            </View>)
            ;
        }
        else {
            const employee = this.props.employee;
            if(this.props.isLoadignGetEmployee) {
                return (<Spinner color='01C3E3' />)
            }
            else {
                

            const initialValues: multi = {
                nameSurname: employee.employeeName ? employee.employeeName:"",
                monthlySalary: employee.monthlySalary ? employee.monthlySalary.toString() : "",
                mail: employee.mail ? employee.mail:"" ,
                password: employee.password ? employee.password : "",
                phoneNumber: employee.phoneNumber ? employee.phoneNumber : "",
                identityNumber: employee.identityNumber ? employee.identityNumber : "",
                address: employee.address ? employee.address :"",
                dailyPriceFood: employee.dailyPriceFood ? employee.dailyPriceFood.toString() : "",
                AddAsUser: this.props.employee.addAsUser ? employee.addAsUser:false,
                Active: this.props.employee.active ? employee.active : false,
            }

            return (
                <View style={styles.addCustomerContainer}>
                    <StatusBar backgroundColor="#2B6EDC" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                                <NavigationEvents
          onWillFocus={()=> this.props.getEmployeeById(this.props.navigation.getParam("employeeId"))}
        />
                        <ScrollView bounces={false} >
                            <Formik
                            enableReinitialize
                                initialValues={initialValues}
                                validationSchema={girdiler}
                                onSubmit={values => this.handleAddEmployee(values)}
                            >
                                {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched, setFieldValue }) => {

                                    const propsNew = { trackColor: { true: "#2069F3", false: null } }
                                    return (
                                        <View style={[styles.containerNew,{marginLeft:20,marginRight:20,marginTop:20}]} >
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
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 20, borderBottomColor: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-menu" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#959595' }}>Kimlik Numarası</Label>
                                                    <Input
                                                        value={values.identityNumber}
                                                        placeholderTextColor="#9A9A9A"
                                                        maxLength={11}
                                                        keyboardType="number-pad"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("identityNumber")}
                                                        onBlur={handleBlur("identityNumber")}
                                                    />
                                                </Item>
                                                <Text style={{ width: '100%', color: 'red' }}>{errors.identityNumber}</Text>
                                            </View>

                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 10, borderBottomColor: (touched.monthlySalary && errors.monthlySalary != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-card" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.monthlySalary && errors.monthlySalary != null) ? 'red' : '#959595' }}>Aylik Maaş</Label>
                                                    <Input
                                                        value={values.monthlySalary}
                                                        placeholderTextColor="#9A9A9A"
                                                        keyboardType="numeric"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("monthlySalary")}
                                                        onBlur={handleBlur("monthlySalary")}
                                                    />

                                                </Item>
                                                <Text style={{ width: '100%', color: 'red' }}>{errors.monthlySalary}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 10, borderBottomColor: (touched.dailyPriceFood && errors.dailyPriceFood != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-pizza" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{marginTop:-10, color: (touched.dailyPriceFood && errors.dailyPriceFood != null) ? 'red' : '#959595' }}>Günlük Yemek Ücreti</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.dailyPriceFood}
                                                        keyboardType="numeric"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("dailyPriceFood")}
                                                        onBlur={handleBlur("dailyPriceFood")}
                                                    />
                                                </Item>
                                                <Text style={{ width: '100%', color: 'red' }}>{errors.dailyPriceFood}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 10, borderBottomColor: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#2069F3' }}>
                                                <Icon name="ios-call" style={{color:'#a5a5a5'}}  />
                                                    <Label style={{ marginTop:-10,color: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595' }}>0511 111 11 11</Label>
                                                    <Input
                                                        maxLength={11}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.phoneNumber}
                                                        keyboardType="number-pad"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("phoneNumber")}
                                                        onBlur={handleBlur("phoneNumber")}
                                                    />
                                                </Item>
                                                <Text style={{ width: '100%', color: 'red' }}>{errors.phoneNumber}</Text>
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

                                            <View style={[styles.input, { flexDirection: 'row', paddingTop:10, paddingBottom:10 }]}>
                                                <CheckBox checked={values.Active} onPress={() => { setFieldValue('Active', !values.Active)  }}
                        
                                                />

                                                <Text style={{marginLeft:20,fontFamily:'Avenir Next',fontSize:18,marginTop:-2}}>Aktif Çalışan</Text>
                                            </View>
                                            <View style={[styles.input, { flexDirection: 'row' }]}>
                                                <Switch
                                                    {...propsNew}
                                                    onChange={() => { { setFieldValue('AddAsUser', !values.AddAsUser) } }}
                                                    value={values.AddAsUser}
                                                />
                                                <Text style={{fontFamily:'Avenir Next',fontSize:18,marginLeft:10,marginTop:-3}}>Sisteme Giris Bilgileri Ekle</Text>
                                            </View>
                                            {
                                                values.AddAsUser && <View style={{marginTop:15}}>
                                                    <View style={styles.input}>
                                                        <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.mail && errors.mail != null) ? 'red' : '#2069F3' }}>
                                                        <Icon name="ios-mail" style={{color:'#a5a5a5'}} />
                                                            <Label style={{ marginTop:-10,color: (touched.mail && errors.mail != null) ? 'red' : '#959595' }}>Mail Adresi</Label>
                                                            <Input
                                                                value={values.mail}
                                                                placeholderTextColor="#9A9A9A"
                                                                autoCapitalize="words"
                                                                onChangeText={handleChange("mail")}
                                                                onBlur={handleBlur("mail")}
                                                            />
                                                        </Item>
                                                        <Text style={{ color: 'red' }}>{errors.mail}</Text>
                                                    </View>
                                                    <View style={styles.input}>
                                                        <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.password && errors.password != null) ? 'red' : '#2069F3' }}>
                                                        <Icon name="ios-lock" style={{color:'#a5a5a5'}} />
                                                            <Label style={{marginTop:-10,color: (touched.password && errors.password != null) ? 'red' : '#959595' }}>Sifre</Label>
                                                            
                                                            <Input


                                                                placeholderTextColor="#9A9A9A"
                                                                value={values.password}
                                                                autoCapitalize="words"
                                                                onChangeText={handleChange("password")}
                                                                onBlur={handleBlur("password")}
                                                            />
                                                        </Item>
                                                        <Text style={{ width: '100%', color: 'red' }}>{errors.phoneNumber}</Text>
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
                                                    this.props.isLoading ? <Spinner></Spinner> : <Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Kaydet</Text>
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
}

const mapStateToProps = (state: AppState) => ({
    isSuccees: state.editEmployeReducer.isSuccess,
    EmployeeUpdateMessage: state.editEmployeReducer.EmployeeUpdateMessage,
    isSucceesUser: state.addUser.isSuccess,
    employee: state.editEmployeReducer.employee,
    isLoading: state.editEmployeReducer.isLoading,
    isLoadignGetEmployee : state.editEmployeReducer.isLoadignGetEmployee
})

function bindToAction(dispatch: any) {
    return {
        employeeEdit: (nameSurname: string, monthlySalary: number, mail: string, password: string, phoneNumber: string, identityNumber: string, address: string, dailyPriceFood: number, employeeId: number,active:boolean,addAsAUser:boolean) =>
            dispatch(employeeEdit(nameSurname, monthlySalary, mail, password, phoneNumber, identityNumber, address, dailyPriceFood, employeeId,active,addAsAUser)),
        getEmployeeById: (employeeId: number) =>
            dispatch(getEmployeeById(employeeId)),
    };
}

export default connect(mapStateToProps, bindToAction)(employeeEditScreen);