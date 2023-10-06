import { useEffect, useState } from 'react';

const Debounced = ({ timeout, onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState('');

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

  return (
    <input
      {...rest}
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
      }}
    />
  );
};

export default Debounced;
