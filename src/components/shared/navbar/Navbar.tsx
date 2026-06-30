import blue_logo from "@/assets/images/logo_blue.png";
import white_log from "@/assets/images/Logo_white.png";
import Container from "../container/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
const navClassVariant ={
  colored: "bg-primary text-primary-foreground",
  transparent: "bg-transparent text-primary-foreground"
}
type TProps = {
  className?: string,
  variant?: "colored" | "transparent"
}
export default function Navbar({className, variant = "colored"}: TProps) {
  return (
    <Container className={cn("border border-red-400 w-full", className)}>
      { variant === "colored"? <Image src={blue_logo} alt="logo" />: <Image src={white_log} alt="logo" />}
     
    </Container>
  )
}
