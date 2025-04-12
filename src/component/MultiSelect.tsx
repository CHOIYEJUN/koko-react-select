import { CustomClassName, OptionType } from './type/commonType.ts';

interface MultiSelectProps {
  optionList: OptionType[];
  value: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  maxHeight?: string;
  customClassName?: CustomClassName;
}

const MultiSelect = (props: MultiSelectProps) => {
  // const [selectedList, setSelectedList] = useState<OptionType[]>([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [source, setSource] = useState('');
};

export default MultiSelect;
