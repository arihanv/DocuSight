import { SignIn } from "@clerk/nextjs/app-beta"

export default function Page() {
  return (
    <div className="w-full flex justify-center items-center mt-40">
      <SignIn redirectUrl="/dashboard" path='/sign-in' routing="path" signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
    </div>
  )
}
