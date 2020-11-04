import React, {useContext, useRef} from 'react';
import { StyleSheet, Text, FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import {Content} from '../../components/Content';


export const RecipesListScreen = ({ navigation }) => {

    return (
        <Content name="Recipes" navigation={navigation}>
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />        
        </Content>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
       },
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
       },
});
