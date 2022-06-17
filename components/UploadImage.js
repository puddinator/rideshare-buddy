import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase'

const UploadImage = ({setImgURI}) => {
    const [image, setImage] = useState(null);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result);
            setImgURI(result);
        }
    }

    return (
        <TouchableOpacity
            style={styles.profileImgContainer}
            onPress={selectImage}
        >
            {image !== null ? (
                <Image style={styles.profileImg} source={{ uri: image.uri }} />
            ) : <Image style={styles.defaultProfileImg} source={require('../assets/pictures/profileBordered.png')} />}
        </TouchableOpacity>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    profileImgContainer: {
        // padding: 20,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'silver',
        marginBottom: 20,
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    defaultProfileImg: {
        width: 100,
        height: 100,
        borderRadius: 190,
    },
})