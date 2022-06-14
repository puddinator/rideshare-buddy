import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

db.collection("cities").doc("SF")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.data());
  });

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ResultsScreen = () => {
  const navigation = useNavigation()

  const redirectToHome = () => {
    navigation.replace("Home")
  }

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

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
          <Text>Kranji Camp</Text>
          <Text> -> </Text>
          <Text>Bishan Blk...</Text>
          <Text> at </Text>
          <Text>0800</Text>
        </View>
        <View style={styles.toolContainer}>
          <Text>Filter</Text>
          <Text>Sort by:</Text>
          <Text>Time</Text>
          <Text>Distance</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={courseGoals}
          renderItem={itemData => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
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
    marginHorizontal: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',

  },
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bodyContainer: {

  },
})