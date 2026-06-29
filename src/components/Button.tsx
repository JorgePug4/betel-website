import * as React from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide px-7 py-3.5 text-sm sm:text-base transition-all duration-300 focus-visible:ring-2 focus-visible:ring-spirit focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-spirit text-white shadow-glow hover:shadow-[0_0_45px_rgba(0,174,239,0.6)] hover:-translate-y-0.5",
  secondary:
    "bg-gradient-flame text-white shadow-glow-flame hover:-translate-y-0.5",
  outline:
    "border-2 border-spirit/60 text-spirit dark:text-white hover:bg-spirit/10 hover:border-spirit",
  ghost:
    "text-surface-dark dark:text-white hover:bg-white/10",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  as = "button",
  href,
  fullWidth,
  icon,
  className = "",
  onClick,
  children,
  ...props
}) => {
  const classes = `${base} ${variants[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="text-lg">{icon}</span>}
    </>
  );

  if (as === "a") {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={classes}
      onClick={onClick}
      {...(props as Record<string, unknown>)}
    >
      {content}
    </motion.button>
  );
};

export default Button;
