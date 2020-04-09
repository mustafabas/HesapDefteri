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
import { Formik } from "formik";
import * as Yup from "yup";
import stylesNew from "../../styles";
import { productAddAction } from "../../../redux/actions/productAddAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { Item, Label, Input, Button, Spinner } from "native-base";
import { showMessage } from "react-native-flash-message";

import ImagePicker from 'react-native-image-picker';
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import ImageResizer from 'react-native-image-resizer';
import styles from "../Customer/styles";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    productAddAction: (productName: string, productCode: string, price: string, productCount: number) => void;
    ProductAddMessage: string;
    urun: productData;
    isAddLoading: boolean;
}

interface productData {
    urunAdi: string;
    urunKodu: string;
    urunFiyati: string;
    productCount: number;
}

const initialValues: productData = {
    urunAdi: "",
    urunKodu: "",
    urunFiyati: "",
    productCount: 0
}

const girdiler = Yup.object().shape({
    urunAdi: Yup.string()
        .min(1)
        .max(30)
        .required(),
    urunFiyati: Yup.string()
        .required(),

    productCount: Yup.number()

        .moreThan(0),
});


class productAdd extends Component<Props, {}> {

    constructor(props: Props) {
        super(props);
        this.state = {
            imageLoading : false
        };
    }
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: "Ürün Ekle",
            headerStyle: {
                backgroundColor: '#216AF4',
                justifyContent: 'center'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    showSimpleMessage() {
        if (this.props.ProductAddMessage) {

            showMessage({
                message: this.props.ProductAddMessage,
                type: this.props.isSuccees ? "success" : "danger",
                icon: "auto"
            }
            );
        }

    }
    handleCreateProduct(values: productData) {
        const { productAddAction } = this.props;
        productAddAction(values.urunAdi, values.urunKodu, values.urunFiyati.replace(",","."), values.productCount);
    };

    _renderButtonText() {
        if (!this.props.isAddLoading) {
            return (<Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Ekle</Text>);
        }
        return (<Spinner color='01C3E3' />)
    }


    imageResizer(request : any){

ImageResizer.createResizedImage(request.uri, request.width, request.height, 'JPEG', 100).then((response) => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    // response.path is the path of the new image
    // response.name is the name of the new image with the extension
    // response.size is the size of the new image
    const source = { uri: response.uri };
    console.log(response)
    this.setState({avatarSource : source})
  }).catch((err) => {
    // Oops, something went wrong. Check that the filename is correct and
    // inspect err to get more details.
  });
    }

