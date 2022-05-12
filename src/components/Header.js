import React from 'react'
import { ImageBackground,Text,StyleSheet,View,TouchableOpacity,Badge,Title, Alert} from 'react-native';
import {  Surface } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome';

//arkaplan resmi
const image = { uri: "https://reactjs.org/logo-og.png" };


// styledan navigation'a kadarkiler alabileceği propslar
export default function Header({
	style,
	onPressMenu,
	back,
	onPressBack,
	title,
    subtitle,
    iconName,
    iconColor,
    iconBackgroundColor,
	onRightPress,
	optionalBtn,
	optionalBtnPress,
	saveButton,
	headerBg = "white",
	navigation
}){ 

  //eğer back propsu gönderilmişse geri gitme ikonunu göster.
    const LeftView = () => (
      <View style={styles.leftView}>
      
        {back && (
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
    //Title varsa yaz.Subtitle varsa yaz
      const TitleView = () => (
		<View style={styles.titleView}>
			{title && <Text style={styles.titleFont}>{title}</Text> }
			{subtitle && <Text style={styles.subtitleFont}>{subtitle}</Text> }
		</View>
	)
  //iconName gönderlmişse o ikon adına sahip ikonu getir.
    const RightView = () => (
      <View style={[styles.rightView, {backgroundColor: iconBackgroundColor}]}>
        {iconName && <Icon name={iconName} size={20} color={iconColor} />}
        {saveButton && (
          <TouchableOpacity onPress={()=>Alert.alert("Kaydedildi")}>
            <Icon name="phone" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );

   
	
	return (
	



	

			
		<View>

        <View style={styles.header}>
		  
       	
			<LeftView />
            <TitleView/>
            <RightView/>



            </View>  
		</View>
         
	)
}

const styles = StyleSheet.create({


	header: {
		height: 70,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
        
	},
    	
	leftView: {
		marginHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
	},
	titleView: {
		flex: 1,
        marginLeft:5,
        
	},
	rightView: {
		justifyContent: 'center',
        marginRight:15,
        width:30,
        height:30,
        alignItems:'center',
        borderRadius:3
	},
    titleFont:{
        fontSize:20,
        fontWeight:"bold",
		color: "white",

    },
    subtitleFont:{
        fontSize:15,
		color: "white",
       

    },
    
	
})

