import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL} from '../config';
import {primary, borderColor} from './colors';
import {AuthContext} from './context/AuthContext';

const PostEditScreen = ({navigation, route}) => {
  const post = route.params.post;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AuthContext);

  const editPost = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/posts/${post.id}`,
        {
          title,
          body,
        },
        {
          headers: {Authorization: `Bearer ${user.token}`},
        },
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
        console.log(`Error on updating post ${e.message}`);
      });
  };

  const deletePost = () => {
    setLoading(true);

    axios
      .delete(`${BASE_URL}/posts/${post.id}`, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Home', {post: post});
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
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

      <Button title="Update" color={primary} onPress={editPost} />
      <View style={{marginTop: 4}}>
        <Button title="Delete" color="red" onPress={deletePost} />
      </View>
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

export default PostEditScreen;
