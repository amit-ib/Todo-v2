interface Props {
  type?: string;
  value: string | number;
  placeholder: string;
  onChange: (e: any) => void;
  className?: string;
}

const Input = ({ type, value, placeholder, onChange, className }: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
