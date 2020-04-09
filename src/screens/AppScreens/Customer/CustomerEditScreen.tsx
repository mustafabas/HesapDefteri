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
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
// import styles from "./styles";
import stylesNew from "../../styles";
import styles from "../../styles";
import { customerEdit, Customer,getCustomerInfo } from "../../../redux/actions/customerEditAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
// import RNPickerSelect from 'react-native-picker-select';
// import Icon from "react-native-vector-icons/Ionicons";
import { GetUser } from "../../../redux/actions/getUserAction"
import { Input, CheckBox, Spinner, Button, Body, Item, Label, Textarea, ListItem, Switch,Icon } from "native-base";
import { showMessage } from "react-native-flash-message";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees: boolean;
  customerEdit: (id: number, nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: number,dayOfWeeks:string,adress : string,phoneNumber : string) => void;
  CustomerEditMessage: string;
  musteri: customerData;
  GetUser: (employeeId: number) => void;
  customer : Customer;
  loading :boolean;
  getCustomerInfo : (customerId : number) => void;
  
}

interface customerData {
  musteriAdiSoyadi: string;
  sirketAdi: string;
  fountainCount: number;
}



const girdiler = Yup.object().shape({
  musteriAdiSoyadi: Yup.string()
    .min(1)
    .max(30)
    .required()
});

interface State {
  dayOfWeek: number;
  tumgunler: boolean;
  pazartesi: boolean;
  sali: boolean;
  carsamba: boolean;
  persembe: boolean;
  cuma: boolean;
  cumartesi: boolean;
  pazar: boolean;
}

const initialValues: any = {
    musteriAdiSoyadi: "",
    sirketAdi: "",
    fountainCount: "",
    adress : "",
    phoneNumber : "",
    AllDays : true,
    monday : false,
    tuesday : false,
    wednesday : false,
    thusday : false,
    friday : false,
    saturday : false,
    sunday : false,
  
  }
class CustomerEditScreen extends Component<Props, State> {


