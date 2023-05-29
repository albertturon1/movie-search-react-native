import {ReactNode} from 'react';

import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {Skeleton} from '@components/Skeleton';

export const FilmSection = <T,>({
  isLoading,
  data,
  children,
  title,
  containerClassName = '',
  titleClassName = '',
  skeletonClassName = '',
}: {
  data?: T | undefined;
  isLoading: boolean;
  children: (data: NonNullable<T>) => ReactNode;
  title?: string;
  containerClassName?: string;
  titleClassName?: string;
  skeletonClassName?: string;
}) => {
  if (!isLoading && !data) return null;
  return (
    <View className={`w-full ${containerClassName}`}>
      {data ? (
        <View className="flex flex-col">
          {title && (
            <Text className={`text-lg font-bold mb-1 ${titleClassName}`}>
              {title}
            </Text>
          )}
          {children(data)}
        </View>
      ) : (
        <Skeleton styleClassName={`w-full h-full ${skeletonClassName}`} />
      )}
    </View>
  );
};
