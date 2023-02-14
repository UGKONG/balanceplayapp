/* eslint-disable react/react-in-jsx-scope */

import styled from 'styled-components/native';

export default function NoneItem() {
  return (
    <Container>
      <Text>대화 내용이 없습니다.</Text>
      <Text>내 아이의 담당 선생님과 대화를 해보세요!</Text>
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
