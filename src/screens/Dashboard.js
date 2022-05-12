import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Dashboard() {

  const PageContainer = styled.View`
background-color: white;
height: 100%;
margin-right:3px ;
margin-left:3px ;
border-radius: 30px;
`;

const DashboardContainer = styled.View`
  margin-top: 10px;
  margin-right: 18px;
  margin-left: 18px;
`;

const DashboardTopItem = styled.View`
display:flex;
flex-direction: row;
align-items: center;
margin-top: 10px;
`;

const DashboardText = styled.Text`
margin-left: 10px;

`;

const Card = styled.View`
  background-color: aliceblue;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  padding: 8px;
  border-radius: 8px;
  height: 70px;
  margin-top: 10px;
  width: 50%;
  
  
`;

const CardTitle = styled.Text`
  margin-left: 10px;
  color:white;
`;
const CardDesc = styled.Text`
  margin-left: 10px;
  color: white;
`;

const CallTimeTitle = styled.Text`
  color: black;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
  
`;
const CallTimeCardTitle = styled.Text`
  color: black;
  margin-left: 8px;
`;
const CallTimeDesc = styled.Text`
  font-size: 10px;
  color: black;
`;
const CardRightContainer = styled.View`
 
 
`;

const CardLeftContainer = styled.View`
 margin-right: 20px;
 
`;
const CardListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;

const CallTimeCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f6f;
  padding: 10px;
  border-radius: 8px;
  margin-top: 8px;
`;



const win = Dimensions.get('window');
  
    return (
      <View style={{display: 'flex'}}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{height: win.height, width: win.width}}>
          <Header
            title="Nitelix"
            subtitle="Volkan ASLAN (1001)"
            onPressBack={() => navigation.goBack()}
            iconColor="white"
            iconBackgroundColor="red"
            iconName="account"
          />
          <SafeAreaView style={{flex: 1}}>
            <PageContainer>
              <DashboardContainer>
                <DashboardTopItem>
                  <Icon name="phone" size={18} color="green" />
                  <DashboardText>Santral bağlantısı kuruldu</DashboardText>
                </DashboardTopItem>
                <DashboardTopItem>
                  <Icon name="phone" size={18} color="green" />
                  <DashboardText>
                    Bugünkü arama oranınız %88.99'dir.
                  </DashboardText>
                </DashboardTopItem>
                <DashboardTopItem>
                  <Icon name="phone" size={18} color="green" />
                  <DashboardText>
                    Cevapsız çağrı sayınız 4 aramadır.
                  </DashboardText>
                </DashboardTopItem>

                <CardListWrapper>
                  <Card style={{width:win.width/2.2}}>
                    <CardLeftContainer>
                      <CardTitle>Toplam Çağrı</CardTitle>
                      <CardDesc>78 Arama</CardDesc>
                    </CardLeftContainer>
                    <CardRightContainer>
                      <Icon name="phone" size={30} color="green" />
                    </CardRightContainer>
                  </Card>
                  <Card style={{width:win.width/2.3}}>
                    <CardLeftContainer>
                      <CardTitle>Toplam Çağrı</CardTitle>
                      <CardDesc>78 Arama</CardDesc>
                    </CardLeftContainer>
                    <CardRightContainer>
                      <Icon name="phone" size={30} color="green" />
                    </CardRightContainer>
                  </Card>
                  <Card>
                    <CardLeftContainer>
                      <CardTitle>Toplam Çağrı</CardTitle>
                      <CardDesc>78 Arama</CardDesc>
                    </CardLeftContainer>
                    <CardRightContainer>
                      <Icon name="phone" size={30} color="green" />
                    </CardRightContainer>
                  </Card>
                  <Card>
                    <CardLeftContainer>
                      <CardTitle>Toplam Çağrı</CardTitle>
                      <CardDesc>78 Arama</CardDesc>
                    </CardLeftContainer>
                    <CardRightContainer>
                      <Icon name="phone" size={30} color="green" />
                    </CardRightContainer>
                  </Card>
                  <Card style={{width: '100%'}}>
                    <CardLeftContainer>
                      <CardTitle>Toplam Çağrı</CardTitle>
                      <CardDesc>78 Arama</CardDesc>
                    </CardLeftContainer>
                    <CardRightContainer>
                      <Icon name="phone" size={30} color="green" />
                    </CardRightContainer>
                  </Card>
                </CardListWrapper>

                <CallTimeTitle>Çağrı Süreleri</CallTimeTitle>
                <CallTimeDesc>
                  Günlük olarak gelen çağrılarınıza ait sürelerdir.
                </CallTimeDesc>

                <CallTimeCard>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="phone" size={15} color="green" />
                    <CallTimeCardTitle>Toplam Süre</CallTimeCardTitle>
                  </View>
                  <CallTimeCardTitle>00:00:00</CallTimeCardTitle>
                </CallTimeCard>
                <CallTimeCard>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="phone" size={15} color="green" />
                    <CallTimeCardTitle>
                      Kuyrukta Bekleyen Süre
                    </CallTimeCardTitle>
                  </View>
                  <CallTimeCardTitle>00:00:00</CallTimeCardTitle>
                </CallTimeCard>
                <CallTimeCard>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="phone" size={15} color="green" />
                    <CallTimeCardTitle>Başarılı Süre</CallTimeCardTitle>
                  </View>
                  <CallTimeCardTitle>00:00:00</CallTimeCardTitle>
                </CallTimeCard>
              </DashboardContainer>
            </PageContainer>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  
}


