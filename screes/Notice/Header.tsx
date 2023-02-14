/* eslint-disable react/react-in-jsx-scope */
import {Dispatch, SetStateAction} from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Header({setValue}: Props) {
  return (
    <Container>
      <Input onChangeText={setValue} placeholder="검색" />
      <Icon />
    </Container>
  );
}

const Container = styled.View`
  padding: 10px;
  position: relative;
`;
const Input = styled.TextInput`
  background-color: #eee;
  padding: 8px 8px 8px 40px;
  border-radius: 4px;
`;
const Icon = styled(Ionicons).attrs(() => ({
  name: 'search-outline',
}))`
  position: absolute;
  left: 20px;
  font-size: 20px;
  color: #aaa;
  top: 16px;
`;
