import Image from "next/image";
import styles from "./page.module.css";
import TopBar from "@/components/layout/TopBar"

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <TopBar></TopBar>
    </div>
  );
}
