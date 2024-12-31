import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

const InfiniteScrollList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [dataAvailable, setDataAvailable] = useState(true);
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

  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    if (
        layoutMeasurement.height + contentOffset.y >= contentSize.height &&
      !loading &&
      dataAvailable
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const pageReset = () => {
    setPosts([]);
    setPage(1);
    setDataAvailable(true);
    setPageLoader(true);
  };

  const renderPost = post => (
    <View key={post.id} style={styles.post}>
      <Text>ID: {post.id}</Text>
      <Text>Title: {post.title}</Text>
      <Text>User ID: {post.userId}</Text>
      <Text>Tags: {post.tags}</Text>
      <Text style={{fontSize: 12, color: 'red'}}>Body: {post.body}</Text>
    </View>
  );

  if (pageLoader) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll}>
        {posts.map(renderPost)}
        {loading && <ActivityIndicator />}
      </ScrollView>
      <Button title="Reset" onPress={pageReset} color="red" />
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

export default InfiniteScrollList;
