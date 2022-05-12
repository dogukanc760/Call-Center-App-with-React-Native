import React, { useState,useEffect } from 'react';
import {StyleSheet,Dimensions, ImageBackground, Text, View} from 'react-native';
import Header from '../components/Header';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const image = {uri: 'https://reactjs.org/logo-og.png'};
export default function SystemSettings({navigation}) {


const countries = [];
const [list,setList]=useState([])


//Kişilerin listesi çekiliyor.Dropbox içerisinde yer alacak veriler.
const getList = async () => {
  let userInfo = await AsyncStorage.getItem('userInfo');
  userInfo = JSON.parse(userInfo);
  let DahiliSubeNo = userInfo.X_DAHILI_SUBE;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      XSube: DahiliSubeNo,
      X_GRUPID: 'Tümü',
      X_SEARCH: '',
    }),
  };
  try {
    const response = await fetch(
      'https://apiisnet.nitelix.com/Busyboard/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4',
      requestOptions,
    );
    const json = await response.json();
    setList(json);
    
  } catch {
    console.log('ERROR');
  }
};
  useEffect(() => {
    getList();
  }, []);


  const PageContainer = styled.View`
    background-color: white;
    height: 100%;
    margin-right: 3px;
    margin-left: 3px;
    border-radius: 30px;
  `;
     const ItemsTitleText = styled.Text`
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
       font-size: 10px;
     `;
        const SettingWrapper = styled.View`
          display: flex;
        `;
          const ToogleText = styled.Text`
            display: flex;
          `;
              const TailWrapper = styled.View`
              margin-top: 10px;
                display: flex;
                flex-direction: row;
              `;
                  const TailItem = styled.View`
                    margin-right: 18px;
                    margin-left: 18px;
                    flex-direction: row;
                    align-items: center;
                  `;
        


 const [tail, setTail] = React.useState(false);

const SettingsItem=({title,desc})=>{
  return(
      <SettingWrapper>
        <ItemsTitleText>{title}</ItemsTitleText>
        <ItemsDescText>
         {desc}
        </ItemsDescText>
        <View style={{marginLeft: 18}}>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            buttonStyle={{
              width: '90%',
              marginTop: 10,
              height: 30,
              backgroundColor: '#FFF',
              justifyContent: 'center',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#444',
            }}
            buttonTextStyle={{
              color: '#444',
              textAlign: 'left',
            }}
            rowStyle={{
              backgroundColor: '#EFEFEF',
              borderBottomColor: '#C5C5C5',
            }}
            renderDropdownIcon={isOpened => {
              return (
                <Icon name={isOpened ? 'phone' : 'phone'} color={'#444'} />
              );
            }}
            rowTextStyle={{color: '#444', textAlign: 'left'}}
            dropdownStyle={{backgroundColor: '#EFEFEF'}}
            dropdownIconPosition={'right'}
            defaultButtonText="Kimseye Yönlendir"
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
      </SettingWrapper>
      )
}
const win = Dimensions.get('window');
  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          back
          saveButton
          title="Sistem Ayarları"
          subtitle="Bilgileri Kaydetmeyi Unutmayınız"
          onPressBack={() => navigation.goBack()}
        />

        <PageContainer>
          <TailWrapper>
            <TailItem>
              <CheckBox
                value={tail}
                onValueChange={newValue => setTail(true)}
              />
              <ToogleText>Kuyruğa gir</ToogleText>
            </TailItem>
            <TailItem>
              <CheckBox
                value={!tail}
                onValueChange={newValue => setTail(false)}
              />
              <ToogleText>Kuyruğa girme</ToogleText>
            </TailItem>
          </TailWrapper>
          <SettingWrapper>
            <SettingsItem
              title="1. Koşulsuz Yönlendir"
              desc="Gelen tüm çağrılar başka bir dahiliye yönlendirirlir."
            />
          </SettingWrapper>
          <SettingWrapper>
            <SettingsItem
              title="2. Cevapsız Yönlendir"
              desc=" Gelen çağrıya cevap vermezseniz başka bir dahiliye yönlendirir."
            />
          </SettingWrapper>
          <SettingWrapper>
            <SettingsItem
              title="3. Meşgulse Yönlendir"
              desc=" Görüşme esnasında gelen çağrıyı başka bir dahiliye yönlendirir."
            />
          </SettingWrapper>
          <SettingWrapper>
            <SettingsItem
              title="4. Çevrimdışıysa Yönlendir"
              desc=" Çevrimdışıysanız çağrıyı başka bir dahiliye yönlendirir."
            />
          </SettingWrapper>
        </PageContainer>
      </ImageBackground>
    </View>
  );
}
