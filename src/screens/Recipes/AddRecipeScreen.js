import React, {useState, useRef} from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';

export const AddRecipeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')

    const urlInput = useRef();

    const addRecipe = () => {
        setLoading(true)
        api.post('/api/recipes/', {title, url})
            .then(response => {
                console.log(response.data)
                setLoading(false)
                navigation.navigate('Recipes')
            })
            .catch(error => {
                console.log(error.response);
                setLoading(false)
            })
    }

    return (
        <Content name="Add Recipe" navigation={navigation}>
            <View style={styles.content}>
                <TextInput
                    style={styles.input} 
                    placeholder='Title'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autofocus={true}
                    blurOnSubmit={true}
                    returnKeyType="next"
                    onSubmitEditing={() => urlInput.current.focus() }
                />

                <TextInput
                    style={styles.input}
                    placeholder='URL'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setURL(text)}
                    value={url}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autofocus={true}
                    blurOnSubmit={true}
                    returnKeyType="send"
                    ref={urlInput}
                />
                
                <Button mode="contained" style={styles.button} disabled={loading} onPress={() => addRecipe()}>
                    {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonTitle}>Add</Text>}
                </Button>
            </View>
        </Content>
  );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 0,
        width: '100%',
        marginRight: 20,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "normal",
        textAlign: 'center'
    },
});
