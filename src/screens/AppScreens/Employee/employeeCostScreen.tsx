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
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import stylesNew from "../../styles";
import { GetEmployeeCost } from "../../../redux/actions/getEmployeeCostAction";
import { AppState } from "../../../redux/store";
import { IEmployeeCostItem } from "../../../redux/models/employeeCostModel";
import RBSheet from "react-native-raw-bottom-sheet";
import { employeeCostDelete } from "../../../redux/actions/deleteEmployeeCostAction";
import { Icon, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import { stat } from "fs";
import { showMessage } from "react-native-flash-message";
import styles from '../Customer/styles'
import { InfoItem } from "../../../components/InfoItem";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading: boolean;
  employeeCosts: IEmployeeCostItem[];
  GetEmployeeCost: () => void;
  employeeCostDelete: (id: number) => void;
  deleteIsSuccess:boolean;
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  id: number;
  employeId: number;
  cost: number;
  deleteSheetRender:boolean;
}

class employeeCostScreen extends Component<Props, State> {



  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Çalışan Giderleri',
      headerStyle: {
        backgroundColor: '#2B6EDC',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }


  };


  AmountSheet: any;
  DeleteSheet: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      id: 0,
      employeId: 0,
      cost: 0,
      deleteSheetRender:false
    };
  }


  componentWillMount() {
    this.props.GetEmployeeCost();
    this.setState({ refreshing: false });
  }


  openModal(id: number, employeId: number) {
    this.setState({
      id: id,
      employeId: employeId
    });
    this.AmountSheet.open();
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }


  deleteSelectedCost() {
    const { employeeCostDelete } = this.props;
    employeeCostDelete(this.state.id);
  }
  showSimpleMessage() {
    if (this.props.deleteIsSuccess) {
        showMessage({
            message: this.props.deleteIsSuccess  ? "Çalışan Maliyeti Başarıyla Silinmiştir" : "",
            type: this.props.deleteIsSuccess ? "success" : "danger",
            icon: "auto"
        }
        );
    }
}

  _renderProductSheetContent() {
    
      return (<View style={styles.SheetContainer}>
        <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 10 }]}
          onPress={() => {
            this.AmountSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.deleteSelectedCost();
            this.AmountSheet.close();
       
          }}>
          <Icon name="ios-trash" style={styles.SheetItemIcon}></Icon>
          <Text style={styles.SheetItemText}
          >Sil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.AmountSheet.close();
          }}>
          <Icon name="ios-close" style={styles.SheetItemIcon}></Icon>
          <Text style={styles.SheetItemText}
          >İptal Et</Text>
        </TouchableOpacity>
      </View>);
    


  }
  _renderDeleteSheetContent() {


  }

  editProduct() {
    this.closeModal();
    this.props.navigation.navigate("EditEmployeeCost",
      {
        id: this.state.id,
        cost: this.state.cost,
        employeId: this.state.employeId,
      })

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.GetEmployeeCost();
    this.setState({ refreshing: false });
  }

  _renderView() {
    const { employeeCosts, isLoading, navigation } = this.props;
    if (isLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else {
      if (this.props.employeeCosts.length > 0) {
        return (<FlatList
          style={{ marginLeft: 10, marginRight: 10 }}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          data={this.props.employeeCosts}
          renderItem={({ item }) => (
            <View style={{ borderBottomColor: '#e1e1e1', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 5 }}>
              <View style={styles.row_cell5}>
                <View style={{}}>
                  <Text style={styles.musteri_adi}>{item.employeName}</Text>
                  <Text style={styles.productUrunfiyatText}>Gider: {item.cost}</Text>

                </View>
                <View style={{ alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{alignSelf:'flex-end'}}
                    onPress={() => this.openModal(item.id, item.employeId)}>
                    <Icon name="ios-more" style={{color: '#2069F3'}} />
                  </TouchableOpacity>
                  <Text style={{ color: '#999', fontSize: 11 }}> {item.createdDate}</Text>
                </View>
              </View>
            </View>)}
          keyExtractor={item => item.id.toString()}
        />);
      }
      else {
        return (<View style={{justifyContent:'center',flex:1}} >

<InfoItem text="Sisteme eklediğiniz çalışan bulunmakatadır." />
        </View>);
      }
    }
  }
  render() {
    return (
      <View style={styles.containerNew}>
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
                  <Icon name="md-close" color={"#6E6E6E"} />
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
            height={200}
            duration={100}
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
            {
            this._renderProductSheetContent()}
          </RBSheet>


          <View style={{ marginTop: 10 }}></View>
        </KeyboardAvoidingView>
        {this._renderView()}
        {this.showSimpleMessage()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isHomeLoading: state.getEmployeeCost.isLoading,
  employeeCosts: state.getEmployeeCost.employees,
  deleteIsSuccess : state.deleteEmployeeCost.isSuccess,


})
function bindToAction(dispatch: any) {
  return {
    GetEmployeeCost: () =>
      dispatch(GetEmployeeCost()),
    employeeCostDelete: (id: number) =>
      dispatch(employeeCostDelete(id))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(employeeCostScreen);
