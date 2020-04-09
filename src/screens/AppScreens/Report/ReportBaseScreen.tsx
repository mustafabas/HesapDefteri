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
    StyleSheet,Picker,Animated,Easing,SafeAreaView
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";
import moment, { months } from "moment";
import stylesNew from "../../styles";
import styles from "../../styles";
import { GetReport } from "../../../redux/actions/reportAction";
import { AppState } from "../../../redux/store";
import { IReportItem } from "../../../redux/models/reportModel";

import RBSheet from "react-native-raw-bottom-sheet";
import {DatePicker as DateTimePicker, Spinner,Icon} from 'native-base'

import {
    statusBarHeight,
    headerHeight,
    SafeAreaWithHeader,
} from '../Home/DimensionsHelper';
import { Dimensions } from "react-native";
import { PanGestureHandler,  State, TapGestureHandler, } from "react-native-gesture-handler";
import { start } from "repl";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

interface reportType {
    reportName : string;
    reportId : number;
    iconName : string;
    navigationName : string;

}
class ReportBaseScreen extends Component<Props,{}> {

    static navigationOptions = ({ navigation }: Props) => {
        return {
          
            title: 'Rapor',
        }
    };

    // ReportNew : ReportNewScreen,
    //   ReportTemplate : ReportTemplateScreen,
    //   ReportOld : ReportScreen
   
    render() {
        var reportList : reportType [] = []
        let widthOfContainers = Dimensions.get('window').width / 2  - 30
        let heightOfContainers = Dimensions.get('window').width / 2  - 30
        reportList.push({reportId : 3 ,reportName : 'Sipariş Raporları',iconName:'bar-graph',navigationName:'ReportTemplate'} ,{reportName:'Dairesel Dağılım' ,
         reportId :1,iconName:'circular-graph',navigationName:'ReportNew' },
        //   {reportName : 'Eski Sitil' , reportId : 2,iconName:'line-graph',navigationName:'ReportOld'} , 
        //  {reportId:4,reportName:'Ek Tip',iconName:'area-graph',navigationName:'ReportAnother'}
        
        )
        // reportList.push({reportId : 3 ,reportName : 'Sipariş Raporları',iconName:'bar-graph',navigationName:'ReportTemplate'}  )
        return (
            <SafeAreaView style={styles.container}>

                <KeyboardAvoidingView style={{flex:1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
            <FlatList
    contentContainerStyle = {{marginHorizontal:20,paddingTop:20}}
        data={reportList}
        numColumns={2}
        columnWrapperStyle={{justifyContent:'space-between'}}
        ItemSeparatorComponent = {()=>{
            return(
                <View style={{height:20}} />
            )
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> this.props.navigation.navigate(`${item.navigationName}`)}
          style={{width:widthOfContainers,height:heightOfContainers,backgroundColor:'#2069F3',borderRadius:15,justifyContent:'space-evenly',alignItems:'center',paddingTop:10,
          shadowRadius: 5.00,
                    
          elevation: 12,

          shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5}}>
             
             <Icon type="Entypo" name={item.iconName} style={{fontSize : 50,color:'white'}} />
             <Text style={{fontFamily:'Avenir Next',fontSize:18,color:'white'}}>
             {item.reportName}
             </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.reportId}

      />

                
                 


                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default connect(

)(ReportBaseScreen);
