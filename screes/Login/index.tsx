/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import _Container from '../../layouts/Container';
import messaging from '@react-native-firebase/messaging';
import Button from '../../layouts/Button';
import http from '../../functions/http';
import {useDispatch} from 'react-redux';

const os = Platform.OS;

export default function Login() {
  const dispatch = useDispatch();
  const [uuid, setUuid] = useState<null | string>(null);

  // UUID 조회
  const getUuid = (): void => {
    messaging()
      .getToken()
      .then(setUuid)
      .catch(() => setUuid(''));
  };

  // Balance Login
  // const balanceLogin = (data): void => {};

  // 개발용 로그인
  const devLogin = (): void => {
    console.log('개발용 로그인을 시도합니다.');
    const form = {
      EMAIL: 'jsw01137@naver.com',
      CENTER_ID: 1,
      AUTH_ID: '1867606287',
    };
    http
      .post('/login', form)
      .then(({data}) => {
        dispatch({type: 'user', payload: data?.data});
      })
      .catch(() => {});
  };

  useEffect(getUuid, []);
  useEffect(() => {
    if (uuid) console.log(os, uuid);
  }, [uuid]);

  return (
    <Container>
      <Image />
      <Buttons>
        <Button onPress={devLogin}>개발용 로그인</Button>
      </Buttons>
    </Container>
  );
}

const Container = styled(_Container.View)`
  justify-content: center;
`;
const Image = styled.Image.attrs(() => ({
  source: require('../../assets/logo.png'),
  resizeMode: 'contain',
}))`
  min-width: 200px;
  max-width: 300px;
  width: 50%;
`;
const Buttons = styled.View``;
