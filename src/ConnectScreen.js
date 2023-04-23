import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

const ConnectScreen = ({setConnected, setConnectedDevice, PID, setPID}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);


  useEffect(() => {
    BleManager.start({showAlert: false});

    const handleDiscoverPeripheral = device => {
      console.log('New device:', device.advertising);
      if (
        device.advertising.localName != undefined &&
        device.advertising.localName &&
        (device.advertising.localName.includes('Long') ||
          device.advertising.localName.includes('ESP'))
      ) {
        setDevices(prevDevices => {
          // Check if the device is already in the list
          const deviceExists = prevDevices.some(
            existingDevice => existingDevice.id === device.id,
          );

          // If the device is not in the list, add it
          if (!deviceExists) {
            console.log(device);
            return [...prevDevices, device];
          }

          // If the device is already in the list, return the existing list
          return prevDevices;
        });
      }
    };

    DeviceEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
  }, []);

    const startScan = () => {
        BleManager.scan([], 5, true).then(() => {
            console.log('Scanning...');
            setIsScanning(true);
        }).catch((error) => {
        console.log('Error scanning for devices:', error);
        });
        setTimeout(() => {
            setIsScanning(false);
        }, 5000);
    };

  const connectToDevice = device => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to ' + device.name);
        setConnectedDevice(device);
        setConnected(true);
        setPID(device.id);
      })
      .catch(error => {
        console.log('Connection error', error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <>
        <TouchableOpacity
          onPress={startScan}
          style={{
            backgroundColor: 'blue',
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}>
          <Text style={{color: 'white'}}>
            {isScanning ? 'Scanning...' : 'Scan for ESP32 Devices'}
          </Text>
        </TouchableOpacity>
        {devices.map(device => (
          <TouchableOpacity
            key={device.id}
            onPress={() => connectToDevice(device)}
            style={{
              backgroundColor: 'green',
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
            }}>
            <Text style={{color: 'white'}}>
              {device.advertising.localName || device.id}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    </View>
  );
};

export default ConnectScreen;
