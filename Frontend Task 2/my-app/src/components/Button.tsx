import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?: string;
  onClick?: () => void;
}

function Button({ children, color="primary", onClick=() => console.log("clicked") }: ButtonProps) {
  if (color === "primary") {
    return <button className="btn btn-primary" onClick={onClick}>{children}</button>;
  }
  if (color === "secondary") {
    return <button className="btn btn-secondary" onClick={onClick}>{children}</button>;
  }
  if (color === "success") {
    return <button className="btn btn-success" onClick={onClick}>{children}</button>;
  }
  if (color === "danger") {
    return <button className="btn btn-danger" onClick={onClick}>{children}</button>;
  }
  if (color === "warning") {
    return <button className="btn btn-warning" onClick={onClick}>{children}</button>;
  }
  if (color === "info") {
    return <button className="btn btn-info" onClick={onClick}>{children}</button>;
  }
  if (color === "light") {
    return <button className="btn btn-light" onClick={onClick}>{children}</button>;
  }
  if (color === "dark") {
    return <button className="btn btn-dark" onClick={onClick}>{children}</button>;
  }
  if (color === "link") {
    return <button className="btn btn-link" onClick={onClick}>{children}</button>;
  }
}

export default Button;
