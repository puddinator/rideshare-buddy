import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebase'

const camps = ["Amoy Quee Camp", "Bedok Camp", "Clementi Camp", "Depot Road Camp",
  "Dieppe Barracks", "Gombak Base", "Hendon Camp"]

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [camp, setCamp] = useState('');

  const navigation = useNavigation()

  const handleInfoUpdate = () => {
    db.collection("users").doc(auth.currentUser?.uid).set({
      name,
      number,
      address,
      camp,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
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
    <View style={styles.container}>
      <Text style={styles.header}>Your details</Text>
      <View style={styles.bodyContainer}>
        <Image style={styles.userImg} />
        <Text>Image</Text>

        <View style={styles.inputContainer}>
          <Text>Name:</Text>
          <TextInput
            placeholder="Your name (as in NRIC)"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>H/P:</Text>
          <TextInput
            placeholder="Your mobile number"
            value={number}
            onChangeText={text => setNumber(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Home Address:</Text>
          <TextInput
            placeholder="Your home address"
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Military Camp:</Text>
          <SelectDropdown
            data={camps}
            onSelect={camp => setCamp(camp)}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem
            }}
            rowTextForSelection={(item) => {
              return item
            }}
            defaultButtonText='Your military camp'
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#dddddd'} size={18} />;
            }}
            selectedRowTextStyle={styles.dropdownSelectedRowTextStyle}
            dropdownIconPosition={'right'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleInfoUpdate}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    fontWeight: '700',
    fontSize: 20,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownBtnStyle: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownBtnTxtStyle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
  },
  dropdownSelectedRowTextStyle: {
    color: 'black',
  },
  button: {
    backgroundColor: '#cccccc',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
})