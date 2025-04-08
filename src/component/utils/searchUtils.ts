// matchUtils.ts
import { CHOSUNG_LIST } from '../data/constants.ts';
import { OptionType } from '../type/commonType.ts';

export const filterOptions = (options: OptionType[], keyword: string): OptionType[] => {
  if (!keyword) return options;

  const chunks = splitByLang(keyword);

  return options.filter(({ label }) => chunks.every((chunk) => isMatch(chunk, label)));
};

export const getChosung = (text: string): string => {
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const code = char.charCodeAt(0) - 0xac00;

    if (code >= 0 && code <= 11171) {
      const chosungIndex = Math.floor(code / 588);
      result.push(CHOSUNG_LIST[chosungIndex]);
    } else {
      result.push(char); // 한글이 아니면 그냥 그대로
    }
  }

  return result.join('');
};

export const splitByLang = (input: string): string[] => {
  const result: string[] = [];
  let current = '';
  let isKorean: boolean | null = null;

  for (const char of input) {
    const nowIsKorean = /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char);

    if (isKorean === null) {
      current += char;
      isKorean = nowIsKorean;
    } else if (nowIsKorean === isKorean) {
      current += char;
    } else {
      result.push(current);
      current = char;
      isKorean = nowIsKorean;
    }
  }

  if (current) result.push(current);
  return result;
};

export const isMatch = (source: string, target: string): boolean => {
  const lowerSource = source.toLowerCase();
  const lowerTarget = target.toLowerCase();

  if (/[a-zA-Z]/.test(lowerSource)) {
    return lowerTarget.includes(lowerSource);
  }

  const sourceChosung = getChosung(lowerSource);
  const targetChosung = getChosung(lowerTarget);

  return lowerTarget.includes(lowerSource) || targetChosung.includes(sourceChosung);
};
