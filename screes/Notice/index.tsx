/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */

import Container from '../../layouts/Container';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import http from '../../functions/http';
import {useEffect, useMemo, useState} from 'react';
import {Push} from '../../models';
import Header from './Header';
import Item from './Item';
import NoneItem from './NoneItem';
import {useIsFocused} from '@react-navigation/native';

export default function Notice() {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const uuid = useSelector((x: Store) => x?.uuid);
  const [list, setList] = useState<Push[]>([]);
  const [value, setValue] = useState<string>('');

  const getList = (): void => {
    if (!uuid) return setList([]);
    http.get('/push/' + uuid).then(({data}) => {
      if (!data?.result) setList([]);
      setList(data?.data);
    });
  };

  // 검색된 리스트
  const activeList = useMemo<Push[]>(() => {
    let filter = list?.filter(x => {
      let val = value?.replace(/ /g, '');
      let fil1 = (x?.TITLE ?? '')?.replace(/ /g, '')?.indexOf(val) > -1;
      let fil2 = (x?.BODY ?? '')?.replace(/ /g, '')?.indexOf(val) > -1;
      return fil1 || fil2;
    });
    return filter;
  }, [list, value]);

  useEffect(getList, [uuid, isFocus]);
  useEffect(() => {
    dispatch({type: 'getNotice', payload: getList});
  }, [dispatch, getList]);
  useEffect(() => {
    let interval = setInterval(getList, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container.Scroll onRefresh={getList}>
      <Header setValue={setValue} />
      {value && !activeList?.length ? (
        <NoneItem type="active" />
      ) : !activeList?.length ? (
        <NoneItem />
      ) : (
        activeList?.map(item => (
          <Item key={item?.ID} data={item} getList={getList} />
        ))
      )}
    </Container.Scroll>
  );
}
