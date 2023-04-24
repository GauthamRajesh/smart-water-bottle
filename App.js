import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
//Don't use MUI, they don't support react-native
import ConnectScreen from './src/ConnectScreen';
import ResultsScreen from './src/ResultsScreen';
import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartScreen from './src/ChartScreen';
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

Icon.loadFont();

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

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
      <TouchableOpacity
        style={styles.rectangle}
        onPress={() => navigation.navigate('Chart')}>
        <Icon name="user" size={30} style={{fontFamily: 'FontAwesome'}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getData = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      console.log(keys);
      data = await AsyncStorage.multiGet(keys)
    } catch(e) {
      console.error(e);
    }
    return data;
};


// function ChartScreen() {
//     let values;
    
//     values = getData();
//     let newData = [];
//     for(let i = 0; i < values.length; i++) {
//         newData.push(parseInt(values[i][1]));
//     }
//     let data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//           {
//             data: [20, 45, 28, 80, 99, 43],
//             color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//             strokeWidth: 2, // optional
//           },
//         ],
//         legend: ['Blood Glucose Levels'], // optional
//     };
//     console.log(data.datasets[0])
//     return (
//         <SafeAreaView
//             style={{
//             flex: 1,
//             backgroundColor: '#282832',
//             justifyContent: 'center',
//             alignItems: 'center',
//             }}>
//             <LineChart
//             data={data}
//             width={400}
//             height={320}
//             chartConfig={chartConfig}
//             />
//         </SafeAreaView>
//     );
// }
/*function ResultsScreen() {
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
*/

function App() {
  const [connected, SetConnected] = React.useState(false);
  const [connectedDevice, setConnectedDevice] = React.useState(null);
  const [PID, setPID] = React.useState(null);
  //use useEffect to load in the data from async storage
  //use the getAllKeys() function to load all of the dates
  //use AsyncStorage.getItem(key) to get the blood glucose reading
  if (connected) {
    return (
      <ConnectScreen
        setConnected={SetConnected}
        setConnectedDevice={setConnectedDevice}
        setPID={setPID}
        PID={PID}
      />
    );
  }
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
          children={() => (
            <ResultsScreen
              connectedDevice={connectedDevice}
              setConnectedDevice={setConnectedDevice}
              setPID={setPID}
              PID={PID}
            />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chart"
          children={() => <ChartScreen />}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
