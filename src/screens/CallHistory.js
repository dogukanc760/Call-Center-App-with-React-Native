import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  SectionList,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';

import ContactCard from '../components/ContactCard';



import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const image = {uri: 'https://reactjs.org/logo-og.png'};

export default function CallHistory({navigation}) {


  useEffect(()=>{
    console.log("first")
  })



      const Item = ({item}) => (
        <ContactCard
          title={item.title}
          subtitle={item.subtitle}
          callType={item.callType}
          callIcon={true}
        />
      );


  const PageContainer = styled.View`
    background-color: white;
    height: 100%;
    display: flex;
    margin-bottom: 20px;
    margin-right: 3px;
    margin-left: 3px;
    border-radius: 30px;
  `;
   const ItemsDateText = styled.Text`
     display: flex;
     flex-direction: column;
     margin-top: 14px;
     margin-right: 18px;
     margin-left: 18px;
     font-weight: bold;
   `;
   const ItemsDescText = styled.Text`
     display: flex;
     flex-direction: column;
     margin-right: 18px;
     margin-left: 18px;
     font-weight: bold;
   `;
   

   //DUMMY DATA
 const DATA = [
   {
     date: '12.04.2022',
     data: [
       {
         id: '1',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '2',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '3',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '4',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '5',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
     ],
   },
   {
     date: '06.04.2022',
     data: [
       {
         id: '1',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '2',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '3',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '4',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '5',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
       {
         id: '6',
         title: '[7001] Volkan Android Test',
         subtitle: '07.04.2020 17.31',
         callType: 'Dahili(Görüşme Sağlandı)',
       },
     ],
   },
 ];





//Ekranın yükseklik ve genişliğini veren hazır bir paket
const win = Dimensions.get('window');
  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          back
          title="Arama Geçmişim"
          subtitle="210 Toplam Çağrı"
          onPressBack={() => navigation.goBack()}
        />
        <SafeAreaView style={{flex: 1}}>
          <PageContainer>
            {/* Arama Geçmişim ve Cevapsız Çağrılar*/}

            <SectionList
              style={{marginBottom: 70}}
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Item item={item} />}
              renderSectionHeader={({section: {date, data}}) => (
                <View>
                  <ItemsDateText>{date}</ItemsDateText>
                  <ItemsDescText>
                    Bu tarihe ait {data.length} cevapsız çağrı bulunmaktadır.
                  </ItemsDescText>
                </View>
              )}
            />
          </PageContainer>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
