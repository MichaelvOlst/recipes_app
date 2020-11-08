import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, TouchableOpacity,Image,Dimensions, Platform } from 'react-native'
import { Button, Appbar } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

export const EditRecipeScreen = ({navigation, route}) => {

    const recipe = route.params.recipe
    // console.log(recipe)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [imageBase64, setImageBase64] = useState(null)
    const [web, setWeb] = useState(false)

    const urlInput = useRef();
    // const imageInput = useRef();
    const descriptionInput = useRef();

    useEffect( () => {
        setTitle(recipe.title)
        setURL(recipe.url)
        setImage(recipe.image)
        setDescription(recipe.description)



        // (async () => {
        //     if (Platform.OS !== 'web') {
        //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        //       if (status !== 'granted') {
        //         alert('Sorry, we need camera roll permissions to make this work!');
        //       }
        //     }
        // })();

    }, [navigation, recipe])

    const updateRecipe = () => {
        setLoading(true)
        api.put(`/api/recipes/${recipe.id}`, {title, url, description, image, imageBase64, web})
            .then(response => {
                console.log(response.data)
                setLoading(false)
                navigation.navigate('Recipes')
            })
            .catch(error => {
                console.log(error.response);
                // alert(error.response.data.message);
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

    const LoadingButton = () => {
        return (
            <View style={styles.button}><ActivityIndicator color="#fff"></ActivityIndicator></View>
        )
    }

    const UpdateButton = () => {
        return (
            <Button mode="contained" style={styles.button} onPress={() => updateRecipe()}>
                <Text style={styles.buttonTitle}>Update</Text>
            </Button>
        )
    }
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
        //   allowsMultipleSelection: true,
          aspect: [4, 3],
          quality: 1,
        //   exif: true,
          base64: true,
        });
    
        if (!result.cancelled) {
            // console.log(result)
            if(Platform.OS == 'web') {
                setImageBase64(result.uri);
                setImage(result.uri);
                setWeb(true);
                return
            }
            
            setImageBase64(result.base64);
            setImage(result.uri);
        }
    };

   
    return (
        <Content name="Add Recipe" header={<Header/>}>
            <View style={styles.content}>

                <TouchableOpacity onPress={pickImage} style={{marginTop: 50}}>
                    <Text>Select an image</Text>
                </TouchableOpacity>

                <View style={styles.avatarContainer}>
                    {image && <Image style={styles.avatar}  source={{ uri: image }} /> }
                </View>

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

                {/* <TextInput
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
                /> */}

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

                {loading ? <LoadingButton/> : <UpdateButton/>}
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
        paddingLeft: 16,
        fontSize: 14,
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
    avatarContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        // position: 'relative'
        // borderColor: '#9B9B9B',
        // borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        // width: 300,
        height: 300,
        width: (Dimensions.get('window').width - 40),
        // height: (Dimensions.get('window').width / 2) * Dimensions.get('window').height / (Dimensions.get('window').width/ 2)
        // width: 150,
        // height: 150,
        // flex: 1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
    },
});
