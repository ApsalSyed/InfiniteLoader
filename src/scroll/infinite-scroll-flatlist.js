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

  const endPage = () => {
    if (!loading && dataAvailable) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const pageReset = () => {
    try {
      setPosts([]);
      setPage(1);
      setDataAvailable(true);
      setPageLoader(true);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const renderPost = ({item}) => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postMeta}>User ID: {item.id}</Text>
      <Text style={styles.postMeta}>User ID: {item.userId}</Text>
      <Text style={styles.postTags}>Tags: {item.tags.join(', ')}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  if (pageLoader) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return dataAvailable ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderPost}
        onEndReached={endPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#007bff" />
        }
      />
      <Button
        title="Reset"
        onPress={pageReset}
        color="red"
        disabled={!dataAvailable}
        style={styles.resetButton}
      />
    </SafeAreaView>
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No data available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  post: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
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
    marginBottom: 4,
  },
  postTags: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 12,
    color: '#495057',
    lineHeight: 18,
  },
  resetButton: {
    marginTop: 16,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  noDataText: {
    fontSize: 18,
    color: '#dc3545',
    fontWeight: '600',
  },
});

export default InfiniteScrollFlatList;
