import React from 'react';
import {SafeAreaView} from 'react-native';
import InfiniteScrollFlatList from './src/infinite-scroll';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <InfiniteScrollFlatList />
    </SafeAreaView>
  );
}

export default App;