    showSimpleMessage() {

        if (this.props.CustomerEditMessage) {
    
          showMessage({
            message: this.props.CustomerEditMessage,
            type: this.props.isSuccees ? "success" : "danger",
            icon: 'auto'
          }
          );
        }
      
      }




  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Müşteri Düzenle',



      

    }


  };


  constructor(props: Props) {
    super(props);
    this.state = {
      dayOfWeek: 0,
      tumgunler: false,
      pazartesi: false,
      sali: false,
      carsamba: false,
      persembe: false,
      cuma: false,
      cumartesi: false,
      pazar: false,
    };
  }

  

  componentWillMount(){
    this.props.getCustomerInfo(this.props.navigation.getParam("customerId"))


    // musteriAdiSoyadi.split(",").forEach(value=> {
    //   if(value==="0"){
    //     this.setState({
    //       tumgunler:true,
    //     })
    //   }
    //   if(value==="1"){
    //     this.setState({
    //       pazartesi:true,
    //     })
    //   }
    //   if(value==="2"){
    //     this.setState({
    //       sali:true,
    //     })
    //   }
    //   if(value==="3"){
    //     this.setState({
    //       carsamba:true,
    //     })
    //   }
    //   if(value==="4"){
    //     this.setState({
    //       persembe:true,
    //     })
    //   }
    //   if(value==="5"){
    //     this.setState({
    //       cuma:true,
    //     })
    //   }
    //   if(value==="6"){
    //     this.setState({
    //       cumartesi:true,
    //     })
    //   }
    //   if(value==="7"){
    //     this.setState({
    //       pazar:true,
    //     })
    //   }
    // } )
  }

  handleAlert() {
    Alert.alert(
      //title
      'Müşteri Düzenlendi!',
      //body
      '',
      [
        { text: 'Tamam' }
      ],
      { cancelable: false }
    );
    this.props.navigation.navigate("Customer");
  }

  handleEditCustomer(values ) {
    var gunler: string = "";
console.log(values)
    if(!((!values.AllDays) &&(!values.monday) && (!values.tuesday) && (!values.wednesday) &&(!values.thusday) && (!values.friday) &&  (!values.saturday) &&(!values.sunday))){
        if (values.AllDays) {
            gunler += "0";
          }
          else {
            if (values.monday) {
              gunler += "1,"
            }
            if (values.tuesday) {
              gunler += "2,"
            }
            if (values.wednesday) {
              gunler += "3,"
            }
            if (values.thursday) {
              gunler += "4,"
            }
            if (values.friday) {
              gunler += "5,"
            }
            if (values.saturday) {
              gunler += "6,"
            }
            if (values.sunday) {
              gunler += "7,"
            }
          }
          const { customerEdit, isSuccees, navigation } = this.props;
          customerEdit(this.props.navigation.getParam("customerId"), values.musteriAdiSoyadi, values.sirketAdi,0, values.fountainCount, gunler,values.adress ,values.phoneNumber);
      
    }

   
   
  };

  _setStateDayOfWeek(value: any) {
    this.setState({ dayOfWeek: value })

  }

  renderContent(){
     


            


                console.log("sayfa render")
                let musteri = this.props.customer
                let musteriAdiSoyadi = musteri.nameSurname
                let sirketAdi = musteri.companyName
                let fountainCount = musteri.fountainCount
                let adress = musteri.address
                let phoneNumber = musteri.phoneNumber

                var allDays = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("0") : false
               
                var monday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("1") : false
                var tuesday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("2") : false
                var wednesday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("3") : false
                var thusday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("4") : false
                var friday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("5") : false
                var saturday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("6") : false
                var sunday = this.props.customer.dayOfWeeks ? this.props.customer.dayOfWeeks.includes("07") : false



        
                return (
        
                 
                    <View style={styles.addCustomerContainer}>
                      <StatusBar backgroundColor="#2B6EDC" />
                      <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                      >
                        <ScrollView bounces={false}>

                          <Formik
                            enableReinitialize
                            initialValues={{musteriAdiSoyadi :  this.props.customer.nameSurname,
                            sirketAdi:  this.props.customer.companyName,
                            fountainCount:  this.props.customer.fountainCount,
                            adress :  this.props.customer.address,
                            phoneNumber :  this.props.customer.phoneNumber,
                            AllDays : allDays,
                            monday : monday,
                            tuesday : tuesday,
                            wednesday : wednesday,
                            thusday : thusday,
                            friday : friday,
                            saturday : saturday,
                            sunday : sunday}}
                            validationSchema={girdiler}
                            onSubmit={values => this.handleEditCustomer(values)}
                          >
              
                            {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm,touched,setFieldValue }) => {
              
              const propsNew = { trackColor: { true: "#2069F3", false: null } }
              
              
                              return (
                                <View>
                                  <View style={styles.inputContainer}>
                                    {/* <Text style={styles.FormLabel}>Adı Soyadı</Text> */}
                                    <View style={styles.input}>
                                     <Item  floatingLabel style={{marginTop:0,borderBottomColor: (touched.musteriAdiSoyadi && errors.musteriAdiSoyadi != null) ? 'red' : '#2069F3'}}>
                                      <Icon name="ios-person"  style={{color:'#a5a5a5'}} />
                                       <Label style={{marginTop:-10,color:(touched.musteriAdiSoyadi && errors.musteriAdiSoyadi != null) ? 'red' : '#959595',fontFamily:'Avenir Next'}}>Adı Soyadı</Label>
                                     <Input
              
                                      
                                      // underlineColorAndroid="transparent"
                                      style={{fontFamily:'Avenir Next',fontSize:18}}
                                      placeholderTextColor="#9A9A9A"
                                      value={values.musteriAdiSoyadi}

                                      autoCapitalize="words"
                                      onChangeText={handleChange("musteriAdiSoyadi")}
                                      onBlur={handleBlur("musteriAdiSoyadi")}
                                    />
                                     </Item>
                                    </View>
                                    {/* <Text style={styles.errorText}>{errors.musteriAdiSoyadi}</Text> */}
                                    {/* <Text style={styles.FormLabel}>Şirket Adı</Text> */}
                                    <View style={styles.input}>
              
                                    <Item  floatingLabel style={{marginTop:20,borderBottomColor: (touched.sirketAdi && errors.sirketAdi != null) ? 'red' : '#2069F3'}}>
                                    <Icon name="ios-business" style={{color:'#a5a5a5'}}  />
                                       <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.sirketAdi && errors.sirketAdi != null) ? 'red' : '#959595'}}>Şirket Adı</Label>
                                  
                                        <Input
                                        
                                        // style={styles.input}
                                        style={{fontFamily:'Avenir Next',fontSize:18}}
                                        placeholderTextColor="#9A9A9A"
                                        value={values.sirketAdi}
                                        autoCapitalize="words"
                                        onChangeText={handleChange("sirketAdi")}
                                        onBlur={handleBlur("sirketAdi")}
                                      />
                                      </Item>
                                      <Item  floatingLabel style={{marginTop:20,borderBottomColor: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#2069F3'}}>
                                      <Icon name="ios-call" style={{color:'#a5a5a5'}} />
                                       <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595'}}>Telefon Numarası</Label>
                                   
                                     <Input
                                      
                                      // underlineColorAndroid="transparent"
                                      style={{fontFamily:'Avenir Next',fontSize:18}}
                                      keyboardType= "phone-pad"
                                      placeholderTextColor="#9A9A9A"
                                      value={values.phoneNumber}
                                      autoCapitalize="words"
                                      onChangeText={handleChange("phoneNumber")}
                                      onBlur={handleBlur("phoneNumber")}
              
                                    />
                                     </Item>
                                  
              
              
                                     <Item  floatingLabel style={{maxHeight:80,marginTop:20,borderBottomColor: (touched.adress && errors.adress != null) ? 'red' : '#2069F3'}}>
                        <Icon name="ios-home" style={{minHeight:60,color:'#a5a5a5'}}/>
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.adress && errors.adress != null) ? 'red' : '#959595'}}>Adres</Label>
                   
                       <Input

                        multiline
                        style={{minHeight:100,maxHeight:100,fontFamily:'Avenir Next',fontSize:18}}
                        // underlineColorAndroid="transparent"

                        placeholderTextColor="#9A9A9A"
                        value={values.adress}
                        autoCapitalize="words"
                        onChangeText={handleChange("adress")}
                        onBlur={handleBlur("adress")}

                      />
                       </Item>
              
                                     
              
                                    </View>
                                    {/* <Text style={styles.errorText}>{errors.sirketAdi}</Text> */}
                                    {/* <Text style={styles.FormLabel}>Sebil Sayısı</Text> */}
                                    <View style={styles.input}>
                                    


                                      <Item  floatingLabel style={{marginTop:20,borderBottomColor: (touched.fountainCount && errors.fountainCount != null) ? 'red' : '#2069F3'}}>
                      <Icon name="ios-water" style={{color:'#a5a5a5'}} />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.fountainCount && errors.fountainCount != null) ? 'red' : '#959595'}}>Sebil Sayısı</Label>
                   
                          <Input

