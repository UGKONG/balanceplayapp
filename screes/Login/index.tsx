/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */
import {Alert, Platform} from 'react-native';
import styled from 'styled-components/native';
import _Container from '../../layouts/Container';
import http from '../../functions/http';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import useSnsList from './useSnsList';
import {Member, SnsLoginData} from '../../models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getProfile as getKakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

const iosKeys = {
  consumerKey: 'H8YDxnXfTpikQKzQWRAk',
  consumerSecret: 'ZhRcMdULk6',
  appName: 'balanceplayapp',
  serviceUrlScheme: 'balanceplay',
  disableNaverAppAuth: true,
};
const androidKeys = {
  consumerKey: 'H8YDxnXfTpikQKzQWRAk',
  consumerSecret: 'ZhRcMdULk6',
  appName: 'balanceplayapp',
};

const os = Platform.OS;
const naverLoginRequest = os === 'ios' ? iosKeys : androidKeys;

export default function Login() {
  const dispatch = useDispatch();
  const uuid = useSelector((x: Store) => x?.uuid);

  const success = (data: Member): void => {
    dispatch({type: 'user', payload: data});
    AsyncStorage.setItem('user', JSON.stringify(data));
  };
  const fail = (msg?: string): void => {
    dispatch({type: 'user', payload: null});
    AsyncStorage.removeItem('user');
    Alert.alert('로그인 실패', msg || '일치하는 회원이 없습니다.');
  };

  // 최종 로그인
  const submit = (form: SnsLoginData): void => {
    http
      .post('/app/login', form)
      .then(({data}) => {
        if (!data?.result) return fail(data?.msg);
        success(data?.data);
      })
      .catch(() => fail());
  };

  // 카카오 로그인
  const kakaoLogin = (): void => {
    const platform = 'kakao';

    login()
      .then(() => {
        getKakaoProfile()
          .then((value: any): void | PromiseLike<void> => {
            const id: string = value?.id ?? '';
            submit({platform, id, os, uuid});
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 네이버 로그인
  const naverLogin = (): void => {
    const platform = 'naver';

    NaverLogin.login(naverLoginRequest)
      .then(({failureResponse, successResponse}): void => {
        const token = successResponse?.accessToken;
        if (failureResponse || !token) {
          failureResponse && console.log(failureResponse);
          return;
        }

        getProfile(token)
          .then((result: any) => {
            const id = result?.id ?? '';
            submit({id, os, platform, uuid});
          })
          .catch(err => {
            console.log('getProfile', err);
          });
      })
      .catch(err => {
        console.log('NaverLogin.login', err);
      });
  };

  // SNS 로그인 리스트
  const snsList = useSnsList(kakaoLogin, naverLogin);

  return (
    <Container>
      <Image />
      <Buttons>
        {snsList?.map(item => (
          <Button key={item?.id} color={item?.color} onPress={item?.onPress}>
            <SNSImage source={item?.img as any} />
          </Button>
        ))}
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
const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
type ButtonProps = {color: string};
const Button = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<ButtonProps>`
  width: 54px;
  height: 54px;
  border-radius: 54px;
  margin: 14px;
  overflow: hidden;
  border: 2px solid ${(x: ButtonProps) => x?.color};
  background-color: ${(x: ButtonProps) => x?.color};
`;
const SNSImage = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 101%;
  height: 101%;
`;
