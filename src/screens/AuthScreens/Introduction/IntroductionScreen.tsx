import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet, View, Text, Image, I18nManager} from 'react-native';
import {AsyncStorage } from 'react-native'

import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Platform } from 'react-native';

I18nManager.forceRTL(false);

const platform  = Platform.OS === 'ios'


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',

  },
  image: {
    width: 320,
    height: 320,
  },
  text: {

    fontFamily:'Avenir Next',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color:'#2069F3',
    fontWeight:'600',

    fontFamily:'Avenir Next',


    textAlign: 'center',

  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Müşteri',
    text:
      'Müşterilerinizi kolayca yönetin ve onlara özel fiyat tanımlaması yapın!',
    icon: 'ios-images',
    colors: ['green', 'black'],
    image : platform ? require('../../../images/intro/intro1-ios.png') : require('../../../images/intro-android/musteriler.png')

  },
  {
    key: 'somethun1',
    title: 'Sipariş',
    text:
      'Müşterilerinize sipariş ekleyin ve ödemeleriniz kayıt altına alın!',
    icon: 'ios-options',
    colors: ['green', 'black'],
    image : platform ?  require('../../../images/intro/intro4-ios.png') : require('../../../images/intro-android/siparisler.png')
  },
  {
    key: 'somethun2',
    title: 'Rapor',
    text: 'Gelişmiş rapor sistemimizle müşterilerinizi ürünlerinizi gün ve ay bazında listeleyip kar marjınızı görün!',
    icon: 'ios-beer',
    colors: ['green', 'black'],
    image : platform ? require('../../../images/intro/intro3-ios.png') : require('../../../images/intro-android/rapor1.png')
  },
  {
    key: 'somethun2',
    title: 'Çalışanlar',
    text: 'Çalışanlarınız ve onların giderlerini ekleyin ayrıca uygulamayı kullanmalarına izin verin!',
    icon: 'ios-beer',
    colors: ['green', 'black'],
    image : platform ? require('../../../images/intro/intro2-ios.png') : require('../../../images/intro-android/calisanlar.png')
  },
];


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export default class App extends React.Component<Props,{}> {
  _renderItem = ({ item, dimensions }) => (
    <View
      style={[

        {
          flex: 1,
          // paddingTop: item.topSpacer,
          // paddingBottom: item.bottomSpacer,
          // width: dimensions.width,
          justifyContent:'flex-end',


        },
      ]}
      // colors={item.colors}


    >

      <View >
        <Text style={styles.title}>{item.title.toUpperCase()}</Text>
        <Text style={styles.text}>{item.text}</Text>
          </View>
          <Image style={{width:'100%',height:'80%',marginBottom:50,marginTop:'-5%'}} source={item.image} />
  
    </View>
  );

  setToIntrShowed() {
AsyncStorage.setItem("setToIntrShowed",JSON.stringify(true),()=>{
    this.props.navigation.navigate('LoginScreen')
    
});
  }
  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#EFF3F9'}}>
<AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        // bottomButton
        activeDotStyle={{backgroundColor:'#2069F3'}}
        onSkip={()=>this.setToIntrShowed()}
        onDone={()=>this.setToIntrShowed()}
        showPrevButton
        showSkipButton
        buttonStyle={{backgroundColor:'#2069F3',borderRadius:5}}
        skipLabel="Geç"
        doneLabel="Bitir"
        nextLabel="İleri"
        prevLabel="Geri"
        // hideNextButton
        // hideDoneButton
        // onSkip={() => }
      />
      </SafeAreaView>
      
    );
  }
}