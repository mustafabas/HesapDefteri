import React, { Component } from "react";
import {
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,

  Image,
  Linking,
  Dimensions
} from "react-native";
import {AsyncStorage } from 'react-native'

import { Icon, Input, Item, Tabs, Tab, TabHeading, Text, Button, ScrollableTab, ListItem, Left, Thumbnail, Body, Right, Form, Label, Content, Card, CardItem, Accordion, Spinner } from 'native-base';
import { NavigationScreenProp, NavigationState, ScrollView, } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { IEmployeeItem, IEmployeeItemResponseModel } from "../../../redux/models/employeeModel";
import { employeeDelete } from "../../../redux/actions/deleteEmployeeAction";
import { GetEmployees } from "../../../redux/actions/employeeAction";
import { Formik } from "formik";
import * as Yup from "yup";
import { employeeCost } from "../../../redux/actions/employeeCostAction"
import { timingSafeEqual } from "crypto";
import { type } from "os";
import RBSheet from "react-native-raw-bottom-sheet";
import stylesNew from "../../styles";
import styles from "../../styles";
import { stat } from "fs";
import SvgIcon from 'react-native-svg-icon';
import svgs from '../../../images/icomoon/SVG/svgs';
import { showMessage } from "react-native-flash-message";
import { employe } from "../../../redux/actions/editEmployeeAction";
import { InfoItem } from "../../../components/InfoItem";

const IconNew = (props) => <SvgIcon {...props} svgs={svgs} />

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading: boolean;
  employees: IEmployeeItemResponseModel[];
  employeeDelete: (employeeId: number) => void;
  employeeDeleteIsSuccess: boolean;
  GetEmployees: () => void;
  employeeCost: (employeId: number, cost: number) => void;
  employeeAddCostLoading: boolean;
  employeeCostAddMessage: string;
  isSuccess: boolean;
 
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  nameSurname: string;
  employeeId: number;
  monthlySalary: number;
  active: boolean;
  UserType: string | null;
  modalAmountVisible: boolean;
  employeeList: IEmployeeItemResponseModel[];
  isShowDeleteView : boolean;
}

interface amountData {
  amount: string
}

const initialValues: amountData = {
  amount: "",
}

const girdiler = Yup.object().shape({
  amount: Yup.string().required()


});

