/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
import React from 'react';
import styled from 'styled-components/native';
import {Push} from '../../models';
import {Alert} from 'react-native';
import http from '../../functions/http';

type Props = {
  data: Push;
  getList: () => void;
};

export default function Item({data, getList}: Props) {
  const removeItem = (): void => {
    http.delete('/push/' + data?.ID).then(({data}) => {
      if (!data?.result) return;
      getList();
    });
  };

  const onPress = (): void => {
    Alert.alert(data?.TITLE, `${data?.DATE}\n\n${data?.BODY}`, undefined, {
      cancelable: true,
    });
  };

  const onLongPress = (): void => {
    const text = data?.TITLE + '\n\n해당 알림을 삭제 하시겠습니까?';
    Alert.alert(
      '알림',
      text,
      [
        {text: '예', style: 'destructive', onPress: () => removeItem()},
        {text: '아니요'},
      ],
      {cancelable: true},
    );
  };

  return (
    <Container onPress={onPress} onLongPress={onLongPress}>
      <Wrap>
        {/* <Dot /> */}
        <Title>{data?.TITLE}</Title>
        <Body>{data?.BODY}</Body>
        <Date>{data?.DATE}</Date>
      </Wrap>
    </Container>
  );
}

const Container = styled.TouchableHighlight.attrs(() => ({
  underlayColor: '#EEE',
}))`
  padding: 10px 15px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  min-height: 90px;
`;
const Wrap = styled.View`
  flex: 1;
`;
const Dot = styled.View`
  position: absolute;
  background-color: #ee3925;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  right: 0;
  top: 6px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #444444;
`;
const Body = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: #777777;
  font-size: 14px;
  margin-bottom: 4px;
`;
const Date = styled.Text`
  font-size: 12px;
  color: #777777;
`;
