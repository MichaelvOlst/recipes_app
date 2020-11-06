import React, {useState, useRef, useCallback} from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { Button, Appbar, ActivityIndicator } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


export const AddRecipeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')

    const urlInput = useRef();

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = () => {
                setTitle('')
                setURL('')
            }
    
            return () => unsubscribe();
        }, [])
    );

    const addRecipe = () => {
        setLoading(true)
        api.post('/api/recipes/', {title, url})
            .then(response => {
                // console.log(response.data)
                setLoading(false)
                navigation.navigate('Recipes')
            })
            .catch(error => {
                alert(error.response.data.message)
                console.log(error.response);
                setLoading(false)
            })
    }

    const Header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} style={{ marginLeft: 10}} />
                <Appbar.Content title="Add recipe" titleStyle={{ color: "#6f6d6d"}} />
            </Appbar.Header>
        );
    }

    const LoadingButton = () => {
        return (
            <View style={styles.button}><ActivityIndicator color="#fff"></ActivityIndicator></View>
        )
    }

    const AddButton = () => {
        return (
            <Button mode="contained" style={styles.button} onPress={() => addRecipe()}>
                <Text style={styles.buttonTitle}>Add</Text>
            </Button>
        )
    }

    return (
        <Content name="Add Recipe" header={<Header/>}>
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
                
                {loading ? <LoadingButton/> : <AddButton/>}
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
