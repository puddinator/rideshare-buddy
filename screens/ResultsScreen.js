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
            <Text style={styles.cancelX}>X</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Find close matches</Text>
          <Text style={styles.reloadImg}> o </Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={{ marginHorizontal: 5 }}>Kranji Camp</Text>
          <Text style={{ marginHorizontal: 5 }}> to </Text>
          <Text style={{ marginHorizontal: 5 }}>Bishan Blk...</Text>
          <Text style={{ marginHorizontal: 5 }}> at </Text>
          <Text style={{ marginHorizontal: 5 }}>0800</Text>
        </View>
        <View style={styles.toolContainer}>
          <Text style={{ marginHorizontal: 5 }}>Filter</Text>
          <Text style={{ marginHorizontal: 5 }}>Sort by:</Text>
          <Text style={{ marginHorizontal: 5 }}>Time</Text>
          <Text style={{ marginHorizontal: 5 }}>Distance</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{flex: 1}}>
          <Text style={{ fontSize: 20, }}>Ride Offers</Text>
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
        <View style={{flex: 1}}>
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
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  headerHeadingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelXPress: {
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },
  cancelX: {
    marginVertical: 7,
    marginHorizontal: 14,
    fontSize: 25,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
  },
  toolContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 10,
  },
})