    selectImage(){
        const options = {
            title: 'Select Avatar',

            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
         
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
                imageLoading : false
              });
            }
          });

    }


    _renderImagePickerSheet(){
        const options = {

            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

      return(
        <View style={{paddingTop:20}}>
             <Text style={{fontFamily:'Avenir Next',fontSize : 20 ,textAlign:'center',color:'#797979'}}>
                Ürün İçin Fotoğraf Seçin
            </Text>
            <View style={{width:'100%',height:1,backgroundColor:'#b3b3b3',marginVertical:10}}></View>
        <TouchableOpacity onPress={()=> {
              this.setState({
                imageLoading : true
              });
              
          ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            this.imagePickerSheet.close()
            this.setState({

                imageLoading : false
              });
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,

              });
            }
          
});
              
        }}>
            <Text style={{fontFamily:'Avenir Next',fontSize : 20 ,textAlign:'center',color:'#216AF4'}}>
                Kütüphaneden Fotoğraf Seçin...
            </Text>
        </TouchableOpacity>
        <View style={{width:'100%',height:1,backgroundColor:'#b3b3b3',marginVertical:10}}></View>
        <TouchableOpacity onPress={()=> {
            this.setState({
                imageLoading : true
              });
         
            
            ImagePicker.launchCamera(options, (response) => {
                this.imagePickerSheet.close()
                this.setState({

                    imageLoading : false
                  });
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  } else {
                    const source = { uri: response.uri };
                
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                
                    this.setState({
                      avatarSource: source,
                      imageLoading : false
                    });

                    this.imageResizer(response)
                  }
              });

              
        }}>
             <Text style={{fontFamily:'Avenir Next',fontSize : 20 ,textAlign:'center',color:'#216AF4'}}>
              Kamerayı Kullan...
            </Text>
        </TouchableOpacity>
        <View style={{width:'100%',height:1,backgroundColor:'#b3b3b3',marginVertical:10}}></View>
        <TouchableOpacity onPress={()=> this.imagePickerSheet.close()}>
             <Text style={{fontFamily:'Avenir Next',fontSize : 20 ,textAlign:'center',color:'#216AF4'}}>
              İptal
            </Text>
        </TouchableOpacity>
    </View>
      )
    }

    
    render() {
        if(this.props.isSuccees) {
            this.props.navigation.goBack()
        }
        const imageLength = Dimensions.get('screen').height / 5
        return (
            <View style={styles.addCustomerContainer}>
                <StatusBar backgroundColor="#2B6EDC" />

                <View style={{ marginBottom: 30 }}></View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView bounces={false}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={girdiler}
                            onSubmit={values => this.handleCreateProduct(values)}
                        >
                            {props => {
                                return (
                                    <View style={{marginHorizontal:20}}>
                                        <View style={styles.containerNew} >
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunAdi && props.errors.urunAdi != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunAdi && props.errors.urunAdi != null) ? 'red' : '#959595' }}>Ürün Adı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={props.values.urunAdi}
                                                        autoCapitalize="words"
                                                        onChangeText={props.handleChange("urunAdi")}
                                                        onBlur={props.handleBlur("urunAdi")}
                                                    />
                                                </Item>
                                            </View>

                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunKodu && props.errors.urunKodu != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunKodu && props.errors.urunKodu != null) ? 'red' : '#959595' }}>Ürün Kodu</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={props.values.urunKodu}
                                                        autoCapitalize="words"
                                                        onChangeText={props.handleChange("urunKodu")}
                                                        onBlur={props.handleBlur("urunKodu")}
                                                    />
                                                </Item>

                                            </View>
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunFiyati && props.errors.urunFiyati != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunFiyati && props.errors.urunFiyati != null) ? 'red' : '#959595' }}>Ürün Fiyatı</Label>
                                                    <Input

                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="none"
                                                        keyboardType="numeric"
                                                        onChangeText={props.handleChange("urunFiyati")}
                                                        onBlur={props.handleBlur("urunFiyati")}
                                                    />
                                                </Item>

                                            </View>
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#959595' }}>Ürün Sayısı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="none"
                                                        keyboardType="numeric"

                                                        onChangeText={props.handleChange("productCount")}
                                                        onBlur={props.handleBlur("productCount")}
                                                    />
                                                </Item>

                                            </View>


                                         {/* <View style={{marginTop:20,alignItems:'center'}}>
                                         <TouchableOpacity  onPress={()=> this.imagePickerSheet.open()} style={{flexDirection:'row',backgroundColor:'#EFF3F9',borderRadius:20,width:imageLength, height:imageLength,justifyContent:'center',alignItems:'center'}}>
                                              {/* <ImageBackground source={this.state.avatarSource} style={{width:imageLength , height : imageLength,backgroundColor:'#EFF3F9',justifyContent:'center',alignItems:'center',borderRadius:20}}> */}
                                             {/* {this.state.imageLoading ? <Spinner /> :  this.state.avatarSource ? <Image source={this.state.avatarSource} style={{width:imageLength , height : imageLength,justifyContent:'center',alignItems:'center',borderRadius:20}}/> : <Text style={{fontFamily:'Avenir Next',fontSize:20,color:'#216AF4'}}>Fotoğraf Ekle</Text>}
                                          </TouchableOpacity>
                                         </View> */} 

                                            <Button onPress={() => props.handleSubmit()}
                                                style={{
                                                    justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
                                                    shadowRadius: 5.00,
                                                    elevation: 12,
                                                    shadowColor: "#006c7e",
                                                    shadowOffset: { width: 3, height: 3 },
                                                    shadowOpacity: .5,
                                                }}>
                                              
                                                {this._renderButtonText()}
                                            </Button>
                                            

                                          

                                           
                                        </View>
                                    </View>
                                );
                            }}
                        </Formik>
                        <RBSheet
          ref={ref => {
            this.imagePickerSheet = ref;
          }}
          height={250}
          duration={200}
          customStyles={{
            container: {

                borderRadius:20

            }
          }}
        >
          {this._renderImagePickerSheet()}
        </RBSheet>
                    </ScrollView>
                </KeyboardAvoidingView>
                {this.showSimpleMessage()}
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isSuccees: state.productAdd.isSuccess,
    ProductAddMessage: state.productAdd.ProductAddMessage,
    isAddLoading: state.productAdd.isAddLoading
})

function bindToAction(dispatch: any) {
    return {
        productAddAction: (productName: string, productCode: string, price: string, productCount: number) =>
            dispatch(productAddAction(productName, productCode, price, productCount))
    };
}

export default connect(mapStateToProps, bindToAction)(productAdd);