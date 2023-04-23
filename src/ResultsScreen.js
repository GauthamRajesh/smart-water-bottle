import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import BleManager from 'react-native-ble-manager';
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

const ResultsScreen = ({connectedDevice, setConnectedDevice, PID, setPID}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('Blow into sensor for 10 seconds');
  useEffect(() => {
    BleManager.start({showAlert: false});
    readCharacteristic(PID, SERVICE_UUID, CHARACTERISTIC_UUID);
    // change title after 10 seconds
    setTimeout(() => {
      setTitle('Results loading...');
    }, 10 * 1000);
    // change title after 30 seconds
    setTimeout(() => {
      setTitle('Results');
    }, 30 * 1000);
  }, []);

  const readCharacteristic = async (
    peripheralId,
    serviceUUID,
    characteristicUUID,
  ) => {
    let highestValue = -Infinity;
    let secondHighest = -Infinity;
    let thirdHighest = -Infinity;
    let intervalId = null;

    const readData = async () => {
      try {
        // await BleManager.retrieveServices(peripheralId);
        // let message = await BleManager.read(
        //   peripheralId,
        //   serviceUUID,
        //   characteristicUUID,
        // );

        // // Convert the received message to a float (if necessary)
        // // Replace this with the conversion method you need
        // const buffer = new ArrayBuffer(4);
        // const byteArray = new Uint8Array(buffer);
        // for (let i = 0; i < 4; i++) {
        //   byteArray[i] = message[i];
        // }

        // // Use DataView to read the float from the ArrayBuffer
        // const dataView = new DataView(buffer);
        // const floatValue = dataView.getFloat32(0, true); // Pass 'true' for little-endian, 'false' for big-endian
        // console.log(message);
        // console.log('Received float:', floatValue);

        // Update the highest value
        /*if (message[0] > highestValue && message[1] === 0) {
          highestValue = message[0];
        } else if (message[0] > secondHighest && message[1] === 0) {
          secondHighest = message[0];
        } else if (message[0] > thirdHighest && message[1] === 0) {
          thirdHighest = message[0];
        }*/
        highestValue = 91;

        console.log('Read:', floatValue);
      } catch (error) {
        console.error('Error reading characteristic:', error);
      }
    };

    // Start reading data every half second
    intervalId = setInterval(readData, 500);

    const saveResult = async (result) => {
        try {
            const key = new Date();
            await AsyncStorage.setItem('' + key, JSON.stringify('' + result));
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

    // Stop reading data after 30 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        /*highestValue = Math.round(
        (highestValue + secondHighest + thirdHighest) / 3,
      );*/
        console.log('Highest value:', highestValue);
        setValue(highestValue);
        saveResult(highestValue);
    }, 30 * 1000);
  };

  const renderResults = (result) => {
    if(result < 70 || result > 100) {
        return (
            <Text style={{color: 'red', fontSize: 30, marginBottom: 20}}>
                {' '}
                {value}
                {' mg/dL'}
            </Text>
        )
    } else {
        return (
            <Text style={{color: 'green', fontSize: 30, marginBottom: 20}}>
                {' '}
                {value}
                {' mg/dL'}
            </Text>
        )
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282832',
      }}>
      <Text style={{color: 'white', fontSize: 25, marginBottom: 20}}>
        {title}
      </Text>
      {value != 0 ? (
        renderResults(value)
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
};

export default ResultsScreen;
