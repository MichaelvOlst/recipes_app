import React, {useState} from 'react';
import {Card, Title, Paragraph, Badge } from 'react-native-paper';
import { StyleSheet, Linking, View, TouchableHighlight } from 'react-native'
import api from '../services/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const RecipeItem = ({item}) => {

    // const [likes, setLikes] = useState(0)

    const openRecipeUrl = async (item) => {
        try {
            Linking.openURL(item.url)
        } catch (error) {
            alert(error)
        }
    }

    const likeRecipe = (recipe) => {
        console.log(recipe.likes);
        api.put(`/api/recipes/${recipe.id}/like`)
            .then(response => {
                item = response.data
                // setLikes(response.data.likes)
                // console.log(response.data)
                // recipe.likes = response.data.likes
                // console.log(response.data.data)
                // setRecipes(response.data.data)
                // console.log(response.data)
                // setRefreshing(false)
            })
            .catch(error => {
                // alert(error.response)
                console.log(error);
                // setRefreshing(false)
            })
    }

    const unlikeRecipe = (recipe) => {
        alert('unliking...')
    }


    return (
        <Card style={styles.container} >
            <View style={{ flex: 1}}>
            <Card.Cover style={styles.imageCover} source={{ uri: item.image }} />
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardContentView}>
                    <Title style={styles.cardContentTitle}>{item.title}</Title>
                    <Badge size={32} style={{backgroundColor: "#788eec", color: '#fff'}}>{item.likes}</Badge>
                </View>
                <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            </View>
            <Card.Actions style={styles.cardActions}>
                <View style={styles.cardActionsView}>
                    <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => likeRecipe(item)}>
                        <MaterialCommunityIcon name="thumb-up" size={32} color="#788eec"></MaterialCommunityIcon>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => unlikeRecipe(item)}>
                        <MaterialCommunityIcon name="thumb-down-outline" size={32} color="#788eec"></MaterialCommunityIcon>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => { navigation.navigate('EditRecipe', {recipe: item})}}>
                        <MaterialIcon name="edit" size={32} color="#788eec"></MaterialIcon>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                        <MaterialIcon name="open-in-new" size={32} color="#788eec"></MaterialIcon>
                    </TouchableHighlight>
                </View>
            </Card.Actions>
        </Card>
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
    cardContentView: {
        paddingBottom: 20,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    cardContentTitle: {
        
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

