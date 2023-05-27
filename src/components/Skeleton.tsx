import {useRef, useEffect} from 'react';

import {Animated} from 'react-native';
import {twMerge} from 'tailwind-merge';

export const Skeleton = ({styleClassName}: {styleClassName?: string}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={twMerge('rounded-md bg-muted', styleClassName)}
      style={{
        opacity,
      }}
    />
  );
};
