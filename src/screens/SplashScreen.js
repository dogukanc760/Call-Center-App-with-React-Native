import React from 'react';
import {ActivityIndicator, View} from 'react-native';


//Bu yükleniyor ekranı.Şuana kadar hiçbir sayfada kullanılmadı.
const SplashScreen = () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

export default SplashScreen;
