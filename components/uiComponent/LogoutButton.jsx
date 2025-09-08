import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FiLogOut } from "react-icons/fi"
import { useAuth } from "@/app/context/AuthContext"

const LogoutButton = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <FiLogOut /> Log Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out of {user.firstName} account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your SmartReads account and you'll need
              to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default LogoutButton
