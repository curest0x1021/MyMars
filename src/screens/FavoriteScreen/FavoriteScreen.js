import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFavorites} from '../../hooks';
import {FavoriteItem} from '../../components';
import styles from './styles';

const FavoriteScreen = () => {
  const {favorites, getFavoritesF, setUnFavoriteF} = useFavorites();

  useEffect(() => {
    getFavoritesF();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const handleOnRemove = card => {
    setUnFavoriteF(card);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={card => (
            <FavoriteItem
              card={card.item}
              onPress={() => handleOnRemove(card.item)}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
