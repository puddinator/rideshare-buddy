import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState } from 'react'
import * as Linking from 'expo-linking';


function ResultItem(props) {
    const [modalVisible, setModalVisible] = useState(false);

    handlePress = () => {
        Linking.openURL(`whatsapp://send?text=Hello!&phone=65${props.number}`);
    };
    return (
        <>
            <TouchableOpacity style={styles.goalItem} onPress={() => setModalVisible(true)}>
                {props.imgURL != undefined ? (
                    <Image style={styles.profileImg} source={{ uri: props.imgURL }} />
                ) : <Image style={styles.profileImg} source={require('../assets/pictures/profileBordered.png')} />}
                {/* <Image style={styles.profileImg} source={{ uri: props.imgURL }} /> */}
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.time}>{props.time}</Text>
                <View style={styles.locations}>
                    <Text>{props.start}</Text>
                    <Text>{props.end}</Text>
                </View>
            </TouchableOpacity>

            {/* Modal for contact number */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Contact {props.name}:</Text>
                        <Text style={styles.numberText} onPress={handlePress}>+65 {props.number}</Text>
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image style={styles.closeImg} source={require('../assets/pictures/close.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default ResultItem;

const styles = StyleSheet.create({
    goalItem: {
        marginVertical: 5,
        paddingHorizontal: 10,
        minHeight: 50,
        borderRadius: 6,
        backgroundColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImg: {
        marginRight: 10,
        height: 40,
        width: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'grey',
    },
    name: {
        marginHorizontal: 10,
        width: 60,
    },
    time: {
        marginHorizontal: 10,
    },
    locations: {
        marginLeft: 10,
        width: 100,
    },
    closeImg: {
        width: 10,
        height: 10,
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 10,
        backgroundColor: '#fefefe',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
    },
    numberText: {
        textDecorationLine: 'underline',
        color: '#3e64cf',
    },
});