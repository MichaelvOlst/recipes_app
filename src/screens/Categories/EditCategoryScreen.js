import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, Dimensions } from 'react-native'
import { Button, Appbar } from 'react-native-paper';
import {Content} from '../../components/Content';
import api from '../../services/api';

export const EditCategoryScreen = ({navigation, route}) => {

    const category = route.params.category
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect( () => {
        setTitle(category.title)
        setDescription(category.description)
    }, [navigation, category])

    const updateCategory = () => {
        setLoading(true)
        api.put(`/api/categories/${category.id}`, {title, description})
            .then(response => {
                setLoading(false)
                navigation.navigate('Categories')
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
                <Appbar.Content title={`Edit ${category.title}`} titleStyle={{ color: "#6f6d6d"}} />
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
            <Button mode="contained" style={styles.button} onPress={() => updateCategory()}>
                <Text style={styles.buttonTitle}>Update</Text>
            </Button>
        )
    }

    return (
        <Content name="Edit Category" header={<Header/>}>
           
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
                returnKeyType="done"
                onSubmitEditing={() => updateCategory() }
            />

            {loading ? <LoadingButton/> : <UpdateAndDeleteButton/>}
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
