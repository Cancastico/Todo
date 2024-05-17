import { Label } from "../ui/label"

interface Props {
  label: string
}
export default function Loading({ label }: Props) {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap- mt-[15vh]">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-48 w-48 border-b-2 border-primary"></div>
      </div>
    </main>
  )
}
