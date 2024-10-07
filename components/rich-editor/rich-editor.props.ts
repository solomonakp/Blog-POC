export type EditorProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  label: string;
  description?: string;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  value?: string;
};
