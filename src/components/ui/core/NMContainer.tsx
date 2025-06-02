import { ReactNode } from "react";

interface INMContainerProps {
  children: ReactNode;
  className?: string;
}

const NMContainer = ({ children, className = "" }: INMContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default NMContainer;
