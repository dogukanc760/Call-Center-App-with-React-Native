import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import JsSIP from '../jssip/jssip-edited-by-coderbig';

const image = {uri: 'https://reactjs.org/logo-og.png'};



const ButtonWrapper = styled.TouchableOpacity`
  margin: 4px;
  display: flex;
  background-color: transparent;
  height: 80px;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ButtonBlackWrapper = styled.TouchableOpacity`
  display: flex;
  background-color: black;
  opacity: 0.6;
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ButtonRedWrapper = styled.TouchableOpacity`
  display: flex;
  background-color: #b22222;

  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ButtonWrapperNew = styled.TouchableOpacity`
  margin: 4px;
  display: flex;
  background-color: #2a5298;
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

const ButtonContainer = styled.View`
  margin: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonHorizontal = styled.View`
  display: flex;
  flex-direction: row;
`;

const ButtonTitle = styled.Text`
  font-size: 25px;
`;
const ButtonSubTitle = styled.Text`
  font-size: 15px;
  color: white;
`;

const PhoneInput = styled.Text`
  font-size: 20px;
`;

const PhoneInputContainer = styled.View`
  width: 100%;
  display: flex;
  height: 50px;
  width: 80%;
  margin: 15px;
  background-color: yellow;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const DashboardText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const DashboardSubText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #2a5298;
`;

const DashboardSubTextDot = styled.Text`
  margin-left: 10px;
  margin-top: 25px;
  font-size: 35px;
  font-weight: bold;
  color: #2a5298;
`;

const DashboardSubTitleText = styled.Text`
  textalign: center;
  font-size: 14px;
  display: flex;
  font-weight: bold;
  width: 110px;
  height: 25px;
  justify-content: center;
  align-items: center;

  background-color: white;
  border-radius: 5px;
`;

const CallButtonWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: grey;
  opacity: 0.6;
  height: 60px;
  width: auto;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  margin-top: 10px;
`;
const CallButtonTitle = styled.Text``;
const CallButtonSubTitle = styled.Text``;
const CallTitleWrapper = styled.View`
  display: flex;
  margin-left: 15px;
  justify-content: space-between;
`;
const CallButtonListWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const PageContainer = styled.View`
  background-color: grey;
  opacity:0.95
  height: 100%;
  margin-right: 3px;
  margin-left: 3px;
  border-radius: 30px;
`;

