import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { colors } from "../constants";
import styles from "../screens/styles";
import { IEmployeeItem } from "../redux/models/employeeModel";
import { Icon } from "native-base";


interface Props extends ViewProps {
  employee :IEmployeeItem;
}

export class EmployeeItem extends Component<Props, {}> {


      
  render() {
    const { employeeName, createDate, monthlySalary, active, employeeId } = this.props.employee;
    return (

        <View style={styles.rowStandart}>
        <View style={styles.row_cell5}>
          <View style={styles.row_cell8}>
            <Text style={styles.musteri_adi}>{employeeName}</Text>
            <Text style={styles.alt_bilgi}>İşe Giriş: {createDate.slice(8, 10) + "/" + createDate.slice(5, 7) + "/" + createDate.slice(0, 4)}</Text>
          </View>
          <View style={styles.row_cell2}>
            <Text style={styles.maasText}> Maaş: {monthlySalary} TL</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconButtonCustomer}
          onPress={() => this.openModal(employeeId, employeeName, monthlySalary, active)}>
          <Icon name="md-more"  color={"#C4B47B"} />
        </TouchableOpacity>
      </View>
    );
  }
}

