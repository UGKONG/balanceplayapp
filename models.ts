export type IsYes = 0 | 1;
export type Gender = 'M' | 'F';
export type Os = 'android' | 'ios' | 'windows' | 'macos' | 'web';
export type SnsPlatform = 'kakao' | 'naver';

// 이용권
export type Voucher = {
  ID: number;
  REMAIN_COUNT: number;
  REMAIN_DATE: string;
  START_DATE: string;
  STATUS: number;
  USER_ID: number;
  USE_TYPE: number;
  VOUCHER_NAME: string;
};

// 회원
export type Member = {
  AUTH_ID: string;
  BIRTH: string;
  CENTER_ID: number;
  CENTER_NAME: string;
  DATE: string;
  EMAIL: string;
  GENDER: Gender;
  HEIGHT: 180;
  ID: number;
  IMG: string;
  IS_DELETE: IsYes;
  MAIN_TEACHER_ID: number;
  MAIN_TEACHER_NAME: string;
  MEMO: string;
  MODIFY_DATE: string;
  NAME: string;
  OS: Os;
  PHONE: string;
  PLATFORM: SnsPlatform;
  SCHOOL_NAME: string;
  SCHOOL_TYPE: number;
  TEST_FLAG: IsYes;
  UUID: string;
  VOUCHER?: Voucher[];
  WEIGHT: number;
};

// 푸쉬
export type Push = {
  ID: number;
  TITLE: string;
  BODY: string;
  UUID: string;
  DATE: string;
};

// 메시지
export type Message = {
  CONTENTS: string;
  DATE: string;
  FILE_NAME: string;
  FILE_URL: string;
  ID: number;
  WRITER_ID: number;
  WRITER_NAME: string;
};

// SNS 로그인 리스트
export type SnsLogin = {
  id: number;
  name: SnsPlatform;
  img: string;
  color: string;
  onPress: () => void;
};

// SNS 로그인 데이터
export type SnsLoginData = {
  platform: SnsPlatform;
  id: string;
  os: Os;
  uuid: string;
};
