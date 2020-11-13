import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, TouchableOpacity,Image,Dimensions, Platform, Alert, ScrollView } from 'react-native'
import { Button, Appbar } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

export const EditRecipeScreen = ({navigation, route}) => {

    const recipe = route.params.recipe
    // console.log(recipe)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [imageBase64, setImageBase64] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [dropdownPickerOpen, setDropdownPickerOpen] = useState(false)
    const [categories, setCategories] = useState([])

    const urlInput = useRef();
    // const imageInput = useRef();
    const descriptionInput = useRef();

    useEffect( () => {

        // fetchCategories()

        setTitle(recipe.title)
        setURL(recipe.url)
        setImage(recipe.image)
        setDescription(recipe.description)

        // console.log(recipe)


        let allSelectedCategories = recipe.categories.map(({title, id}) => {
            return id
        });
        setSelectedCategories(allSelectedCategories);

        fetchCategories()

    }, [navigation, recipe])

    const fetchCategories = () => {
        api.get('/api/categories/')
        .then(response => {
            let allCategories = response.data.data.map(({title, id}) => {
                return {label: title, value: id}
            })
            setCategories(allCategories)
        })
        .catch(error => {
            // alert(error.response.data)
            console.log(error);
        })
    }

    const updateRecipe = () => {
        setLoading(true)
        api.put(`/api/recipes/${recipe.id}`, {title, url, description, categories: selectedCategories})
            .then(response => {
                setLoading(false)
                navigation.navigate('Recipes')
            })
            .catch(error => {
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
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
    
        if (!result.cancelled) {
            if(Platform.OS == 'web') {
                updateImage(result, true)
                return
            }
            
            setTimeout(()=> {
                updateImage(result, false)
            }, 1000)
        }
    };


    const updateImage = (pickerResult, web) => {
    
        setLoading(true);

        setImageBase64(pickerResult.base64);
        setImage(pickerResult.uri);
    
        api.put(`/api/recipes/${recipe.id}/image`, {image: pickerResult.uri, imageBase64: pickerResult.base64, web: web})
            .then(response => {
                setLoading(false)                
                // navigation.navigate('Recipes')
            })
            .catch(error => {
                alert(error.response.data.message);
                setLoading(false)
            })

    }

    const deleteImageAlert = () => {
        if(Platform.OS == 'web') {
            if(confirm('Do you really want to delete the image?')) {
                deleteImage();
            }
        } 
        Alert.alert("Delete", "Do you really want to delete the image?",[
            {
                text: "Cancel",
                style: "cancel"
            },
            { 
                text: "Delete", onPress: () => {
                    deleteImage();
                } 
            }
        ], { cancelable: false } );   
    }


    const deleteImage = () => {
        
        setLoading(true)
        api.delete(`/api/recipes/${recipe.id}/image`)
            .then(response => {
                setLoading(false)
                setImageBase64(null);
                setImage(null);
            })
            .catch(error => {
                alert(error.response.data.message);
                setLoading(false)
            })
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
        <Content name="Edit Recipe" header={<Header/>}>
            <ScrollView containerStyle={styles.content}>

                {image ? <ImageContainer/> : <PickImageButton/>}

                {categories.length ? <DropDownPicker
                    items={categories}
                    defaultValue={selectedCategories}
                    multiple={true}
                    placeholder="Select a category"
                    multipleText="%d categorie(s) selected."
                    min={0}
                    max={10}
                    containerStyle={{height: 50, marginBottom: dropdownPickerOpen ? 130 : 10, width: '100%'}} 
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    onChangeList={(items, callback) => {
                        new Promise((resolve) => resolve(setCategories(items)))
                            .then(() => callback())
                            .catch(() => {});
                      }}
                    onOpen={() => setDropdownPickerOpen(true)}
                    onClose={() => setDropdownPickerOpen(false)}
                    dropDownStyle={{marginTop: 2}}
                    onChangeItem={item => setSelectedCategories(item) }
                /> : null}

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
        marginRight: 20,
        paddingLeft: 16,
        paddingRight: 16,
    },
    textarea: {
        lineHeight: 25,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        paddingLeft: 16,
        paddingRight: 16,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
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
