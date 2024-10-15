import {cn} from "~/lib/utils";
import {DetailedHTMLProps, HTMLAttributes} from "react";

type Props = {} &  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const Container = (props: Props) => {
    return (
        <div {...props} className={cn('container', props.className)}></div>
    );
};
export default Container;
