/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable curly */

import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeModules, Platform, ScrollView} from 'react-native';
import http from '../../functions/http';
import {Message} from '../../models';
import {Store} from '../../store/index.type';
import Form from './Form';
import List from './List';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';

const {StatusBarManager} = NativeModules;

export default function Talk() {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const listRef = useRef<ScrollView>(null);
  const user = useSelector((x: Store) => x?.user);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<Message[]>([]);
  const [isBottom, setIsBottom] = useState<boolean>(true);
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);

  const USER_ID = useMemo<number>(() => {
    return user?.ID ?? 0;
  }, [user]);

  const getList = (callback?: () => void): void => {
    if (!USER_ID) return;

    http.get('/talk/' + USER_ID).then(({data}) => {
      setIsLoad(false);
      setList(data?.result ? data?.data : []);
      if (callback) callback();
    });
  };

  const getHeight = (): void => {
    StatusBarManager.getHeight((statusBarFrameData: any) => {
      setStatusBarHeight(statusBarFrameData.height);
    });
  };

  const toBottom = (): void => {
    if (!listRef?.current) return;
    listRef.current.scrollToEnd({animated: true});
  };

  useEffect(() => {
    setTimeout(toBottom, 200);
  }, [list]);
  useEffect(getList, [USER_ID, isFocus]);
  useEffect(() => {
    dispatch({type: 'getTalk', payload: getList});
  }, [dispatch, getList]);
  useEffect(() => {
    if (Platform.OS === 'ios') getHeight();
  }, []);
  useEffect(() => {
    let interval = setInterval(getList, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container keyboardVerticalOffset={statusBarHeight + 48}>
      {user ? (
        <>
          <List
            data={list}
            isLoad={isLoad}
            listRef={listRef}
            setIsBottom={setIsBottom}
          />
          <Form
            id={USER_ID}
            isLoad={isLoad}
            isBottom={isBottom}
            toBottom={toBottom}
          />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
}))`
  flex: 1;
`;
