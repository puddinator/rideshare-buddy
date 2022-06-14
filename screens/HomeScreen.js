import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight, TextInput } from 'react-native'
import { auth, db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation()

  const [isHome, setIsHome] = useState(false);
  const [isCamp, setIsCamp] = useState(false);
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [campAddress, setCampAddress] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [userType, setUserType] = useState('');

  const redirectToProfile = () => {
    navigation.replace("Profile")
  }

  function handleHome() {
    setIsHome(true);
    setIsCamp(false);
  }

  function handleCamp() {
    setIsCamp(true);
    setIsHome(false);
  }

  function getInfo() {
    // Gets home or camp address
    db.collection("users").doc(auth.currentUser?.uid).get().then((doc) => {
      if (doc.exists) {
        setHomeAddress(doc.data().address);
        setCampAddress(doc.data().camp);
        setUserType(doc.data().userType);
        setName(doc.data().name);
        setNumber(doc.data().number);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
      .then(() => {
        console.log(userType);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const findMatches = () => {
    let finalAddress = '', type = '';
    if (isCamp === true) {
      finalAddress = campAddress;
    } else if (isHome === true) {
      finalAddress = homeAddress;
    } else {
      finalAddress = address;
    }
    if (userType === 'rider') {
      type = 'request';
    } else {
      type = 'offer';
    }
    db.collection("rides").doc(auth.currentUser?.uid).set({
      type,
      name,
      number,
      start: 'placeholder',
      end: finalAddress,
      time,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    navigation.replace("Results")
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={redirectToProfile}
        style={[styles.profileImgButton]}
      >
        <Image style={styles.profileImg} source={require('../assets/pictures/profile.png')} />
      </TouchableOpacity>
      <View style={styles.bodyContainer}>
        <Text style={styles.header}>Where are you heading to?</Text>

        <View style={styles.homeCampInputContainer}>
          <TouchableOpacity
            style={isHome ? styles.btnPress : styles.btnNormal}
            onPress={handleHome}
          >
            <View style={styles.imgContainer}>
              <Image style={styles.homeCampImg} source={require('../assets/pictures/home.png')} />
              <Text>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={isCamp ? styles.btnPress : styles.btnNormal}
            onPress={handleCamp}
          >
            <View style={styles.imgContainer}>
              <Image style={styles.homeCampImg} source={require('../assets/pictures/camp.png')} />
              <Text>Camp</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputAddressContainer}>
          <TextInput
            placeholder="Search for another destination"
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputTimeContainer}>
          <Text>Time of departure:</Text>
          <TextInput
            placeholder="24-hour Time"
            value={time}
            onChangeText={text => setTime(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={findMatches}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView >
  )
}


export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  profileImgButton: {
    marginTop: 20,
    marginLeft: 30,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },
  profileImg: {
    margin: 7,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  homeCampInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 10,
  },
  btnNormal: {
    backgroundColor: '#eeeeee',
  },
  btnPress: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
  },
  imgContainer: {
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 10,
    // backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  homeCampImg: {
    marginBottom: 5,
    width: 30,
    height: 30,
  },
  inputAddressContainer: {
    height: 40,
  },
  inputTimeContainer: {
    height: 50,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: 'center',
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