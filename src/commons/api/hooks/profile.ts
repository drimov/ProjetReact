import { getProfile, updateProfile } from "../clients/profile"

import { Profile } from "@/types/database"
import { getError } from "@/helpers"
import { toastMessage } from "@/components/toast-message"
import { useMutation } from "@tanstack/react-query"

type useGetProfileUserProps = {
  onSuccess: (profile: Profile) => void
}
const useGetProfile = ({ onSuccess }: useGetProfileUserProps) => {
  return useMutation((id: string) => getProfile(id), {
    onError: (error: unknown) => {
      const newError = getError(error, {
        message: "Error when get session user",
        name: "Error when get session user",
      })
      toastMessage({
        title: newError.name,
        message: newError.message,
        variant: "error",
      })
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
  })
}

type useUpdateProfileProps = {
  onError: () => void
}
const useUpdateProfile = ({ onError }: useUpdateProfileProps) => {
  return useMutation((profile: Partial<Profile>) => updateProfile(profile), {
    onError: (error: unknown) => {
      const newError = getError(error, {
        message: "when update profile",
        name: "Unexpected error",
      })
      toastMessage({
        title: newError.name,
        message: newError.message,
        variant: "error",
      })
      onError()
    },
  })
}

export { useGetProfile, useUpdateProfile }
