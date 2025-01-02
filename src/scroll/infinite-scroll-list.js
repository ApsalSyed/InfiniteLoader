import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
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

  const renderPost = (post, index) => (
    <View key={`${post.id}-${index}`} style={styles.post}>
      <Text style={styles.postMeta}>ID: {post.id}</Text>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postMeta}>User ID: {post.userId}</Text>
      <Text style={styles.postTags}>Tags: {post.tags}</Text>
      <Text style={styles.postBody}>{post.body}</Text>
    </View>
  );

  if (pageLoader) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={styles.scrollViewContent}>
        {posts.map(renderPost)}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        )}
      </ScrollView>
      <Button
        title="Reset"
        onPress={pageReset}
        color="red"
        disabled={!dataAvailable}
        style={styles.resetButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightblue', 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  post: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  postMeta: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 6,
  },
  postTags: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 12,
  },
  postBody: {
    fontSize: 12,
    color: 'black',
    lineHeight: 18,
  },
  loader: {
    marginTop: 20,
  },
  resetButton: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default InfiniteScrollList;