style={{fontFamily:'Avenir Next',fontSize:18}}
                          placeholderTextColor="#9A9A9A"

                          value={String(values.fountainCount)}
                          keyboardType="number-pad"
                          onChangeText={handleChange("fountainCount")}
                          onBlur={handleBlur("fountainCount")}
                        />
                        </Item>
                                    </View>
                                    {/* <Text style={styles.errorText}>{errors.fountainCount}</Text> */}
                                    <Text style={[styles.FormLabel,{color :((!values.AllDays) &&(!values.monday) && (!values.tuesday) && (!values.wednesday) &&(!values.thusday) && (!values.friday) &&  (!values.saturday) &&(!values.sunday))  ? 'red' : '#959595',marginTop:20,marginLeft:30,fontFamily:'Avenir Next' }]}>Sipariş Günleri</Text>


              
                                    <View>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('AllDays', !values.AllDays)}}}
                                      value={values.AllDays}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Tüm Günler</Text>
                          </Body>
                                      </ListItem>
                                      {!values.AllDays  && <View>
              
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('monday', !values.monday)}}}
                                      value={values.monday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Pazartesi</Text>
                          </Body>
                                      </ListItem>
              
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('tuesday', !values.tuesday)}}}
                                      value={values.tuesday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Salı</Text>
                          </Body>
                                      </ListItem>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('wednesday', !values.wednesday)}}}
                                      value={values.wednesday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Çarşamba</Text>
                          </Body>
                                      </ListItem>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('thusday', !values.thusday)}}}
                                      value={values.thusday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Perşembe</Text>
                          </Body>
                                      </ListItem>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('friday', !values.friday)}}}
                                      value={values.friday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Cuma</Text>
                          </Body>
                                      </ListItem>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('saturday', !values.saturday)}}}
                                      value={values.saturday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Cumartesi</Text>
                          </Body>
                                      </ListItem>
                                      <ListItem>
                                      
                                      <Switch 
                                      {...propsNew}
                                      onChange = {() => {{setFieldValue('sunday', !values.sunday)}}}
                                      value={values.sunday}
                                       />
                                       <Body>
                            <Text style={styles.checkBoxTextStyle}>Pazar</Text>
                          </Body>
                                      </ListItem>
                                      
                                        </View>}
              
                                    </View>
              
              
              
                                    <Button onPress={() => { handleSubmit() }} style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                                  shadowRadius: 5.00,
                                  
                                  elevation: 12,
              
                                  shadowColor: "#006c7e",
                  shadowOffset: {width: 3, height: 3 },
                  shadowOpacity: .5,
              
                  
                                  }}>
                                     {this.props.loading ? <Spinner  color='01C3E3' /> :   <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Kaydet</Text>}
                                     
                         
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

  render() {
    if(this.props.isSuccees) {
      this.props.navigation.goBack()

  }

    const { navigation } = this.props;

    var musteriAdiSoyadi: string = this.props.customer.nameSurname;
    var sirketAdi: string = this.props.customer.companyName;
    var dayOfWeek1: number = 0
    var fountainCount: number = Number(this.props.customer.fountainCount);
    // var dayOfWeekValue: number = 0; 
    // if (dayOfWeek1 != null) {
    //   dayOfWeekValue = +dayOfWeek1;

    // }
    // else {

    // }
    console.log(musteriAdiSoyadi)
    var days: string[] = [];
    days.push("Tümü");
    days.push("Pazartesi");
    days.push("Salı");
    days.push("Çarşamba");
    days.push("Perşembe");
    days.push("Cuma");
    days.push("Cumartesi");
    days.push("Pazar");
    // const placeHolderDay = {
    //   label: days[dayOfWeekValue],
    //   value: dayOfWeekValue,
    //   color: '#333',
    // }

    return (
        <View style={{flex:1}}>
            {this.renderContent()}

            {this.props.loading && <View style={{position:"absolute",right:0,left:0,top:0,bottom:0}}>
                <Spinner  />
            </View>}
        </View>
    )
  
  }
   
}

const mapStateToProps = (state: AppState) => ({
  isSuccees: state.customerEdit.isSuccess,
  CustomerEditMessage: state.customerEdit.CustomerEditMessage,
  customer : state.customerEdit.customer,
  loading : state.customerEdit.isSuccess,

})

function bindToAction(dispatch: any) {
  return {
    customerEdit: (id: number, nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: number,dayOfWeeks:string,adress : string,phoneNumber : string) =>
      dispatch(customerEdit(id, nameSurname, companyName, dayOfWeek, fountainCount,dayOfWeeks,adress,phoneNumber)),
    GetUser: (employeeId: number) =>
      dispatch(GetUser(employeeId)),
      getCustomerInfo : (customerId : number) => 
      dispatch(getCustomerInfo(customerId))
  };
}

export default connect(mapStateToProps, bindToAction)(CustomerEditScreen);