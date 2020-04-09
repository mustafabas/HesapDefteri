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
  Alert,FlatList
} from "react-native";
import { NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
// import styles from "../../styles";

// import RNPickerSelect from 'react-native-picker-select';

import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { GetProducts } from "../../../redux/actions/productAction";
import { IProductItem } from "../../../redux/models/productAddModel";
import { AddOrder, notificationEmployee ,AddOrderMultiple, lastOrderInterface, getLastOrder, addOrderAgain} from "../../../redux/actions/addOrderAction";
// import { IAddOrderItem } from "../redux/models/addOrderModel";
import { GetProduct, resetProduct } from "../../../redux/actions/productForCustomerAction";
import { IProductForCustomerItem } from "../../../redux/models/productForCustomerModel";
import { Input, CheckBox,Picker, Item, Label, Button, Spinner, Card, CardItem,Body,Icon } from "native-base";
import { showMessage } from "react-native-flash-message";
import { InfoItem } from "../../../components/InfoItem";
import RBSheet from "react-native-raw-bottom-sheet";
import { NotificationService } from "../../../services/NotificationService";
import styles from "./styles";


export interface product {
  index : number;
  productId : number | null;
  unitPrice : string;
  productCount : string; 
  productCode : string;
  productGotUnitPrice : boolean;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading: boolean;
  products: IProductItem[];
  GetProducts: () => void;
  AddOrder: (productId: number, customerId: number, unitPrice: number, count: number,isPaid:boolean) => void;
  isSuccees: boolean;
  notificationEmployee : notificationEmployee;
  AddOrderMessage: string;
  GetProduct: (productId: number, customerId: number) => void;
  getLastOrder : (customerId : number) => void;
  product: IProductForCustomerItem;
  resetProduct : () => void;
  AddOrderMultiple : (productList : product[],isPaid : boolean,customerId : number) => void;
  isTried : boolean;
  isLoading : boolean;
  lastOrder : lastOrderInterface;
  addOrderAgain : (orderId : number,customerId : number) => void;
  
}

interface State {
  productName: string;
  productCode: string;
  unitPrice: string;
  date: string;
  productId: number;
  count: string;
  isSuccess: boolean;
  status: boolean;
  selected2:boolean;
  orderAddedSuccessfully: boolean;
  selectedEmployee : number;
  notificationIsSend : boolean;
  productList : product[];
  indexOfGottenProduct : number;


}

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
}

interface input {
  count: string,
  unitPrice: string,
}

const girdiler = Yup.object().shape({
  count: Yup.number()
    .positive()
    .required(),

});
class orderAdd extends Component<Props, State> {

  showSimpleMessage() {

    if (this.props.AddOrderMessage ) {

      showMessage({
        message: this.props.AddOrderMessage,
        type: this.props.isSuccees ? "success" : "danger",
        icon: 'auto'
      }
      );
    }
  
  }

  




  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Sipariş Ekle',



      headerStyle: {
        backgroundColor: '#2B6EDC',
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
      productId: 0,
      productName: "",
      productCode: "",
      unitPrice: "",
      date: "",
      count: "1",
      isSuccess: false,
      status:false,
      selected2: null,
      selectedProductValue : null,
      orderAddedSuccessfully : false,
      selectedEmployee : 0,
      notificationIsSend : false,
      productList : [{index:0,productId:null,productCount:"",unitPrice:"",productCode:"",productGotUnitPrice:true},
      ],
indexOfGottenProduct : 0
    };
   
  }


  handleAlert() {
    this.props.navigation.navigate("OrdersCustomer", { customerId: this.props.navigation.getParam("customerId") });
    Alert.alert(
      //title
      'Yeni Sipariş Oluşturuldu!',
      //body
      '',
      [
        { text: 'Tamam' }
      ],
      { cancelable: false }
    );
  }

  siparisOlustur(values: input) {

    const { AddOrder, navigation, isSuccees } = this.props;
    var customerId = navigation.getParam("customerId");
    console.log(this.state.productId);
    if(this.state.productId===0) {
      showMessage({
        message: "Sipariş Eklemek için ürün seçmelisiniz.",
        type:  "danger",
        icon: 'auto'
      }
      );
    }
   else {
    AddOrder(this.state.productId, customerId, Number(values.unitPrice.replace(",",".")), Number(values.count),this.state.status);
   }
    // this.handleAlert()
  }

  OrderInfo(productId: number) {
    this.props.GetProduct(productId, this.props.navigation.getParam("customerId"));
    this.setState({
      productId: productId,
    });
  }
  PickerMenuCreate() {
    var PickerModel: Item[] = [];
    PickerModel.push({
      value:0,
      label:'Seçiniz'
    });
    this.props.products.forEach((product: IProductItem) => {
      var productItem: Item = {
        label: product.productName,
        value: product.productId,
      }
      PickerModel.push(productItem);
    });

    return PickerModel;
  }

  componentWillMount() {
    this.props.resetProduct();
    
    this.props.GetProducts();
    var dateAta: string;
    var date = new Date();
    dateAta = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    this.setState({ date: dateAta });
    this.props.getLastOrder(this.props.navigation.getParam("customerId"))

  }

 
