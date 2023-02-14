/* eslint-disable curly */
import React, {useMemo} from 'react';
import styled from 'styled-components/native';

type Props = {type?: 'active'};

export default function NoneItem({type}: Props) {
  const text = useMemo<string>(() => {
    if (type === 'active') return '검색된 알림이 없습니다.';
    return '알림이 없습니다.';
  }, [type]);

  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.View`
  height: 100px;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  color: #888888;
  font-size: 14px;
`;
