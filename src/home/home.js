import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

const HomePage = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Infinite scroll FlatList"
        onPress={() => {
          navigation.navigate('InfiniteScrollFlatLists');
        }}
      />
      <Button
        title="Infinite scroll List"
        onPress={() => {
          navigation.navigate('InfiniteScrollList');
        }}
      />
    </View>
  );
};

export default HomePage;
