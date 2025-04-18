import { cx, cva, VariantProps } from "class-variance-authority";
import { ElementType, FC, HTMLAttributes, PropsWithChildren } from "react";

const headingVariants = cva(["text-wrap"], {
  variants: {
    size: {
      lg: ["text-xl md:text-2xl"],
      md: ["text-lg md:text-xl"],
      sm: ["text-md md:text-lg"],
      xs: ["text-sm md:text-md"],
      xxs: ["text-sm mb-sm"],
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
  PropsWithChildren<HeadingProps & HTMLAttributes<HTMLElement>>
> = ({ size, level, className, children, ...props }) => {
  const CustomTag = `h${level}` as ElementType;
  return (
    <CustomTag className={cx(headingVariants({ size }), className)} {...props}>
      {children}
    </CustomTag>
  );
};
