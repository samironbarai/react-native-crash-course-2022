import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL} from '../config';
import {primary, borderColor} from './colors';
import {AuthContext} from './context/AuthContext';

const PostCreateScreen = ({navigation}) => {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AuthContext);

  const createPost = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/posts`,
        {
          title,
          body,
        },
        {headers: {Authorization: `Bearer ${user.token}`}},
      )
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Home', {
          post: post,
        });
        console.log(res.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on creating post ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={val => {
          setTitle(val);
        }}
      />
      <TextInput
        placeholder="Body"
        style={styles.input}
        value={body}
        onChangeText={val => {
          setBody(val);
        }}
      />

      <Button title="Submit" color={primary} onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
});

export default PostCreateScreen;
