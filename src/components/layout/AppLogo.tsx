import {cn} from "~/lib/utils";
import {DetailedHTMLProps, HTMLAttributes} from "react";

type Props = {} &  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
const AppLogo = (props: Props) => {
    return <p {...props} className={cn('text-3xl leading-none font-bold', props.className)}>{"<devfolio/>"}</p>;
};
export default AppLogo;