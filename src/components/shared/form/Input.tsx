interface Props {
  type?: string;
  name: string;
  register: any;
  errors?: string;
  isRequired: boolean;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const Input = ({
  type,
  name,
  register,
  errors,
  isRequired,
  placeholder,
  errorMessage,
  className,
}: Props) => {
  return (
    <>
      <input
        {...register(`${name}`, {
          required: { value: isRequired, message: errorMessage },
        })}
        placeholder={placeholder}
        type={type}
        className={className}
      />

      <span className="error">{errors && errors}</span>
    </>
  );
};

export default Input;
