/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import http from '../../functions/http';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import Loading from '../../layouts/Loading';

type Props = {
  id: number;
  isBottom: boolean;
  toBottom: () => void;
  isLoad: boolean;
};

export default function Form({id, toBottom, isBottom}: Props) {
  const getTalk = useSelector((x: Store) => x?.getTalk);
  const [value, setValue] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);

  const success = (): void => {
    setValue('');
    if (getTalk) getTalk();
  };

  const fail = (): void => {
    Alert.alert('대화', '서비스 상태가 원활하지 않습니다.', undefined, {
      cancelable: true,
    });
  };

  const submit = (): void => {
    if (isPending) return;

    let val = value?.replace(/ /gi, '');
    if (!val || !id) return;

    setIsPending(true);
    let form = {value, writerId: 0};
    http.post('/talk/' + id, form).then(({data}) => {
      setIsPending(false);
      if (!data?.result) return fail();
      success();
    });
  };

  return (
    <Container>
      <Input
        value={value}
        onChangeText={setValue}
        focusable={true}
        placeholder="내용을 입력해주세요."
        onFocus={() => setTimeout(toBottom, 150)}
      />

      {!isBottom && (
        <Button onPress={toBottom}>
          <ButtonText>
            <BottomIcon />
          </ButtonText>
        </Button>
      )}

      <Button size={66} onPress={submit}>
        {isPending ? (
          <Loading size="small" color="#fff" />
        ) : (
          <ButtonText>전 송</ButtonText>
        )}
      </Button>
    </Container>
  );
}

const Container = styled.View`
  height: 40px;
  width: 100%;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #eee;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: flex-start;
`;
const Input = styled.TextInput`
  flex: 1;
  background-color: #f7f7f7;
  padding: 0 10px;
  font-size: 15px;
  height: 100%;
`;
const Button = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<{size?: number}>`
  border-left-width: 1px;
  border-left-color: #81c3c2;
  background-color: #009a97;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  height: 100%;
  ${x => (x?.size ? `width: ${x?.size}px` : '')}
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: #fff;
`;
const BottomIcon = styled(Icon).attrs(() => ({
  name: 'vertical-align-bottom',
}))`
  font-size: 20px;
  color: #fff;
`;
