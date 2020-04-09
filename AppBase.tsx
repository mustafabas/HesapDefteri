import React, { Component } from "react";
import {  connect } from "react-redux";
import AppContainer from "./src/navigation/AppNavigation";
import { getNotificationCount, getNotifications } from "./src/redux/actions/notificationAction";
import { AppState } from "./src/redux/store";
interface State{
  badgeCount:number;
}

interface Props{
  notCount:number;
  loading:boolean;
  getNotificationCount : () => void;
}
 class AppBase extends Component<Props, {}> {

  constructor(props:Props) {
    super(props);

  }
  componentDidMount(){
    this.props.getNotificationCount();
    
  }
  render() {

    return (
      <AppContainer screenProps={{badgeCount:this.props.notCount ? this.props.notCount.toString():"0"}}  />
    );
    }
 }
const mapStateToProps = (state: AppState) => ({
  loading : state.notification.isLoadingCount,
  notCount : state.notification.notCount
  
  });
  
  function bindToAction(dispatch: any) {
    return {
      getNotificationCount : () => 
      dispatch(getNotificationCount()),
  
    };
  }

export default connect(
  mapStateToProps,
  bindToAction
)(AppBase);




