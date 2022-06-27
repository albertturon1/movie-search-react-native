import {View, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import colors from '../theme/colors';
import SearchBar from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {fsize, ftype} from '../theme/fonts';
// import useDebounce from '../hooks/useDebounce';

export default function Search() {
  const [value, setValue] = useState('');
  const queryValues = {searchQuery: value?.trim()};
  // const debouncedSearchQuery = !searchPreviousValue ? useDebounce(queryValues, 400) : useDebounce(queryValues, 0);

  const onChangeText = e => setValue(e);

  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <SearchBarWrapper>
          <SearchBar value={value} onChangeText={onChangeText} autoFocus />
        </SearchBarWrapper>
      </>
      <SearchListContainer>
        {/* <ShowResults value={value} searchData={searchData} isLoading={isSearchLoading} isSuccess={isSuccessLoading} /> */}
      </SearchListContainer>
    </SafeAreaView>
  );
}

// const ShowResults = ({ value, searchData, isLoading, isSuccess }) => {
//     if (value.length === 0) return null;
//     else if (searchData?.length > 0 || isLoading) {
//         return searchData?.map((result, index) => {
//             if (result.result_type === 'meeting') return <MeetingItem key={index} item={result} lastItem={index === searchData?.length - 1 ? true : false} />
//             if (result.result_type === 'user') return <UserItem key={index} item={result} lastItem={index === searchData?.length - 1 ? true : false} />
//         })
//     } else if (isSuccess && searchData?.length === 0) {
//         return <Delayed waitBeforeShow={1000}><EmptyResultsText>Brak wyników</EmptyResultsText></Delayed>
//     }
// }

const meetingTimeStatus = (startTimestamp, endTimestamp) => {
  const now = new Date();
  const start = new Date(startTimestamp);
  const end = endTimestamp ? new Date(endTimestamp) : null;

  if (start >= now) return null;
  else if (start <= now && end > now) return 'active';
  else if (start <= now && !end) return 'past';
  else return null;
};

const SearchBarWrapper = styled.View`
  width: 100%;
  margin-top: ${verticalScale(10)}px;
  padding: 0 ${scale(15)}px;
`;
const SearchListContainer = styled.View`
  width: 100%;
  padding: ${verticalScale(20)}px ${scale(10)}px;
`;
const SearchItemContainer = styled.View`
  width: 100%;
  padding: 0 ${scale(5)}px;
  justify-content: center;
  flex-direction: row;
`;
//MEETING
const MeetingImageWrapper = styled.View`
  width: ${scale(110)}px;
  margin-right: ${scale(10)}px;
  border-width: 0.4px;
  border-color: #242424;
`;
const Title = styled.Text`
  font-family: ${ftype.semibold};
  color: ${colors.primaryWhite};
  font-size: ${fsize.s15}px;
  line-height: ${fsize.s15}px;
`;
const DetailText = styled.Text`
  font-family: ${ftype.regular};
  color: ${colors.tertiaryWhite};
  font-size: ${fsize.s13}px;
  line-height: ${fsize.s13 * 1.2}px;
  margin-bottom: ${verticalScale(2)}px;
`;
const DescriptionText = styled(DetailText)`
  line-height: ${fsize.s14 * 1.4}px;
`;
//USER
const UserImageWrapper = styled.View`
  width: ${scale(55)}px;
  height: ${scale(55)}px;
  margin-right: ${scale(10)}px;
  border-radius: 100px;
  overflow: hidden;
  border-width: 0.3px;
  border-color: #242424;
  background-color: ${colors.tertiaryBlack}px;
`;
const Name = styled.Text`
  color: ${colors.primaryWhite};
  font-size: ${fsize.s16}px;
  font-family: ${ftype.semibold};
  margin-bottom: ${verticalScale(2)}px;
`;
const Username = styled.Text`
  color: ${colors.secondaryWhite};
  font-size: ${fsize.s12}px;
  font-family: ${ftype.regular};
  margin-top: ${verticalScale(3)}px;
`;
const EmptyResultsText = styled.Text`
  color: ${colors.secondaryWhite};
  font-size: ${fsize.s14}px;
  font-family: ${ftype.regular};
  margin-left: ${scale(10)}px;
`;

//STATUS MARKER
const StatusMarkerContainer = styled.View`
  z-index: 10;
  position: absolute;
  top: ${scale(3)}px;
  left: ${scale(7)}px;
  padding: ${verticalScale(3)}px ${scale(7)}px;
  background-color: ${({status}) => (status === 'active' ? '#d20000' : status === 'past' ? '#202020' : 'transparent')};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
const StatusText = styled.Text`
  color: ${colors.primaryWhite};
  font-size: ${fsize.s10}px;
  font-family: ${ftype.semibold};
  margin-bottom: ${verticalScale(1)}px;
`;
