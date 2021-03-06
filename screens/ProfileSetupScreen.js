import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db, storage } from '../firebase'

import UploadImage from '../components/UploadImage';

const ProfileSetupScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [camps, setCamps] = useState([
    { label: 'Amoy Quee Camp', value: 'Amoy Quee Camp' },
    { label: 'Bedok Camp', value: 'Bedok Camp' },
    { label: 'Clementi Camp', value: 'Clementi Camp' },
    { label: 'Depot Road Camp', value: 'Depot Road Camp' },
    { label: 'Dieppe Barracks', value: 'Dieppe Barracks' },
    { label: 'Gombak Base', value: 'Gombak Base' },
    { label: 'Hendon Camp', value: 'Hendon Camp' },
    { label: 'Jurong Camp', value: 'Jurong Camp' },
    { label: 'Kaki Bukit Camp', value: 'Kaki Bukit Camp' },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('rider');

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [camp, setCamp] = useState('');
  const [userType, setUserType] = useState('');

  const [imgURI, setImgURI] = useState('');

  const navigation = useNavigation()

  async function uploadImage() {
    const { uri } = imgURI;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const task = storage
      .ref(auth.currentUser?.uid)
      .put(blob)
      .then((uri) => {
        // console.log(uri);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInfoUpdate = () => {
    db.collection('users').doc(auth.currentUser?.uid).set({
      userType,
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your details</Text>
      <View style={styles.imageAndBodyContainer}>
        <UploadImage setImgURI={setImgURI} />
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <Text>Name:</Text>
            <TextInput
              placeholder="Your name (as in NRIC)"
              value={name}
              onChangeText={text => {
                setName(text);
                uploadImage();
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>H/P:</Text>
            <TextInput
              keyboardType='numeric'
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
            <DropDownPicker
              open={open}
              value={value}
              items={camps}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setCamps}
              style={styles.dropdownBox}
              dropDownContainerStyle={styles.dropdownDroppedBox}
              placeholder="Your camp"
              placeholderStyle={{ color: '#aaaaaa' }}
              containerStyle={{ width: 300, flexDirection: 'row' }}
              zIndex={2000}
              onChangeValue={value => setCamp(value)}
            />
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={{ marginRight: 10 }}>I am a </Text>
            <DropDownPicker
              open={open2}
              value={value2}
              setOpen={setOpen2}
              setValue={setValue2}
              items={[
                { label: 'Rider', value: 'rider' },
                { label: 'Driver', value: 'driver' },
              ]}
              defaultValue={value2}
              style={styles.dropdownBox}
              containerStyle={{ width: 200 }}
              dropDownContainerStyle={styles.dropdownDroppedBox}
              zIndex={1000}
              onChangeValue={value => setUserType(value)}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleInfoUpdate}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileSetupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageAndBodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    fontWeight: '700',
    fontSize: 20,
  },
  bodyContainer: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputContainerRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 300,
  },
  dropdownBox: {
    marginTop: 5,
    borderColor: 'white',
  },
  dropdownDroppedBox: {
    borderColor: 'white',
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