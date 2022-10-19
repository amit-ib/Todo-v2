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
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  return (
    <>
      <input
        {...register(`${name}`, {
          required: { value: isRequired, message: errorMessage },
        })}
        placeholder={placeholder}
        type={type}
        className={className}
        {...(type === "date" && { min: disablePastDate() })}
      />

      <span className="error">{errors && errors}</span>
    </>
  );
};

export default Input;
