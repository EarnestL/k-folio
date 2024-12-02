import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text style={{fontSize:26, fontWeight:'bold'}}>
                Home Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'ivory'
    }
});