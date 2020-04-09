import { StyleSheet, Button, Platform } from "react-native";
import { colors } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "flex-start",

  },
  containerNew:{
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    // marginLeft:20,
    // marginRight:20
  },
  addCustomerContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingHorizontal:0,
    marginTop:10
  },

  reportContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },

  headStyle: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
    paddingHorizontal: 45,
    borderRadius: 2000,
    color: '#ffffff',
    marginBottom: 10,

  },
  inputContainer: {


    borderRadius: 2,
    paddingTop: 30,
    //marginHorizontal:20,
    justifyContent: "space-between",
    padding: 20,
    //flex:4,
  },

  dateContainer: {

    elevation: 1,
    borderRadius: 2,
    //marginHorizontal:20,
    justifyContent: "space-between",
    padding: 7,
    flex:0.5,
    alignItems:'center',
    margin:5,
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center"
  },
  background: {
    backgroundColor: "#A1A9EF",
  },
  input: {
    fontFamily:'Avenir Next',fontSize:18,
    elevation: 2,
    // backgroundColor: '#fff',
    //marginHorizontal: 5,
    //paddingHorizontal: 20,
    color: 'black',
    //marginBottom:5,
    paddingTop: 0,
    // height: 50,
    marginTop: 5,
    //flex:1,
  },
  inputFiyat: {
    fontFamily : 'Avenir Next',
    elevation: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    //marginHorizontal: 5,
    //paddingHorizontal: 20,

    color: 'black',
    marginBottom: 10,
    borderRadius: 4,

    borderColor: "white",
    // flex:8,
    flexDirection: "column",
  },

  inputFiyatText: {
    //flex:1,
    // flexDirection:"column",
    textAlign: "center",
    marginTop: 12,

    //paddingRight:10,
    fontSize: 20,
    fontWeight: "bold",
  },

  inputFiyatContainer: {
    justifyContent: 'flex-start',
    flexDirection: "row",
    // marginHorizontal:5,
    borderRadius: 5,

  },

  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    backgroundColor: '#D2D5F1',

    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  customerAddButton: {
    backgroundColor: '#2B6EDC',

    marginHorizontal: 20,
    paddingVertical: 15,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 200,
    borderRadius: 5
  },

  ProductAddButton: {
    backgroundColor: '#2B6EDC',

    marginHorizontal: 20,
    paddingVertical: 15,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 200,
  },

  customerEditButton: {
    backgroundColor: '#2B6EDC',
    marginHorizontal: 20,
    marginRight: 0,
    paddingVertical: 15,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 200,
    borderRadius: 5
  },

  CustomerAddButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  ProductAddButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  CustomerEditButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  linkText: {
    textAlign: "center",
    color: "#C2C8F7",
    fontWeight: "900",
    marginHorizontal: 120,
    paddingVertical: 15,

  },

  flatContainer: {
    flex: 1,
  },

  item: {
    backgroundColor: '#B5BAEA',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
    color: "white",

  },

  row: {
    elevation: 6.5,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 5,
  },

  column: {
    elevation: 6.5,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  row_cell1: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },

  row_cell2: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },

  row_cell3: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },

  row_cell4: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 5,
  },
  row_cell5: {
    flexDirection: 'row',
    flex: 1,
    justifyContent:'space-between'
  },

  row_cell6: {
    flex: 0.3,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  row_cell7: {
    flex: 1.5,
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
  customerDetailHeader1: {
    flex: 0.4,
    flexDirection: 'column',

  },
  customerDetailHeader2: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  customerDetailHeader3: {
    flex: 0.5,
    flexDirection: 'row',
  },
  customerDetailHeader4: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  customerDetailHeaderButtonText: {
    color: "#1E1E1E",
    fontSize: 40,
  },

  tikla: {
    color: "#131843",
    paddingLeft: 16,
    flex: 0,
    fontSize: 24,
  },
  musteri_adi: {
    color: "#333",
    // textAlignVertical: 'bottom',
    // includeFontPadding: false,
    // flex: 0,
    fontSize: 17,
  },
  alt_bilgi: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 10,
  },
  paratextalınan: {
    color: "green",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
    textAlign: "right",
  },
  paratextalınanDetail: {
    color: "green",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  paratextkalan: {
    color: "#E30606",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
    textAlign: "right",
  },
  paratextkalanDetail: {
    color: "#E30606",
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  paratextToplam: {
    color: "black",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
    textAlign: "right",
  },
  paratextToplamDetail: {
    color: "black",
    includeFontPadding: false,
    fontSize: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flex: 1
  },
  detay_bilgi: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  orderContainer: {
    elevation: 6.5,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  urunAdiText: {
    textAlignVertical: 'bottom',
    color: "#08147E",
    includeFontPadding: false,
    flex: 2,
    fontSize: 20,
  },
  tarihText: {
    textAlign: "right",
    color: "#946C4D",
    includeFontPadding: false,
    flex: 1.2,
    fontSize: 13,
    paddingRight: 12,
    marginTop: 5,
  },
  urunAdetText: {
    textAlign: "left",
    color: "#C4B47B",
    includeFontPadding: false,
    flex: 0.8,
    fontSize: 12,
  },
  birimFiyatText: {
    textAlign: "left",
    color: "#C4B47B",
    includeFontPadding: false,
    flex: 0.8,
    fontSize: 12,
  },
  toplamFiyatText: {
    textAlign: "right",
    color: "#4B3A3A",
    includeFontPadding: false,
    flex: 1.1,
    fontSize: 12,
    fontWeight: "bold",
  },
  odenecekText:{
    textAlign: "left",
    color: "#4B3A3A",
    margin:10,
    includeFontPadding: false,
    flex: 1.1,
    fontSize: 18,
    fontWeight: "bold",
    marginTop:20
  },

  searchInput: {
    elevation: 2,
    backgroundColor: '#E2E7F5',
    marginHorizontal: 10,
    marginLeft: 15,
    paddingHorizontal: 20,
    color: 'black',
    marginBottom: 10,
    borderRadius: 2,
    flex: 5,
    flexDirection: "column",
  },

  searchButton: {
    backgroundColor: '#2B6EDC',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 5,
    marginLeft: 0,
    flexDirection: 'column',
    flex: 1.5,
    alignItems: "center",
  },

  searchButtonDate: {
    backgroundColor: '#2B6EDC',
    elevation: 1,
    borderRadius: 5,
    //marginHorizontal:20,
    justifyContent: "space-between",
    padding: 7,

    alignItems:'center',
    margin:5,
    paddingHorizontal:15
  },

  search_row: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  order_ustbilgi_row: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  iconButtonCustomer: {
    // marginHorizontal: 2,
    // paddingLeft: 16,
    // flex: 0.5,
    textAlign: "right",
  },
  iconButtonOrder: {
    paddingLeft: 16,

  },


  modalContainer: {
    margin: 32,
    padding: 6,
    backgroundColor: '#efefef',
    top: 320,
    left: 20,
    right: 20,
    alignItems: 'center',
    position: "absolute",
  },
  innerContainer: {
    alignItems: 'center',
  },

  modalEditButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 43,
    margin: 1,
    borderRadius: 5,
  },

  modalCostButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 36,
    margin: 1,
    borderRadius: 5,
  },

  modalEditButtonText: {
    textAlign: "center",
    color: "#6E6E6E",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalCostButtonText: {
    textAlign: "center",
    color: "#6E6E6E",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalAddCashButtonText: {
    textAlign: "center",
    color: "#62C463",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalDeleteButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 61,
    margin: 1,
    borderRadius: 5,
  },

  modalDeleteButtonText: {
    textAlign: "center",
    color: "#B80202",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalCancelButtonContainer: {
    left: 120,
    paddingHorizontal: 10,
  },

  logoutButtonContainer: {
    backgroundColor: '#D60D0D',
    // paddingHorizontal:61,
    // margin:5,
    borderRadius: 5,
    // flex:1,
    // justifyContent:"flex-end"
    marginBottom: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
  },

  employeeCostContainer: {
    backgroundColor: '#2B6EDC',
    // paddingHorizontal:61,
    // margin:5,
    borderRadius: 5,
    // justifyContent:"flex-end"
    marginBottom: 10,
    padding:5,
    marginTop:10,
    marginHorizontal:5

  },

  logoutButtonText: {
    textAlign: "center",
    color: "#F3CCCC",
    fontWeight: "900",
    fontSize: 17,
    // paddingVertical: 17,
    // marginHorizontal:10,
  },
  employeeCostButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
    fontSize: 17,
    // paddingVertical: 17,
    // marginHorizontal:10,
  },

  settingsContainer: {
    flex: 10
  },

  addProductButtonContainer: {
    backgroundColor: '#2B6EDC',
    // paddingHorizontal:61,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 5,
    // justifyContent:"flex-start",
    // flex:0.1,

  },
  addProductButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
    fontSize: 17,
    // paddingVertical: 17,
    // marginHorizontal:10,
  },

  errorText: {
    marginLeft: 10,
    marginBottom: 10,
    textAlign: "justify",
    color: "#EA0808",
    fontSize: 12,
  },

  amountButtonContainer: {
    backgroundColor: '#2B6EDC',
    borderRadius: 10,
    marginHorizontal: 30,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 22,
    //marginLeft:200,
    right: 10,
    alignItems: "center",

  },

  amountButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,

  },

  modalOrderButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 31,
    margin: 1,
    borderRadius: 5,
  },

  alınanParaText: {
    textAlign: "center",
    color: "green",
    includeFontPadding: false,
    flex: 1,
    fontSize: 12,
  },

  kalanParaText: {
    textAlign: "center",
    color: "#E30606",
    includeFontPadding: false,
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
  },

  pickerSelectStyles: {
    fontSize: 16,
    //paddingHorizontal:20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',

  },
  chechBoxContainer: {
    width:"100%",
    marginHorizontal: 20,
    justifyContent: "space-between",
    flex: 4,
    right:10,
    backgroundColor:"white"
  },

  chechBoxGunlerContainer: {
    padding:0,
    margin:1,
    width:"100%",
    justifyContent: "space-between",
    flex: 4,
    right:10,
    backgroundColor:"white"
  },
  checkBoxTextStyle : {
    fontFamily:'Avenir Next',fontSize:18,marginLeft:10,
  },

  productUrunfiyatText: {
    color: "#333",

    includeFontPadding: false,
    fontSize: 13,

  },

  wantedCustomerGetButtonContainer: {
    backgroundColor: '#2B6EDC',
    borderRadius: 4,
    marginHorizontal: 5,
    paddingVertical: 8,
    marginBottom: 5,
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
  },
  wantedCustomerGetText: {
    color: "white",
    includeFontPadding: false,
    fontSize: 15,
    textAlign: "right",
  },

  modalPriceYeniPriceButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 19,
    margin: 1,
    borderRadius: 5,
  },

  modalPriceYeniPriceButtonText: {
    textAlign: "center",
    color: "#9AB055",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalPriceTanimliFiyatButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    margin: 1,
    borderRadius: 5,
  },

  modalPriceTanimliFiyatButtonText: {
    textAlign: "center",
    color: "#B0AA55",
    fontWeight: "900",
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  modalPriceContainer: {
    margin: 32,
    padding: 6,
    backgroundColor: '#efefef',
    top: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
    position: "absolute",
  },

  siparisButtonContainer: {
    marginTop: 10,
    backgroundColor: '#2B6EDC',
    borderRadius: 5,
    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },

  newPriceButtonContainer: {
    backgroundColor: '#2B6EDC',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    justifyContent: 'center'
  },

  maasText: {
    color: "#853614",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 12,
    textAlign: "right",
  },

  userAddContiner: {
    margin: 10,
    elevation: 2,
    borderRadius: 2,
    paddingTop: 30,
    marginHorizontal: 20,
    justifyContent: "space-between",
    padding: 20,
    flex: 4,
  },

  addUserInfoText: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 10.5,
  },

  iconButtonOrderCustomer: {
  },

  rnpickerselect: {


    backgroundColor: '#fff',
    // marginHorizontal: 5,
    // paddingHorizontal: 20,
    // justifyContent: 'center',
    // color: 'black',
    // marginBottom: 10,
    // borderRadius: 4,
    // borderColor: "#333",
    // flex: 1
  },


  musteribulunamadiContainer: {
    backgroundColor: "#ECDF0A",
    margin: 10,
    elevation: 2,
    borderRadius: 2,
    paddingTop: 20,
    marginHorizontal: 20,
    justifyContent: "space-between",
    padding: 20,

  },

  musteribulunamadiText: {
    color: "#686204",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  FormLabel: {
    fontSize: 17,
    color: '#333'
  },

  SheetButtonContainer: {
    alignSelf:'flex-end',marginRight:20,paddingHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

  },
  PickerColor: {
    backgroundColor: '#E2E7F5'
  },
  reportText:{
    fontSize:18,
    color:'black',
    paddingLeft:10,
    margin:5,
    borderBottomWidth:1,
    fontFamily:'Avenir Next'
  },
  reportTextTotalCost:{
    fontSize:18,
    color:'black',
    paddingLeft:10,
    margin:5,
    fontFamily:'Avenir Next',
    borderBottomWidth:1,
    fontWeight:'bold',
  },
  reportDateText1:{
    fontSize:12,
  },
  reportDateText2:{
    fontSize:15,
    fontWeight:'bold'
  },
  employeeNameText:{
    color:'#2069F3',
    fontFamily: 'Avenir Next',
    fontSize:16,
    fontWeight:'600',
    marginRight:50
  },
  SheetContainer: {
    zIndex:100,
    flex: 1, 
    justifyContent: 'flex-start',
     alignItems: 'flex-start', 
     flexDirection: 'column', 
    // paddingTop: 10
  },
  SheetAmountContainer: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', paddingTop: 10,
    backgroundColor:'#EFF3F9'
  },
  SheetItemContainer: {
    borderBottomColor: "#D7DBE0", 
    flexDirection: 'row', 
    paddingTop: 10, 
    borderBottomWidth: 1, 
    paddingBottom: 15, 
    width: '100%',
    fontFamily:'Avenir Next',
    fontSize:20,
  },
  SheetItemIcon: {
    color: "#404243",
    fontSize:30
  },
  SheetItemText: {
    fontSize: 20, 
    width: '100%', 
    color: '#404243',
    fontFamily:'Avenir Next',
    marginLeft: 20
  },
});

export default styles;