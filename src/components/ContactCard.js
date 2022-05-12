import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Bu component başka sayfalarda kullanıldığında code,title,subtitle,callType ve callIcon propsları alıyor.
export default function ContactCard({
    code,
    title,
    subtitle,
    callType,
    callIcon
}) {

  const Wrapper = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 14px;
    margin-right: 18px;
    margin-left: 18px;
    
  `;
  const CardContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
 
  `;
  const Code = styled.Text`
    display: flex;
    background-color: aqua;
    padding: 12px;
    border-radius: 12px;
    font-size: 12px;
  `;
  const ContactContainer = styled.View`
    display: flex;
    margin-left: 10px;
    justify-content: center;
    
  `;
  const RightContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 3;
    justify-content: flex-end;
  `;
  const LeftContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
   flex: 3;
  `;
  const Title = styled.Text`
    display: flex;
    flex-direction: row;
    font-size: 15px;
  `;
  const SubTitle = styled.Text`
    display: flex;
    flex-direction: row;
    font-size: 12px;
  `;
 
  const IconView = styled.TouchableOpacity`
    display: flex;
    background-color: aqua;
    padding: 12px;
    border-radius: 12px;
    align-items: center;
  `;
  const CallType = styled.Text`
    display: flex;
    margin-right: 15px;
  `;

  return (
    <Wrapper>
      <CardContainer>
        <LeftContainer>
          {/* code propsu gönderilmişde yaz. */}
          {code && <Code>{code}</Code>}
          <ContactContainer>
            {/* title varsa yaz */}
            {!title && <Title>{title}</Title>}
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </ContactContainer>
        </LeftContainer>

        <RightContainer>
          {/* arama tipi  varsa yaz */}
          {callType && <CallType>{callType}</CallType>}
          {/* callIcon varsa ikon resmini göster */}
          {callIcon && (
            <IconView>
              <Icon name="phone" color="blue" size={20} />
            </IconView>
          )}
        </RightContainer>
      </CardContainer>
    </Wrapper>
  );
}
