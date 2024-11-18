import React, { useEffect, useRef } from "react";
import "../../app/buttons.css";

interface ButtonProps {
  type?: "primary" | "secondary" | "outline" | "link";
  label: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  size = "medium",
  label,
  type = "primary",
  icon,
  loading = false,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  let classes = [["custom-button"]];
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const createRipple = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement("span");
      circle.classList.add("circle");
      circle.style.top = `${y}px`;
      circle.style.left = `${x}px`;

      button.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 500);
    };

    button.addEventListener("click", createRipple);

    return () => {
      button.removeEventListener("click", createRipple);
    };
  }, []);
  classes.push([`custom-button--${type}`]);

  if (size) {
    classes.push([`custom-button--${size}`]);
  }
  return (
    <button
      ref={buttonRef}
      type="button"
      className={classes.join(" ")}
      disabled={loading || (disabled && true)}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {icon ? icon : null} {label}
        </>
      )}
    </button>
  );
};

export default Button;
