import { CHOSUNG_LIST } from '../data/constants';
import { OptionType } from '../type/commonType';

export const filterOptions = <T extends string | number>(
  options: OptionType<T>[],
  keyword: string,
): OptionType<T>[] => {
  return options.filter((opt) => opt.label.toLowerCase().includes(keyword.toLowerCase()));
};

// 초성 세팅하는 부분
export const getChosung = (text: string): string => {
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    // 유니코드 시작점 0xac00 (가)
    // 한굴범위 0xac00 ~ 0xd7a3 (가 ~ 힣)
    const char = text.charAt(i);
    const code = char.charCodeAt(0) - 0xac00;

    // 초성 x 중성 x 종성 = 조합가능 인덱스 (19 × 21 × 28 = 11,172 개) 해당 code 가 한글 범위인지 확인
    // (중성 x 종성) 값으로 나누면 초성 인덱스가 나옴 (21 x 28 = 588)
    if (code >= 0 && code <= 11171) {
      const chosungIndex = Math.floor(code / 588);
      result.push(CHOSUNG_LIST[chosungIndex]);
    } else {
      result.push(char); // 한글이 아니면 그냥 그대로
    }
  }

  return result.join('');
};

/*
한글과 한글이 아닌 문자를 나누는 함수
('ab우주ㄱed' -> ['ab', '우주', 'ㄱ', 'ed'])
 */
export const splitByLang = (input: string): string[] => {
  const result: string[] = [];
  let current = '';
  let isKorean: boolean | null = null;

  for (const char of input) {
    const IsCharKorean = /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char);

    // 첫번째 글자 넣어줌
    if (isKorean === null) {
      current += char;
      isKorean = IsCharKorean;
      continue;
    }

    // 한글일경우 current 추가
    if (isKorean === IsCharKorean) {
      current += char;
    } else {
      // 한글이 아닐경우 한번 split 하고 isKorean 상태 변경
      result.push(current);
      current = char;
      isKorean = IsCharKorean;
    }
  }

  if (current) {
    result.push(current);
  }
  return result;
};

export const isOnlyChosung = (text: string): boolean => {
  return /^[ㄱ-ㅎ]+$/.test(text);
};

export const isMatch = (keywordItem: string, label: string): boolean => {
  const lowerSource = keywordItem.toLowerCase();
  const lowerTarget = label.toLowerCase();

  // 알파벳 입력인 경우
  if (/[a-zA-Z]/.test(lowerSource)) {
    return lowerTarget.includes(lowerSource);
  }

  // 초성으로만 이루어진 경우
  if (isOnlyChosung(lowerSource)) {
    const targetChosung = getChosung(lowerTarget);
    return targetChosung.includes(lowerSource);
  }

  // 일반적인 한글 및 숫자 특수문자는 포함 여부로 체크
  return lowerTarget.includes(lowerSource);
};
