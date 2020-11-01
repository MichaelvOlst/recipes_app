import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "./../providers/AuthProvider";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export const RegistrationScreen = ({ navigation }) => {

    const { register, error } = useContext(AuthContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate("login")
    }

    const onRegisterPress = () => {
        const data = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
            device_name: "mobile",
        };
        register(data)
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
                  placeholder='Full Name'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
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
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder='Confirm Password'
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRegisterPress()}>
                  <Text style={styles.buttonTitle}>Create account</Text>
              </TouchableOpacity>
              <View style={styles.footerView}>
                  <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
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
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16
  },
  button: {
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },
  footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
});
