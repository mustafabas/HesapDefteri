import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity,Text, Linking, PermissionsAndroid } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";

import { Icon, Spinner } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import { AppState } from "../../../redux/store";
import { detectUserFromCall } from "../../../redux/actions/homeAction";
import { InfoItem } from "../../../components/InfoItem";
import CallLogs from 'react-native-call-log'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  detectUserFromCall : (phoneNumber : string) => void;
}



interface State {
  page: number;
  limit: number;
  phoneList : string[];
  detectedPhoneNumber : string;


}

class getLastCallsScreen extends Component<Props, State> {


    async getCallLog(){
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Müşterilerinizden gelen aramalar',
          message:
            'Müşterileriniz sizi aradığında bildirim alın',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(CallLogs);
        CallLogs.load(5).then(c => {
          var list: string[] = []
          c.map((element) => {
            if(element.phoneNumber) {
              list.push(element.phoneNumber)
            }
         
          })
          this.setState({phoneList : list})
          
          // let LastPhoneNumber = c[0].phoneNumber
          
    
    
        });
      } else {
        console.log('Call Log permission denied');
      }
    }

    

    static navigationOptions = ({ navigation }: Props) => {
        return {
    
          title: 'Son Aramalar',
    
    
        }
    
    
      };


  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      phoneList : this.props.navigation.getParam("phoneNumberList"),

      detectedPhoneNumber : "",
    };
  }

  componentDidMount() {

  }
  componentWillMount(){
      this.getCallLog()
  }

getCustomerByPhoneNumber(phoneNumber : string){
    if(phoneNumber){
        this.setState({detectedPhoneNumber : phoneNumber} ,()=>{
          
          this.props.detectUserFromCall(phoneNumber);
          this.customerDetectFromCall.open()
        })
  
      }
}

renderDetectCallContainer() {
    if(this.props.detectingCustomerLoading) {
      return (
        
        <View>
        <TouchableOpacity onPress={()=> this.customerDetectFromCall.close()}
        style={{position:'absolute',right:5,top:5,zIndex:1}}>
          <Icon name="ios-close" />
          
        </TouchableOpacity>
        <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:16}}>Müşteri Aranıyor</Text>
     
        <Spinner />

      </View>
      )
    }
    else if(this.props.detectingCustomerLoading === false && this.props.detectedCustomer) {
        if(this.props.detectedCustomer.detected){
          return(
       
            <View>
            <TouchableOpacity onPress={()=> this.customerDetectFromCall.close()}
             style={{position:'absolute',right:5,top:5,zIndex:1}}>
              <Icon name="ios-close" />
            </TouchableOpacity>
          <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:16}}>Telefon Numarası : {this.state.detectedPhoneNumber}</Text>
          <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:16, fontWeight:'700'}}>İsim Soyisim : {this.props.detectedCustomer.customerName}</Text>
            <TouchableOpacity
            onPress={()=>{
              this.customerDetectFromCall.close()
              this.props.navigation.navigate("orderAdd", { customerId: this.props.detectedCustomer.id })}}
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor: '#216AF4' }}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,padding:5,textAlign:'center',color:  'white' }}>
     Sipariş Ekle 
     
     </Text>
     </TouchableOpacity>
          </View>  
          )
        }
        else{
          return (
            <View>
            <TouchableOpacity onPress={()=> this.customerDetectFromCall.close()}
            style={{position:'absolute',right:5,top:5,zIndex:1}}>
              <Icon name="ios-close" />
            </TouchableOpacity>
          <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:16}}>Telefon Numarası : {this.state.detectedPhoneNumber}</Text>

            <TouchableOpacity
            onPress={()=> {
              this.customerDetectFromCall.close()
              this.props.navigation.navigate('addCustomer',{phoneNumber : this.state.detectedPhoneNumber})} }
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor: '#216AF4' }}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:  'white' }}>
        Müşteri bulunamadı bu numarayı müşteri eklemek ister misiniz?
     
     </Text>
     </TouchableOpacity>
    
            
    
          </View>
          )
        }

    }
    else if(this.props.detectingCustomerLoading === false && this.props.detectedCustomer) {
      return (
        <View>
        <TouchableOpacity onPress={()=> this.customerDetectFromCall.close()}
        style={{position:'absolute',right:5,top:5,zIndex:1}}>
          <Icon name="ios-close" />
        </TouchableOpacity>
      <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:16}}>Telefon Numarası : {this.state.detectedPhoneNumber}</Text>
        <TouchableOpacity
        onPress={()=> {
          this.customerDetectFromCall.close()
          this.props.navigation.navigate('addCustomer',{phoneNumber : this.state.detectedPhoneNumber})} }
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor: '#216AF4' }}>
 <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:  'white' }}>
    Müşteri bulunamadı bu numarayı müşteri eklemek ister misiniz?
 
 </Text>
 </TouchableOpacity>

        

      </View>
      )
    }
  }

  renderContent(){
      if( this.state.phoneList &&  this.state.phoneList.length > 0) {
          return (
<FlatList
          data={this.state.phoneList}
          renderItem={({ item }) => {
            return (
                <TouchableOpacity  style={{padding:20,backgroundColor:"#EFF3F9",borderRadius:5,marginTop:10,marginHorizontal:10}}
                onPress= {()=> this.getCustomerByPhoneNumber(item)}>
                    <View style={{flexDirection :'row'}}>
                    <Icon name="call-in" type="SimpleLineIcons"  />
    
                    <Text style={{fontFamily : 'Avenir Next',fontSize:16,marginLeft:10}}>
                         {item}
                    </Text>
                    </View>
                </TouchableOpacity>
            );
          }}

        />
          )
      }else {
          return (
            <TouchableOpacity onPress={ ()=> Linking.openURL('app-settings:')}
             style={{flex: 1,justifyContent :'center'}} >
            <InfoItem text={"Son aramalara ulaşılamadı lütfen ayarlardan aramalara izin veriniz!"} />
          </TouchableOpacity>

          )
      }
  }
  

  render() {


    return (
      <View style={styles.container}>
        {this.renderContent()}
        



<RBSheet
            ref={ref => {
              this.customerDetectFromCall = ref;
            }}
            height={200}
            duration={200}
            customStyles={{
              container: {


                padding: 20,
                backgroundColor: '#EFF3F9',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              }
            }
            }>

            {this.renderDetectCallContainer()}
          </RBSheet>

      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
detectedCustomer : state.home.detectedCustomer,
detectingCustomerLoading : state.home.detectingCustomerLoading,

});

function bindToAction(dispatch: any) {
  return {
    detectUserFromCall : (phoneNumber : string) => 
    dispatch(detectUserFromCall(phoneNumber))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(getLastCallsScreen);
