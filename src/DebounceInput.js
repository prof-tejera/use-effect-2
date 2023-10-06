import { useEffect, useState } from 'react';

const DebounceInput = ({ timeout = 500, value, onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({
        target: {
          value: inputValue,
        },
      });
    }, timeout);

    return () => {
      clearTimeout(t);
    };
  }, [inputValue, onChange, timeout]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      {...rest}
      type="text"
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
      }}
    />
  );
};

export default DebounceInput;
