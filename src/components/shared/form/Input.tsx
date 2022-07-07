interface Props {
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (e: any) => void;
}

const Input = ({ type, value, placeholder, onChange }: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
