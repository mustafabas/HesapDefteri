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
import styles from "./styles";
import {Input,CheckBox, Item, Label, ListItem,Body, Switch, Textarea, Button,Spinner,Icon } from 'native-base'
import { customerAdd } from "../../../redux/actions/customerAddAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";

import { showMessage } from "react-native-flash-message";

// import Icon from "react-native-vector-icons/Ionicons";
// import RNPickerSelect from 'react-native-picker-select';
// import { Input, CheckBox } from "react-native-elements";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees: boolean;
  customerAdd: (nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: string, dayOfWeeks: string,address:string,phoneNumber:string) => void;
  CustomerAddMessage: string;
  musteri: customerData;
  loading : boolean;
  isTried : boolean;
}

interface customerData {
  musteriAdiSoyadi: string;
  sirketAdi: string;
  fountainCount: string;
  adress : string;
  phoneNumber : string;
  AllDays : boolean;
  monday : boolean;
  tuesday : boolean;
  wednesday : boolean;
  thusday : boolean;
  friday : boolean;
  saturday : boolean;
  sunday : boolean;
}
const initialValues: any = {
  musteriAdiSoyadi: "",
  sirketAdi: "",
  fountainCount: "",
  adress : "",
  phoneNumber :  "",
  AllDays : true,
  monday : false,
  tuesday : false,
  wednesday : false,
  thusday : false,
  friday : false,
  saturday : false,
  sunday : false,

}

interface CustomerInserState {
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

Yup.addMethod(Yup.object, 'atLeastOneOf', function(list) {
  return this.test({
    name: 'atLeastOneOf',
    message: '${path} must have at least one of these keys: ${keys}',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: value => value == null || list.some(f => value[f] != true)
  })
})




const girdiler = Yup.object().shape({
  musteriAdiSoyadi: Yup.string()
  .min(3).max(30)
    .required("*Zorunlu Alan"),

// AllDays : Yup.bool(),
//   monday : Yup.bool(),
//   tuesday : Yup.bool(),
//   wednesday : Yup.bool(),
//   thusday : Yup.bool(),
//   friday : Yup.bool(),
//   saturday : Yup.bool(),
//   sunday : Yup.bool(),
})
// .atLeastOneOf(['AllDays', 'monday','tuesday','wednesday','thusday','friday','saturday','sunday'])
// ;


class addCustomer extends Component<Props, CustomerInserState> {



  showSimpleMessage() {

    if (this.props.isTried) {

      showMessage({
        message: this.props.CustomerAddMessage,
        type: this.props.isSuccees ? "success" : (this.props.CustomerAddMessage === "Limitli pakete sahip üyelerimiz tanımlanandan fazla müşteri ekleyememektedir. Lütfen destek sayfamızdan bizimle iletişime geçiniz" ? "warning" : "danger"),
        icon: 'auto'
      }
      );
    }
  
  }




  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Müşteri Ekle',
      //       headerRight: <TouchableOpacity style={{marginRight:20}}  onPress={()=> navigation.navigate('CustomerAdd')}>
      // <Icon name="ios-add" size={40} style={{color:'white'}} />
      //       </TouchableOpacity>,


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


  _SetStateDay(value: number) {

    this.setState({ dayOfWeek: value });
  }

  handleAddCustomer(values: customerData) {
    var gunler: string = "";
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
        if (values.thusday) {
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
      
    }
    const { customerAdd } = this.props;
      customerAdd(values.musteriAdiSoyadi, values.sirketAdi, 0, values.fountainCount.length > 0 ? values.fountainCount : "0" , gunler,values.adress,values.phoneNumber);
  
    
  };

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

              initialValues={{musteriAdiSoyadi: "",
              sirketAdi: "",
              fountainCount: "",
              adress : "",
              phoneNumber : this.props.navigation.getParam('phoneNumber'),
              AllDays : true,
              monday : false,
              tuesday : false,
              wednesday : false,
              thusday : false,
              friday : false,
              saturday : false,
              sunday : false}}
              validationSchema={girdiler}
              onSubmit={values => this.handleAddCustomer(values)}
            >

              {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm,touched,setFieldValue }) => {

const propsNew = { trackColor: { true: "#2069F3", false: null } }


                return (
                  <View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.FormLabel}>Adı Soyadı</Text> */}
                      <View style={styles.input}>
                       <Item  floatingLabel style={{marginTop:0,borderBottomColor: (touched.musteriAdiSoyadi && errors.musteriAdiSoyadi != null) ? 'red' : '#2069F3'}}>
                        <Icon name="ios-person" style={{color:'#a5a5a5'}}  />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.musteriAdiSoyadi && errors.musteriAdiSoyadi != null) ? 'red' : '#959595'}}>Adı Soyadı</Label>
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

                      <Item  floatingLabel style={{marginTop:15,borderBottomColor: (touched.sirketAdi && errors.sirketAdi != null) ? 'red' : '#2069F3'}}>
                      <Icon name="ios-business" style={{color:'#a5a5a5'}}  />
                         <Label style={{fontFamily:'Avenir Next',color:(touched.sirketAdi && errors.sirketAdi != null) ? 'red' : '#959595',marginTop:-10}}>Şirket Adı</Label>
                          
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
                        <Icon name="ios-call" style={{color:'#a5a5a5'}}  />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595'}}>Telefon Numarası</Label>
                   
                       <Input

style={{fontFamily:'Avenir Next',fontSize:18}}
                        // underlineColorAndroid="transparent"
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
                      <View  style={styles.input}>
                      <Item  floatingLabel style={{marginTop:20,borderBottomColor: (touched.Sebil && errors.Sebil != null) ? 'red' : '#2069F3'}}>
                      <Icon name="ios-water" style={{color:'#a5a5a5'}} />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.Sebil && errors.Sebil != null) ? 'red' : '#959595'}}>Sebil Sayısı</Label>
                   
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


                      <Text style={[styles.FormLabel,{color :((!values.AllDays) &&(!values.monday) && (!values.tuesday) && (!values.wednesday) &&(!values.thusday) && (!values.friday) &&  (!values.saturday) &&(!values.sunday))  ? 'red' : '#959595',marginTop:20,marginLeft:30 }]}>Sipariş Günleri</Text>



                      <View style={{marginTop:10}}>
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



                      <Button onPress={() => { handleSubmit() }} style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#216AF4',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#216AF4",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                       {this.props.loading ? <Spinner  color='01C3E3' /> :   <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Ekle</Text>}
                       
           
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
  isSuccees: state.customerAdd.isSuccess,
  CustomerAddMessage: state.customerAdd.CustomerAddMessage,
    loading : state.customerAdd.loading,
    isTried : state.customerAdd.isTried,
})

function bindToAction(dispatch: any) {
  return {
    customerAdd: (nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: string, dayOfWeeks: string,address:string,phoneNumber:string) =>
      dispatch(customerAdd(nameSurname, companyName, dayOfWeek, fountainCount, dayOfWeeks,address,phoneNumber))
  };
}

export default connect(mapStateToProps, bindToAction)(addCustomer);