import type { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  erro?: string;
}

export function Input({ type, placeholder, value, onChange, erro }: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {erro && <span>{erro}</span>}
    </div>
  );
}