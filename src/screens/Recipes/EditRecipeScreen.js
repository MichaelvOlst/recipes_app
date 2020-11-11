import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, TouchableOpacity,Image,Dimensions, Platform, Alert, ScrollView } from 'react-native'
import { Button, Appbar } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

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
    const [categories, setCategories] = useState(recipe.categories)
    const [dropdownPicker, setDropdownPicker] = useState(false)


    const urlInput = useRef();
    // const imageInput = useRef();
    const descriptionInput = useRef();

    useEffect( () => {
        setTitle(recipe.title)
        setURL(recipe.url)
        setImage(recipe.image)
        setDescription(recipe.description)
    }, [navigation, recipe])

    const updateRecipe = () => {
        setLoading(true)
        api.put(`/api/recipes/${recipe.id}`, {title, url, description, image, imageBase64, web})
            .then(response => {
                // console.log(response.data)
                setLoading(false)
                navigation.navigate('Recipes')
            })
            .catch(error => {
                // console.log(error.response);
                alert(error.response.data.message);
                setLoading(false)
            })
    }

    const Header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} style={{ marginLeft: 10, color: "#6f6d6d"}} />
                <Appbar.Content title={`Edit ${recipe.title}`} titleStyle={{ color: "#6f6d6d"}} />
                <Appbar.Action icon="delete-outline" color="#e88989" onPress={() => deleteRecipeAlert() } />
            </Appbar.Header>
        );
    }

    const LoadingButton = () => {
        return (
            <View style={styles.button}><ActivityIndicator color="#fff"></ActivityIndicator></View>
        )
    }

    const UpdateAndDeleteButton = () => {
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

    const deleteImageAlert = () => {
        if(Platform.OS == 'web') {
            if(confirm('Do you really want to delete the image?')) {
                setImageBase64(null);
                setImage(null);
            }
        } 
        Alert.alert("Delete", "Do you really want to delete the image?",[
            {
                text: "Cancel",
                style: "cancel"
            },
            { 
                text: "Delete", onPress: () => {
                    setImageBase64(null);
                    setImage(null);
                } 
            }
        ], { cancelable: false } );   
    }


    const deleteRecipeAlert = () => {

        if(Platform.OS == 'web') {
            if(confirm('Do you really want to delete the recipe?')) {
                deleteRecipe()
            }
        } 
        Alert.alert("Delete", "Do you really want to delete the recipe?",[
            {
                text: "Cancel",
                style: "cancel"
            },
            { 
                text: "Delete", onPress: () => {
                    deleteRecipe()
                } 
            }
        ], { cancelable: false } ); 
    }


    const deleteRecipe = () => {

        api.delete(`/api/recipes/${recipe.id}`)
        .then(() => {
            navigation.navigate('Recipes')
        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data.message);
        })
    }


    const ImageContainer = () => {
        return (
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={pickImage} >
                    <Image style={styles.avatar}  source={{ uri: image }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteImageAlert} style={styles.imageDeleteButton}>
                    <MaterialCommunityIcon name="delete-outline" size={32} color="#fff"></MaterialCommunityIcon>
                </TouchableOpacity>
            </View>
        )
    }
   

    const PickImageButton = () => {
        return (
            <Button mode="contained" style={styles.pickImageButton} onPress={() => pickImage()}>
                <Text style={styles.buttonTitle}>Pick an image</Text>
            </Button>
        )
    }


    return (
        <Content name="Add Recipe" header={<Header/>}>
            <ScrollView containerStyle={styles.content}>

                {image ? <ImageContainer/> : <PickImageButton/>}

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

                <DropDownPicker
                    items={[
                        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
                    ]}

                    multiple={true}
                    multipleText="%d items have been selected."
                    min={0}
                    max={10}
                    defaultValue={categories}
                    containerStyle={{height: 40, marginBottom: dropdownPicker ? 100 : 10, width: '100%'}} 
                    // {[styles.text, touched && invalid ? styles.textinvalid : styles.textvalid]}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    onOpen={() => setDropdownPicker(true)}
                    onClose={() => setDropdownPicker(false)}
                    dropDownStyle={{marginTop: 2}}
                    onChangeItem={item => setCategories(item) }
                />

                {loading ? <LoadingButton/> : <UpdateAndDeleteButton/>}
            </ScrollView>
        </Content>
  );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        // marginLeft: 20,
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
        // marginLeft: 20,
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
    },
    imageDeleteButton: {
        position:'absolute', 
        left: 5, 
        bottom: 5,
    },
    pickImageButton: {
        backgroundColor: '#788eec',
        marginLeft: 0,
        width: '100%',
        marginRight: 20,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginBottom: 50,
    },
});
