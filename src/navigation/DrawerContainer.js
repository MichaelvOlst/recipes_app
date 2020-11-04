import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MenuButton from './../components/MenuButton'
import { Header } from '../components/Header';
export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>

        <Header openDrawer={navigation.openDrawer}/>

        <View style={styles.container}>
          <MenuButton
            title="HOME"
            // source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CATEGORIES"
            // source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SEARCH"
            // source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 20
    }
  });