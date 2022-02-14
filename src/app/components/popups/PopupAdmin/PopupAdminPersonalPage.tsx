import { getPagePersonal, patchPagePersonal, patchPagesMain } from "api/actions/pages"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import { MentorType, TagType } from "interfaces/types"
import { usePopup } from "modules/popup/hook"
import { FormEvent } from "react"
import { useSelector } from "react-redux"
import { getCheckedValues } from "utils/common"

import PopupLayout from "../PopupLayout"


interface PopupAdminPersonalTagsProps {
  shortcut?: string
  tags: TagType[]
}

export function PopupAdminPersonalTags(props: PopupAdminPersonalTagsProps) {
  const { close } = usePopup()
  const topics = useSelector(state => state.topics)
  async function submitTags(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    interface FormElements extends HTMLFormControlsCollection {
      tags: RadioNodeList & HTMLInputElement[]
    }

    const target = event.currentTarget
    const elements = target.elements as FormElements

    const APIPayload = {
      tags: getCheckedValues(elements.tags).map(Number)
    }
    const APIAction = props.shortcut ? patchPagePersonal(props.shortcut, APIPayload) : patchPagesMain(APIPayload)

    ClientAPI
      .query(APIAction)
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Изменить тэги" width="35em">
      <form onSubmit={submitTags} style={{ display: "grid", rowGap: "1em", color: "black" }}>
        Тэги
        {topics.tags.map(tag => (
          <label key={tag.id}>
            {tag.title}
            <input name="tags" type="checkbox" defaultChecked={!!(props.tags.find(tagg => tagg.id === tag.id))} value={tag.id} />
          </label>
        ))}
        <Button color="dark" type="submit">Сохранить</Button>
      </form>
    </PopupLayout>
  )
}


// interface PopupAdminPersonalMentorsProps {
//   mentor: Pick<MentorType, "id">
// }

// export function PopupAdminPersonalMentors(props: PopupAdminPersonalMentorsProps) {
//   const { close } = usePopup()
//   const { error, loading, payload } = useQuery(getPagePersonal)
//   if (error) throw new Error("useQuery error")
//   if (loading) return <>loading...</>
//   if (!payload) return <>no content</>
//   async function submitTags(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     interface FormElements extends HTMLFormControlsCollection {
//       tags: RadioNodeList & HTMLInputElement[]
//     }

//     const target = event.currentTarget
//     const elements = target.elements as FormElements

//     const APIPayload = {
//       mentors: [props.mentor.id]
//     }
//     const APIAction = shortcut ? patchPagePersonal(shortcut, APIPayload) : patchPagesMain(APIPayload)

//     ClientAPI
//       .query(APIAction)
//       .then(({ error }) => {
//         if (error) return
//         close()
//         window.location.reload()
//       })
//   }
//   return (
//     <PopupLayout title="Изменить тэги" width="35em">
//       <form onSubmit={submitTags} style={{ display: "grid", rowGap: "1em", color: "black" }}>
//         Тэги
//         {topics.tags.map(tag => (
//           <label key={tag.id}>
//             {tag.title}
//             <input name="tags" type="checkbox" defaultChecked={!!(props.tags.find(tagg => tagg.id === tag.id))} value={tag.id} />
//           </label>
//         ))}
//         <Button color="dark" type="submit">Сохранить</Button>
//       </form>
//     </PopupLayout>
//   )
// }
