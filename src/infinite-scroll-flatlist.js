import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const InfiniteScrollFlatList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [dataDataAvailable, setDataAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);

  const limit = 10;

  const fetchPosts = async () => {
    if (pageLoader) {
      setPageLoader(true);
    }
    setLoading(true);

    try {
      const {data} = await axios.get('https://dummyjson.com/posts', {
        params: {skip: (page - 1) * limit, limit},
      });

      if (data.posts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
      } else {
        setDataAvailable(false);
      }
      setPageLoader(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const endPage = () => {
    if (!loading && dataDataAvailable) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const pageReset = () => {
    setPosts([]);
    setPage(1), setDataAvailable(true), setPageLoader(true);
  };

  const renderPost = ({item}) => (
    <View style={styles.post}>
      <Text>ID: {item.id}</Text>
      <Text>Title: {item.title}</Text>
      <Text>User ID: {item.userId}</Text>
      <Text>Tags: {item.tags}</Text>
      <Text style={{fontSize: 12, color: 'red'}}>Body: {item.body}</Text>
    </View>
  );
  if (pageLoader) {
    return (
      <React.Fragment>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      </React.Fragment>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderPost}
        onEndReached={endPage}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      <Button
        title="Reset"
        onPress={() => {
          pageReset();
        }}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  post: {
    backgroundColor: 'pink',
    marginBottom: 10,
    padding: 15,
  },
});

export default InfiniteScrollFlatList;
