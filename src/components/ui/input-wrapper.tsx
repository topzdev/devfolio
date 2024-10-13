import React from "react";
import {Label} from "~/components/ui/label";
import {Skeleton} from "~/components/ui/skeleton";
import Typography from "~/components/ui/typography";
import {cn} from "~/lib/utils";

export type InputWrapperProps = {
    children?: React.ReactNode,
    className?: string,
    error?: string | boolean;
    hint?: string,
    label?: string,
    id?: string,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const InputWrapper = ({className, error, hint, label, children, id, ...props}: InputWrapperProps) => {
    return <div className={cn('flex flex-col gap-y-1.5', className)} {...props}>
        {label && <Label htmlFor={id}>{label}</Label>}

        {children}

        {error && (
            <Typography
                variant='detail'
                className='text-red-500'
            >
                {error}
            </Typography>
        )}
        {!error && hint && (
            <Typography
                variant='detail'
                foreground='secondary'
            >
                {hint}
            </Typography>
        )}
    </div>
}

export type InputWrapperSkeletonProps = {
    withLabel?: boolean
} & InputWrapperProps;

export const InputWrapperSkeleton = ({children, withLabel = true}: InputWrapperSkeletonProps) => {
    return <div className={cn('flex flex-col w-full gap-y-1')}>
        {withLabel &&
            <Skeleton className="h-5 max-w-[160px] rounded-2xl"/>
        }
        {children}
    </div>
}

export default InputWrapper;