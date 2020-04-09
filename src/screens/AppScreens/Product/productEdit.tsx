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
import { CheckBox, Input, Item, Label, Button, Spinner } from 'native-base'
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import stylesNew from "../../styles";

import { productEdit, getProductById, IProduct } from "../../../redux/actions/productEditAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
// import { Icon } from "react-native-vector-icons/Icon";
import styles from "../Customer/styles";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees : boolean;
  productEdit : (id:number ,status : boolean , productName : string, productCode: string,price:number,productCount:number ) => void;
  ProductEditMessage: string;
  product: IProduct;
  getProductById : (productId : number) => void;
  Secondloading : boolean;
  loading: boolean;
  SecondisSuccess: boolean;

}

interface productData {
    productName : string;
    productCode: string;
    price:string;
}

interface state{
  status:boolean
}

const girdiler = Yup.object().shape({
  productName: Yup.string()
  .matches(/./g)
  .min(1)
  .max(30)
  .required(),
  productCode: Yup.string()
  .matches(/./g)
  .min(1)
  .max(30)
  .required(),
  productStatus: Yup.boolean()
  .required(),
});



class productEditScreen extends Component<Props,state> {


  

  static navigationOptions = ({ navigation }: Props) => {
    return {

    title: 'Ürün Bilgilerini Düzenle',
      


    }


  };

