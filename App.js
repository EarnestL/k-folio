import * as React from 'react';
import { StyleSheet, SafeAreaView, Platform, Text } from 'react-native';
import MainContainer from './navigation/MainContainer';

function App() {
    return (
        <SafeAreaView style={styles.container}>
            <MainContainer/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'ivory',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
export default App;