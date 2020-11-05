import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, Linking, View, TouchableHighlight } from 'react-native'
import {Content} from '../../components/Content';
import {Card, Title, Paragraph, Button } from 'react-native-paper';
import api from '../../services/api';
import { Loading } from "../../components/Loading";
import Icon from 'react-native-vector-icons/MaterialIcons';


const RightHeaderComponent = ({navigation}) => {
    return (
        <Button icon="plus" mode="contained" style={{ padding: 2}} compact onPress={() => navigation.navigate('AddRecipe')}></Button>
    );
}


export const RecipesListScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        setLoading(true)
        api.get('/api/recipes/')
            .then(response => {
                console.log(response.data.data)
                setRecipes(response.data.data)
                // console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                // alert(error.response)
                console.log(error.response);
                setLoading(false)
            })
    }, []);


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
                    <Paragraph>{
                        item.description.length > 100  
                            ? item.description.substring(0, 100)+ '...'
                            : item.description
                        }</Paragraph>
                </Card.Content>
                </View>
                <Card.Actions style={styles.cardActions}>
                    <View style={styles.cardActionsView}>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                            <Icon name="star-border" size={32} color="#788eec"></Icon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                            <Icon name="edit" size={32} color="#788eec"></Icon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => openRecipeUrl(item)}>
                            <Icon name="open-in-new" size={32} color="#788eec"></Icon>
                        </TouchableHighlight>
                       
                        {/* <Button>Edit</Button>
                        <Button>Like</Button> */}
                    </View>
                </Card.Actions>
            </Card>
        );
    };


    if(loading) {
        return (
            <Loading/>
        )
    }


    return (
        <Content name="Recipes" navigation={navigation} RightHeaderComponent={<RightHeaderComponent navigation={navigation} />}>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={recipes}
                renderItem={recipeItem}
                keyExtractor={item => `${item.id}`}
            />   
        </Content>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        // height: 400,
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
