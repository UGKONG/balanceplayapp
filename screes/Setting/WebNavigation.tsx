/* eslint-disable react/react-in-jsx-scope */
import {Linking} from 'react-native';
import {LayoutProps} from '.';
import Button from '../../layouts/Button';
import {domainURL} from '../../strings';

export default function WebNavigation({Set}: LayoutProps) {
  const onPress = (): void => {
    Linking.openURL(domainURL)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Set.Container>
      <Set.Title>밸런스플레이 홈</Set.Title>
      <Button onPress={onPress}>바로가기</Button>
    </Set.Container>
  );
}
