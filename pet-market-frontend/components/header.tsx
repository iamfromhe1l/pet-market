import { ShieldUser, User } from "lucide-react";
import { LogoLink } from "./logo-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
  return (
    <header className="flex sticky top-0 bg-background/30 backdrop-blur-md h-18 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <div className="flex items-center h-5 space-x-5">
        <LogoLink />
        <Separator orientation="vertical" />
      </div>
      <div className="flex gap-4">
        <Link href="/admin-dashboard">
          <Button className="cursor-pointer" size="lg">
            <ShieldUser />
            Админ-панель
          </Button>
        </Link>
        <Link href="/login">
          <Button className="cursor-pointer" size="lg">
            <User />
            Войти
          </Button>
        </Link>
      </div>
    </header>
  );
}
