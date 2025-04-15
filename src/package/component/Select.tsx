import ArrowIcon from '../assets/icon/icon_arrow.svg?react';
import ClearIcon from '../assets/icon/icon_clear.svg?react';
import SearchIcon from '../assets/icon/icon_search.svg?react';
import useOutsideClick from './hooks/useOutsideClick';
import {
  selectContainer,
  selectInput,
  selectInputContainer,
  selectOption,
  selectOptionContainer,
  selectPlaceholder,
  selectPlaceholderContainer,
} from './style/Select.css';
import { CustomClassName, OptionType } from './type/commonType';
import { filterOptions } from './utils/searchUtils';
import { useRef, useState, MouseEvent, useMemo, RefObject } from 'react';

type CommonSelectProps<T extends string | number> = {
  optionList: OptionType<T>[];
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  maxHeight?: string;
  customClassName?: CustomClassName;
};

type SingleSelectProps<T extends string | number> = CommonSelectProps<T> & {
  isMulti?: false;
  value: T | null;
  onChange: (value: T | null) => void;
};

type MultiSelectProps<T extends string | number> = CommonSelectProps<T> & {
  isMulti: true;
  value: T[];
  onChange: (value: T[]) => void;
};

type SelectProps<T extends string | number> = SingleSelectProps<T> | MultiSelectProps<T>;

const Select = <T extends string | number>(props: SelectProps<T>) => {
  const {
    isSearchable = false,
    isClearable = true,
    isMulti = false,
    disabled = false,
    invalid = false,
    value,
    optionList = [],
    placeholder,
    onChange,
    maxHeight = '200px',
    customClassName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('');

  const selectContainerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLInputElement>(null);

  const selectedValues: T[] = useMemo(() => {
    if (isMulti) return (value as T[]) ?? [];
    return value !== null && value !== undefined ? [value as T] : [];
  }, [value, isMulti]);

  const selectedList = useMemo(() => {
    return optionList.filter((opt) => selectedValues.includes(opt.value));
  }, [selectedValues, optionList]);

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

  const handleInputFocus = () => setIsOpen(true);

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    setSource('');
  };

  const handleInputChange = (value: string) => {
    setSource(value);
  };

  const handleOptionClick = (option: OptionType<T>) => {
    if (isMulti) {
      const prev = value as T[];
      const isSelected = prev.includes(option.value);
      const next = isSelected ? prev.filter((v) => v !== option.value) : [...prev, option.value];
      (onChange as (value: T[]) => void)(next);
    } else {
      (onChange as (value: T | null) => void)(option.value);
      setIsOpen(false);
    }
    setSource('');
  };

  const handleRemove = (option: OptionType<T>, event: MouseEvent) => {
    event.stopPropagation();
    if (!isMulti) return;

    const prev = value as T[];
    const next = prev.filter((v) => v !== option.value);
    (onChange as (value: T[]) => void)(next);
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    if (isMulti) {
      (onChange as (value: T[]) => void)([]);
    } else {
      (onChange as (value: T | null) => void)(null);
    }
    setSource('');
    setIsOpen(false);
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
              className={`${selectPlaceholder({ isLabel: selectedList.length > 0 })} ${customClassName?.placeholder || ''}`}
            >
              {!source &&
                (selectedList.length === 0 ? placeholder || 'Select...' : isMulti ? '' : selectedList[0]?.label)}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
            {isMulti &&
              selectedList.map((option) => (
                <div
                  key={option.value}
                  className={customClassName?.selectedTag || ''}
                  style={{
                    padding: '2px 8px',
                    background: '#EEF0F4',
                    borderRadius: '4px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {option.label}
                  <span style={{ cursor: 'pointer' }} onClick={(e) => handleRemove(option, e)}>
                    ×
                  </span>
                </div>
              ))}

            <input
              className={`${selectInput} ${customClassName?.input || ''}`}
              ref={selectRef}
              value={source}
              onFocus={handleInputFocus}
              onChange={(event) => handleInputChange(event.target.value)}
              onClick={handleInputClick}
              disabled={disabled}
              readOnly={!isSearchable}
              style={{ flex: 1, minWidth: '40px' }}
            />
          </div>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          className={customClassName?.iconWrapper || ''}
        >
          {isClearable && selectedList.length > 0 && !disabled && (
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
          {filteredOptionList.length === 0 ? (
            <div className={`${selectOption} ${customClassName?.option || ''}`}>No Data</div>
          ) : (
            (filteredOptionList as OptionType<T>[]).map((option) => {
              const isSelected = selectedValues.some((v) => v === option.value);
              return (
                <div
                  key={option.value}
                  className={`${selectOption} ${customClassName?.option || ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {isMulti && <input type="checkbox" readOnly checked={isSelected} style={{ marginRight: '8px' }} />}
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
