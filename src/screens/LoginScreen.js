import React, {useContext, useState} from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from "./../providers/AuthProvider";


export const LoginScreen = ({ navigation }) => {

  const { login, error } = useContext(AuthContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onFooterLinkPress = () => {
    navigation.navigate("registration")
  }

  const onLoginPress = () => {
    login(email, password)
  }

  return (
    <View style={styles.container}>
        <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always">
            <FontAwesomeIcon icon={faUtensils} size={64} style={styles.logo} />
            { error && <Text style={{ marginLeft: 30, color: 'red', marginBottom: 24, flex: 1, alignItems: 'center'}}>{ error }</Text> }

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}> Sign up</Text></Text>
            </View>
        </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center'
  },
  title: {

  },
  logo: {
      flex: 1,
      height: 120,
      width: 90,
      alignSelf: "center",
      margin: 30
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 16
  },
  button: {
      backgroundColor: '#788eec',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "normal"
  },
  footerView: {
      flex: 1,
      alignSelf: 'stretch',
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d',
      textAlign: 'center',
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
});
