"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import headerImg from "../../../public/img/star-wars-header-img.jpg"
import logo from"../../../public/img/star-wars-logo.svg"
import Link from "next/link";
const Header = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-background">
        <Image
          src={headerImg}
          layout="fill"
          objectFit="cover"
          alt={"header-img"}
        />
      </div>
      <div className={`logo-container ${isLogoVisible ? "visible" : ""}`}>
        <Link href={"/"}>
        <Image
          src={logo}
          alt="Star Wars Logo"
          width={500} 
          height={150}
        />
        </Link>
      </div>
    </header>
  );
};

export default Header;
