import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Text,
  View,
  Pressable,
  SectionList,
  SafeAreaView,
  SearchBar,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactCard from '../components/ContactCard';
import {AuthContext} from '../context/AuthContext';

const image = {uri: 'https://reactjs.org/logo-og.png'};

export default function MPanosu() {
  //Üstteki nitelix,kısa kod ve tümü gibi filtreleri tutacak hooks.Ekran ilk açıldığında tümü listeleneceği için ilk değeri Tümü ayarlandı
  const [filterData, setFilterData] = React.useState('Tümü');
  //Kullanıcı arama yaptığındaki text bu değişkene konuyor.İlk değeri boş string
  const [searchText, setSearchText] = React.useState('');
  //Fetch edilen data buraya konuyor.
 const [dataList, setDataList] = React.useState("");

  const [filterGroup, setFilterGroup] = React.useState("");

  let x=dataList.length;



  const PageContainer = styled.View`
    background-color: white;
    display: flex;
    margin-bottom: 20px;
    margin-right: 3px;
    margin-left: 3px;
    border-radius: 20px;
    height: 100%;
  `;

    const SearchContainer = styled.View`
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      margin-right: 20px;
    `;

  const TextContainer = styled.Text`
    color: black;
    font-weight: 500;
    margin-top: 14px;
    margin-right: 18px;
    margin-left: 18px;
  `;

  const FilterButtonsScroll = styled.ScrollView`
    overflow: hidden;
    display: flex;
  `;

   const SearchBar = styled.TextInput`
     overflow: hidden;
     background-color: red;
     padding: 10px;
     border-radius: 5px;
     margin-top: 10px;
     margin-left: 10px;
     margin-right: 10px;
     height: 45px;
     flex: 1;
     
   `;

  const FilterButton = styled.TouchableOpacity`
    background-color: aqua;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 0px;
    width: 120px;
    height:50px;
  `;
  const FilterButtonText = styled.Text`
    color: red;
  `;



//filterData ve searchText değişirse IntervalList fonksiyonu çalışcak ve fetch edilen data güncellenecektir.
useEffect(() => {
  const InternalList = async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let DahiliSubeNo = userInfo.X_DAHILI_SUBE;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        X_SUBE: DahiliSubeNo,
        X_GRUPID: 'Tümü',
        X_SEARCH: searchText,
      }),
    };

    fetch(
      'https://apiisnet.nitelix.com/Busyboard/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4',
      requestOptions,
    )
      .then(response => response.json())
      .then(data => setDataList(data))
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });

    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        X_SUBE: DahiliSubeNo,
      }),
    };
    fetch(
      'https://apiisnet.nitelix.com/BusyboardGroup/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4',
      requestOptions2,
    )
      .then(response => response.json())
      .then(data => setFilterGroup(data))
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
    console.log(filterData);
    console.log(filterGroup);
  };
  InternalList();
}, [filterData,searchText]);


 

// Çekilen dataList DATA arrayinin data elemanı olarak verildi
  const DATA = [
    {
      cat: 'Genel',
      data: dataList,
    },
   
  ];


//Her item buraya getiriliyor.
  const Item = ({item}) => (
    <>
      <ContactCard
        code={item.X_DAHILI_NO}
        title={item.X_DAHILI}
        subtitle={item.X_GRUP}
        callIcon={true}
      />
   
    </>
  );
  //Ekranın yükseklik ve genişlik değeri
const win = Dimensions.get('window');
  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          title="Meşguliyet Panosu"
          subtitle={dataList.length + ' Dahili'}
          onPressBack={() => navigation.goBack()}
        />
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <PageContainer>
            {/*              
              <FlatList
                style={{marginBottom: 70}}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              /> */}
            <View>
              {/* <Text>{filterData}</Text> */}


              {/* Üst kısımdaki filtre butonları  */}
              <FilterButtonsScroll
                showsHorizontalScrollIndicator={false}
                style={{marginHorizontal: 20}}
                horizontal>
                <FilterButton
                  activeOpacity={1}
                  onPress={() => {
                    setFilterData('Tümü');
                  }}>
                  <FilterButtonText>Tümü ({x})</FilterButtonText>
                </FilterButton>
                {Object.keys(filterGroup).map((item, i) => (
                  <View key={i}>
                    <FilterButton
                      style={{marginLeft: 10}}
                      activeOpacity={1}
                      onPress={() => {
                        setFilterData(filterGroup[item].X_GRUP.split(' (')[0]);
                      }}>
                      <FilterButtonText>
                        {filterGroup[item].X_GRUP}
                      </FilterButtonText>
                    </FilterButton>
                  </View>
                ))}
              </FilterButtonsScroll>
            </View>

            <View>
              <SearchContainer>
                <SearchBar
                  onChangeText={setSearchText}
                  value={searchText}
                  placeholder="Dahili Adı / Dahili No / Grup "
                />
                <Icon name="Telephone" size={20} />
              </SearchContainer>

              {/* Sectionlist react nativee özgü bir component.DATA arrayinin her bir elemanını Item'a iletiyor */}
              <SectionList
                style={{marginBottom: 200}}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) =>
                  filterData == 'Tümü' ? (
                    <Item item={item} />
                  ) : (
                    filterData === item.X_GRUP && <Item item={item} />
                  )
                }
              />
            </View>
          </PageContainer>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
