import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    LineChart
} from "react-native-chart-kit";


const Stack = createNativeStackNavigator();

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
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
        height: 150
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
        alignItems: 'center'
    }
});

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282832'}}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='#282832'
            />
            <Text style={{color: 'white', 
                        fontSize: 25, 
                        padding: 20,
                        fontWeight: 'bold', 
                        textAlign: 'left'}}> 
                Hello, Krish!
            </Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
                    <Text style={{color: 'white'}}>Take a Reading</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rectangle}>
            </View>
            {/* <Icon name="linechart" size={30} color="#900" /> */}
            {/* react-native link react-native-vector-icons*/}

            {/* <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            /> */}
            <LineChart
            data={data}
            width={400}
            height={320}
            chartConfig={chartConfig}
            />
        </SafeAreaView>
    );
}

function ResultsScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282832' }}>
            <Text style={{color: 'white', 
                        fontSize: 25, 
                        padding: 20,
                        fontWeight: 'bold', 
                        textAlign: 'left'}}> 
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
            <Stack.Screen name="Details" component={ResultsScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
