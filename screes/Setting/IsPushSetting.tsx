/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {LayoutProps} from '.';
import http from '../../functions/http';
import {Store} from '../../store/index.type';
import {useIsFocused} from '@react-navigation/native';

export default function IsPushSetting({Set}: LayoutProps) {
  const isFocus = useIsFocused();
  const user = useSelector((x: Store) => x?.user);
  const [isPush, setIsPush] = useState<boolean>(false);

  const url = useMemo<string | null>(() => {
    if (!user?.ID) return null;
    return '/isPush/' + user?.ID;
  }, [user]);

  const getIsPush = (): void => {
    if (!url) return;

    http.get(url).then(({data}) => {
      setIsPush(data?.data || '');
    });
  };

  const changeUUID = (value: 0 | 1): void => {
    if (!url) return;

    const form = {IS_PUSH: value};
    http.put(url, form).then(getIsPush).catch(getIsPush);
  };

  const onPress = (): void => {
    changeUUID(isPush ? 0 : 1);
  };

  useEffect(getIsPush, [url, isFocus]);

  return (
    <Set.Container>
      <Set.Title>알림</Set.Title>

      <ToggleContainer onPress={onPress}>
        <ToggleActive active={isPush ? true : false} />
      </ToggleContainer>
    </Set.Container>
  );
}

const ToggleContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.9,
}))`
  border: 1px solid #ddd;
  width: 64px;
  height: 32px;
  border-radius: 100px;
  background-color: #eee;
  overflow: hidden;
  padding: 2px;
`;
const ToggleActive = styled.View<{active: boolean}>`
  transition: 1s;
  width: 50%;
  height: 100%;
  border-radius: 100px;

  ${x => {
    return x?.active
      ? 'margin-left: 50%; background-color: #02c10b;'
      : 'margin-left: 0%; background-color: #bbbbbb;';
  }}
`;
