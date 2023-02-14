/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable curly */
import {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import useViewDate from '../../hooks/useViewDate';
import {Message} from '../../models';
import {imgURL} from '../../strings';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Alert, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';

type Props = {data: Message; isLast: boolean};

const imgExtList = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'ico', 'svg'];

export default function Item({data, isLast}: Props) {
  const viewDate = useViewDate(data?.DATE);
  const user = useSelector((x: Store) => x?.user);
  const [imgError, setImgError] = useState<boolean>(false);

  const findExt = (name: string): string => {
    let isExt = name?.lastIndexOf('.');
    if (isExt === -1) return '';
    let result = name?.slice(isExt + 1);
    return result?.toLowerCase();
  };

  const isMe = useMemo<boolean>(() => {
    return data?.WRITER_ID === 0;
  }, [data?.WRITER_ID]);

  // 파일 여부 확인
  const isFile = useMemo<boolean>(() => {
    if (!data?.FILE_NAME) return false;
    const ext = findExt(data?.FILE_NAME);
    if (imgExtList?.indexOf(ext) > -1) return false;
    return true;
  }, [data?.FILE_NAME]);

  // 이미지 여부 확인
  const isImage = useMemo<boolean>(() => {
    if (!data?.FILE_NAME) return false;
    const ext = findExt(data?.FILE_NAME);
    if (imgExtList?.indexOf(ext) === -1) return false;
    return true;
  }, [data?.FILE_NAME]);

  // 파일 또는 이미지 풀 경로
  const filePath = useMemo<undefined | string>(() => {
    let url = data?.FILE_URL;
    if (!url) return;
    return imgURL + url;
  }, [data?.FILE_URL]);

  // 다운로드 링크 이동
  const download = (): void => {
    if (!filePath) return;
    Linking.openURL(filePath)
      .then(() => {})
      .catch(() => {});
  };

  // 다운로드 묻기
  const downloadAsk = (type: 'file' | 'img'): void => {
    if (!filePath) return;
    let text = type === 'file' ? '파일' : '이미지';
    let josa = type === 'file' ? '을' : '를';
    let title = `${text} 다운로드`;
    let body = `해당 ${text}${josa} 다운받으시겠습니까?\n외부링크로 연결됩니다.`;

    Alert.alert(
      title,
      body,
      [{text: '예', onPress: () => download()}, {text: '아니요'}],
      {cancelable: true},
    );
  };

  // 상세정보 보기
  const viewInformation = (): void => {
    if (isImage || isFile) return;
    let date = viewDate.full;
    let writer = data?.WRITER_NAME || user?.NAME || '나';
    let content = data?.CONTENTS;
    let title = date;
    let body = `작성자 - ${writer}\n\n${content}`;
    Alert.alert(title, body);
  };

  return (
    <Container isMe={isMe} isLast={isLast}>
      {/* 날짜 */}
      {isMe && (
        <Date isMe={isMe}>
          <DateText isMe={isMe}>
            {data?.WRITER_NAME || user?.NAME || ''}
          </DateText>
          <DateText isMe={isMe}>{viewDate.time}</DateText>
        </Date>
      )}

      <Box isText={!isImage && !isFile} onPress={viewInformation}>
        {/* 내용 */}
        {data?.CONTENTS ? (
          <Content numberOfLines={10000}>{data?.CONTENTS}</Content>
        ) : null}

        {/* 이미지 */}
        {isImage ? (
          imgError ? (
            <ImageErrorText>
              <ImageIcon /> 이미지가 만료되었습니다.
            </ImageErrorText>
          ) : (
            <ImageTouchArea onPress={() => downloadAsk('img')}>
              <Image
                source={{uri: filePath}}
                onError={() => setImgError(true)}
              />
            </ImageTouchArea>
          )
        ) : null}

        {/* 파일 */}
        {isFile && (
          <File>
            <FileName>{data?.FILE_NAME}</FileName>
            <FileDownloadBtn onPress={() => downloadAsk('file')}>
              <FileDownloadBtnText>다운로드</FileDownloadBtnText>
            </FileDownloadBtn>
          </File>
        )}
      </Box>

      {/* 날짜 */}
      {!isMe && (
        <Date isMe={isMe}>
          <DateText isMe={isMe}>{data?.WRITER_NAME || ''}</DateText>
          <DateText isMe={isMe}>{viewDate.time}</DateText>
        </Date>
      )}
    </Container>
  );
}

const Container = styled.View<{isMe: boolean; isLast: boolean}>`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${x => (x?.isMe ? 'flex-end' : 'flex-start')};
  margin-bottom: ${x => (x?.isLast ? '20px' : '10px')};
`;
const Box = styled.TouchableOpacity.attrs<{isText: boolean}>(x => ({
  activeOpacity: x?.isText ? 0.7 : 1,
}))<{isText: boolean}>`
  max-width: 80%;
  padding: 10px;
  border-radius: 5px;
  background-color: #f6fbfb;
  border: 1px solid #ddf0ee;
`;
const Date = styled.View<{isMe: boolean}>`
  ${x => (x?.isMe ? 'margin-right' : 'margin-left')}: 6px;
  margin-bottom: 1px;
`;
const DateText = styled.Text<{isMe: boolean}>`
  font-size: 10px;
  color: #999;
  text-align: ${x => (x?.isMe ? 'right' : 'left')};
`;
const Content = styled.Text`
  font-size: 14px;
`;
const ImageTouchArea = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))``;
const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 200px;
  min-height: 100px;
`;
const ImageIcon = styled(Ionicon).attrs(() => ({
  name: 'image-outline',
}))`
  margin-right: 6px;
  font-size: 16px;
`;
const ImageErrorText = styled.Text`
  color: #999;
`;
const File = styled.View``;
const FileName = styled.Text`
  color: #555;
`;
const FileDownloadBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  border: 1px solid #008aad;
  background-color: #008aad;
  margin-top: 10px;
  padding: 8px 14px;
  border-radius: 4px;
  align-self: flex-start;
`;
const FileDownloadBtnText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
