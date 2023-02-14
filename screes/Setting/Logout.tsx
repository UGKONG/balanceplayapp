/* eslint-disable react/react-in-jsx-scope */
import {useDispatch} from 'react-redux';
import {LayoutProps} from '.';
import Button from '../../layouts/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({Set}: LayoutProps) {
  const dispatch = useDispatch();

  const onPress = (): void => {
    dispatch({type: 'user', payload: null});
    AsyncStorage.removeItem('user');
  };

  return (
    <Set.Container>
      <Set.Title>로그아웃</Set.Title>
      <Button onPress={onPress}>바로가기</Button>
    </Set.Container>
  );
}
