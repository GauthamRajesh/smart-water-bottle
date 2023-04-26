# Glucare

This repository contains the code for the React Native app for Glucare, our Spring 2023 Convergent Build Team product. It uses multiple native libraries, including a graph and a Bluetooth library, to both show the results and connect to the ESP32. We separated the main features of our app into four components (all stored in the `src` folder): `ChartScreen`, which contains the code that shows the graph with all readings; `ConnectScreen`, which allows the user to connect to the ESP32; `ReadBluetooth`, which actually reads the data from the sensor; and `ResultsScreen`, which shows the reading in either a green or red color.

All of these screens are connected and start from the homepage of the app, which is stored in the `App.js` file in the root folder.
