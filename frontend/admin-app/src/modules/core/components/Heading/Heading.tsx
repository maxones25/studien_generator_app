import React from "react";
import { Text, TextProps } from "..";

export interface HeadingProps extends Omit<TextProps, "variant"> {
  testId: string;
  children: string;
  variant?: "large";
}

export const Heading: React.FC<HeadingProps> = ({
  testId,
  children,
  variant = "large",
}) => {
  if (variant === "large") {
    return (
      <Text data-testid={testId} variant="h6">
        {children}
      </Text>
    );
  }

  throw new Error(`heading variant '${variant}' not found`);
};
