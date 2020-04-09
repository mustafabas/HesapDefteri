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
import  moment ,{ months  } from "moment";
import 'moment/min/locales' 
import { GetReport } from "../../../redux/actions/reportAction";
import { AppState } from "../../../redux/store";
import { IReportItem } from "../../../redux/models/reportModel";
import styles from "../../styles";
import RBSheet from "react-native-raw-bottom-sheet";
import {DatePicker as DateTimePicker, Spinner,Icon} from 'native-base'
import {
    statusBarHeight,
    headerHeight,
    SafeAreaWithHeader,
} from '../Home/DimensionsHelper';
import { Dimensions } from "react-native";
import { PanGestureHandler,  State, TapGestureHandler, } from "react-native-gesture-handler";

import RNTooltips from 'react-native-tooltips';
import Tooltips from 'react-native-tooltips'
moment.locale('tr')
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isLoading: boolean;
    report: IReportItem;
    GetReport: (startDate: string, endDate: string) => void;
    
}
const vw: number = SafeAreaWithHeader.vw;


interface IMonths {
    monthId : string;
    monthName : string;
    startOfMonth : string;
    endOfMonth : string;
}

enum ToolTipsDesc {
    FirstDesc = "Seçilen tarihler arasında müşterilerden alacağınız miktar.",
    SecondDesc = "Seçilen tarihler arasında toplam çalışan maaşları.",
    ThirdDesc = "Seçilen tarihler arasında çalışan maaşları ve toplam giderleriniz.",
    ForthDesc = "Seçilen tarihler arasında sipariş geçilen toplam gelir.",
}

interface State {
    modalVisible: boolean;
    refreshing: boolean;
    productId: number;
    productName: string;
    productCode: string;
    price: number;
    productStatus: boolean;
    startDate: Date;
    endDate: Date;
    date: Date;
    mode: string;
    currentDate : Date;
    show:boolean;
    showSecond : boolean;
    whichWeekInMonth:number;
    width :Animated.Value;
    marginFromLeft : Animated.Value;
    startOfMarginBar : number;
    startOfMarginBarIsClicked : boolean;
    startDateString : string;
    endDateString: string;
    widthNumberOfBar : number;
    height : Animated.Value;
    contentIsExtended : boolean;
    listOfMonth : IMonths[];
    selectedMonthName: string;
    isShowedTwoDatePicker : boolean;
    visible : boolean;
    toolTipsDescription : ToolTipsDesc;

}

class ReportTemplateScreen extends Component<Props, State> {

    static navigationOptions = ({ navigation }: Props) => {
        return {
          
            header : null
        }
    };
    startDateSheet: any;
    endDateSheet: any;