onValueChange2(value: string) {
  console.log(value,  "value");
  this.setState({
    selected2: value,
    selectedProductValue : this.props.products.find(task => (task.productId=== Number(value)), this)?.productCode,
    productId: value,
  },   ()=> this.props.GetProduct(Number(value), this.props.navigation.getParam("customerId")));

 



  


  //  this.OrderInfo(Number(value))
}

insertAndSendPush() {
  this.chooseEmployee.close();
  showMessage({
    message: "Sipariş ataması yapıldı.",
    type: "success" ,
    icon: 'auto'
  }
  );


  let tmp = this.props.notificationEmployee.userWithToken.find(e => e.id == this.state.selectedEmployee);
  if(tmp) {
    const notificationService = new NotificationService(tmp.id,1,this.props.notificationEmployee.orderId,tmp.tokens);
     notificationService.addNotification();

  }
  this.setState({notificationIsSend : true})
  this.props.navigation.goBack()

  
}

_renderChooseEmployeeContent(){
  const selectedEmployee = this.state.selectedEmployee
  return(
    <View>
      <TouchableOpacity onPress={()=> this.chooseEmployee.close()} style={{position :'absolute',right:5,top:5,zIndex:10}}>
      <Icon name="ios-close" style={{fontFamily:40}} />
      </TouchableOpacity>

   <ScrollView style={{height:400}}>
   <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:18}}>Siparişi Çalışanlara Ata</Text>


<FlatList
        data={this.props.notificationEmployee ? this.props.notificationEmployee.userWithToken : null}
        renderItem={({ item }) => <TouchableOpacity onPress={()=>this.setState({selectedEmployee : (selectedEmployee === item.id ? 0 : item.id)})}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor:selectedEmployee === item.id ? '#216AF4' : 'white'}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:20,paddingVertical:5,textAlign:'center',color: selectedEmployee === item.id ? 'white' : 'black'}}>
 {item.name}
 
 </Text>
 </TouchableOpacity>
 }
        keyExtractor={item => item.id.toString()}
      />

