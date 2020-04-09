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
    SafeAreaView,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";

import stylesNew from "../../styles";
import { GetReport, productCountList, getReportProductsForPie, productCountItem } from "../../../redux/actions/reportAction";
import { AppState } from "../../../redux/store";
import { IReportItem } from "../../../redux/models/reportModel";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import {DatePicker as DateTimePicker, Spinner, Card, CardItem,Body} from 'native-base'
import { Circle, G, Image } from 'react-native-svg'
import { PieChart} from 'react-native-svg-charts'
import { InfoItem } from "../../../components/InfoItem";
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isLoading: boolean | null;
    report: productCountList;
    getReportProductsForPie: () => void;
}

// interface State {
//     modalVisible: boolean;
//     refreshing: boolean;
//     productId: number;
//     productName: string;
//     productCode: string;
//     price: number;
//     productStatus: boolean;
//     startDate: Date;
//     endDate: Date;
//     date: Date;
//     mode: string;
//     show:boolean;
//     showSecond : boolean;
// }

class ReportNewScreen extends Component<Props,{}> {

  static navigationOptions = ({ navigation }: Props) => {
    return {
      
        header : null
    }
};

componentWillMount(){
  this.props.getReportProductsForPie();
}


    constructor(props) {
        super(props);
        this.state = {
          selectedSlice: {
            label: '',
            value: 0
          },
          labelWidth: 0
        }
      }

      renderPie(){
        let productlistCount = this.props.report ? (this.props.report.productList ? this.props.report.productList.length : 0) : 0
        if(this.props.isLoading && productlistCount < 1) {
          return (
            <Spinner />
          )
        }else if(!this.props.isLoading && productlistCount > 0){

          const { labelWidth, selectedSlice } = this.state;
        const { label, value } = selectedSlice;
        const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
        const values = [25, 25, 35, 35, 55];
        const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
        const listOfLength = this.props.report.productList.length > 4 ? 5 : this.props.report.productList.length 
        var top5Item = this.props.report.productList.slice(0,listOfLength);
        let widthOfDimensions = Dimensions.get('screen').width / 2

        const data = top5Item.map((item) => {
          var key = item.name
          var value = item.count
            return {
              key,
              value: value,
              svg: { fill: colors[top5Item.indexOf(item)] },
              arc: { outerRadius: (70) + '%', padAngle: label === key ? 0.1 : 0 },
              onPress: () => this.setState({ selectedSlice: { label: key, value: value } })
            }
          })
        const deviceWidth = Dimensions.get('window').width
    

          return(
            <View style={{backgroundColor:'#133264',paddingTop:'10%'}}>
            <Text style={{fontSize:30,fontFamily:'Avenir Next',fontWeight:'600',color:'white',marginLeft:20}}>Rapor Ekranı</Text>
            <Text
            onLayout={({ nativeEvent: { layout: { width } } }) => {
              this.setState({ labelWidth: width });
            }}
            style={{
              position: 'absolute',
              left: deviceWidth / 4 - labelWidth / 2,
              textAlign: 'center',
              paddingTop:'45%',
              fontFamily:"Avenir Next",
              color: 'white',
              fontSize:9

            }}>
            {`${label} \n ${label ? value : ''} ${label ? 'Adet' : ''}`}
          </Text>
          <View style={{flexDirection:'row'}}>
            
          <PieChart
          //  chart_wh={200}
            style={{ height: widthOfDimensions,width:widthOfDimensions,marginTop:0}}
            outerRadius={'110%'}
            innerRadius={'50%'}
            data={data}
          />

          <View style={{marginTop:widthOfDimensions/15,flexShrink:1}}>
            
         

              <FlatList
        data={top5Item}
        renderItem={({ item }) =>  <View style={{flexDirection:'row',flexShrink:1,marginRight:20}}>
        <View style={{width:18,height:18,backgroundColor:colors[top5Item.indexOf(item)]}}></View>

      <Text style={{fontFamily:'Avenir Next',marginLeft:10,color:'white',flexWrap:'wrap'}}>{item.name}</Text>

        </View>
        }
        ItemSeparatorComponent ={() => <View style={{marginTop:10}}>
          
        </View>}
      />
              
          </View>
         
          </View>
          
            </View>
            
            
          )

          
        }else {
          return(
            <View>

            </View>
          )
        }
      }

      renderItem(item : productCountItem,totalCount : number) {

        let percentage = (item.count/totalCount)

        return(
          <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10,flex:1,borderBottomColor:'black'}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Avenir Next',color:'white'}}>{item.name.slice(0,1)}</Text>
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:14,marginLeft:10,flex:.5}}>{item.name}</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#678dc9",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:percentage,height:10,borderRadius:10,backgroundColor:'#133264'}}></View>
     
                    </View>
        <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:14,marginLeft:10,flex:.3,textAlign:'right',marginRight:10}}>{item.count}</Text>
                </View>
        )
      }
      renderContent() {

        let productCount =  this.props.report ? (this.props.report.productList ? this.props.report.productList.length : 0) : 0
        if(this.props.isLoading && productCount < 1) {
          return(
<Spinner />
          )
        }else if(!this.props.isLoading && productCount > 0 ) {
          const totalCount = this.props.report.totalCount
          return(
            <FlatList
        data={this.props.report.productList}
        renderItem={({ item }) => this.renderItem(item,totalCount)}
        ItemSeparatorComponent ={() => <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',marginTop:10}}>
          
        </View>}
      />
          )
        }else if(this.props.isLoading === false && this.props.report.productList.length < 1){
return(
  <View style={{flex:1,justifyContent:'center'}} >
<InfoItem text="Verilen Tarihler arasında satışı yapılan ürün bulunamadı." />


</View>
)
          
        }else {
          return(
            <View></View>
          )
        }
      }
      render() {
        let productCount = this.props.report ? (this.props.report.productList ? this.props.report.productList.length : 0) : 0
        return (
          <View  style={{ flex:1  }}>


             {this.renderPie()}
              
             {productCount > 0 && 
             
             <View style={{ }}>
                <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:20,marginHorizontal:10,marginBottom:5}}>
                <Text style={{fontFamily:'Avenir Next'}}>Satışı Yapılan Ürünler </Text>
                <Text style={{fontFamily:'Avenir Next'}}>Ürün satış oranları </Text>
                <Text style={{fontFamily:'Avenir Next'}}>Adet</Text>

                </View>
                </View>
                } 

              {this.renderContent()}

              
                
               {/* </ScrollView> */}
               

          </View>
        )
      
      
      
     
     
     
     
      }


}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.report.isReportLoadingProductPie,
    report: state.report.reportProductPie,

})
function bindToAction(dispatch: any) {
    return {
      getReportProductsForPie: () =>
            dispatch(getReportProductsForPie()),
    };
}

export default connect(
    mapStateToProps,
    bindToAction
)(ReportNewScreen);
