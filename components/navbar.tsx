import { User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Farm Field Soil Analysis</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}