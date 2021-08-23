import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import {ActivityIndicator, FAB, Portal} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Card, OverlayLabel} from '../../components';
import {useLoading, useCards, useFavorites} from '../../hooks';
import styles from './styles';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const swiperRef = useRef(null);
  const [previous, setPrevious] = useState(false);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  const {loading, setLoadingF} = useLoading();
  const {cards, page, getCardsF} = useCards();
  const {setFavoriteF, setUnFavoriteF} = useFavorites();

  useEffect(() => {
    if (page === 1) {
      setLoadingF(true);
      getCardsF(page);
    }
    if (cards.length > 0) {
      setSwipedAllCards(false);
    }
  }, [cards]);

  const handleOnSwipedAllCards = () => {
    setCardIndex(cards.length);
    setSwipedAllCards(true);
    setLoadingF();
    getCardsF(page);
  };
  const handleOnSwipedLeft = () => swiperRef.current.swipeLeft();
  const handleOnSwipedRight = () => swiperRef.current.swipeRight();
  const handleOnSwipeBack = () =>
    swiperRef.current.swipeBack(previousCardIndex => {
      if (previousCardIndex === 1) {
        if (previous) {
          setPrevious(false);
        }
      }

      if (previousCardIndex > 0) {
        const card = cards[previousCardIndex - 1];
        setUnFavoriteF(card);
      }
      setCurrentIndex(previousCardIndex);
    });

  const handleOnSwiped = index => {
    setCurrentIndex(index + 2);
  };

  const handleOnSwipedLeftCallback = index => {
    if (!previous) {
      setPrevious(true);
    }
  };

  const handleOnSwipedRightCallback = index => {
    if (!previous) {
      setPrevious(true);
    }
    const card = cards[index];
    setFavoriteF(card);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeftButton}
          disabled={!previous}
          onPress={handleOnSwipeBack}>
          <Text
            style={[
              styles.headerLeftButtonText,
              !previous && styles.disableText,
            ]}>
            Undo
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Mars</Text>
        <TouchableOpacity
          style={styles.headerRightButton}
          onPress={() => navigation.push('Favorite')}>
          <FontAwesome5 name="heart" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Portal>
            <ActivityIndicator
              animating={true}
              size="large"
              color="red"
              style={styles.loadingContainer}
            />
          </Portal>
        ) : (
          <View style={styles.container}>
            <Swiper
              ref={swiperRef}
              cardIndex={cardIndex}
              cards={cards}
              keyExtractor={card => card.id}
              key={cards.length}
              cardVerticalMargin={80}
              renderCard={card => <Card card={card} />}
              backgroundColor="transparent"
              onSwipedAll={handleOnSwipedAllCards}
              onSwiped={handleOnSwiped}
              onSwipedLeft={handleOnSwipedLeftCallback}
              onSwipedRight={handleOnSwipedRightCallback}
              disableBottomSwipe={true}
              disableTopSwipe={true}
              stackSize={4}
              stackSeparation={-50}
              stackScale={10}
              swipeAnimationDuration={800}
              inputRotationRange={[-width / 2, 0, width / 2]}
              outputRotationRange={['-2deg', '0deg', '2deg']}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  element: <OverlayLabel label="NOPE" color="#e5566d" />,
                  style: {
                    wrapper: styles.overlayWrapperLeft,
                  },
                },
                right: {
                  title: 'LIKE',
                  element: <OverlayLabel label="LIKE" color="#4ccc93" />,
                  style: {
                    wrapper: styles.overlayWrapperRight,
                  },
                },
              }}
              showSecondCard
              animateOverlayLabelsOpacity
              animateCardOpacity={false}
              swipeBackCard
            />
            {!swipedAllCards && (
              <View style={styles.bottomContainer}>
                <FAB
                  style={styles.fabDislike}
                  icon="thumb-down-outline"
                  color="white"
                  onPress={handleOnSwipedLeft}
                />
                <Text style={styles.indexText}>
                  {`${currentIndex} / ${cards.length} cards`}
                </Text>
                <FAB
                  style={styles.fabLike}
                  icon="thumb-up-outline"
                  color="white"
                  onPress={handleOnSwipedRight}
                />
              </View>
            )}
          </View>
        )}
        {renderHeader()}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
