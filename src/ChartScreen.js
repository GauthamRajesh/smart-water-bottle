import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
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
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};
function ChartScreen() {
  const [readings, setReadings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // read in data from async storage
      const keys = await AsyncStorage.getAllKeys();
      for (let i = 0; i < keys.length; i++) {
        const value = await AsyncStorage.getItem(keys[i]);
        setReadings(readings => [...readings, value]);
      }
    };
    fetchData();
    // create the chart using the data
  }, []);
  // read in data from async storage
//   let data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//             {
//             data: [20, 45, 28, 80, 99, 43],
//             color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//             strokeWidth: 2, // optional
//             },
//         ],
//         legend: ['Blood Glucose Levels'], // optional
//     };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#282832',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LineChart
        data={data}
        width={400}
        height={320}
        chartConfig={chartConfig}
      />
    </SafeAreaView>
  );
}

export default ChartScreen;
