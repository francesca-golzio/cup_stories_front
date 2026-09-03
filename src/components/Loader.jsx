import { useStory } from "../contexts/StoryContext";
/* importing loader animation */
import { DotStream } from 'ldrs/react'
import 'ldrs/react/DotStream.css'

export default function Loader({ color = '#ffc107' }) {

  const { loading } = useStory();

  if (!loading) return null;

  return (
    <div className="text-center my-3 w-100">
      <DotStream
        size="60"
        speed="2.5"
        color={color} />
    </div>
  )
}


/* 📌 Usage guide:

🟡 For default color (#ffc107) use `<Loader />`

🌈 For other colors use `<Loader color="yourColorHere" />`
*/