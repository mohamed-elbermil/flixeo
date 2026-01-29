import Image from "next/image";
import styles from "./page.module.css";
import TopBar from "@/components/layout/TopBar"
import HeroSection from "@/components/movie/HeroSection";
import SideBar from "@/components/layout/SideBar";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <TopBar></TopBar>
      <SideBar></SideBar>
      <HeroSection></HeroSection>
    </div>
  );
}
