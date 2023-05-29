import {View} from 'react-native';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<View />);
});
