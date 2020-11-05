import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator } from 'react-native'
import { Button, Appbar } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';



export const EditRecipeScreen = ({navigation, route}) => {

    const recipe = route.params.recipe
    // console.log(recipe)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const urlInput = useRef();
    const imageInput = useRef();
    const descriptionInput = useRef();

    useEffect( () => {
        setTitle(recipe.title)
        setURL(recipe.url)
        setImage(recipe.image)
        setDescription(recipe.description)
    }, [navigation, recipe])

    const updateRecipe = () => {
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

    const Header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} style={{ marginLeft: 10}} />
                <Appbar.Content title={`Edit ${recipe.title}`} titleStyle={{ color: "#6f6d6d"}} />
            </Appbar.Header>
        );
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
                    onSubmitEditing={() => imageInput.current.focus() }
                />

                <TextInput
                    style={styles.input} 
                    placeholder='Image URL'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setImage(text)}
                    value={image}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    blurOnSubmit={true}
                    returnKeyType="next"
                    onSubmitEditing={() => urlInput.current.focus() }
                    ref={imageInput}
                />

                <TextInput
                    style={styles.input}
                    placeholder='URL'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setURL(text)}
                    value={url}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    blurOnSubmit={true}
                    returnKeyType="next"
                    onSubmitEditing={() => descriptionInput.current.focus() }
                    ref={urlInput}
                />

                <TextInput
                    style={styles.textarea} 
                    placeholder='Description'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    blurOnSubmit={true}
                    returnKeyType="done"
                    multiline={true}
                    numberOfLines={4}
                    onSubmitEditing={() => urlInput.current.focus() }
                    ref={descriptionInput}
                />
                
                <Button mode="contained" style={styles.button} disabled={loading} onPress={() => updateRecipe()}>
                    {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonTitle}>Upsdate</Text>}
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
    textarea: {
        lineHeight: 25,
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
