import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  SectionList,
  FlatList,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';
import ContactCard from '../components/ContactCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = {uri: 'https://reactjs.org/logo-og.png'};

export default function MissedCalls({navigation}) {
  const [dataList, setDataList] = useState([]);
  const [manipDataList, setManipDataList] = useState([]);

 
//Cevapsız aramalar çekilerek dataList'e aktarılıyor.Aynı gün içerisindeki çağrılar listeye eklenerek manipDataListe aktarılıyor.
  const getMissedCallList = async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let DahiliSubeNo = userInfo.X_DAHILI_SUBE;
    let DahiliNo = userInfo.X_DAHILI_NO;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        XSube: DahiliSubeNo,
        XDahilii: DahiliNo,
      }),
    };
    try {
      const response = await fetch(
        'https://apiisnet.nitelix.com/UnAnswerCall_Query/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4',
        requestOptions,
      );
      const json = await response.json();
      setDataList(json);

      dataList.map(x => {
        const splittime = x.X_TARIH.split('T');
        // console.log(x.X_TARIH.split('T'));
        x.X_TARIH = splittime[0];
        x['X_HOUR'] = splittime[1];

        //x.push(gg)
      });

      function groupBy(arr, criteria) {
        const newObj = arr.reduce(function (acc, currentValue) {
          if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
          }
          acc[currentValue[criteria]].push(currentValue);
          return acc;
        }, {});
        return newObj;
      }

      const editData = groupBy(dataList, 'X_TARIH');

      setManipDataList(editData);
    } catch {
      console.log('ERROR');
    }
  };

  //useEffect sayfa açılınca sadece bir kere çalışır ve fetch fonksiyonunu çağırır
  useEffect(() => {
    
    getMissedCallList();
  }, []);


  //manipdataList map edilirken her bir itemi buraya gönderilir.Çekilen data components/ContractCard.js componentine aktarılır.
  const Item = ({item}) => (
    <ContactCard
      title={item.X_DAHILI_ADI}
      subtitle={item.X_TARIH + ' ' + item.X_HOUR}
      callType={item.X_CAGRI_DURUM}
      callIcon={true}
    />
  );
  // DATA.push({'date':"12.04.2022","data":[{'id':"12","title":"FontFace",subtitle:"gg","callType":"gg"}]})

  // Object.keys(dataList).map((item, i) => (
  //   <Text className="input-label">{dataList[item].X_TARIH}</Text>
  // ));

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
  const PageContainer = styled.View`
    background-color: white;
    height: 100%;
    margin-right: 3px;
    margin-left: 3px;
    border-radius: 30px;
    display: flex;
    margin-bottom: 20px;
  `;

  const win = Dimensions.get('window');
  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          back
          title="Cevapsız Çağrı"
          subtitle={dataList.length + ' Cevapsız Çağrı'}
          onPressBack={() => navigation.goBack()}
        />
        <SafeAreaView style={{flex: 1}}>
          <PageContainer>
            {
              
              Object.entries(manipDataList).map(([key, value]) =>{
               return (
                 <View>
                   <ItemsDateText>{key}</ItemsDateText>
                   <ItemsDescText>
                     Bu tarihe ait {manipDataList[key].length} cevapsız çağrı
                     bulunmaktadır.
                   </ItemsDescText>
                   {/* manipDataList map edilerek her bir objenin key'ine denk gelen value'su(dizisi) Item componentine aktarılıyor */}
                   {
                     manipDataList[key].map((y)=>{
                       return <Item item={y}/>
                     })
                   }
                 </View>
               );
              })
            }
          </PageContainer>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
