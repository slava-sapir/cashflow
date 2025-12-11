import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center bg-white relative">
       <Image src="/cover.webp" alt="bg" fill className="object-cover" />
       <div className="flex flex-col gap-4 relative z-10 text-center">
        <h1 className="text-5xl font-bold flex items-center justify-center gap-1">
          <ChartColumnBigIcon className="text-lime-500 size={60}" />CashFlow
        </h1>
        <p className="text-xl">Manage your finances with ease</p>
        <SignedIn>
          <Button asChild size="lg">
            <Link href="/dashboard">Go To Your Dashboard</Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2 items-center justify-center">
            <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-500">
              <SignInButton/>
            </Button>
               <Button asChild size="lg">
              <SignUpButton/>
            </Button>
          </div>
        </SignedOut>

       </div>
    </main>
  );
}
