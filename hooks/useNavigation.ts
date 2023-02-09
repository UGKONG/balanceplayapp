import {useMemo} from 'react';
import Notice from '../screes/Home';
import Home from '../screes/Home';
import Setting from '../screes/Setting';

type Memo = {
  id: number;
  name: string;
  title: string;
  component: () => JSX.Element;
};

export default function useNavigation() {
  const memo = useMemo<Memo[]>(
    () => [
      {id: 1, name: 'Home', title: '회원', component: Home},
      {id: 2, name: 'Notice', title: '알림', component: Notice},
      {id: 3, name: 'Setting', title: '설정', component: Setting},
    ],
    [],
  );

  return memo;
}
