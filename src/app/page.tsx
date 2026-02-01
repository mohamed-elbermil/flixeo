import Image from "next/image";
import styles from "./page.module.css";
import TopBar from "@/components/layout/TopBar"
import HeroSection from "@/components/movie/HeroSection";
import SideBar from "@/components/layout/SideBar";
import TopBoxOffice from "@/components/movie/TopBoxOffice";

export default function Home() {
  return (
    <div>
      <TopBar></TopBar>
      <SideBar></SideBar>
      <div className="container">
        <HeroSection></HeroSection>
        <div style={{ width: '35%' }}>
          <TopBoxOffice></TopBoxOffice>
        </div>
      </div>
    </div>
  );
}

