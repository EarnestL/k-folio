import * as React from 'react';
import {View, Text, Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import PhotocardScreen from './screens/PhotocardScreen';

//icons
import HomeIcon from '../assets/record.svg';
import HomeIconSelected from '../assets/recordSelected.svg';
import PCIcon from '../assets/pc.svg'
import PCIconSelected from '../assets/pcSelected.svg';

//Screen names
const homeName = 'Home';
const pcName = 'PC';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        // <View>
        //     <Text>
        //         Hello
        //     </Text>
        // </View>
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let rn = route.name;

                    if (rn === homeName){
                        return ( focused
                            ? <HomeIconSelected width={size} height={size} fill={'dimgrey'} />
                            : <HomeIcon width={size} height={size} fill={'lightgrey'} />
                        )
                    } else if (rn === pcName){
                        return ( focused
                            ? <PCIconSelected width={size} height={size} fill={'dimgrey'} />
                            : <PCIcon width={size} height={size} fill={'lightgrey'} />
                        )
                    }
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
                tabBarStyle: {paddingTop: 10, backgroundColor: 'ivory'},
            })}
            >

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={pcName} component={PhotocardScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}