class Employee extends Component<Props, State> {
  OrderSheet: any;
  AmountSheet: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      nameSurname: "",
      employeeId: 0,
      monthlySalary: 0,
      active: false,
      UserType: "",
      modalAmountVisible: false,
      employeeList: [],
      isShowDeleteView : false,
    };

    AsyncStorage.getItem("UserType").then((value) => {
      
      this.setState({
        UserType: value,
      })
      this.props.navigation.setParams({ Type: value });
    });
  }
  static navigationOptions = ({ navigation }: Props) => {
    if (navigation.getParam("Type") === "2") {
      return {
        title: 'Çalışanlar',
      }
    }
    else {
      return {

        title: 'Çalışanlar',
        headerRight: <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("AddEmployee")}>
          <Icon style={{ color: '#ffff' }} name="ios-add-circle" />
        </TouchableOpacity>,
      
      }
    }
  };

  componentWillMount() {
    this.props.GetEmployees();
    this.setState({ refreshing: false });
    this.getUserType();
  }



  closeModal() {
    this.setState({ modalVisible: false });
  }

  openAmountModal() {
    this.setState({ modalAmountVisible: true });
  }

  closeAmountModal() {
    this.setState({ modalAmountVisible: false });
  }

  addCash() {
    this.OrderSheet.close();
    this.AmountSheet.open();

  }

  deleteSelectedEmployee() {

    const { employeeDelete } = this.props;
    console.log(this.state.employeeId)
    employeeDelete(this.state.employeeId);
    this.OrderSheet.close();
    this.onRefresh();

  }


  editEmployee() {
    this.closeModal();
    this.props.navigation.navigate("EditEmployee",
      {
        employeeId: this.state.employeeId,
      })

  }
  openModal(employeeId: number) {
    console.log(employeeId)
    this.setState({
      employeeId: employeeId,
    });
    this.OrderSheet.open();
  }
  giderEkle(values: amountData) {
    this.props.employeeCost(this.state.employeeId,Number(values.amount.replace(",",".")));
    this.AmountSheet.close();
    this.onRefresh();

  }
  mapToPropsToState() {
    var employeList: IEmployeeItemResponseModel[] = [];

    this.props.employees.map((item) => {
      employeList.push(item);
    })
    this.setState({ employeeList: employeList });
  }
  onRefresh() {
    this.setState({ refreshing: true });
    this.props.GetEmployees();
    this.setState({ refreshing: false });
    this.getUserType();
    this.mapToPropsToState();

  }
  showSimpleMessage() {
    if (this.props.employeeCostAddMessage.length > 0) {
      showMessage({
        message: this.props.employeeCostAddMessage,
        type: this.props.isSuccess ? "success" : "danger",
        icon: "auto"
      }
      );
    }

  }
  showSimpleDeleteMessage() {
    if (this.props.employeeDeleteIsSuccess) {
      showMessage({
        message: "Çalışan başarıyla silindi",
        type: this.props.employeeDeleteIsSuccess ? "success" : "danger",
        icon: "auto"
      }
      );
    }

  }
  getUserType() {
    //function to make three option alert
    AsyncStorage.getItem("UserType").then((value) => {
      this.setState({
        UserType: value,
      })
      this.props.navigation.setParams({ Type: value });
    });
  }

  _renderEmployeeSheetContent() {
    return (

      <View style={styles.SheetContainer}>
        <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.OrderSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.addCash();
          }}>
          <Icon name="ios-add" style={styles.SheetItemIcon}></Icon>
          <Text style={styles.SheetItemText}
          >Gider Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.editEmployee();
          }}>
          <Icon type="FontAwesome" name="pencil" style={[styles.SheetItemIcon, { fontSize: 22 }]} ></Icon>
          <Text style={styles.SheetItemText}
          >Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {

            this.setState({isShowDeleteView : true})
          }}>
          <Icon type="FontAwesome" name="trash-o" style={[styles.SheetItemIcon, { fontSize: 25 }]}></Icon>

          <Text style={styles.SheetItemText}
          >Sil</Text>
        </TouchableOpacity>
      </View>
    );
  }


  _renderEmployeeDeleteAlert() {
    return (

      <View style={styles.SheetContainer}>
        <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.OrderSheet.close();
            this.setState({isShowDeleteView : false});
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>

        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.setState({isShowDeleteView : false});
            this.deleteSelectedEmployee();
          }}>
          <Icon type="FontAwesome" name="trash-o" style={[styles.SheetItemIcon, { fontSize: 25 }]}></Icon>

          <Text style={styles.SheetItemText}
          >Sil</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {

            this.setState({isShowDeleteView : false});
          }}>
          <Icon type="FontAwesome" name="chevron-left" style={[styles.SheetItemIcon, { fontSize: 22 }]} ></Icon>
          <Text style={styles.SheetItemText}
          >İptal Et</Text>
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount() {
    this.mapToPropsToState();
  }
  _renderEmployeeCostSheetContent() {
    return (<View style={styles.SheetAmountContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={girdiler}
        onSubmit={values => this.giderEkle(values)}
      >
        {props => {
          return (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 10 }]}
                  onPress={() => {
                    this.AmountSheet.close();
                  }}>
                  <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: 'flex-start' }}>
                  <Input
                    //containerStyle={{ width: '80%' }}
                    style={styles.input}
                    placeholder="Gider Miktarı"
                    placeholderTextColor="#9A9A9A"
                    value={props.values.amount + ""}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onBlur={(props.touched.amount && props.errors.amount) ? () => {
                      props.setFieldValue('amount', "")
                      props.handleChange("amount")
                    }
                      : props.handleBlur("amount")}
                    onChangeText={props.handleChange("amount")}
                  />

                  <Button onPress={() => props.handleSubmit()} style={styles.SheetButtonContainer}>
                    {this._renderEmployeeCostAddButtonText()}
                  </Button>
                </View>

              </View>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </View>

    );

  }
  _showMore(employeeId: number, value: boolean) {
    var employess = this.state.employeeList;
    for (var i in employess) {
      if (employess[i].employeeId == employeeId) {
        employess[i].fullShow = value;
        this.setState({ employeeList: employess });
        break; //Stop this loop, we found it!
      }
    }
  }
  _renderEmployeeCostAddButtonText() {
    if (this.props.employeeAddCostLoading) {
      return (
        <ActivityIndicator></ActivityIndicator>
      );
    }
    return (
      <Text>Ekle</Text>
    );

  }
  _renderArrowButton(item: any) {
    if (item.fullShow) {
      return (<Icon style={{ fontSize: 24, color: "" }} name="caret-up" type="FontAwesome5"></Icon>);
    }
    return (<Icon style={{ fontSize: 24 }} name="caret-down" type="FontAwesome5"></Icon>);

  }
  _renderView() {
    const { isLoading, navigation } = this.props;


    if (this.props.employees.length > 0) {

      return (<View style={{ padding: 10 }}>
        {
          this.props.isLoading &&
          <Spinner color='#333' style={{ position: "absolute", left: (Dimensions.get('window').width / 2) - 25, top: 100, zIndex: 1000 }}></Spinner>

        }
        <Button style={styles.employeeCostContainer} iconLeft onPress={() => this.props.navigation.navigate("EmployeeCost")}>
          <Icon name="ios-list"></Icon>
          <Text style={styles.employeeCostButtonText}>Çalışan Giderleri</Text>
        </Button>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 40 }}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          data={this.props.employees}
          renderItem={({ item }) => (
            <View style={{ padding: 5 }}>
              <View style={{

                borderRadius: 15,
                borderColor: '#CFD3D7',

                borderWidth: 1,

              }}>
                <View style={{ borderBottomColor: '#CFD3D7', padding: 10, borderBottomWidth: 1 }}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 33, height: 33, borderRadius: 16.5, backgroundColor: '#2069F3', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>{item.employeeName.substring(0, 1)}</Text>
                      </View>
                      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={styles.employeeNameText}>{item.employeeName}</Text>
                        <Text note style={{ fontFamily: 'Avenir Next', color: '#404243' }}>{item.createDate}</Text>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => this.openModal(item.employeeId)}>
                        <Icon name="ios-more" style={{ color: '#2069F3', fontSize: 30 }}></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ padding: 10 }} >
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                    <View style={{ flexDirection: 'column' }}>
                      {item.monthlySalaryDisplay != '' && <Text style={{ fontFamily: 'Avenir Next', color: '#404243' }}>Maaş</Text>}
                      <Text style={{ color: '#2069F3' }}>{item.monthlySalaryDisplay}</Text>
                      {item.dailyDecimalFoodDisplay != '' && <Text style={{ fontFamily: 'Avenir Next', color: '#404243' }}>Günlük Yemek Ücreti</Text>}
                      <Text style={{ color: '#2069F3', fontFamily: 'Avenir Next' }}>{item.dailyDecimalFoodDisplay}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 0.6 }}>
                      {item.phoneNumber != "" &&
                        <Text style={{ fontFamily: 'Avenir Next', color: '#404243', textAlign: 'right' }}>Telefon</Text>}
                      <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>
                        <Text style={{ color: '#58595A', textAlign: 'right', fontFamily: 'Avenir Next', textDecorationLine: 'underline' }}>
                          {item.phoneNumber}
                        </Text>
                      </TouchableOpacity>
                      <View>
                        {item.address != "" &&
                          <Text style={{ fontFamily: 'Avenir Next', color: '#404243', textAlign: 'right' }}>Adres</Text>}
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + item.address)}>
                          <Text style={{ color: '#58595A', textAlign: 'right', textDecorationLine: 'underline', fontFamily: 'Avenir Next' }}>
                            {item.address}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.employeeId.toString()}
        />
      </View>);
    } else {
      return (<View style={{justifyContent:'center',flex:1}} >

      

        <InfoItem text="Sisteme eklediğiniz çalışan bulunmakatadır." />



      </View>);
    }

  }
  render() {
    if (this.state.UserType === "2") {
      return (

        <View >
          <Card style={{ borderColor: '#f5f5f5' }}>
            <CardItem>
              <Body style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                <Icon name="ios-information-circle-outline" style={{ fontSize: 40, }} ></Icon>
                <Text>
                  Sayfaya erişiminiz bulunmamaktadır.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      );
    }
    else {
      return (
        <View style={styles.containerNew}>
          <StatusBar backgroundColor="#2B6EDC" />

          <RBSheet
            ref={ref => {
              this.OrderSheet = ref;
            }}
            height={230}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft: 20,
                backgroundColor: '#EFF3F9',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              }
            }
            }>
              {this.state.isShowDeleteView ? this._renderEmployeeDeleteAlert() : this._renderEmployeeSheetContent()}

          </RBSheet>
          <RBSheet
            ref={ref => {
              this.DeleteAlert = ref;
            }}
            height={230}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft: 20,
                backgroundColor: '#EFF3F9',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              }
            }
            }>
            {this._renderEmployeeDeleteAlert()}
          </RBSheet>
          <RBSheet
            ref={ref => {
              this.AmountSheet = ref;
            }}
            height={200}
            duration={200}
            customStyles={{
              container: {
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingLeft: 20,
                backgroundColor: '#EFF3F9',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              }
            }}
          >
            {this._renderEmployeeCostSheetContent()}
          </RBSheet>
          {this._renderView()}
          {this.showSimpleMessage()}
          {this.showSimpleDeleteMessage()}
        </View>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.employee.isLoading,
  employees: state.employee.employees,
  employeeDeleteIsSuccess: state.deleteEmployee.isSuccess,
  employeeAddCostLoading: state.employeeAddCost.EmployeAddCostLoading,
  employeeCostAddMessage: state.employeeAddCost.EmployeeCostAddMessage,
  isSuccess: state.employeeAddCost.isSuccess
})
function bindToAction(dispatch: any) {
  return {
    GetEmployees: () =>
      dispatch(GetEmployees()),
    employeeDelete: (employeeId: number) =>
      dispatch(employeeDelete(employeeId)),
    employeeCost: (employeeId: number, cost: number) =>
      dispatch(employeeCost(employeeId, cost)),

  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Employee);
