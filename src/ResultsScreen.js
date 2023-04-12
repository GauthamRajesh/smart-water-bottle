import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

const ResultsScreen = ({connectedDevice, setConnectedDevice}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [PID, setPID] = useState(null);
  useEffect(() => {
    BleManager.start({showAlert: false});

    const handleDiscoverPeripheral = device => {
      console.log('New device:', device.advertising.localName);
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

    return () => {
      DeviceEventEmitter.removeListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      devices.length = 0;
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
        })
        .catch(err => {
          console.error(err);
        });

      setTimeout(() => {
        setIsScanning(false);
      }, 5000);
    }
  };

  const connectToDevice = device => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to ' + device.name);
        setConnectedDevice(device);
        setPID(device.id);
      })
      .catch(error => {
        console.log('Connection error', error);
      });
  };

  const disconnectFromDevice = () => {
    BleManager.disconnect(connectedDevice.id)
      .then(() => {
        console.log('Disconnected from ' + connectedDevice.name);
        setConnectedDevice(null);
      })
      .catch(error => {
        console.log('Disconnect error', error);
      });
  };

  const readCharacteristic = async (
    peripheralId,
    serviceUUID,
    characteristicUUID,
  ) => {
    try {
      await BleManager.retrieveServices(peripheralId);
      let message = await BleManager.read(
        peripheralId,
        serviceUUID,
        characteristicUUID,
      );
      console.log('Read ', message);
    } catch (error) {
      console.error('Error reading characteristic:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {connectedDevice ? (
        <>
          <TouchableOpacity
            onPress={() =>
              readCharacteristic(PID, SERVICE_UUID, CHARACTERISTIC_UUID)
            }
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
            }}>
            <Text>Read device</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={disconnectFromDevice}
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
            }}>
            <Text>Disconnect from {connectedDevice.advertising.localName}</Text>
          </TouchableOpacity>
        </>
      ) : (
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
      )}
    </View>
  );
};

export default ResultsScreen;
