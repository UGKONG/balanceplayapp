import {useMemo} from 'react';
import {SnsLogin} from '../../models';

export default function useSnsList(
  kakaoLogin: () => void,
  naverLogin: () => void,
) {
  const memo = useMemo<SnsLogin[]>(
    () => [
      {
        id: 1,
        name: 'kakao',
        img: require('../../assets/snsIcons/kakao.png'),
        color: '#ebeb0f',
        onPress: kakaoLogin,
      },
      {
        id: 2,
        name: 'naver',
        img: require('../../assets/snsIcons/naver.png'),
        color: '#099f09',
        onPress: naverLogin,
      },
    ],
    [kakaoLogin, naverLogin],
  );

  return memo;
}
