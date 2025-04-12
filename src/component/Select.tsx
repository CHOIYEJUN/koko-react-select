import ArrowIcon from '../assets/icon/icon_arrow.svg?react';
import ClearIcon from '../assets/icon/icon_clear.svg?react';
import SearchIcon from '../assets/icon/icon_search.svg?react';
import useOutsideClick from './hooks/useOutsideClick.ts';
import {
  selectContainer,
  selectInput,
  selectInputContainer,
  selectOption,
  selectOptionContainer,
  selectPlaceholder,
  selectPlaceholderContainer,
} from './style/Select.css.ts';
import { CustomClassName, OptionType } from './type/commonType.ts';
import { isEmpty } from './utils/commonUtils.ts';
import { filterOptions } from './utils/searchUtils.ts';
import { useRef, useState, MouseEvent, useMemo, RefObject } from 'react';

interface SelectProps {
  isSearchable?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  value: string | number;
  optionList: OptionType[];
  placeholder?: string;
  onChange?: (value: string | number | null) => void;
  maxHeight?: string;
  customClassName?: CustomClassName;
}

const Select = (props: SelectProps) => {
  const {
    isSearchable = false,
    isClearable = true,
    disabled = false,
    invalid = false,
    value,
    optionList = [],
    placeholder,
    onChange,
    maxHeight = '200px',
    customClassName,
  } = props;

  const [selectedOption, setSelectedOption] = useState<OptionType | null>();
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('');

  const selectContainerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLInputElement>(null);

  const filteredOptionList = useMemo(() => {
    return filterOptions(optionList, source);
  }, [optionList, source]);

  const onReset = () => {
    setIsOpen(false);
    setSource('');
  };

  useOutsideClick({
    ref: selectContainerRef as RefObject<HTMLElement>,
    callback: onReset,
  });

  const handleInputFocus = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    setSource('');
  };

  const handleInputChange = (value: string) => {
    setSource(value);
  };

  const handleOptionClick = (option: OptionType) => {
    onChange?.(option.value);
    setSelectedOption(option);
    setIsOpen(false);
    setSource('');
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();

    onChange?.(null);
    setIsOpen(false);
    setSource('');
    setSelectedOption(null);
  };

  const handleToggleDropdown = () => {
    if (disabled) return;

    if (isOpen) {
      setIsOpen(false);
    } else {
      selectRef.current?.focus();
    }
  };

  return (
    <div style={{ position: 'relative' }} ref={selectContainerRef}>
      <div
        className={`${selectContainer({ isOpen, disabled, invalid })} ${customClassName?.container || ''}`}
        onClick={handleToggleDropdown}
        style={{ width: '300px' }}
      >
        <div className={`${selectInputContainer} ${customClassName?.inputContainer || ''}`}>
          <div className={`${selectPlaceholderContainer} ${customClassName?.placeholderContainer || ''}`}>
            <div
              className={`${selectPlaceholder({ isLabel: !isEmpty(selectedOption?.label) })} ${customClassName?.placeholder || ''}`}
            >
              {!source && (selectedOption?.label || placeholder || 'Select...')}
            </div>
          </div>

          <input
            className={`${selectInput} ${customClassName?.input || ''}`}
            ref={selectRef}
            value={source}
            onFocus={handleInputFocus}
            onChange={(event) => handleInputChange(event.target.value)}
            onClick={handleInputClick}
            disabled={disabled}
            readOnly={!isSearchable}
          />
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          className={customClassName?.iconWrapper || ''}
        >
          {isClearable && value && !disabled && (
            <ClearIcon width={20} height={20} stroke={'#5C7099'} style={{ cursor: 'pointer' }} onClick={handleClear} />
          )}
          {isSearchable ? (
            <SearchIcon width={20} height={20} style={{ cursor: 'pointer', stroke: '#5C7099' }} />
          ) : (
            <ArrowIcon width={20} height={20} style={{ cursor: 'pointer', stroke: '#5C7099', fill: '#5C7099' }} />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`${selectOptionContainer} ${customClassName?.optionContainer || ''}`}
          style={{
            minWidth: selectContainerRef.current?.offsetWidth,
            maxHeight: maxHeight,
          }}
        >
          {optionList.length === 0 ? (
            <div className={`${selectOption} ${customClassName?.option || ''}`}>No Data</div>
          ) : (
            filteredOptionList.map((option) => (
              <div
                key={option.value}
                className={`${selectOption} ${customClassName?.option || ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
