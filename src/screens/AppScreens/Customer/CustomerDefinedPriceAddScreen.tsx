//bu sayfa henüz oluşturulmadı.
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
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../..//styles";

// import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { GetCustomerProduct } from "../../../redux/actions/customerPriceGetProductAction";
import { ICustomerPriceProductItem } from "../../../redux/models/customerPriceProductModel";
import {customerPriceAdd} from "../../../redux/actions/customerpriceAddAction";
import {ICustomerPriceItem} from "../redux/models/addCustomerPriceModel";
import { Input, Picker ,Button, Card, CardItem,Body, Item,Label} from "native-base";
import { showMessage } from "react-native-flash-message";
import { InfoItem } from "../../../components/InfoItem";
import { Dimensions } from "react-native";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading : boolean;
  products : ICustomerPriceProductItem[];
  GetCustomerProduct : (customerId:number) => void;
  customerPriceAdd : (productId:number, customerId:number,price:number)=>void;
  isSuccees : boolean;

  message : string;
}

interface State {
    productId:number,
    customerId:number;  
    price:string,
}

interface Item {
  label: string;
  value: number;
  key?: string | number;
  color?: string;
}

interface input{
  price:string,
}

const girdiler = Yup.object().shape({
  
});
class CustomerDefinedPriceAddScreen extends Component<Props, State> {


  showSimpleMessage() {

    if (this.props.message) {

      showMessage({
        message: this.props.message,
        type: this.props.isSuccees ? "success" : "danger",
        icon: 'auto'
      }
      );
    }

  }


  constructor(props: Props) {
    super(props);
    this.state = {
      productId:0,
      customerId:this.props.navigation.getParam("customerId"),
      price:"",
    };
  }

  static navigationOptions =  ({navigation}:Props) => {
    return {
  
      title: 'Yeni Fiyat',
 
  
  
    headerStyle: {
      backgroundColor: '#2B6EDC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  
    }
  
    
  };



  yeniFiyat(values:input){
    const { customerPriceAdd } = this.props;

    
      customerPriceAdd(this.state.productId, this.state.customerId, Number(values.price.replace(",",".")));

   
  }



  OrderInfo(productId:number){
    this.setState({
      productId: productId,
    })
  }
  
  PickerMenuCreate(){

    var PickerModel :Item[] = [];
      
      this.props.products.forEach((product:ICustomerPriceProductItem) => {
            var productItem : Item={
                label : product.productName,
                value :product.productId,
            }
            PickerModel.push(productItem);   
   
      });

      return PickerModel;
  }

  componentWillMount() {
    this.props.GetCustomerProduct(this.state.customerId);
    
  }
  onValueChange2(value: string) {

    this.setState({
      selected2: value,

      productId: value,
    });}

    renderContent(){

      const initialValues:input={
        price:this.state.price,
      }
  
      const placeholder = {
        label: 'Ürün Seçiniz...',
        value: '',
        color: '#2B6EDC',
  
      };

      if(this.props.isProductLoading === false && this.props.products.length < 1)
{
  return(
    <View style={{marginTop:Dimensions.get('window').width / 3}}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddProduct')} >



     <InfoItem  text="Sisteme eklediğiniz ürün bulunmakatadır. Ürünlerinizi yönetmek için eklemeye şimdi başlayın!" />

     
     </TouchableOpacity>
    </View>
    )

}else {
  return(
   
    <Formik

    enableReinitialize
    initialValues={initialValues}
    validationSchema={girdiler}
    onSubmit={values => this.yeniFiyat(values)}
  >
    {props => {
      const {touched,errors} = props
      return (
        <View>
          
          <View style={{marginHorizontal : 20}}>
          <View  >
          <Picker
placeholderStyle={{width:'100%'}}
headerTitleStyle={{color:'white',fontFamily:'Avenir Next',fontSize:18}}
headerStyle={{backgroundColor: '#2B6EDC'}}
iosHeader="Ürünler"
headerBackButtonTextStyle={{color:'white'}}
      mode="dropdown"
      iosIcon={<Icon name="ios-arrow-down" />}
      style={{ width:'100%'}}
      placeholder="Ürün Seçimi"
      placeholderStyle={{ color: "#bfc6ea" }}
      placeholderIconColor="#007aff"
      selectedValue={this.state.selected2}
      // onValueChange={this.onValueChange2.bind(this)}
      onValueChange={(itemValue, itemIndex) =>
        this.onValueChange2(itemValue)
      }>
    
      {this.PickerMenuCreate().map((res)=> {
          return (
            <Picker.Item label={res.label} value={res.value} />
          )
      })}
      

    </Picker>
          </View>
          <View style={{marginHorizontal: 15,marginTop:10}}>
            

<Item  floatingLabel style={{marginTop:0,borderBottomColor: (touched.price && errors.price != null) ? 'red' : '#2069F3'}}>
                        <Icon name="ios-person" style={{color:'#a5a5a5'}}  />
                         <Label style={{fontFamily:'Avenir Next',marginTop:-10,color:(touched.price && errors.price != null) ? 'red' : '#959595'}}>Ürün Fiyatı</Label>
                         <Input
              
              placeholder=""
              placeholderTextColor="#9A9A9A"
              keyboardType="numeric"
              value={props.values.price}
              onChangeText={props.handleChange("price")}
              onBlur={props.handleBlur("price")}
            />
                       </Item>

            </View>
            

            <Button onPress={props.handleSubmit}  style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
          shadowRadius: 5.00,
          
          elevation: 12,

          shadowColor: "#006c7e",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,


          }}>
            {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Tanımlı Fiyat Ekle</Text>}
             
 
</Button>

          </View>
        </View>
      );
    }}
  </Formik>

  )
}
}
    

  render() {

    if(this.props.isSuccees) {
      this.props.navigation.goBack()
    }
   
   



    return (
      <View style={styles.addCustomerContainer}>

   
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {this.renderContent()}
          <ScrollView bounces={false}>  

          
        
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isProductLoading : state.customerPriceGetProduct.isProductLoading,
  products : state.customerPriceGetProduct.products,
  isSuccees: state.addCustomerPrice.isSuccess,
  message: state.addCustomerPrice.AddCustomerPriceMessage
})
function bindToAction(dispatch: any) {
  return {
    GetCustomerProduct: (customerId:number) =>
    dispatch(GetCustomerProduct(customerId)),
    customerPriceAdd: (productId:number, customerId:number,price:number) =>
    dispatch(customerPriceAdd(productId,customerId,price))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(CustomerDefinedPriceAddScreen);