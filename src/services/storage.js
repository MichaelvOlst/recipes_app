import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getKey = (key) => {
    if(Platform.OS != 'web') {
        return SecureStore.getItemAsync(key)
    }

    return AsyncStorage.getItem(key)
}

export const setKey = (key, value) => {

    if(Platform.OS != 'web') {
        return SecureStore.setItemAsync(key, JSON.stringify(value));
    }
    
    return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const deleteKey = (key) => {
    if(Platform.OS != 'web') {
        return SecureStore.deleteItemAsync(key)
    }

    return AsyncStorage.removeItem(key)
}