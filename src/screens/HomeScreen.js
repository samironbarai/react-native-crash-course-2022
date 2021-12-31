import axios from 'axios';
import React, {useContext, useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import {useState} from 'react/cjs/react.development';
import {BASE_URL} from '../config';
import {primary, borderColor} from './colors';
import {AuthContext} from './context/AuthContext';

const actions = [
  {
    icon: require('../../logout.png'),
    name: 'logout',
    position: 2,
    color: '#014F5C',
  },
  {
    icon: require('../../add.png'),
    name: 'add_post',
    position: 1,
    color: '#014F5C',
  },
];

const HomeScreen = ({navigation, route}) => {
  const [posts, setPosts] = useState({});
  const {user, logout, loading} = useContext(AuthContext);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}/self-posts`, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(e => {
        console.log(`Error on getting posts ${e.message}`);
      });
  };

  useEffect(() => {
    getPosts();
  }, [route.params?.post]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() => {
                navigation.navigate('Post Edit', {post: item});
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'logout') {
            logout();
          } else if (name === 'add_post') {
            navigation.navigate('Post Create');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontWeight: '600',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