  showSimpleMessage() {

    if (this.props.ProductEditMessage) {

      showMessage({
        message: this.props.ProductEditMessage,
        type: this.props.isSuccees ? "success" : "danger",
        icon: 'auto'
      }
      );
    }

  
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      status:false,
    };
  }

  componentWillMount(){

    this.props.getProductById(this.props.navigation.getParam("productId"))
    this.setState({
      // status:this.props.navigation.getParam("productStatus"),
    })
  }

  handleAlert(){
      this.props.navigation.navigate("Products");
      Alert.alert(
        //title
        'Ürün Düzenleme Başarılı!',
        //body
        '',
        [
          {text: 'Tamam'}
        ],
        { cancelable: false }
      );      
  }

  handleEditProduct(values: IProduct) {
    const { productEdit } = this.props;
    productEdit(
      this.props.navigation.getParam("productId"),
    values.productStatus, 
    values.productName,
    values.productCode.toString(),
    Number(values.price.toString().replace(",",".")),values.productCount);

  };

  render() {
    if(this.props.isSuccees) {
      this.props.navigation.goBack()
    }
    const { navigation } = this.props;
    // var productName = this.props.product.productName
    // var productCode=this.props.product.productCode
    // var price= this.props.product.price
    // var productStatus =this.props.product.active
    if(this.props.Secondloading) {
      return(
        <Spinner style={{flex:1}}/>
      )

    }
    else {
      console.log(this.props.product.productCount)
      return (
        <View style={[styles.addCustomerContainer,{marginHorizontal:20}]}>
          <StatusBar backgroundColor="#2B6EDC"/>
  
  
          <View style={{marginBottom:30}}></View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView bounces={false}>
              <Formik
                initialValues={{productName : this.props.product.productName
                  ,productCode:this.props.product.productCode
                  ,price:this.props.product.price ? this.props.product.price.toString() : ""
                  ,productStatus :this.props.product.active,
                productCount : this.props.product.productCount ? this.props.product.productCount.toString() : "" }}
                validationSchema={girdiler}
                onSubmit={values => this.handleEditProduct(values)}
              >
                {props => {
                  return (                
                    <View>
                        <View>
                                          <View style={styles.containerNew} >
                                          <View style={[styles.input,{marginTop:20}]}>
                                                  <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.productName && props.errors.productName != null) ? 'red' : '#2069F3' }}>
                                                      <Label style={{ color: (props.touched.productName && props.errors.productName != null) ? 'red' : '#959595' }}>Ürün Adı</Label>
                                                      <Input
                                                          style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                          placeholderTextColor="#9A9A9A"
                                                          value={(props.values.productName || props.handleChange("productName")) ? props.values.productName : this.props.product.productName }
                                                          autoCapitalize="words"
                                                          onChangeText={props.handleChange("productName")}
                                                          onBlur={props.handleBlur("productName")}
                                                      />
                                                  </Item>
                                              </View>
  
                                              <View style={[styles.input,{marginTop:20}]}>
                                                  <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.productCode && props.errors.productCode != null) ? 'red' : '#2069F3' }}>
                                                      <Label style={{ color: (props.touched.productCode && props.errors.productCode != null) ? 'red' : '#959595' }}>Ürün Kodu</Label>
                                                      <Input
                                                          style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                          placeholderTextColor="#9A9A9A"
                                                          value={(props.values.productCode || props.handleChange("productCode")) ? props.values.productCode : this.props.product.productCode }
                                                          autoCapitalize="words"
                                                          onChangeText={props.handleChange("productCode")}
                                                          onBlur={props.handleBlur("productCode")}
                                                      />
                                                  </Item>
  
                                              </View>
                                              <View style={[styles.price,{marginTop:20}]}>
                                                  <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.price && props.errors.price != null) ? 'red' : '#2069F3' }}>
                                                      <Label style={{ color: (props.touched.price && props.errors.price != null) ? 'red' : '#959595' }}>Ürün Fiyatı</Label>
                                                      <Input
  
                                                          style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                          placeholderTextColor="#9A9A9A"
                                                          autoCapitalize="none"
                                                          value={(props.values.price || props.handleChange("price")) ? props.values.price : this.props.product.price }
                                                          keyboardType="numeric"
                                                          onChangeText={props.handleChange("price")}
                                                          onBlur={props.handleBlur("price")}
                                                      />
                                                  </Item>
  
                                              </View>   
                                              <View style={[styles.price,{marginTop:20}]}>
                                                  <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#2069F3' }}>
                                                      <Label style={{ color: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#959595' }}>Ürün Adeti</Label>
                                                      <Input
  
                                                          style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                          placeholderTextColor="#9A9A9A"
                                                          autoCapitalize="none"
                                                          value={(props.values.productCount || props.handleChange("productCount")) ? props.values.productCount : this.props.product.productCount.toString() }
                                                          keyboardType="numeric"
                                                          onChangeText={props.handleChange("productCount")}
                                                          onBlur={props.handleBlur("productCount")}
                                                      />
                                                  </Item>
  
                                              </View> 
                                            <View style={{flexDirection : 'row',marginTop:20}}>
                                            <CheckBox
  
                        checked={(props.values.productStatus || props.handleChange("productStatus")) ? props.values.productStatus : this.props.product.productStatus }
                        onPress={() => props.setFieldValue('productStatus',!props.values.productStatus)}
                      />
                      <Label style={{marginLeft:30}}>Ürün Kullanılmaya Devam Edecek</Label>
                                            </View>
  
  
                                              <Button onPress={() => props.handleSubmit()}
                                                  style={{
                                                      justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
                                                      shadowRadius: 5.00,
                                                      elevation: 12,
                                                      shadowColor: "#006c7e",
                                                      shadowOffset: { width: 3, height: 3 },
                                                      shadowOpacity: .5,
                                                  }}>
                                                  {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Güncelle</Text>}
                         
                                              </Button>
                                          </View>
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
}

const mapStateToProps = (state : AppState) => ({
  isSuccees : state.productEdit.isSuccess,
  ProductEditMessage :state.productEdit.ProductEditMessage,
  product : state.productEdit.product,
  Secondloading : state.productEdit.Secondloading,
  loading: state.productEdit.loading,
  SecondisSuccess: state.productEdit.SecondisSuccess,
})

function bindToAction(dispatch : any) {
  return {
    productEdit : (id:number ,status : boolean , productName : string, productCode: string,price:number,productCount:number ) =>
    dispatch(productEdit(id,status,productName,productCode,price,productCount)),
    getProductById : (productId : number) => 
    dispatch(getProductById (productId))
  };
}

export default connect(mapStateToProps,bindToAction)(productEditScreen);