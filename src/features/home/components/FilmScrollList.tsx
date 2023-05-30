import {useCallback} from 'react';

import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';

import LoadingIndicator from '@components/LoadingIndicator';
import {FilmListItem} from '@components/misc/FilmListItem';
import ScreenPadding from '@components/ScreenPadding';
import {FilmCore} from '@interfaces/models/IFilm';

const keyExtractor = <T extends FilmCore>(item: T | undefined) =>
  item?.id.toString() ?? (Math.random() + 1).toString(36).substring(7);

export const FilmScrollList = <T extends FilmCore>({
  data,
  isFetching,
  isLoading,
  isError,
  onItemPress,
  onEndReached,
}: {
  data: T[] | undefined;
  onItemPress: (item: T) => void;
  onEndReached: () => void;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const listData = [...new Set(data)];

  const renderItem = useCallback(
    ({item}: {item: T | null}) => {
      if (!item) return <View className="flex flex-1" />;
      return (
        <FilmListItem
          posterPath={item.poster_path}
          onPressFunc={() => {
            onItemPress(item);
          }}
        />
      );
    },
    [onItemPress],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View className="h-40 w-full">
        {(isLoading || isFetching) && <LoadingIndicator />}
      </View>
    ),
    [isFetching, isLoading],
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <Text className="text-red-500">{'Error'}</Text>;
  }

  if (!listData || listData.length === 0)
    return (
      <ScreenPadding>
        <View className="flex flex-1 justify-center items-center">
          <Text className="text-2xl">{'Nothing to show for now'}</Text>
        </View>
      </ScreenPadding>
    );

  const remainder = listData.length % 3;
  const dataFilled =
    remainder % 3 === 0
      ? listData
      : listData.concat(Array(3 - remainder).fill(null));

  return (
    <FlatList
      data={dataFilled}
      bounces={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      removeClippedSubviews
      scrollEventThrottle={16}
      windowSize={25}
      numColumns={3}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.3}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
    />
  );
};
