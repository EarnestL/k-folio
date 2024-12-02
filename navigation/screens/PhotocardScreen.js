import React, {useState, useRef} from 'react';
import { StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity, Alert, Button, View, Image, SafeAreaView, Platform, Modal, Animated, PanResponder  } from 'react-native';

export default function PhotocardScreen({navigation}){
    const photos = [
        { id: 1, uri: 'https://i.pinimg.com/originals/ba/1f/be/ba1fbee7ff435e78e9270ed69260676e.jpg', name: 'Chaewon' },
        { id: 2, uri: 'https://i.pinimg.com/736x/c3/2b/de/c32bde599e1e27092b72fb8ea2b4a848.jpg', name: 'Yunjin' },
        { id: 3, uri: 'https://i.pinimg.com/736x/2c/b8/4b/2cb84b008f35ecb6a90bca905ae42a39.jpg', name: 'Kazuha' },
        { id: 4, uri: 'https://i.pinimg.com/736x/b1/8c/67/b18c67521dbc572e5226e9ba8738a5e0.jpg', name: 'Eunchae' },
        { id: 5, uri: 'https://i.pinimg.com/736x/86/3a/54/863a5465b8da32eda95a034763803114.jpg', name: 'Sakura' },
      ];
    
    const [selectedPhoto, setSelectedPhoto] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    // Animation values
    const tiltX = useRef(new Animated.Value(0)).current;
    const tiltY = useRef(new Animated.Value(0)).current;

    const openModal = (photo) => {
      setSelectedPhoto(photo);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedPhoto(null);
    }

  // PanResponder for drag and tilt gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      // Update tiltX and tiltY based on drag distance
      tiltX.setValue(gesture.dy / 10); // Vertical drag affects tiltX
      tiltY.setValue(gesture.dx / 10); // Horizontal drag affects tiltY
    },
    onPanResponderRelease: () => {
      // Reset animation when the gesture ends
      Animated.parallel([
        Animated.spring(tiltX, { toValue: 0, useNativeDriver: true }),
        Animated.spring(tiltY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    },
  });

      return (
    
        <SafeAreaView style={styles.container}>
          <Text style={styles.pageTitle}>Kim Chaewon</Text>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.grid}>
              {photos.map((photo) => (
                <TouchableOpacity key={photo.id} style={styles.photoContainer}
                  onPress={() => openModal(photo)}
                >
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1} // Ensures overlay is fully tappable
              onPress={closeModal} // Close modal when overlay is pressed
            >
          <View style={styles.modalContent}>
            {selectedPhoto && (
              <Animated.View
                {...panResponder.panHandlers} // Attach pan handlers
                style={
                  {
                    transform: [
                      { perspective: 1000 }, // Adds a 3D perspective
                      { rotateX: tiltX.interpolate({ inputRange: [-30, 30], outputRange: ['30deg', '-30deg'] }) },
                      { rotateY: tiltY.interpolate({ inputRange: [-30, 30], outputRange: ['-30deg', '30deg'] }) },
                    ],
                  }
                }
              >
                <Image source={{ uri: selectedPhoto.uri }} style={styles.modalImage} />
              </Animated.View>
            )}
          </View>
            </TouchableOpacity>
          </Modal>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'ivory'
      },
      pageTitle: {
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 15,
        color: 'dimgrey',
      },
      scrollContainer: {
        paddingVertical: 20, // Add vertical padding to the scrollable area
      },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: '10%', // Add padding to the left and right of the grid
      },
      photoContainer: {
        width: '45%', // Two cards per row with space between
        aspectRatio: 5.5/8.5, // Enforces photocard dimensions
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
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darken background
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: '80%',
        overflow: 'visible',
      },
      modalImage: {
        width: '100%',
        aspectRatio: 5.5 / 8.5,
        borderRadius: 20,
      },
      modalText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
      },
      closeButton: {
        marginTop: 15,
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
        fontSize: 16,
      },
    });
    
    