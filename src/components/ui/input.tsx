import * as React from "react";

import { Controller } from "react-hook-form";
import InputWrapper, {InputWrapperProps, InputWrapperSkeleton} from "~/components/ui/input-wrapper";
import {Skeleton} from "~/components/ui/skeleton";
import {cn} from "~/lib/utils";

export const inputStyling = ({ error }: Pick<InputProps, "error">) => {
    return [
        "flex border border-border bg-input w-full rounded-md px-3.5 md:px-5 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-secondary disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base",
        error && "bg-red-500/10 border-red-500 !ring-red-500",
    ];
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    inputClassName?: string;
    inputParentClassName?: string;
    type?: Pick<React.InputHTMLAttributes<HTMLInputElement>, "type"> | "hex";
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
} & InputWrapperProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            className,
            inputParentClassName,
            inputClassName,
            type,
            onKeyDown,
            leftAdornment,
            rightAdornment,
            ...props
        },
        ref,
    ) => {
        const inputWrapperProps = {
            id: props.id,
            error,
            hint,
            className,
            label,
        };

        return (
            <InputWrapper {...inputWrapperProps}>
                <div
                    className={cn(
                        inputStyling({ error }),
                        "h-[48px] md:h-[52px] md:px-3 !py-0 gap-x-1.5 items-center",
                        inputParentClassName,
                    )}
                >
                    {leftAdornment && (
                        <span className={"text-2xl"}>{leftAdornment}</span>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "w-full !outline-0 bg-transparent h-full py-3",
                            inputClassName,
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightAdornment && (
                        <span className={"text-2xl"}>{rightAdornment}</span>
                    )}
                </div>
            </InputWrapper>
        );
    },
);

type ControlledProp = {
    control: any;
    name: string;
} & InputProps;
export const FormInput = ({ name, control, ...props }: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
                <Input
                    {...props}
                    {...field}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const InputSkeleton = ({}: InputProps) => {
    return (
        <InputWrapperSkeleton>
            <Skeleton className={"h-[48px] md:h-[52px] rounded-2xl w-full"} />
        </InputWrapperSkeleton>
    );
};

Input.displayName = "Input";

export { Input };