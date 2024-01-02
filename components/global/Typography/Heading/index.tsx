import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cx, cva, VariantProps } from "class-variance-authority";

const headingVariants = cva([], {
  variants: {
    size: {
      lg: ["text-2xl mb-lg"],
      md: ["text-xl mb-lg"],
      sm: ["text-lg mb-md"],
      xs: ["text-md mb-md"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type HeadingProps = VariantProps<typeof headingVariants> & {
  level: 1 | 2 | 3 | 4 | 5;
};

export const Heading: FC<
  PropsWithChildren<HeadingProps & HTMLAttributes<HTMLHeadElement>>
> = ({ size, level, className, children }) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <CustomTag className={cx(headingVariants({ size }), className)}>
      {children}
    </CustomTag>
  );
};