export default function CallPageOne({navigation, phoneNum, callParams}) {
  //Telefon numarasının tutulduğu yer
  const [phoneText, setPhoneText] = React.useState('Telefon Numarası');
  const [totalText, setTotalText] = React.useState('');
  const [pageCount, setPageCount] = React.useState(1);
  const [recording, setRecording] = React.useState();


  //mikrofondan ses alma sesi başlatma ve unmute
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  //ses almayı durdurma -mute 
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  //santral 1 
  var sntyol1 = callParams.X_SANTRAL_YOL.replace("wss://","sip:"+callParams.X_DAHILI_NO+"@");
   
  var session = null,
    socketss = new JsSIP.WebSocketInterface(sntyol1);
  var uaprogressState = {state: 0},
    mediaContrs = {audio: true, video: false};
  var rtcParams = {
    uri: '',
    phoneNumber: '',
    phoneName: '',
    callId: '',
    TransferNumber: '',
    TransferInterNumber: '',
    TransferCustomerNumber: '',
    Asserted_Identity: '',
    Inbound_type: '',
    calltype: '',
  };
  var phoneParams = {
    callType: 'wait',
    Status: '',
    interNumber: '',
    callnumber: '',
    transferInterNumber: '',
    callId: '',
    uri: '',
  };
  var configuration = {
    sockets: [socketss],
    uri: callParams.X_DAHILI_NO,
    password: callParams.X_DAHILI_PASS,
    session_timers: true,
    realm: 'asterisk',
    display_name: callParams.X_DAHILI_ADI,
  };
  var ua = new JsSIP.UA(configuration);

  
  const connect = () => {
    ua.start();
  }

  const disconnect = () => {
    ua.stop();
  }

  var eventHandlers = {
    'progress':   function(data){ connect() },
    'failed':     function(data){ stop() },
    'confirmed':  function(data){ startRecording() },
    'ended':      function(data){ stop(); stopRecording(); }
  };

  //ornek olsun diye koydum
  var options = {
    'eventHandlers': eventHandlers,
    'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
    'mediaConstraints': {'audio': true, 'video': true},
    'pcConfig': {
      'iceServers': [
        { 'urls': ['stun:a.example.com', 'stun:b.example.com'] },
        { 'urls': 'turn:example.com', 'username': 'foo', 'credential': ' 1234' }
      ]
    }
  };

  const callAnyOne = (phone) => {
     ua.call(callParams.X_ARAMA_YOL.replace("{phone}", phone), {'eventHandlers': eventHandlers, 'mediaConstraints': mediaConstraints});
  }


  

  //Storage fonksiyonunu ayağa kaldırıp promise'e bağlar
  React.useEffect(() => {
    callAnyOne(phoneNum);
  });
  const win = Dimensions.get('window');

  //Hangi tuşa basılırsa burası parametre alacak ve o telefon numarasını yazacak.Arama bölümü bittiğinde iki arama butonu için
  //onPress vererek arama ekranına yçnlendirme yapılacak.
  const onClickHandler = () => {
    setPhoneText('5');
  };

  const setCount = value => {
    setPageCount(value);
    console.log(pageCount);
  };

  return (
    <View style={{display: 'flex'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{height: win.height, width: win.width}}>
        <Header
          title="CallPageOne"
          subtitle="Numara tuşlayıp arama yapabilirsiniz"
          onPressBack={() => navigation.goBack()}
        />

        <PageContainer>
          {pageCount == 1 ? (
            <ButtonContainer>
              {/* <PhoneInputContainer>
                <PhoneInput>{phoneText}</PhoneInput>
              </PhoneInputContainer> */}

              <ButtonHorizontal>
                <ButtonWrapperNew>
                  <ButtonTitle>
                    <Icon name="user" size={40} color="white" />
                  </ButtonTitle>

                  {/* <ButtonSubTitle>DEF </ButtonSubTitle> */}
                </ButtonWrapperNew>
              </ButtonHorizontal>

              <ButtonHorizontal>
                <ButtonContainer>
                  <DashboardText>0546 123 123 123.</DashboardText>
                </ButtonContainer>
              </ButtonHorizontal>
              <ButtonHorizontal>
                <ButtonContainer>
                  <DashboardSubText>00:00:00.</DashboardSubText>
                </ButtonContainer>
              </ButtonHorizontal>

              <ButtonHorizontal>
                <ButtonContainer>
                  <DashboardSubTitleText>Giden Arama</DashboardSubTitleText>
                </ButtonContainer>
              </ButtonHorizontal>

              <ButtonHorizontal style={{marginBottom: 55, marginTop: 25}}>
                <ButtonWrapper
                  style={{marginRight: win.width / 7}}
                  onPress={onClickHandler}>
                  <ButtonTitle style={{marginBottom: 5}}>
                    <Icon name="microphone-slash" size={40} color="white" />
                  </ButtonTitle>
                  <ButtonSubTitle>Mik. Kapalı </ButtonSubTitle>
                </ButtonWrapper>

                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle style={{marginBottom: 5}}>
                    <Icon name="stop-circle" size={40} color="white" />
                  </ButtonTitle>
                  <ButtonSubTitle>Beklet </ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>
              <ButtonHorizontal>
                <ButtonWrapper
                  style={{marginRight: win.width / 7}}
                  onPress={onClickHandler}>
                  <ButtonTitle style={{marginBottom: 5}}>
                    <Icon name="arrow-right" size={40} color="white" />
                  </ButtonTitle>
                  <ButtonSubTitle>Transfer Et </ButtonSubTitle>
                </ButtonWrapper>

                <ButtonWrapper>
                  <ButtonTitle
                    style={{marginBottom: 5}}
                    onPress={() => setCount(2)}>
                    <Icon name="list-ol" size={40} color="white" />
                  </ButtonTitle>
                  <ButtonSubTitle>Tuş Takımı </ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>

              <ButtonHorizontal style={{marginBottom: 55, marginTop: 25}}>
                <ButtonBlackWrapper
                  style={{marginRight: win.width / 7}}
                  onPress={onClickHandler}>
                  <ButtonTitle>
                    <Icon name="volume-up" size={40} color="white" />
                  </ButtonTitle>
                </ButtonBlackWrapper>

                <ButtonRedWrapper
                  onPress={() => navigation.navigate('Telephone')}>
                  <ButtonTitle>
                    <Icon name="phone" size={40} color="white" />
                  </ButtonTitle>
                </ButtonRedWrapper>
              </ButtonHorizontal>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              {/* <PhoneInputContainer>
                <PhoneInput>{phoneText}</PhoneInput>
              </PhoneInputContainer> */}
              <DashboardSubTextDot>...</DashboardSubTextDot>
              <ButtonHorizontal>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>1</ButtonTitle>
                  <ButtonSubTitle> </ButtonSubTitle>
                </ButtonWrapper>

                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>2</ButtonTitle>
                  <ButtonSubTitle>ABC </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>3</ButtonTitle>
                  <ButtonSubTitle>DEF </ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>

              <ButtonHorizontal>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>4</ButtonTitle>
                  <ButtonSubTitle>GHI </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>5</ButtonTitle>
                  <ButtonSubTitle>JKL </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>6</ButtonTitle>
                  <ButtonSubTitle>MNO </ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>
              <ButtonHorizontal>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>7</ButtonTitle>
                  <ButtonSubTitle>PQRS </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>8</ButtonTitle>
                  <ButtonSubTitle>TUV </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>9</ButtonTitle>
                  <ButtonSubTitle>WXYZ </ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>

              <ButtonHorizontal>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>*</ButtonTitle>
                  <ButtonSubTitle>, </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>0</ButtonTitle>
                  <ButtonSubTitle>+ </ButtonSubTitle>
                </ButtonWrapper>
                <ButtonWrapper onPress={onClickHandler}>
                  <ButtonTitle>#</ButtonTitle>
                  <ButtonSubTitle></ButtonSubTitle>
                </ButtonWrapper>
              </ButtonHorizontal>

              <CallButtonListWrapper>
                <CallButtonWrapper
                  onPress={() => setCount(1)}
                  style={{marginLeft: 15}}>
                  <Icon
                    name="arrow-left"
                    color="white"
                    size={28}
                    style={{marginLeft: 15}}
                  />
                  <CallTitleWrapper>
                    {/* <CallButtonSubTitle>Hat 2</CallButtonSubTitle>
                    <CallButtonTitle>0(216) 217 3232</CallButtonTitle> */}
                  </CallTitleWrapper>
                </CallButtonWrapper>
              </CallButtonListWrapper>
            </ButtonContainer>
          )}
        </PageContainer>
      </ImageBackground>
    </View>
  );
}
