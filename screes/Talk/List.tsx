/* eslint-disable react/react-in-jsx-scope */
import {Dispatch, RefObject, SetStateAction} from 'react';
import {ScrollView} from 'react-native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import _Container from '../../layouts/Container';
import Loading, {LoadingContainer} from '../../layouts/Loading';
import {Message} from '../../models';
import {Store} from '../../store/index.type';
import Item from './Item';
import NoneItem from './NoneItem';

type Props = {
  data: Message[];
  isLoad: boolean;
  listRef: RefObject<ScrollView>;
  setIsBottom: Dispatch<SetStateAction<boolean>>;
};

export default function List({data, listRef, isLoad, setIsBottom}: Props) {
  const getTalk = useSelector((x: Store) => x?.getTalk);

  // List 스크롤 Handler
  const scroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    let calc = 1;
    calc += e.nativeEvent.layoutMeasurement.height;
    let y = e.nativeEvent.contentOffset.y;
    let h = e.nativeEvent.contentSize.height;
    setIsBottom(y + calc >= h - 100);
  };

  return (
    <Container
      childRef={listRef}
      onScroll={scroll}
      onRefresh={() => getTalk && getTalk()}>
      {isLoad ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : !data?.length ? (
        <NoneItem />
      ) : (
        data?.map((item, i) => (
          <Item key={item?.ID} data={item} isLast={i === data?.length - 1} />
        ))
      )}
    </Container>
  );
}

const Container = styled(_Container.Scroll)`
  background-color: #fff;
  flex: 1;
  width: 100%;
  padding: 10px;
`;
