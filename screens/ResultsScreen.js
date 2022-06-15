import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

import ResultItem from '../components/ResultItem';

let allRideOffers = [];
let allRideRequests = [];

const ResultsScreen = () => {
  const navigation = useNavigation()

  const redirectToHome = () => {
    navigation.replace("Home")
  }



  useEffect(() => {
    allRideOffers = [];
    allRideRequests = [];

    db.collection("rides").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data['id'] = doc.id;
        if (data.type === "request") {
          allRideRequests.push(data);
        } else {
          allRideOffers.push(data);
        }
      });
    });
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerHeadingsContainer}>
          <TouchableOpacity
            onPress={redirectToHome}
            style={[styles.cancelXPress]}
          >
            <Image style={styles.cancelX} source={require('../assets/pictures/close.png')} />
          </TouchableOpacity>
          <Text style={styles.header}>Find close matches</Text>
          <TouchableOpacity>
            <Image style={styles.reloadImg} source={require('../assets/pictures/reload.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.outlineBox}>Kranji Camp</Text>
          <Text style={{ marginHorizontal: 5 }}> to </Text>
          <Text style={styles.outlineBox}>Bishan Blk...</Text>
          <Text style={{ marginHorizontal: 5 }}> at </Text>
          <Text style={styles.outlineBox}>0800</Text>
        </View>
        <View style={styles.toolContainer}>
          <TouchableOpacity style={styles.filterContainer}>
            <Image style={styles.filterImg} source={require('../assets/pictures/filter.png')} />
            <Text style={{ marginHorizontal: 5 }}>Filter</Text>
          </TouchableOpacity>
          <Text> | </Text>
          <View style={styles.sortContainer}>
            <Text style={{ marginHorizontal: 5 }}>Sort by:</Text>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Text>Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Text>Distance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 20, alignSelf: 'flex-start', }}>Ride Offers</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={allRideOffers}
              renderItem={itemData => {
                let item = itemData.item;
                return (
                  <ResultItem name={item.name} start={item.start} end={item.end}
                    time={item.time} number={item.number} />
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 20, }}>Looking for Rideshare</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={allRideRequests}
              renderItem={itemData => {
                let item = itemData.item;
                return (
                  <ResultItem name={item.name} start={item.start} end={item.end}
                    time={item.time} number={item.number} />
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  headerContainer: {
    // alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  headerHeadingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelX: {
    height: 20,
    width: 20,
  },
  reloadImg: {
    height: 20,
    width: 20,
  },
  filterImg: {
    height: 12,
    width: 12,
  },
  header: {
    // flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  outlineBox: {
    padding: 5,
    backgroundColor: '#dddddd',
    borderRadius: 10,
  },
  toolContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
  }
})