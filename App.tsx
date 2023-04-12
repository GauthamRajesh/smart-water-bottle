import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
//Don't use MUI, they don't support react-native

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  rectangle: {
    backgroundColor: '#4C4D55',
    borderRadius: 32,
    width: 220,
    height: 60,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#282832'}}>
      <StatusBar barStyle="light-content" backgroundColor="#282832" />
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          padding: 20,
          fontWeight: 'bold',
          textAlign: 'left',
        }}>
        Hello, Krish!
      </Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details')}>
          <Text style={{color: 'white'}}>Take a Reading</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rectangle}>
        <Icon name="user" size={30} style={{fontFamily: 'FontAwesome'}} />
      </View>
    </SafeAreaView>
  );
}

function ResultsScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#282832'}}>
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          padding: 20,
          fontWeight: 'bold',
          textAlign: 'left',
        }}>
        Results
      </Text>
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={ResultsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
