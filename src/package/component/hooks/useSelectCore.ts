import { OptionType } from '../type/commonType.ts';
import { filterOptions } from '../utils/searchUtils.ts';
import useOutsideClick from './useOutsideClick.ts';
import { RefObject, useMemo, useState } from 'react';

interface UseSelectCoreParams {
  optionList: OptionType[];
  containerRef: RefObject<HTMLElement>;
  onClose: () => void;
}

export const useSelectCore = ({ optionList, containerRef, onClose }: UseSelectCoreParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('');

  const filteredOptionList = useMemo(() => {
    return filterOptions(optionList, source);
  }, [optionList, source]);

  useOutsideClick({
    ref: containerRef,
    callback: () => {
      setIsOpen(false);
      setSource('');
      onClose?.();
    },
  });

  return {
    isOpen,
    setIsOpen,
    source,
    setSource,
    filteredOptionList,
  };
};
