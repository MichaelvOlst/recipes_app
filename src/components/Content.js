import React from 'react';
import {StyleSheet,View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


export const Content = ({navigation, name, children, RightHeaderComponent}) => {

  return (

    <View style={styles.container}>
        <Header containerStyle={{backgroundColor: '#fff'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} >
                <Ionicons name="ios-menu" size={32} />
            </TouchableOpacity>                
            <Text>{name}</Text>
            {RightHeaderComponent && RightHeaderComponent}
        </Header>
        
        <ScrollView style={styles.content}>
            {children}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },
    headerContent: {
        flexDirection: 'row',
        padding: 'auto',
    },
    content:{
        marginTop: 30,
        paddingHorizontal:20,
    },
});
