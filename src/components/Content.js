import React from 'react';
import {StyleSheet,View, TouchableOpacity, Text, SafeAreaView } from 'react-native'


export const Content = ({header, children}) => {

  return (
    <SafeAreaView>
        {header && header}

        <View style={styles.content}>
            {children}
        </View>
        
    </SafeAreaView>
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
