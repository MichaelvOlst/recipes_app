import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Linking, View, TouchableHighlight } from 'react-native'
import {Content} from '../../components/Content';
import {Card, Title, Paragraph, Appbar, Badge } from 'react-native-paper';
import api from '../../services/api';
import { Loading } from "../../components/Loading";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';


export const RecipesListScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState(null)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                setLoading(true)
        api.get('/api/recipes/')
            .then(response => {
                // console.log(response.data.data)
                setRecipes(response.data.data)
                // console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                // alert(error.response)
                console.log(error.response);
                setLoading(false)
            })
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     setLoading(true)
    //     api.get('/api/recipes/')
    //         .then(response => {
    //             // console.log(response.data.data)
    //             setRecipes(response.data.data)
    //             // console.log(response.data)
    //             setLoading(false)
    //         })
    //         .catch(error => {
    //             // alert(error.response)
    //             console.log(error.response);
    //             setLoading(false)
    //         })
    // }, [recipes]);


    const openRecipeUrl = async (item) => {
    
        try {
            Linking.openURL(item.url)
        } catch (error) {
            alert(error)
        }
    
    }

    const recipeItem = ({ item }) => {

        return (
            <Card style={styles.container} >
                <View style={{ flex: 1}}>
                <Card.Cover style={styles.imageCover} source={{ uri: item.image }} />
                <Card.Content style={styles.cardContent}>
                    <Title style={styles.cardContentTitle}>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                </Card.Content>
                </View>
                <Card.Actions style={styles.cardActions}>
                    <View style={styles.cardActionsView}>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                            <Badge size={32} style={{backgroundColor: "#788eec", color: '#fff'}}>{item.likes}</Badge>  
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} 
                            onPress={() => { navigation.navigate('EditRecipe', {initial: false, recipe: item})}}>
                            <Icon name="edit" size={32} color="#788eec"></Icon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                            <Icon name="open-in-new" size={32} color="#788eec"></Icon>
                        </TouchableHighlight>
                    </View>
                </Card.Actions>
            </Card>
        );
    };


    const Header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} >
                    <Icon name="menu" size={32} color="#788eec"></Icon>
                </TouchableOpacity> 
                <Appbar.Content title="Recipes" titleStyle={{ color: "#6f6d6d"}} />
                <Appbar.Action icon="plus" color="#788eec" onPress={() => navigation.navigate('AddRecipe')} />
            </Appbar.Header>
        );
    }


    if(loading) {
        return (
            <Loading/>
        )
    }


    return (
        <Content name="Recipes" header={<Header/>}>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={recipes}
                renderItem={recipeItem}
                keyExtractor={item => `${item.id}`}
                style={{marginBottom: 220}}
            />
        </Content>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    imageCover: {
        marginBottom: 20
    },
    cardContent: {
        position: 'relative',
        minHeight: 170,
    },
    cardContentTitle: {
        paddingBottom: 20
    },
    cardActionsView: {
        borderTopWidth: 1,
        borderTopColor: '#f4f4f4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    cardActionsViewItem: {
        margin: 10,
    }
});
