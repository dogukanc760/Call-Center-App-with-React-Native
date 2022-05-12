import React, {useRef, useContext} from 'react';

import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const PageContainer = styled.View`
  background-color: white;
  height: 100%;
  margin-right: 3px;
  margin-left: 3px;
  border-radius: 30px;
`;

const Wrapper = styled.View`
  margin: 6px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const TextWrapper = styled.View`
  margin: 10px;
  display: flex;
`;

const NameText = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: black;
`;
const NumbText = styled.Text`
  font-size: 15px;
  margin-top: 5px;
  color: black;
`;

const CardList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #bfbfbf;
  width: 170px;
  height: 180px;
  border-radius: 12px;
  margin: 5px;
`;

const CardTitle = styled.Text`
  font-size: 15px;
  color: black;
  font-weight: 600;
`;
const CardDesc = styled.Text`
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;
  color: black;
  text-align: center;
  font-weight: 400;
`;

export default function Account({navigation}) {
  const win = Dimensions.get('window');
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          title="Hesabım"
          subtitle="Seçim yaparak işleme devam ediniz"
          onPressBack={() => navigation.goBack()}
        />
        <PageContainer>
          <Wrapper>
            <TextWrapper>
              <NameText>Volkan Aslan</NameText>
              <NumbText>Dahili No: 1001</NumbText>
            </TextWrapper>

            <CardList>
              <CardContainer
                onPress={() => navigation.navigate('SystemSettings')}>
                <Icon name="user" color="#122e70" size={50} />
                <CardTitle>Sistem Ayarları</CardTitle>
                <CardDesc>
                  Detaylı raporlama için internet sitesinden giriş
                  yapabilirsiniz
                </CardDesc>
              </CardContainer>
              <CardContainer onPress={() => navigation.navigate('CallHistory')}>
                <Icon name="phone" color="#122e70" size={50} />
                <CardTitle>Arama Geçmişim</CardTitle>
                <CardDesc>
                  Detaylı raporlama için internet sitesinden giriş
                  yapabilirsiniz
                </CardDesc>
              </CardContainer>

              <CardContainer onPress={() => navigation.navigate('MissedCalls')}>
                <Icon name="volume-control-phone" color="#122e70" size={50} />
                <CardTitle>Cevapsız Çağrılar</CardTitle>
                <CardDesc>
                  Detaylı raporlama için internet sitesinden giriş
                  yapabilirsiniz
                </CardDesc>
              </CardContainer>
              <CardContainer onPress={logout}>
                <Icon name="remove" color="red" size={55} />
                <CardTitle>Oturumu Kapat</CardTitle>
                <CardDesc>Hesabımdan çıkış yap</CardDesc>
              </CardContainer>
            </CardList>
          </Wrapper>
        </PageContainer>
      </ImageBackground>
    </View>
  );
}
