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
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";

import stylesNew from "../../styles";
import { GetReport } from "../../../redux/actions/reportAction";
import { AppState } from "../../../redux/store";
import { IReportItem } from "../../../redux/models/reportModel";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import {DatePicker as DateTimePicker, Spinner} from 'native-base'


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isLoading: boolean;
    report: IReportItem;
    GetReport: (startDate: string, endDate: string) => void;
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
    show:boolean;
    showSecond : boolean;
}

class ReportScreen extends Component<Props, State> {

    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Rapor',
            headerStyle: {
                backgroundColor: '#2B6EDC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    startDateSheet: any;
    endDateSheet: any;

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
            startDate: new Date(),
            endDate: new Date(),
            date: new Date(),

            show: false,
            showSecond : false,
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
    

    componentWillMount() {
        this.props.GetReport(this.state.startDate.toISOString().slice(8, 10) + "." +
        this.state.startDate.toISOString().slice(5, 7) + "." +
        this.state.startDate.toISOString().slice(0, 4), this.state.endDate.toISOString().slice(8, 10) + "." +
            this.state.endDate.toISOString().slice(5, 7) + "." +
            this.state.endDate.toISOString().slice(0, 4));
        this.setState({ refreshing: false });
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
                    <Text style={styles.reportText}>Toplam Sebil Sayısı: {this.props.report.totalFountainCount} Adet</Text>
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

    _renderView() {
        const { report, isLoading, navigation } = this.props;
      
            return (
                <View style={styles.reportContainer}>
                    <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
                        <DateTimePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            maximumDate={new Date(2018, 12, 31)}
            locale={"tr"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Başlangıç Tarihi"
            textStyle={{ color: "green",paddingTop:15,fontFamily:'Avenir Next',fontSize:20 }}
            
            placeHolderTextStyle={{ paddingTop:15,fontFamily:'Avenir Next',fontSize:20 }}
            onDateChange={startDate => this.setState({ startDate })}
            disabled={false}
            />
<DateTimePicker
            defaultDate={this.state.startDate}
            minimumDate={this.state.startDate}

            locale={"tr"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Bitiş Tarihi"

            textStyle={{ color: "green",paddingTop:15,fontFamily:'Avenir Next',fontSize:20 }}
            placeHolderTextStyle={{paddingTop:15,fontFamily:'Avenir Next',fontSize:20 }}

            onDateChange={endDate => this.setState({ endDate })}
            disabled={false}
            />

                        <TouchableOpacity style={styles.searchButtonDate}
                            onPress={() => this.search()}>
                            <Icon name="ios-arrow-round-forward" size={30} color={"#EBEDF1"} />
                        </TouchableOpacity>
                    </View>
                    {this.renderContent()}
                </View>);

    }
    render() {
        return (
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#2B6EDC" /> */}
                <KeyboardAvoidingView style={{flex:1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    {/* <View style={{ marginTop: 10 }}></View> */}
                
                {this._renderView()}


                </KeyboardAvoidingView>
            </View>
        );
    }
}

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
)(ReportScreen);
