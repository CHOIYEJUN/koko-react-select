export interface OptionType<T extends string | number = string> {
  label: string;
  value: T;
}

export type CustomClassName = {
  container?: string;
  inputContainer?: string;
  placeholderContainer?: string;
  placeholder?: string;
  input?: string;
  iconWrapper?: string;
  optionContainer?: string;
  option?: string;
  selectedTag?: string;
};
