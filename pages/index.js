import Link from "next/link";
import MyHeader from "./component/header";
import NavBar from "./component/navBar";
import FormInput from "./component/formInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <NavBar></NavBar>
    </>
  );
}
