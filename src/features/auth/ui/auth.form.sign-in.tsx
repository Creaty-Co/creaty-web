export interface IAuthFormSignInProps {
  className?: string
  onSubmit: () => void
}

export const AuthFormSignIn = ({
  onSubmit,
  className
}: IAuthFormSignInProps) => {
  return (
    <>Sign In form</>
  )
}