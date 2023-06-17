"use client"

import { useEffect, useState } from "react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Menu, UserPlus } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {isDesktop ? (
              <>
                <SignedOut>
                <SignInButton redirectUrl={"/dashboard"}>
                  <Button className="flex w-full flex-row gap-2">
                    Sign in
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </SignInButton>
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
                <ThemeToggle />
              </>
            ) : (
              <div className="md:hidden">
                <Button
                  variant="outline"
                  className="p-2 rounded-md"
                  onClick={toggleMenu}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <nav className="flex items-center gap-4 px-5 py-2">
            {!isDesktop && (
              <>
                <SignedOut>
                  <SignInButton redirectUrl={"/dashboard"}>
                    <Button className="flex w-full flex-row gap-2">
                      Sign in
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>

                <ThemeToggle />
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