    constructor(props: Props) {
        super(props);

        this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,

          },
        },
      ],
      { useNativeDriver: true }
    );


        this.state = {
            modalVisible: false,
            refreshing: false,
            productId: 0,
            productCode: "",
            productName: "",
            price: 0,
            productStatus: false,
            startDate: new Date(),
            endDate: new Date(),
            date: new Date(),
            whichWeekInMonth: 0,
            width: new Animated.Value(0),
            height :new Animated.Value(0),
            contentIsExtended: true,
            currentDate: new Date(),
            listOfMonth : [],
            marginFromLeft : new Animated.Value(0),
            toolTipsDescription: ToolTipsDesc.FirstDesc,
                  selectedMonthName: "Bu Ay",
                  startOfMarginBar : 0,
                  widthNumberOfBar : 0,
startOfMarginBarIsClicked : false,
visible: false,
isShowedTwoDatePicker: false,
            show: false,
            showSecond : false,
            startDateString : "",
            endDateString : ""
            
        };
    }

    
      setDate = (event, startDate) => {
        startDate = startDate || this.state.startDate;
    
        this.setState({
        //   show: Platform.OS === 'ios' ? true : false,
          startDate : startDate,
        });
      }

      setDateSecond = (event, endDate) => {
        endDate = endDate || this.state.endDate;
    
        this.setState({
        //   show: Platform.OS === 'ios' ? true : false,
          endDate : endDate,
        });
      }
    
      show = (mode : string) => {
        this.setState({
          show: true,
          mode,
        });
      }
    
    //   datepicker = () => {
    //     this.show('date');
    //   }
    
      timepicker = () => {
        this.show('time');
      }
    
      onValueChange(value: string) {
        this.setState({
          selectedMonthName: value
        });
      }



      


      getReportWithNewSystem (startWeek: number,endWeek : number) {
        let selectedMonthName = this.state.selectedMonthName
        if((endWeek === 0 && startWeek === 0) || startWeek === 0 && endWeek === 4 ) {
            
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).format('DD.MM.YYYY')
            let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).endOfMonth).format('DD.MM.YYYY')
            this.setState({startDateString : startDate , endDateString : finishDate})
            
            this.props.GetReport(startDate,finishDate)

        }
        else if (endWeek === 0) {
            //sadece bir haftalik rapor icin
            //startweek o haftanin raporu icin
           if(startWeek === 4) {
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek-1,'week').format('DD.MM.YYYY')
            // console.log(moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').startOf('week').format('llll'))
            let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).endOfMonth).format('DD.MM.YYYY')
            this.setState({startDateString : startDate , endDateString : finishDate})
           
            this.props.GetReport(startDate,finishDate)
           }else  {
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek-1,'week').format('DD.MM.YYYY')
            // console.log(moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').startOf('week').format('llll'))
           let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').subtract(1,'day').format('DD.MM.YYYY')
           this.setState({startDateString : startDate , endDateString : finishDate})
           
           this.props.GetReport(startDate,finishDate)
           }
          

          
        }
        else {
            //aralikli haftalar icin rapor
            //start week baslangic haftasi 
            //endweek son haftasi bunun son gunu alinacak
            console.log("startWeek " + startWeek + "  end Week : " + endWeek)
            console.log(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth)
           if (endWeek === 4) {
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').format('DD.MM.YYYY')
            // console.log(moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').startOf('week').format('llll'))
            let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).endOfMonth).format('DD.MM.YYYY')
            this.setState({startDateString : startDate , endDateString : finishDate})
            
            this.props.GetReport(startDate,finishDate)


           }
           else if (startWeek === 0) {
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).format('DD.MM.YYYY')
            // console.log(moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').startOf('week').format('llll'))
            let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(endWeek,'week').subtract(1,'day').format('DD.MM.YYYY')
            this.setState({startDateString : startDate , endDateString : finishDate})
            
            this.props.GetReport(startDate,finishDate)
           }else {
            let startDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').format('DD.MM.YYYY')
            // console.log(moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(startWeek,'week').startOf('week').format('llll'))
            let finishDate = moment(this.state.listOfMonth.find(x => x.monthName === selectedMonthName).startOfMonth).add(endWeek,'week').subtract(1,'day').format('DD.MM.YYYY')
            this.setState({startDateString : startDate , endDateString : finishDate})
            
            this.props.GetReport(startDate,finishDate)


           }



        }
      }

      toggleWidth = async (num : number ) =>  {
        
        if(this.state.startOfMarginBarIsClicked) {
            this.setState({
                widthNumberOfBar : num,startOfMarginBarIsClicked: false
            }, async () => {
                await Animated.spring(this.state.width, {
                    toValue: num,
                  //   duration: 200,
                  //   easing: Easing.inOut,
                  friction:5
                  }).start();
            })
        }else {
            let substruction =  num - this.state.startOfMarginBar
            if (substruction <= 0 ){
                this.toggleMarginLeft(num)
            }else {
               await Animated.spring(this.state.width, {
                    toValue: substruction,
                  //   duration: 200,
                  //   easing: Easing.inOut,
                  friction:5
                  }).start();
            }
        }
       this.getReportWithNewSystem(this.state.startOfMarginBar , num)
        console.log(this.state.startOfMarginBar )

        console.log(num )
      }

      toggleMarginLeft(num : number) {

        this.setState({startOfMarginBar : num ,startOfMarginBarIsClicked : true},()=> {
            Animated.spring(this.state.marginFromLeft, {
                toValue: num,
              //   duration: 200,
              //   easing: Easing.inOut,
              friction:5
              }).start();
              this.toggleWidth(0)

        } )

      


      }
      toggleHeight() {
        this.setState({
            contentIsExtended: !this.state.contentIsExtended
        }, ()=> {

            Animated.spring(this.state.height, {
                toValue: this.state.contentIsExtended ? 0 : 1,
              //   duration: 200,
              //   easing: Easing.inOut,
              friction:5
              }).start();


        })
        
        
      }

      

      renderIOSBigTitle = () => {

        
        
            return (
                <View style={{height:100,alignItems:'flex-end',paddingHorizontal:10,flexDirection:'row'}}>
             
<View style={{flexDirection:'row'}}>
<TouchableOpacity onPress={()=> this.dateSheet.open()} style={{flexDirection:'row'}}>
    <Text style={{fontFamily:'Avenir Next',fontSize:30}}>
               {this.state.isShowedTwoDatePicker ? "Tarih Seçiniz" : this.state.selectedMonthName}
    </Text>
    <Icon name="ios-arrow-down" style={{  fontSize: 20,marginTop:15 ,marginLeft:5}} />
</TouchableOpacity>

{!this.state.isShowedTwoDatePicker  && <View  style={{flex:1,marginLeft:10}}>
    <Text style={{fontFamily:'Cabin',color:'#8e8e8e'}}>
    {this.state.startDateString }
</Text>

<Text style={{fontFamily:'Cabin',color:'#8e8e8e'}}>
    {this.state.endDateString }
</Text>
</View>}
<View style={{alignItems:'flex-end',flex:1}}>
<Icon type="Entypo" name="shopping-bag" style={{marginTop:10}}/>

</View>


</View>
  




                    
                </View>
            )
        
    };
    componentWillMount() {
        console.log("Eski Ay : " + this.state.startDate)
        // this.props.GetReport(this.state.startDate.toISOString().slice(8, 10) + "." +
        // this.state.startDate.toISOString().slice(5, 7) + "." +
        // this.state.startDate.toISOString().slice(0, 4), this.state.endDate.toISOString().slice(8, 10) + "." +
        //     this.state.endDate.toISOString().slice(5, 7) + "." +
        //     this.state.endDate.toISOString().slice(0, 4));
        this.setState({ refreshing: false });

        const today = this.state.currentDate;
        
        var listOfMonths =  [] ;

        // let startOfMonth =  moment(monthId, "M").startOf('month')
    //    let endOfMonth = moment(monthId, "M").endOf('month')


        listOfMonths.push({monthId : moment().subtract(0,'month').format("M"),monthName :"Bu Ay" ,startOfMonth :moment().subtract(0,'month').startOf('month').format(),endOfMonth : moment().subtract(0, "M").endOf('month').format() })
        listOfMonths.push({monthId : moment().subtract(1,'month').format("M"),monthName :"Önceki Ay" ,startOfMonth :moment().subtract(1,'month').startOf('month').format(),endOfMonth : moment().subtract(1, "M").endOf('month').format() })
console.log("Aylar")
        console.log(listOfMonths)
        for(var i = 2 ; i <11; i++)    {
            listOfMonths.push({monthId : moment().subtract(i,'month').format("M"),monthName : moment().subtract(i,'month').format("MMMM"),startOfMonth :moment().subtract(i,'month').startOf('month').format(),endOfMonth : moment().subtract(i, "M").endOf('month').format()})
        }
        this.setState({listOfMonth : listOfMonths})
        //bi aylik rapor baslangic icin
        // this.toggleMarginLeft(0)
        let nowOfDay = moment().format('DD.MM.YYYY')

        this.setState({startDateString : nowOfDay , endDateString : nowOfDay})
        this.props.GetReport(nowOfDay,nowOfDay)
    }

    onRefresh() {
        this.setState({ refreshing: true });

    }

    search(){
        this.props.GetReport(this.state.startDate.toISOString().slice(8, 10) + "." +
            this.state.startDate.toISOString().slice(5, 7) + "." +
            this.state.startDate.toISOString().slice(0, 4),this.state.endDate.toISOString().slice(8, 10) + "." +
            this.state.endDate.toISOString().slice(5, 7) + "." +
            this.state.endDate.toISOString().slice(0, 4));
    }
    renderContent() {
        if(this.props.isLoading){
            return (
                <Spinner style={{justifyContent:'center',alignSelf:'center',flex:1}} />
            )
        }else {
            return (
                <View >
                    <Text style={styles.reportText}>Toplam Alınan Para: {this.props.report.totalPaidAmount} TL</Text>
                    <Text style={styles.reportText}>Toplam Kalan Para: {this.props.report.totalRestAmount} TL</Text>
                    <Text style={styles.reportText}>Toplam Maliyet: {this.props.report.totalCost} TL</Text>
                    <Text style={styles.reportText}>Çalışan Maaşları: {this.props.report.totalWorkerSalary} TL</Text>
                    <Text style={styles.reportText}>Çalışan Maaşları(Maliyet de Ekli): {this.props.report.totalWorkerSalary+this.props.report.totalCost} TL</Text>
                    <Text style={styles.reportTextTotalCost}>Toplam Gelir: {this.props.report.totalIncome} TL</Text>
                    <View style={{marginVertical:10}}><Text style={{textAlign:'center',fontFamily:'Avenir Next',fontSize:20}}>Ürünler ve Satış Sayıları</Text></View>
                    <FlatList
                        data={this.props.report.reportProductItems}
                        renderItem={({ item }) => (
                            <View style={[styles.row,{backgroundColor:'#EFF3F9'}]}>

                                    <Text style={[styles.musteri_adi,{flex:1}]}>{item.productName}</Text>
                                    <View >
                                        <Text style={styles.productUrunfiyatText}>Satış Sayısı: {item.count}</Text>
                                    </View>

                            </View>)}
                        keyExtractor={item => item.productId.toString()}
                    />
                </View>
            )
        }
    }

    _onHandlerStateChange = event => {
      
        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log(event)
          let x_Coordinate  = event.nativeEvent.absoluteX;
          let spacing = x_Coordinate
          let perSpacing  = ((Dimensions.get('window').width-20) / 4)
          console.log(Dimensions.get('window').width)
            console.log(x_Coordinate )
            console.log( (spacing / (Dimensions.get('window').width-20)) * 4 )
            console.log(spacing)
            console.log(perSpacing)
            if(spacing > perSpacing * 4 ) {

                spacing = perSpacing * 4
            }

          else if(spacing > perSpacing * 3 ) {
              console.log(spacing % perSpacing > (perSpacing / 2 ))
            if(spacing % perSpacing > (perSpacing / 2 )) {
                spacing = perSpacing * 4
            }else {
                spacing = perSpacing * 3
            }
          }
          else  if(spacing > perSpacing * 2 ) {
            if(spacing % perSpacing > (perSpacing / 2 )) {
                spacing = perSpacing * 3
            }else {
                spacing = perSpacing * 2
            }
          }else if(spacing > perSpacing ) {
            if(spacing % perSpacing > (perSpacing / 2 )) {
                spacing = perSpacing * 2
            }else {
                spacing = perSpacing 
            }
          }else {
            if(spacing  > (perSpacing / 2 )) {
                spacing = perSpacing 
            }else {
                spacing = 0
            }
          }
          console.log(spacing)
            console.log(perSpacing)
          this.toggleWidth((spacing / (Dimensions.get('window').width-20)) * 4  )

        }
      };


            renderWeeks(){
               
        return(
            <View>
                
                <TapGestureHandler
        {...this.props}
        // onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}>
   
   <Animated.View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,height:20,backgroundColor:'#85a3db',borderRadius:5}}>
                    
        <Animated.View 
                    
                    style={{height:20,width:
                        this.state.width.interpolate({
                            inputRange: [0, 4],
                            outputRange: ['5%', '100%'],
                          })
                    ,backgroundColor:'#001c58',borderRadius:5,flexDirection:'row',justifyContent:'flex-end'
                    ,marginLeft:  this.state.marginFromLeft.interpolate({
                            inputRange: [0, 4],
                            outputRange: ['0%', '95%'],
                          })
                    }}>
                         {/* <Icon name="ios-arrow-round-forward" size={30} color={"#EBEDF1"} /> */}
                    </Animated.View>
                     </Animated.View>
      </TapGestureHandler>
                    
                
               
                
                 <View style={{flexDirection:'row',justifyContent : 'space-between',marginHorizontal:10,marginVertical:10}}>
                <TouchableOpacity onPress={()=> this.toggleMarginLeft(0) }>
                <Text style={{fontFamily:'Avenir Next'}}>
                    Hepsi
                </Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={()=> this.toggleMarginLeft(1) }>
                <Text style={{fontFamily:'Avenir Next'}}>
                    İlk Hafta
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.toggleMarginLeft(2) }>
                <Text style={{fontFamily:'Avenir Next'}}>
                    İkinci Hafta
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.toggleMarginLeft(3) }>
                <Text style={{fontFamily:'Avenir Next'}}>
                    3.Hafta
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.toggleMarginLeft(4) }>
                <Text style={{fontFamily:'Avenir Next'}}>
                    4.Hafta
                </Text>
                </TouchableOpacity>
           </View>
    
            </View>
              )
    }

    _renderDateTimePickers(){
        return(
    
            <View style={{ flexDirection: "row",justifyContent:'space-between'}}>
              <View style={{borderWidth:2,borderColor:'#85a3db',borderRadius:5,marginTop:10,height:40,marginLeft:10}}>
              <DateTimePicker
defaultDate={new Date()}
minimumDate={new Date()}
maximumDate={new Date(2018, 12, 31)}
locale={"tr"}
timeZoneOffsetInMinutes={undefined}
modalTransparent={false}
animationType={"fade"}
androidMode={"default"}
placeHolderText="DD/MM/YYYY"

textStyle={{ color: "#001c58",fontFamily:'Cabin',fontSize:13 }}

placeHolderTextStyle={{ fontFamily:'Cabin',color:'#a3a3a3',fontSize:13 }}
onDateChange={startDate => this.setState({ startDate })}
disabled={false}
/>
                </View>
            
<View style={{borderWidth:2,borderColor:'#85a3db',borderRadius:5,marginTop:10,height:40}}>
<DateTimePicker
defaultDate={this.state.startDate}
minimumDate={this.state.startDate}

locale={"tr"}
timeZoneOffsetInMinutes={undefined}
modalTransparent={false}
animationType={"fade"}
androidMode={"default"}
placeHolderText="DD/MM/YYYY"

textStyle={{ color: "#001c58",fontFamily:'Cabin',fontSize:13 }}
placeHolderTextStyle={{color:"#a3a3a3",fontFamily:'Cabin',fontSize:13 }}

onDateChange={endDate => this.setState({ endDate })}
disabled={false}
/>
</View>



            <TouchableOpacity style={[styles.searchButtonDate,{backgroundColor:'#001c58',marginRight:10}]}
                onPress={() => this.search()}>
                <Icon name="ios-arrow-round-forward" style={{color:'white',fontSize:30}}/>
            </TouchableOpacity>
        </View>
        
        
        )
    }
    _renderView() {
        const { report, isLoading, navigation } = this.props;
      
            return (
                <SafeAreaView style={styles.reportContainer}>
                    {this.state.isShowedTwoDatePicker && this._renderDateTimePickers()}
                
                    {!this.state.isShowedTwoDatePicker && this.renderWeeks()}
                    {/* {this.renderContent()} */}
                    {this.renderNewContent()}
                    {this.renderProductsSaled()}
                </SafeAreaView>);

    }


    //// alt view e eklenecek 
    // <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
    // <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#3f4c67",justifyContent:'center',alignItems:'center'}}>
    // <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
    // </View>
    // <Text style={{color:'#c5c5c5',fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Çalışan Maaşları:</Text>
    // <Text style={{color:'white',fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right'}}>₺ {this.props.report.totalWorkerSalary}</Text>
    // </View>

    renderProductsSaled(){
        return(
            <View style={{flex:1}}>
                <Text style={{fontFamily:'Cabin-Bold',fontSize:20,marginTop:10,marginLeft:20}}>Ürünler ve Satış Sayıları</Text>
                <View style={{width:'100%',height:2,backgroundColor:'#ebebeb',marginTop:10}}></View>
                
            <FlatList
                        data={this.props.report.reportProductItems}
                        renderItem={({ item }) => (
                            // <View style={[styles.row,{backgroundColor:'#EFF3F9'}]}>

                            //         <Text style={[styles.musteri_adi,{flex:1}]}>{item.productName}</Text>
                            //         <View >
                            //             <Text style={styles.productUrunfiyatText}>Satış Sayısı: {item.count}</Text>
                            //         </View>

                            // </View>
                            

                            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10,marginTop:20,borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:10}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#ebebeb",justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontFamily:'Cabin-Regular',fontSize:20}}>{item.productName.slice(0,1)}</Text>
                    
                        </View>
                        <Text style={{marginLeft:10,fontFamily:'Cabin-Regular'}}>{item.productName}</Text>
              </View>
              <Text style={{fontFamily:'Cabin-Bold'}}>
              {item.count} Adet
              </Text>
            </View>



                            
                            )}
                        keyExtractor={item => item.productId.toString()}
                    />
            
     

            
            </View>
     )
    }

    _onPress (parent, target) {
        if(!this.state.visible){
            this.setState({ visible: true, parent: parent, target: target });
    
        // setTimeout(() => {
        //   this.setState({ visible: false })
        // }, 2000)
        }
    
        // RNTooltips.Show(
        //         target,
        //         parent,
        //     {
        //         text: 'Long Press Description'
        //     }
        // )
       
      }
    
    renderNewContent(){

       
          
            return (
                <View>
                    <View 
                    ref={(parent) => {
                        this.parent = parent
                      }}
                    style={{
                       
                        backgroundColor : '#001c58',marginHorizontal:10,borderRadius:7,padding:10,paddingHorizontal:10,justifyContent:'flex-end'}}>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flex:0.5}}>
                                <Text style={{color:'#c5c5c5',fontFamily:'Cabin-Bold',fontSize:20}}>Toplam Maliyet</Text>
                                <Text style={{color:'white',fontFamily:'Cabin-Bold',fontSize:20}}>₺ {this.props.report.totalCost} </Text> 
                            </View>
                            <View style={{height:50,width:2,backgroundColor:'#a3a3a3'}}/>
                            <View style={{flex:0.5}}> 
                                <Text style={{color:'#c5c5c5',fontFamily:'Cabin-Bold',fontSize:20,textAlign:'right'}}>Alınan</Text>
                                <Text style={{color:'white',fontFamily:'Cabin-Bold',fontSize:20,textAlign:'right'}}>₺ {this.props.report.totalPaidAmount} </Text> 
                            </View>
                        </View>

                        {this.props.isLoading ? <Spinner color="white"/> :  <ScrollView>
                        <Animated.View style={{paddingHorizontal:0,flexShrink: 1, height: this.state.height.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 250],
                          })}} >

                        <View
                        ref={target => {
                            this.target = target;
                          }}
                        
                        style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#3f4c67",justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {
           this.setState({toolTipsDescription : ToolTipsDesc.FirstDesc,visible:false},()=>{
            this._onPress(this.parent, this.target)
           });
          }} ><Icon name="ios-information-circle" style={{  fontSize: 40,color:'#a9a9a9'}} /></TouchableOpacity>
                        </View>
                        <Text style={stylesNew.contentContainerLeftTextStyle}>Toplam Kalan Para: </Text>
                        <View
                        style={{flexDirection:'row',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={stylesNew.contentContainerMoneyIcon}>₺</Text>
            <Text style={stylesNew.contentContainerRightTextStyle}>{this.props.report.totalRestAmount}</Text>
                       
            </View>
                        
                        </View>

                        <View
                        ref={target => {
                            this.target2 = target;
                          }}
                         style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#3f4c67",justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {
           this.setState({toolTipsDescription : ToolTipsDesc.SecondDesc,visible:false},()=>{
            this._onPress(this.parent, this.target2)
           });
          }} ><Icon name="ios-information-circle" style={{  fontSize: 40,color:'#a9a9a9'}} /></TouchableOpacity>
                        </View>
                        <Text style={stylesNew.contentContainerLeftTextStyle}>Çalışan Maaşları:</Text>

            <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={stylesNew.contentContainerMoneyIcon}>₺</Text>
                          <Text style={stylesNew.contentContainerRightTextStyle}>{this.props.report.totalWorkerSalary}</Text>

            </View>

                        </View>
                        
                        <View
                        ref={target => {
                            this.target3 = target;
                          }}
                         style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#3f4c67",justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {
           this.setState({toolTipsDescription : ToolTipsDesc.ThirdDesc,visible:false},()=>{
            this._onPress(this.parent, this.target3)
           });
          }} ><Icon name="ios-information-circle" style={{  fontSize: 40,color:'#a9a9a9'}} /></TouchableOpacity>
                        </View>
                        <Text style={stylesNew.contentContainerLeftTextStyle}>Çalışan Maaşları(Maliyet de Ekli):</Text>
                        
                        <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={stylesNew.contentContainerMoneyIcon}>₺</Text>
            <Text style={stylesNew.contentContainerRightTextStyle}>{this.props.report.totalWorkerSalary+this.props.report.totalCost} </Text>
                        
            </View>
                        
                        </View>
                        <View
                         ref={target => {
                            this.target4 = target;
                          }}
                         style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#3f4c67",justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {
           this.setState({toolTipsDescription : ToolTipsDesc.ForthDesc,visible:false},()=>{
            this._onPress(this.parent, this.target4)
           });
          }} ><Icon name="ios-information-circle" style={{  fontSize: 40,color:'#a9a9a9'}} /></TouchableOpacity>
                        </View>
                        <Text style={stylesNew.contentContainerLeftTextStyle}>Toplam Gelir: </Text>
                        
                        <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={stylesNew.contentContainerMoneyIcon}>₺</Text>
            <Text style={stylesNew.contentContainerRightTextStyle}>{this.props.report.totalIncome} </Text>
                                   
            </View>
                   

                        
                        </View>
    
                        </Animated.View>
                        
                        </ScrollView>
                       }
                        <TouchableOpacity onPress={()=>this.toggleHeight()}
                         style={{alignSelf:'center',backgroundColor:'#3f4c67',justifyContent:'center',alignContent:'center',paddingHorizontal:20,borderRadius:5}}>
                        <Icon name={this.state.contentIsExtended ? "ios-arrow-down" :  "ios-arrow-up"} style={{  fontSize: 40,color:'#a3a3a3',}} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        


       
    }
    getReportByMonth(monthId : string){
    
       
       let startOfMonth =  moment(monthId, "M").startOf('month')
       let endOfMonth = moment(monthId, "M").endOf('month')
       console.log(monthId)
       console.log(new Date())
       console.log(this.state.listOfMonth.find(x => x.monthId === monthId).startOfMonth)

       console.log(this.state.listOfMonth.find(x => x.monthId === monthId).endOfMonth)

        

    }
    dateSheetContent(){

        // const today = this.state.currentDate;
        
        // var listOfMonths =  [] ;
        // listOfMonths.push({monthId : moment().subtract(0,'month').format("M"),monthName :"Bu Ay" })
        // listOfMonths.push({monthId : moment().subtract(1,'month').format("M"),monthName :"Önceki Ay" })

        
        //  for(var i = 3 ; i <13; i++)    {
        //     listOfMonths.push({monthId : moment().subtract(i,'month').format("M"),monthName : moment().subtract(i,'month').format("MMMM")})
        // }

        return (
            <SafeAreaView  style={{marginTop:10,marginBottom:100}}>  

               <Text style={{fontFamily:'Avenir Next',fontWeight:'600',fontSize:18,alignSelf:'center'}}>
                    Raporlamak İstediğiniz Ayı Seçiniz.
                </Text>

                <TouchableOpacity onPress={()=> {

                    this.setState({isShowedTwoDatePicker : true},()=>{
                        this.dateSheet.close()
                    })}} style={{borderWidth:3,borderRadius:10,marginTop:10,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4'}}>
            <Text style={{fontFamily:'Avenir Next',fontSize:20,paddingVertical:5,textAlign:'center'}}>
                İki Tarih Aralığında Seçim Yap

            </Text>
        </TouchableOpacity>

                <FlatList

        data={this.state.listOfMonth}
        renderItem={({ item }) => <TouchableOpacity onPress={()=> {
            this.dateSheet.close()
            this.setState({selectedMonthName : item.monthName,isShowedTwoDatePicker:false},() => {
                this.toggleMarginLeft(0)
            })}} style={{borderWidth:3,borderRadius:10,marginTop:10,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4'}}>
            <Text style={{fontFamily:'Avenir Next',fontSize:20,paddingVertical:5,textAlign:'center'}}>
                {item.monthName}

            </Text>
        </TouchableOpacity>}
         keyExtractor={item => item.monthId}
        
      />
               </SafeAreaView>
                



        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar backgroundColor="#2B6EDC" /> */}
                <KeyboardAvoidingView style={{flex:1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    { this.renderIOSBigTitle()}
                    {/* <View style={{ marginTop: 10 }}></View> */}
                
                {this._renderView()}
                <RBSheet
              ref={ref => {
                this.dateSheet = ref;
              }}
              height={500}
              duration={200}
              customStyles={{
                container: {
                //   justifyContent: "flex-start",
                //   alignItems: "flex-start",
                //   paddingLeft: 20
                }
              }}
            >
              {this.dateSheetContent()}
            </RBSheet>

                </KeyboardAvoidingView>

                <RNTooltips tintColor="#85a3db" textColor="#001c58"  text={this.state.toolTipsDescription} visible={this.state.visible} target={this.state.target} parent={this.state.parent} />
                        
            </SafeAreaView>
        );
    }
}

const stylesNew = StyleSheet.create({
    outerContainer: {
        zIndex:1,
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    iOSTitleContainer: {
        width: 100 * vw,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
        flexDirection:'row'
    },
    iOSTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iOSTitle: {

        marginBottom: 13,
        fontSize: 18,
        // lineHeight: 20,
        // fontWeight: 'bold',

        fontWeight: "600",
        color: '#2069F3',
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily:'Avenir Next',


    },
    androidTitleContainer: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
    },
    androidTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    androidComponentContainer: {
        position: 'absolute',
        right: 16,
        bottom: 0,
        width: 100 * vw - 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    androidTitle: {
        marginBottom: 16,
        marginLeft: 72,
        fontSize: 16,
        lineHeight: 20,
        // fontWeight: 'bold',
        color: '#353535',
        fontWeight: "600",
        fontFamily:'Avenir Next',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    iOSBigTitleContainer: {

        flexDirection:'row',
        // position: 'absolute',
        // top: Platform.OS === "ios" ?  headerHeight + statusBarHeight : headerHeight + statusBarHeight -30,
        // left: 0,

        height:100,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        borderBottomColor: '#f2f2f2',
        justifyContent:'space-between'
    },
    iOSBigTitle: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 36,
        // lineHeight: 45,
        // fontWeight: 'bold',
        fontWeight: "600",
        fontFamily:'Avenir Next',
        color: '#2069F3',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    innerContainer: {
        position: 'relative',
        width: 100 * vw,
    },
    contentContainer: {
        width: 100 * vw,
        backgroundColor: '#fff',
    },
    contentContainerLeftTextStyle : {
        flex:1,color:'#c5c5c5',fontFamily:'Cabin-Bold',fontSize:18,marginLeft:10
    },
    contentContainerRightTextStyle : {
        color:'white',fontFamily:'Cabin-Bold',fontSize:18,textAlign:'right'
    },
    contentContainerMoneyIcon : {

        color:'white',fontFamily:'Cabin-Bold',fontSize:20,textAlign:'right',marginRight:5
    }
});



const mapStateToProps = (state: AppState) => ({
    isLoading: state.report.isReportLoading,
    report: state.report.report,

})
function bindToAction(dispatch: any) {
    return {
        GetReport: (startDate: string, endDate: string) =>
            dispatch(GetReport(startDate, endDate)),
    };
}

export default connect(
    mapStateToProps,
    bindToAction
)(ReportTemplateScreen);
