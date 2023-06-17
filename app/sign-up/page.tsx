import { SignUp } from "@clerk/nextjs/app-beta"

export default function Page() {
  return (
    <div className="w-full flex justify-center items-center mt-40">
      <SignUp redirectUrl={'/dashboard'} />
    </div>
  )
}
