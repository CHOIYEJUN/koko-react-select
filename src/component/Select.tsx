import styles from './Select.module.css';

import ClearIcon from '../assets/icon/icon_clear.svg?react';
import SearchIcon from '../assets/icon/icon_search.svg?react';
import ArrowIcon from '../assets/icon/icon_arrow.svg?react';
import {useEffect, useRef, useState} from "react";
import useOutsideClick from "./useOutsideClick.ts";

type OptionType = {
    label : string, value : string | number
}

interface selectProps {
    isSearchable : boolean;
    isClearable : boolean;
    disabled : boolean;
    value : string | number;
    optionList : OptionType[];
    placeholder : string;
    onChange?: (value: string | number | null) => void;
    maxHeight? : string;
}

const Select = (props : selectProps) => {

    const {isSearchable, isClearable, disabled, value, optionList =[], placeholder,  onChange,maxHeight = '200px'} = props

    const [selectedOption, setSelectedOption] = useState<OptionType>()

    const [isOpen, setIsOpen] = useState(false);

    const selectContainerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const [source, setSource] = useState<string>('');


    useOutsideClick({
        ref: selectContainerRef,
        callback: () => setIsOpen(false),
    });

    const handleInputFocus = () => {
        setIsOpen(true); // ✅ 무조건 열기
        setSource('');
    };

    const handleInputClick = () => {
        setSource(''); // 검색어 초기화
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

    useEffect(() => {
        console.log('isOpen 상태 변경됨:', isOpen);
    }, [isOpen]);

    return (
        <div style={{position: 'relative', width: '300px'}} ref={selectContainerRef}>
            <div
                className={`${styles.selectContainer} ${isOpen ? styles.active : ''}`}
                onClick={handleToggleDropdown}
            >
                {/* Input 영역 */}
                <div className={styles.selectInputContainer}>
                    <div className={styles.selectPlaceholderContainer}>
                        <div className={styles.selectPlaceholder}>
                            {!source && (selectedOption?.label || placeholder || 'Select...')}
                        </div>
                    </div>
                    <input
                        className={styles.selectInput}
                        ref={selectRef}
                        value={source}
                        onFocus={handleInputFocus}
                        onChange={(event) => handleInputChange(event.target.value)}
                        onClick={handleInputClick}
                    />
                </div>

                {/* 아이콘 영역 */}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    {isClearable && value && !disabled && (
                        <ClearIcon
                            width={20}
                            height={20}
                            stroke={'#5C7099'}
                            style={{cursor: 'pointer'}}
                            onClick={handleClear}
                        />
                    )}
                    {isSearchable && (
                        <SearchIcon width={20} height={20} style={{cursor: 'pointer', stroke: '#5C7099'}}/>
                    )}
                    <ArrowIcon width={20} height={20} style={{cursor: 'pointer', stroke: '#5C7099', fill: '#5C7099'}}/>
                </div>
            </div>

            {/* 옵션 리스트 */}
            {isOpen && (
                <div className={styles.selectOptionContainer}  style={{ minWidth: selectContainerRef.current?.offsetWidth , maxHeight : maxHeight }}>
                    {optionList?.length === 0 ? (
                        <div className={styles.selectOption}>No Data</div>
                    ) : (
                        optionList?.map((option) => (
                            <div key={option.value} className={styles.selectOption} onClick={() => handleOptionClick(option)}>
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )

}

export default Select