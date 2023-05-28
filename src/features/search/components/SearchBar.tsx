import React from 'react';

import {Searchbar} from 'react-native-paper';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoFocus: boolean;
}

const SearchBar: React.FC<Props> = ({
  value = '',
  onChangeText,
  placeholder = 'Search for a movie',
  autoFocus = false,
}) => (
  <Searchbar
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
    autoFocus={autoFocus}
  />
);

export default SearchBar;
