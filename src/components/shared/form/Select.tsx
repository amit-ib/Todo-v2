interface Props {
  selectedOption: number | null | undefined;
  optvalues: { id: number; title?: string; name?: string }[];
  register: any;
  name: string;
  className?: string;
}

const Select = ({
  optvalues,
  register,
  name,
  selectedOption,
  className,
}: Props) => {
  return (
    <select {...register(`${name}`)} className={className}>
      {optvalues.map((option, id) => (
        <option
          key={option.id}
          defaultValue={option.id === selectedOption ? option.id : 0}
          value={option.id}
        >
          {option.title ? option.title : option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
