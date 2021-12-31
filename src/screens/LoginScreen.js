import React, {useContext, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {secondary, borderColor, primary} from './colors';
import {AuthContext} from './context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {login, loading} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.logoWrapper}>
        <Image source={require('../../logo.png')} style={styles.logo} />
      </View>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={val => {
          setEmail(val);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={val => {
          setPassword(val);
        }}
        secureTextEntry
      />

      <Button
        title="Login"
        color={primary}
        onPress={() => {
          login(email, password);
        }}
      />

      <View style={styles.helperWrapper}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.linkTextColor}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  helperWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  linkTextColor: {
    color: secondary,
  },
});

export default LoginScreen;
