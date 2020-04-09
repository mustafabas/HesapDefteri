import React from 'react'
import { View, Button } from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
 

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}


export default class RateUsScreen extends React.Component<Props,{}> {
  constructor(props) {
    super(props)
    this.state = {
      rated: false
    }
  }
 
  render() {
    return (
      <View>
        <Button title="Rate App" onPress={()=>{
          const options = {
            AppleAppID:"1495596894",
        //     GooglePackageName:"com.mywebsite.myapp",
        //     AmazonPackageName:"com.mywebsite.myapp",
        //     OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
        //     preferredAndroidMarket: AndroidMarket.Google,
        //     preferInApp:false,
        //     openAppStoreIfInAppFails:true,
        //     fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
          }
          Rate.rate(options, success=>{
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              this.setState({rated:true})
            }
          })
        }} />
      </View>
    )
  }
}