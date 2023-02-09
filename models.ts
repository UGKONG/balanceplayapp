export type IsYes = 0 | 1;
export type Gender = 'M' | 'F';
export type Os = 'android' | 'ios';

// 회원 정보
export type User = {
  AUTH_ID: string;
  BIRTH: string;
  CENTER_ID: number;
  CENTER_NAME: string;
  DATE: string;
  EMAIL: string;
  GENDER: Gender;
  HEIGHT: number;
  ID: number;
  IMG: string;
  IS_DELETE: IsYes;
  MAIN_TEACHER_ID: number;
  MAIN_TEACHER_NAME: string;
  MEMO: string;
  MODIFY_DATE: string;
  NAME: string;
  OS: string;
  PHONE: string;
  PLATFORM: string;
  SCHOOL_NAME: string;
  SCHOOL_TYPE: number;
  TEST_FLAG: number;
  UUID: string;
  WEIGHT: number;
};
