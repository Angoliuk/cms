"use client";

import { tw } from "@/tailwind";
import { Root } from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { toggleVariants } from "../toggle/toggle";
import { ToggleGroupContext } from "./toggle-group-context";

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toggleVariants>;
export type ToggleGroupRef = ElementRef<typeof Root>;

export const ToggleGroup = forwardRef<ToggleGroupRef, ToggleGroupProps>(
  ({ children, className, size, variant, ...props }, ref) => (
    <Root className={tw("flex items-center justify-center gap-1", className)} ref={ref} {...props}>
      <ToggleGroupContext.Provider value={{ size, variant }}>{children}</ToggleGroupContext.Provider>
    </Root>
  ),
);

ToggleGroup.displayName = Root.displayName;
