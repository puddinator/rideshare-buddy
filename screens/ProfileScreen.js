import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight, TextInput } from 'react-native'
import { auth, db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const navigation = useNavigation()

  const redirectToHome = () => {
    navigation.replace("Home")
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={redirectToHome}
        style={[styles.cancelXPress]}
      >
        <Image style={styles.closeImg} source={require('../assets/pictures/close.png')} />
      </TouchableOpacity>

      <View style={styles.bodyContainer}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  closeImg: {
    height: 22,
    width: 22,
    margin: 10,
  },
  cancelXPress: {
    marginTop: 20,
    marginLeft: 30,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },
  cancelX: {

    fontSize: 25,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})