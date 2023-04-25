import { AuthFormTypes } from "./auth.types"
import { AuthFormSignIn, AuthFormSignUp, IAuthFormSignInProps, IAuthFormSignUpProps } from "./ui"

export interface IAuthForm {
  type: AuthFormTypes
  onSubmit: () => void
  className?: string
}

export type IAuthFormProps = IAuthFormSignInProps | IAuthFormSignUpProps
export interface IAuthFormFactory extends Record<AuthFormTypes, React.FC<IAuthFormProps>> {}

export const AuthFormFactory: IAuthFormFactory = {
  "sign-in": AuthFormSignIn,
  "sign-up": AuthFormSignUp
}

export function AuthForm({
  className,
  onSubmit,
  type
}: IAuthForm) {
  const AuthForm = AuthFormFactory[type]
  return <AuthForm onSubmit={onSubmit} className={className} />
}