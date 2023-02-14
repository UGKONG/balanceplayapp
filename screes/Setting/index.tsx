/* eslint-disable react/react-in-jsx-scope */

import Container from '../../layouts/Container';
import styled from 'styled-components/native';
import IsPushSetting from './IsPushSetting';
import {StyledComponent, DefaultTheme} from 'styled-components';
import {Text, View} from 'react-native';
import WebNavigation from './WebNavigation';
import Logout from './Logout';

export default function Setting() {
  return (
    <Container.Scroll>
      <IsPushSetting Set={Set} />
      <WebNavigation Set={Set} />
      <Logout Set={Set} />
    </Container.Scroll>
  );
}

export type LayoutProps = {
  Set: {
    Container: StyledComponent<typeof View, DefaultTheme, {}, never>;
    Title: StyledComponent<typeof Text, DefaultTheme, {}, never>;
  };
};

const Set = {
  Container: styled.View`
    flex-direction: row;
    padding: 10px 15px;
    border-bottom-color: #eee;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    min-height: 56px;
    align-items: center;
    justify-content: space-between;
  `,
  Title: styled.Text`
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1px;
  `,
};
