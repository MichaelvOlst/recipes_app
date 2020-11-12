import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Platform, View, TouchableHighlight, Alert } from 'react-native'
import {Content} from '../../components/Content';
import {Appbar, Text } from 'react-native-paper';
import api from '../../services/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CategoriesListScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.fetchCategories()
        });
    }

    fetchCategories() {
        this.setState({refreshing: true})
        api.get('/api/categories/')
            .then(response => {
                // console.log(response.data.data)
                this.setState({categories: response.data.data})
                this.setState({refreshing: false})
            })
            .catch(error => {
                console.log(error.response);
                this.setState({refreshing: false})
            })
    } 

    deleteCategoryAlert = (item) => {
        
        if(Platform.OS == 'web') {
            if(confirm('Do you really want to delete the category?')) {
                this.deleteCategory(item.id)
            }
        } 
        Alert.alert("Delete", "Do you really want to delete the category?",[
            {
                text: "Cancel",
                style: "cancel"
            },
            { 
                text: "Delete", onPress: () => {
                    this.deleteCategory(item.id)
                } 
            }
        ], { cancelable: false } ); 
        
    }


    deleteCategory = (id) => {
        api.delete(`/api/categories/${id}`)
        .then(() => {
            this.fetchCategories()
        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data.message);
        })
    }


    categoryItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemContainerTitle}>{item.title} ({item.recipes_count})</Text>
                <View style={styles.itemContainerButtons}>
                    <TouchableHighlight style={styles.itemButton} onPress={() => { this.props.navigation.navigate('EditCategory', {category: item})}}>
                        <MaterialIcon name="edit" size={24} color="#788eec"></MaterialIcon>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.itemButton} onPress={() => this.deleteCategoryAlert(item)}>
                        <MaterialCommunityIcon name="delete-outline" size={24} color="#e88989"></MaterialCommunityIcon>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };


    header = () => {
        return (
            <Appbar.Header style={{paddingLeft: 10, backgroundColor: '#fff'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                    <MaterialIcon name="menu" size={32} color="#788eec"></MaterialIcon>
                </TouchableOpacity> 
                <Appbar.Content title="Categories" titleStyle={{ color: "#6f6d6d"}} />
                <Appbar.Action icon="refresh" color="#788eec" onPress={() => this.fetchCategories() } />
                <Appbar.Action icon="plus" color="#788eec" onPress={() => this.props.navigation.navigate('AddCategory')} />
            </Appbar.Header>
        );
    }

    render() {
        return (
        <Content name="Categories" header={this.header()}>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={this.state.categories}
                extraData={this.state.categories}
                renderItem={this.categoryItem}
                keyExtractor={item => `${item.id}`}
                style={{marginBottom: 220}}
                refreshing={this.state.refreshing}
                onRefresh={this.fetchCategories.bind(this)}
            />
        </Content>
        )
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        width: '100%', 
        height: 60, 
        backgroundColor: '#fff', 
        padding: 10, 
        borderBottomWidth: 3, 
        borderRadius: 5, 
        borderBottomColor: '#f2f2f2', 
        flexDirection: 'row',
    },
    itemContainerTitle: {
        flex: 1, 
        width: 70, 
        fontSize: 20, 
        alignItems: 'center', 
        marginTop: 5, 
        justifyContent: 'center', 
        flexDirection: 'column',
        fontWeight: 'bold'
    },
    itemContainerButtons: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    itemButton: {
        margin: 10,
    },
});
