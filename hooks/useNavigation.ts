import {useMemo} from 'react';
import Notice from '../screes/Notice';
import Setting from '../screes/Setting';
import Talk from '../screes/Talk';

type Memo = {
  id: number;
  name: string;
  title: string;
  component: (props: any) => JSX.Element;
};

export default function useNavigation() {
  const memo = useMemo<Memo[]>(
    () => [
      {id: 1, name: 'Home', title: '대 화', component: Talk},
      {id: 2, name: 'Notice', title: '알 림', component: Notice},
      {id: 3, name: 'Setting', title: '설 정', component: Setting},
    ],
    [],
  );

  return memo;
}
