import React from 'react';
import { Header as NativeHeader } from 'react-native-elements';
import {StyleSheet,View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const hamburgerMenu = ({openDrawer}) => {
  return render(
    <TouchableOpacity onPress={() => openDrawer()} >
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>   
  )
}

export const Header = ({name, openDrawer}) => {
  return (

    // <NativeHeader
    //   containerStyle={{
    //     backgroundColor :'#3D6DCC',
    //     // justifyContent: 'space-around',
    //     color: '#000',
    //   }}
    //   // statusBarProps={{ barStyle: 'light-content' }}
    //   // barStyle="light-content" // or directly
    //   leftComponent={hamburgerMenu}
    //   // leftComponent={{ icon: 'menu', color: '#fff' }}
    //   centerComponent={{ text: name, style: { color: '#fff' } }}
    // />

    // <NativeHeader containerStyle={styles.header}>                    

    //   <TouchableOpacity onPress={() => openDrawer()} >
    //     <Ionicons name="ios-menu" size={32} />
    //   </TouchableOpacity>                
    //   <Text>{name}</Text>
    // </NativeHeader>

    <View style={styles.header}>
        <TouchableOpacity onPress={()=>openDrawer()}>
            <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text>{name}</Text>
        <Text style={{width:50}}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    width:"100%",
    height:60,
    flex: 1,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
    // padding:50,
    // marginBottom:20,
    // marginTop: 0
  },
});
