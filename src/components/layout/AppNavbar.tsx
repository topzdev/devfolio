"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import MaterialSymbolsSearchRounded from "~/components/icons/MaterialSymbolsSearchRounded";
import AppLogo from "~/components/layout/AppLogo";
import MaterialSymbolsCloseRounded from "~/components/icons/MaterialSymbolsCloseRounded";
import Container from "~/components/layout/Container";

type Props = {
  children?: React.ReactNode;
};

const AppNavbar = (props: Props) => {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleSearch = () => {
    setMenu(false);
    setSearch((old) => !old);
  };
  const toggleMenu = () => {
    setSearch(false);
    setMenu((old) => !old);
  };

  return (
    <header
      className={
        "sticky left-0 top-0 flex w-full flex-col gap-y-4 border-b border-border py-4 lg:py-5 bg-background z-[9998]"
      }
    >
      <Container
        className={"relative flex w-full  items-center"}
      >
        <div className={"flex items-center gap-x-2 lg:gap-x-4"}>
          <Button
            className={"flex flex-col gap-y-1 p-2 lg:hidden"}
            variant={"outline"}
            onClick={toggleMenu}
          >
            <span
              className={"flex h-[2px] w-[24px] rounded-md bg-foreground"}
            ></span>
            <span
              className={"flex h-[2px] w-[24px] rounded-md bg-foreground"}
            ></span>
            <span
              className={"flex h-[2px] w-[24px] rounded-md bg-foreground"}
            ></span>
          </Button>
          <ul className={"hidden lg:flex"}>
            <li>
              <Button asChild variant={"text"}>
                <Link href={"/explore"}>Explore</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={"text"}>
                <Link href={"/fotd"}>FOTD</Link>
              </Button>
            </li>
          </ul>
        </div>

        <AppLogo
          className={
            "max-lg:ml-3 max-lg:text-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          }
        />

        <div className={"ml-auto flex items-center gap-x-2 lg:gap-x-4"}>
          {!search && (
            <Button
              className={"h-full !text-2xl xl:hidden"}
              variant={"text"}
              onClick={toggleSearch}
            >
              <MaterialSymbolsSearchRounded />
            </Button>
          )}
          <Input
            className={"w-[370px] max-2xl:w-[300px] max-xl:hidden"}
            leftAdornment={<MaterialSymbolsSearchRounded />}
            placeholder={"Search developer name, portfolio name"}
          />
          <ul className={"flex"}>
            <li>
              <Button className={"lg:h-[48px]"}>Submit</Button>
            </li>
          </ul>
        </div>
      </Container>

      {search && (
        <Container className={"flex w-full items-center gap-x-2"}>
          <Input
            className={"w-full"}
            rightAdornment={
              <Button
                className={"-mr-2 h-full px-2 !text-2xl"}
                variant={"text"}
              >
                <MaterialSymbolsSearchRounded />
              </Button>
            }
            placeholder={"Search developer name, portfolio name"}
          />
          <Button
            className={"h-full px-2 !text-2xl xl:hidden"}
            variant={"text"}
            onClick={toggleSearch}
          >
            <MaterialSymbolsCloseRounded />
          </Button>
        </Container>
      )}

      {menu && (
        <Container className={"w-full"}>
          <ul className={"flex w-full flex-col gap-y-2"}>
            <li>
              <Button className={"w-full justify-start px-0"} asChild variant={"link"}>
                <Link href={"/explore"}>Explore</Link>
              </Button>
            </li>
            <li>
              <Button className={"w-full justify-start px-0"} asChild variant={"link"}>
                <Link href={"/fotd"}>FOTD</Link>
              </Button>
            </li>
          </ul>
        </Container>
      )}
    </header>
  );
};

export default AppNavbar;
