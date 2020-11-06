import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Linking, View, TouchableHighlight, RefreshControl } from 'react-native'
import {Content} from '../../components/Content';
import {Card, Title, Paragraph, Appbar, Badge, Text } from 'react-native-paper';
import api from '../../services/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
export default class RecipesListScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.fetchRecipes()
    }

    onRefresh() {
        this.fetchRecipes();
    }

    // const [recipes, setRecipes] = useState(null)
    // const [refreshing, setRefreshing] = React.useState(false);


    // useFocusEffect(
    //     useCallback(() => {
    //         const unsubscribe = () => {
    //             fetchRecipes()
    //         }
    //         // alert('hallo')
    //         fetchRecipes()
    
    //         return () => unsubscribe();
    //     }, [])
    // );

    fetchRecipes() {
        // setRefreshing(true)
        this.setState({refreshing: true})
        api.get('/api/recipes/')
            .then(response => {
                console.log(response.data.data)
                this.setState({recipes: response.data.data})
                // console.log(response.data.data)
                this.setState({refreshing: false})
            })
            .catch(error => {
                // alert(error.response)
                console.log(error.response);
                // setRefreshing(false)
                this.setState({refreshing: false})

            })
    } 

  
    

    openRecipeUrl = async (item) => {
        try {
            Linking.openURL(item.url)
        } catch (error) {
            alert(error)
        }
    }

    likeRecipe = (recipe) => {
        api.put(`/api/recipes/${recipe.id}/like`)
            .then(response => {
                this.setState({
                    recipes: this.state.recipes.map(item => {
                      if (recipe.id === item.id) {
                        return { ...item, likes: response.data.likes }
                      }
                      return item;
                    })
                });
            })
            .catch(error => {
                // alert(error.response)
                console.log(error);
                // setRefreshing(false)
            })
    }

   unlikeRecipe = (recipe) => {
        api.delete(`/api/recipes/${recipe.id}/unlike`)
        .then(response => {
            this.setState({
                recipes: this.state.recipes.map(item => {
                if (recipe.id === item.id) {
                    return { ...item, likes: response.data.likes }
                }
                return item;
                })
            });
        })
        .catch(error => {
            // alert(error.response)
            console.log(error);
            // setRefreshing(false)
        })    
    }

   recipeItem = ({ item }) => {

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
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => this.likeRecipe(item)}>
                            <MaterialCommunityIcon name="thumb-up" size={32} color="#788eec"></MaterialCommunityIcon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => this.unlikeRecipe(item)}>
                            <MaterialCommunityIcon name="thumb-down-outline" size={32} color="#788eec"></MaterialCommunityIcon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.cardActionsViewItem} onPress={() => { this.props.navigation.navigate('EditRecipe', {recipe: item})}}>
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


    header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                    <MaterialIcon name="menu" size={32} color="#788eec"></MaterialIcon>
                </TouchableOpacity> 
                <Appbar.Content title="Recipes" titleStyle={{ color: "#6f6d6d"}} />
                <Appbar.Action icon="plus" color="#788eec" onPress={() => this.props.navigation.navigate('AddRecipe')} />
            </Appbar.Header>
        );
    }


    render() {
        return (
        <Content name="Recipes" header={this.header()}>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={this.state.recipes}
                extraData={this.state.recipes}
                renderItem={this.recipeItem}
                keyExtractor={item => `${item.id}`}
                style={{marginBottom: 220}}
                refreshing={this.state.refreshing}
                onRefresh={this.fetchRecipes.bind(this)}
            />
        </Content>
        )
    }
}


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
