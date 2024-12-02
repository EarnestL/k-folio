import React from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, Alert, Button, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';

export default function App() {
  const photos = [
    { id: 1, uri: 'https://i.pinimg.com/originals/ba/1f/be/ba1fbee7ff435e78e9270ed69260676e.jpg', name: 'Chaewon' },
    { id: 2, uri: 'https://i.pinimg.com/736x/c3/2b/de/c32bde599e1e27092b72fb8ea2b4a848.jpg', name: 'Yunjin' },
    { id: 3, uri: 'https://i.pinimg.com/736x/2c/b8/4b/2cb84b008f35ecb6a90bca905ae42a39.jpg', name: 'Kazuha' },
    { id: 4, uri: 'https://i.pinimg.com/736x/b1/8c/67/b18c67521dbc572e5226e9ba8738a5e0.jpg', name: 'Eunchae' },
    { id: 5, uri: 'https://i.pinimg.com/736x/86/3a/54/863a5465b8da32eda95a034763803114.jpg', name: 'Sakura' },
  ];

  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.grid}>
        {photos.map((photo) => (
          <View key={photo.id} style={styles.photoContainer}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            <Text style={styles.name}>{photo.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '10%', // Add padding to the left and right of the grid
  },
  photoContainer: {
    width: '45%', // Two cards per row with space between
    aspectRatio: 3/4, // Enforces a square (1:1 ratio)
    marginBottom: '10%', // Equal bottom spacing in percentage
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