<Button onPress={()=> this.insertAndSendPush()} disabled={this.state.selectedEmployee === 0} style={{marginTop:20,justifyContent:'center',marginHorizontal:10,paddingVertical:5,borderRadius:5,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                      {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Gönder</Text>}
                       
           
          </Button>

          <Button  onPress={()=> this.chooseEmployee.close()} style={{justifyContent:'center',marginTop:20,marginHorizontal:10,paddingVertical:5,borderRadius:5,backgroundColor:'white',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#969696",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            {this.props.isLoading ? <Spinner /> : <Text style={{color:'#49B1FD',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Vazgeç</Text>}
          </Button>


   </ScrollView>
    </View>
  )
}

renderProducts(index : number){
  return(
    <View>




    <View style={{flexDirection:'row'}}>
<View style={{flex:.9}}>

<Picker
placeholderStyle={{color: "#bfc6ea"}}
headerStyle={{backgroundColor:'#2069F3'}}
headerTitleStyle={{color:'white',fontFamily:'Avenir Next',fontSize:18}}
// headerStyle={{backgroundColor: '#2B6EDC'}}
iosHeader="Ürünler"
headerBackButtonTextStyle={{color:'white'}}
mode="dropdown"
iosIcon={<Icon name="ios-arrow-down" />}
style={{ flex:1}}
placeholder="Ürün Seçimi"

placeholderIconColor="#007aff"
selectedValue={this.state.productList[index].productId}
// onValueChange={this.onValueChange2.bind(this)}
onValueChange={(itemValue, itemIndex) =>
  this.changeValueOfProductList("productId",itemValue,index)
}>

{this.PickerMenuCreate().map((res)=> {
    return (
      <Picker.Item label={res.label} value={res.value} />
    )
})}


</Picker>
  </View>
{index > 0 && this.state.productList.length - 1 === index && <TouchableOpacity 
onPress={()=> {
  var list = this.state.productList;
  list.pop()
  this.setState({productList:list})
}}
style={{flex:.1,marginTop:Platform.OS === 'ios' ? 5 : 0}}>
  <Icon name="minus-circle" type="FontAwesome" style={{color:'#db5252'}} />
</TouchableOpacity>}
      </View>







<View style={{flexDirection:'row',flex:1,paddingHorizontal:10}}>

<Item style={{flex:.5}} floatingLabel>
        <Label style={{fontFamily:'Avenir Next',fontSize:18,}}>
        Adet:
        </Label>
        <Input
          placeholderTextColor="#9A9A9A"
          keyboardType="numeric"
          value={this.state.productList[index].productCount}
          onChangeText={e => this.changeValueOfProductList("productCount",e,index)}
          // onBlur={props.handleBlur("count")}
        />
       </Item>


    <Item  floatingLabel style={{flex:.5}}>
  <Label style={{fontFamily:'Avenir Next',fontSize:18}}>
  Birim Fiyat: 

  </Label>
    
     {/* <View style={styles.input}> */}
        <Input
          // style={styles.input}
          // placeholder="Ürün Adedi"
          placeholderTextColor="#9A9A9A"
          keyboardType="numeric"
          value={this.state.productList[index].unitPrice}
          onChangeText={e => this.changeValueOfProductList("unitPrice",e,index)}
          // onBlur={props.handleBlur("unitPrice")}
        />
        </Item>
      
  </View>
      
      {/* </View>   */}


      {this.state.productList.length < index + 2 && this.state.productList[index].productCount !== "" && 
      this.state.productList[index].productId !== null && 
  <TouchableOpacity 

  onPress={()=> {
    var list = this.state.productList
    list.push({index:index + 1,productId:null,productCount:"",unitPrice:"",productCode:"",productGotUnitPrice:true});
    this.setState({productList : list});
    
  }}

  
  style={{marginLeft:10,marginTop:10,backgroundColor:'#216AF4',borderRadius:5,padding:5,alignSelf: 'flex-start'}}>
<Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',textDecorationLine:"underline"}} >Daha Fazla Ekle</Text>
       
  </TouchableOpacity>}
  
    



</View>
  )
}
changeValueOfProductList(type : string, value : string,index : number){

  var list = this.state.productList ; 
  var listItem = list[index];
  if(type === "productId"){
    // this.setState({
    //   selected2: value,
    //   // selectedProductValue : ,
    //   productId: value,
    // },   );
    listItem.productCode = this.props.products.find(task => (task.productId=== Number(value)), this)?.productCode ?? ""
    this.setState({indexOfGottenProduct : index})
    listItem.productGotUnitPrice = false,

     this.props.GetProduct(Number(value), this.props.navigation.getParam("customerId"))
  }
  listItem = {
    ...listItem,
    [type] : value
  }
  list[index] = listItem
  this.setState({productList : list});

}
renderListOfProducts(){

    

   return this.state.productList.map((data) => {
    return this.renderProducts(data.index)
    })



}
addOrderMulti(){
  var list = this.state.productList
  for (let index = 0; index < this.state.productList.length; index++) {
    var element = this.state.productList[index].unitPrice;
    element = element.replace(",",".")
    list[index].unitPrice = element;


    
  }


  let lastProduct = this.state.productList[this.state.productList.length - 1];
  if(lastProduct.productId!==null && lastProduct.productId > 0 && lastProduct.unitPrice!== null && lastProduct.unitPrice !== "", lastProduct.productCount !== null && lastProduct.productCount !== "") {
    this.props.AddOrderMultiple(list,this.state.status,this.props.navigation.getParam("customerId"));

  }
  else {
    
    showMessage({
      message: "Lütfen tüm alanları doldurunuz",
      type:"info",
      icon: 'auto'
    })
  }



  
}

renderContent(){

  const initialValues: input = {
    count: this.state.count,
    unitPrice: this.props.product.unitPrice ? String(this.props.product.unitPrice) : "",
  }


 if(this.props.isProductLoading !== true && this.props.products.length < 1){
    return (<View style={{marginTop:100}}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddProduct')} >

    


<InfoItem text="Sisteme eklediğiniz ürün bulunmakatadır. Sipariş Eklemek için ürün eklemeye şimdi başlayın!" />



</TouchableOpacity>
    </View>);
  }else {

    var lastOrderProductList = ""
    console.log(this.props.lastOrder, "lastOrder")
    if(this.props.lastOrder && this.props.lastOrder.orderProducts &&  this.props.lastOrder.orderProducts.length > 0) {
      let indexOfList = this.props.lastOrder.orderProducts.length > 2 ? 3 : this.props.lastOrder.orderProducts.length
      for (let index = 0; index < indexOfList; index++) {
        lastOrderProductList = lastOrderProductList + ", " + this.props.lastOrder.orderProducts[index].productName;
      }
   lastOrderProductList =lastOrderProductList.slice(2);
    }
    
    return (
       
    <View>
    <View>
    </View>
    <View style={[styles.rnpickerselect,{paddingTop:20,paddingRight:20}]}>
    
      {
      this.renderListOfProducts()
      }
      


      <View style={{flexDirection:'row',marginTop:30,marginLeft:10}}>
      <CheckBox

// containerStyle={styles.chechBoxContainer}             


style={{marginLeft:-5}}
checked={this.state.status}
onPress={() => this.setState({ status: !this.state.status })}
/>
<Label style={{marginLeft:20}}>
Pesin Odeme
</Label>
      </View>

      </View>
    <View style={[styles.inputContainer,{paddingTop:0}]}>
  
        {/* <Text style={styles.odenecekText}>Toplam Fiyat: {(Number(props.values.unitPrice.replace(",",".")) * Number(props.values.count))} TL</Text> */}

      {/* <TouchableOpacity style={styles.siparisButtonContainer}>
        <Text style={styles.amountButtonText}
         
        >Sipariş Ekle</Text>
      </TouchableOpacity> */}



      <Button disabled={ this.state.orderAddedSuccessfully }
      onPress={()=> this.addOrderMulti()}
      style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
    shadowRadius: 5.00,
    
    elevation: 12,

    shadowColor: "#006c7e",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,


    }}>
      {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Ekle</Text>}
       

</Button>

{!this.state.notificationIsSend && this.state.orderAddedSuccessfully && this.props.notificationEmployee && this.props.notificationEmployee.userWithToken.length > 0  && <Button   onPress={()=> this.chooseEmployee.open()} style={{justifyContent:'center',marginTop:0,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'white',
            shadowRadius: 5.00,
            
            elevation: 12,

            shadowColor: "#969696",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,


            }}>
   <Text  style={{color:'#49B1FD',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Siparişi Ata</Text>
  </Button>
}

{lastOrderProductList.length > 0 && 
  <TouchableOpacity onPress={() => this.lastOrderList.open() }
  style={{alignSelf:"center"}}>
    <Text style={{fontFamily : "Avenir Next",textDecorationLine:"underline"}}>{lastOrderProductList} Siparişini Tekrarla</Text>
  </TouchableOpacity>
}

    </View>
  </View>




    )
  }
}

renderLastOrderList() {
  return(
    <View style={{flex:1}}>
      <TouchableOpacity
      style={{position:'absolute',zIndex:1 , right:5,top:5}} onPress={()=> this.lastOrderList.close()} >
        <Icon name="ios-close" style={{color:"#216AF4"}}/>
      </TouchableOpacity>
      <Text style={{textAlign:'center',fontFamily:'Avenir Next',fontWeight:"600",marginTop:10,fontSize:16,color:'#216AF4',marginBottom:10}}>Son Siparişi Tekrarla</Text>
     


      <ScrollView style={{flex:1}}>
      <FlatList
        data={this.props.lastOrder.orderProducts}
        renderItem={({ item }) => <View style={{flexDirection:'row',marginTop:5}}>

        <Text style={{flex:.4,fontFamily:'Avenir Next'}}>
      {item.productName}
        </Text>
        <Text style={{flex:.3,textAlign:'right',fontFamily:'Avenir Next'}}>
      {item.count} Adet
        </Text>
        <Text style={{flex:.3,textAlign:'right',fontFamily:'Avenir Next'}}>
      {item.totalPrice}
        </Text>
        </View>}
        keyExtractor={item => item.productId}
      />
<TouchableOpacity 
onPress={()=> {
  this.lastOrderList.close()
  this.props.addOrderAgain(this.props.lastOrder.orderId,this.props.navigation.getParam("customerId"))}}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor:'white'}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:  'black'}}>
    Siparişi Tekrarla
 
 </Text>
 </TouchableOpacity>
      
      </ScrollView>


 
  </View>
  )
}
  render() {
    if(this.props.product && this.props.product.productId && this.state.productList[this.state.indexOfGottenProduct].productGotUnitPrice ===false && this.state.productList[this.state.indexOfGottenProduct].unitPrice !== this.props.product.unitPrice.toString()) {

      var list  = this.state.productList 
      list[this.state.indexOfGottenProduct].productGotUnitPrice = true;
      list[this.state.indexOfGottenProduct].unitPrice = this.props.product.unitPrice.toString();
      list[this.state.indexOfGottenProduct].productCode = this.props.product.productCode
      this.setState({productList : list});
    
      
    }
    console.log(this.props.product,"product");
   

    const placeholder = {
      label: 'Ege Life Damacana',
      value: 19,
      color: '#2B6EDC',
    };
    if(this.props.isSuccees) {
      // this.props.navigation.goBack()
   if(!this.state.orderAddedSuccessfully){
    this.setState({ orderAddedSuccessfully: true})
   }
   if(this.props.notificationEmployee && this.props.notificationEmployee.userWithToken.length > 0){
    this.chooseEmployee.open();
   }
   else{
     this.props.navigation.goBack()
   }
     


    }
    
    return (
      
      <View style={styles.addCustomerContainer}>

        <StatusBar backgroundColor="#2B6EDC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            {/* <Text style={{textAlign:'right',marginRight:20,marginTop:20}}>
              {this.state.date}
            </Text> */}
{this.renderContent()}
           
        
        
          </ScrollView>
        </KeyboardAvoidingView>

        <RBSheet
              ref={ref => {
                this.chooseEmployee = ref;
              }}
              height={500}
              duration={200}
              customStyles={{
                container: {
                    padding:20,
                    borderRadius:10
                }
              }}
            >
              {this._renderChooseEmployeeContent()}
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.lastOrderList = ref;
              }}
              height={500}
              duration={200}
              customStyles={{
                container: {
                    padding:20,
                    borderRadius:10
                }
              }}
            >
              {this.renderLastOrderList()}
            </RBSheet>




        {this.showSimpleMessage()}


      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isProductLoading: state.products.isProductLoading,
  products: state.products.products,
  isSuccees: state.addOrder.isSuccess,
  product: state.productForCustomer.product,
  isTried : state.addOrder.isTried,
  isLoading : state.addOrder.isLoading,
  AddOrderMessage : state.addOrder.AddOrderMessage,
  notificationEmployee : state.addOrder.notificationEmployee,
  lastOrder : state.addOrder.lastOrder
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
      dispatch(GetProducts()),
    AddOrder: (productId: number, customerId: number, unitPrice: number, count: number,isPaid:boolean) =>
      dispatch(AddOrder(productId, customerId, unitPrice, count,isPaid)),
    GetProduct: (productId: number, customerId: number) =>
      dispatch(GetProduct(productId, customerId)),
      resetProduct : ()=>
      dispatch(resetProduct()),
      AddOrderMultiple : (productList : product[],isPaid : boolean,customerId : number) =>
      dispatch(AddOrderMultiple(productList,isPaid,customerId)),
      getLastOrder : (customerId : number) => 
      dispatch(getLastOrder(customerId )),
      addOrderAgain : (orderId : number,customerId : number) => 
      dispatch(addOrderAgain(orderId,customerId))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(orderAdd);