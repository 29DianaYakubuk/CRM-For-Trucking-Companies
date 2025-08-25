import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function Button({ className = '', ...props }: Props) {
  return <button className={`btn ${className}`} {...props} />;
}
