import { StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native';

function ResultItem(props) {
    return (
        <TouchableOpacity style={styles.goalItem}>
            <Image style={styles.profileImg} source={require('../assets/pictures/profile.png')} />
            <Text style={{ marginHorizontal: 10 }}>{props.name}</Text>
            <View style={{ marginHorizontal: 10 }}>
                <Text>{props.start}</Text>
                <Text>{props.end}</Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>{props.time}</Text>
        </TouchableOpacity>
    );
}

export default ResultItem;

const styles = StyleSheet.create({
    goalItem: {
        marginVertical: 5,
        height: 50,
        borderRadius: 6,
        backgroundColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
});