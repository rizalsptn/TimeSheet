import logo from "@/assets/logos/lrs-logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={logo}
        fill
        alt="Logo Len Railway Systems"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
