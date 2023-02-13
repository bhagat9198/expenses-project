import React from "react";
import Footer from "./footer";
import Nav from "./nav";

export default function BodyLayout(props: { children: JSX.Element }) {
  const { children } = props;
  return (
    <>
      <Nav />
        {children}
      <Footer />
    </>
  )
}