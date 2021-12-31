import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import { primary } from './colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={require('../../logo.png')} style={styles.logo} />
      </View>

      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: primary,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
});

export default SplashScreen;
