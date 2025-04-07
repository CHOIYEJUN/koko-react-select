import { useRef, useState } from 'react';
import ClearIcon from '../assets/icon/icon_clear.svg?react';
import SearchIcon from '../assets/icon/icon_search.svg?react';
import ArrowIcon from '../assets/icon/icon_arrow.svg?react';
import useOutsideClick from './useOutsideClick';

import {
    selectContainer,
    selectInput,
    selectInputContainer, selectOption, selectOptionContainer,
    selectPlaceholder,
    selectPlaceholderContainer
} from "./Select.css";

type OptionType = {
    label: string;
    value: string | number;
};

interface SelectProps {
    isSearchable: boolean;
    isClearable: boolean;
    disabled: boolean;
    value: string | number;
    optionList: OptionType[];
    placeholder: string;
    onChange?: (value: string | number | null) => void;
    maxHeight?: string;
}

const Select = (props: SelectProps) => {
    const {
        isSearchable,
        isClearable,
        disabled,
        value,
        optionList = [],
        placeholder,
        onChange,
        maxHeight = '200px',
    } = props;

    const [selectedOption, setSelectedOption] = useState<OptionType>();
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState('');

    const selectContainerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);

    useOutsideClick({
        ref: selectContainerRef,
        callback: () => setIsOpen(false),
    });

    const handleInputFocus = () => {
        setIsOpen(true);
        setSource('');
    };

    const handleInputClick = () => {
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

    const handleClear = () => {
        onChange?.(null);
        setIsOpen(false);
        setSource('');
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
        <div style={{ position: 'relative', width: '300px' }} ref={selectContainerRef}>
            <div
                className={selectContainer({
                    isOpen,
                    disabled,
                })}
                onClick={handleToggleDropdown}
            >
                <div className={selectInputContainer}>
                    <div className={selectPlaceholderContainer}>
                        <div className={selectPlaceholder}>
                            {!source && (selectedOption?.label || placeholder || 'Select...')}
                        </div>
                    </div>
                    <input
                        className={selectInput}
                        ref={selectRef}
                        value={source}
                        onFocus={handleInputFocus}
                        onChange={(event) => handleInputChange(event.target.value)}
                        onClick={handleInputClick}
                        disabled={disabled}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isClearable && value && !disabled && (
                        <ClearIcon
                            width={20}
                            height={20}
                            stroke={'#5C7099'}
                            style={{ cursor: 'pointer' }}
                            onClick={handleClear}
                        />
                    )}
                    {isSearchable && (
                        <SearchIcon
                            width={20}
                            height={20}
                            style={{ cursor: 'pointer', stroke: '#5C7099' }}
                        />
                    )}
                    <ArrowIcon
                        width={20}
                        height={20}
                        style={{ cursor: 'pointer', stroke: '#5C7099', fill: '#5C7099' }}
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    className={selectOptionContainer}
                    style={{
                        minWidth: selectContainerRef.current?.offsetWidth,
                        maxHeight: maxHeight,
                    }}
                >
                    {optionList.length === 0 ? (
                        <div className={selectOption}>No Data</div>
                    ) : (
                        optionList.map((option) => (
                            <div
                                key={option.value}
                                className={selectOption}
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
