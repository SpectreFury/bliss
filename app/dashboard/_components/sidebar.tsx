'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

interface SidebarProps {
  children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={
          `bg-white border-r transition-transform duration-300 hidden md:flex flex-col w-64 p-4 ` +
          `${open ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-4">
          <Button variant="link" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="link" className="w-full justify-start">
            Settings
          </Button>
          <Button variant="link" className="w-full justify-start">
            Profile
          </Button>
        </nav>
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden m-4">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="flex items-center justify-between p-4 border-b">
            <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <nav className="flex flex-col p-4 space-y-3">
            <Button variant="link" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="link" className="w-full justify-start">
              Settings
            </Button>
            <Button variant="link" className="w-full justify-start">
              Profile
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Toggle Header */}
        <header className="flex items-center justify-between md:hidden p-4 border-b">
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Page Title</h1>
        </header>

        <section className="p-6">
          {children}
        </section>
      </main>
    </div>
  )
}
