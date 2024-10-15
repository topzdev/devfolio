import React from "react";
import Container from "~/components/layout/Container";
import AppLogo from "~/components/layout/AppLogo";
import Typography from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import Link from "next/link";

type Props = {};
const AppFooter = (props: Props) => {
  return (
    <div
      className={
        "border-t border-border pb-5 pt-14 text-center"
      }
    >
      <Container className={'flex flex-col gap-y-14 '}>
        <div className={"mx-auto flex max-w-[550px] flex-col gap-y-3"}>
          <AppLogo />
          <Typography variant={"p"} className={"text-foreground-secondary"}>
            We collect developer portfolios to showcase talent, inspire others,
            and help employers hire you.
          </Typography>
        </div>
        <div className={"flex items-center max-lg:flex-col-reverse max-lg:gap-y-6"}>
          <Typography>
            Developed with love and dedication by
            <Button className={"px-2"} asChild variant={"link"}>
              <a href={"https://topz.dev/"}>topzdev</a>
            </Button>
          </Typography>

          <ul
            className={
              "flex items-center text-foreground-disabled max-lg:flex-col lg:ml-auto"
            }
          >
            <li>
              <Button
                className={"px-2 py-0 font-normal text-foreground-disabled"}
                asChild
                variant={"link"}
              >
                <Link href={"/guidelines"}>Submission Guidelines</Link>
              </Button>
            </li>
            <li className={"max-lg:hidden"}>•</li>
            <li>
              <Button
                className={"px-2 font-normal text-foreground-disabled"}
                asChild
                variant={"link"}
              >
                <Link href={"/terms"}>Privacy & Terms</Link>
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};
export default AppFooter;
