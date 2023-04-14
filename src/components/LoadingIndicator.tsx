import {ActivityIndicator, View} from 'react-native';

export default function LoadingIndicator() {
  return (
    <View className="flex flex-1 bg-tertiaryBlack justify-center items-center">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
