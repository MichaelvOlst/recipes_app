import React from 'react';
import {StyleSheet,View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export const Content = ({navigation, name, children}) => {

  return (

    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Ionicons name="ios-menu" size={32} />
                </TouchableOpacity>
                <Text>{name}</Text>
                <Text style={{width:50}}></Text>
            </View>
        </View>

        <View style={styles.content}>
            {children}
        </View>  
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },
    header: {
        width:"100%",
        height:100,
        // flexDirection:"row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // paddingHorizontal:20,
        backgroundColor: '#fff',
        // justifyContent: "space-around"
    },
    headerContent: {
        flexDirection: 'row',
        padding: 'auto',

        // justifyContent: "center",
        // alignItems: 'center',
        // textAlignVertical: 'center',
        // alignContent: 'center',
    },
    content:{
        paddingHorizontal:20,
    },
});
