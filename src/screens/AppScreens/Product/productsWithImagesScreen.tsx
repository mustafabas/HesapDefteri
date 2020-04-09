import React, { Component } from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";

import styles from "../../styles";
import { GetProducts } from "../../../redux/actions/productAction";
import { AppState } from "../../../redux/store";
import { IProductItem } from "../../../redux/models/productModel";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import { Card, CardItem, Body } from "native-base";
import { InfoItem } from "../../../components/InfoItem";
import { ImageBackground } from "react-native";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading: boolean;
  products: IProductItem[];
  GetProducts: () => void;
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  productId: number;
  productName: string;
  productCode: string;
  price: number;
  productStatus: boolean;
}

class productsWithImagesScreen extends Component<Props, State> {



  static navigationOptions = ({ navigation }: Props) => {
    return {

    title : 'Ürünlerim',
      headerRight: <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("AddProduct")}>
        <Icon name="ios-add" size={40} style={{ color: 'white' }} />
      </TouchableOpacity>,


    }


  };


  AmountSheet: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      productId: 0,
      productCode: "",
      productName: "",
      price: 0,
      productStatus: false,
    };
  }

  componentWillMount() {
    this.props.GetProducts();
    this.setState({ refreshing: false });
  }


  openModal(productCode: string, productName: string, price: number, productId: number, productStatus: boolean) {
    this.setState({
      productId: productId,
      productCode: productCode,
      productName: productName,
      price: price,
      productStatus: productStatus
    });
    this.AmountSheet.open();
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  _renderProductSheetContent() {
    return (<View style={styles.SheetContainer}>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.AmountSheet.close();
          this.editProduct();
        }}>
        <Icon name="ios-arrow-round-forward" size={30} style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Düzenle</Text>
      </TouchableOpacity>
    </View>);

  }


  editProduct() {
    this.closeModal();
    console.log(this.state.productStatus)
    this.props.navigation.navigate("productEditScreen",
      {
        productId: this.state.productId,
        // productName: this.state.productName,
        // price: this.state.price,
        // productCode: this.state.productCode,
        // productStatus: this.state.productStatus
      })

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

  _renderView() {
    const { products, isLoading, navigation } = this.props;
    if (this.props.isProductLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    if(this.props.isProductLoading === false && this.props.products.length < 1)
    {
   return(
    <View  style={{flex:1,justifyContent:'center'}}>

    <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddProduct")}>

    
    


  <InfoItem text="Sisteme eklediğiniz ürün bulunmakatadır. Sipariş vermek için ürünlerinizi ekleyiniz."/>


    </TouchableOpacity>
    
    </View>
   )
    }
    else {
        let widthOfContainers = Dimensions.get('window').width / 2  - 30
        let heightOfContainers = Dimensions.get('window').width / 2  - 30
        return (
            <FlatList
            contentContainerStyle = {{marginHorizontal:20,paddingTop:20}}
            data={this.props.products}
                numColumns={2}
                columnWrapperStyle={{justifyContent:'space-between'}}
                ItemSeparatorComponent = {()=>{
                    return(
                        <View style={{height:20}} />
                    )
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.openModal(item.productCode, item.productName, item.price, item.productId, item.productStatus)}
                  style={{width:widthOfContainers,height:heightOfContainers,backgroundColor:'#2069F3',borderRadius:15,
                  shadowRadius: 5.00,
                            
                  elevation: 12,
        
                  shadowColor: "#2069F3",
        shadowOffset: {width: 3, height: 3 },
        shadowOpacity: .5}}>
                     

                    
                     <Image resizeMode="contain" style={{flex:1,width:'100%'}} source={require('../../../images/intro/intro1-ios.png')} />
                     {/* <Text style={{fontFamily:'Avenir Next',fontSize:18,color:'white'}}>
                     {item.productName}
                     </Text> */}
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.productId.toString()}
        
              />
        )
      return (<FlatList
        contentContainerStyle={{paddingTop:10}}
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
        data={this.props.products}
        renderItem={({ item }) => (
          <View style={[styles.row,{backgroundColor:'#EFF3F9',flexDirection:'column'}]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
          <Text style={styles.musteri_adi}>{item.productName}</Text>

          <TouchableOpacity
              style={[styles.iconButtonCustomer,{alignContent:'flex-end',marginBottom:30}]}

              onPress={() => this.openModal(item.productCode, item.productName, item.price, item.productId, item.productStatus)}>

              <Icon name="ios-more" size={25}  />
            </TouchableOpacity>

          </View>

          <View style={{justifyContent:'space-between',flexDirection:'row'}} >
               
<View style={{flexDirection:'row'}}>

<Text style={styles.alt_bilgi}>Ürün Kodu: </Text>
                <Text style={[styles.alt_bilgi,{fontWeight:'600'}]} >{item.productCode}</Text>

</View>

                <View style={{flexDirection:'row'}}>
               <Text style={styles.alt_bilgi}>Birim Fiyat: </Text>
                <Text style={[styles.alt_bilgi,{fontWeight:'600'}]}>
                {item.price} TL
                </Text>
                
               </View>

                
              </View>
              
              <View style={{}} >
              
              
              </View>

            
          </View>)}
      
      
      keyExtractor={item => item.productId.toString()}
      />);
    }
  }
  render() {
    return (
      <View style={[styles.container,{backgroundColor:''}]}>
        <StatusBar backgroundColor="#2B6EDC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closeModal()}>
                  <Icon name="md-close" size={30} color={"#6E6E6E"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalEditButtonContainer}
                  onPress={() => this.editProduct()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <RBSheet
            ref={ref => {
              this.AmountSheet = ref;
            }}
            height={250}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft: 20
              }
            }}
          >
            {this._renderProductSheetContent()}
          </RBSheet>

          <View style={{ }}></View>
        </KeyboardAvoidingView>
        {this._renderView()}
       
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isProductLoading : state.products.isProductLoading,

  products: state.products.products,
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
      dispatch(GetProducts()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(productsWithImagesScreen);
