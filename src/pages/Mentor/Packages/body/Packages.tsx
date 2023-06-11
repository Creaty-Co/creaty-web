import { MentorPackageType } from "@entities"
import { Button } from "@shared/ui"
import { Radio, RadioChangeEvent } from "antd"
import { useState } from "react"

const CN = "user-packages"

interface IProps {
  hourPrice: number
  mentorName: string
  mentorSlug: string
  packages: MentorPackageType[]
}

export const Packages = ({ hourPrice, mentorName, mentorSlug, packages }: IProps) => {
  const [packId, setPackId] = useState(0)

  const handlePackCahnged = (e: RadioChangeEvent) => setPackId(e.target.value)

  return (
    <div className="bg-white rounded-2xl grid grid-rows-[auto_auto] gap-6 py-6">
      <div className="grid grid-cols-[1fr_auto] pl-10 pr-6 items-start gap-4">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-black-900">
            Session packs <em className="text-violet">with discount</em>
          </div>
          <div className="font--text-regular text-gray-800">
            Boost your creative career to new heights with a packs of mentoring sessions and enjoy special prices.
          </div>
        </div>

        <Button size="big" type="submit" color="violet">
          Book now
        </Button>
      </div>

      {packages?.length > 0 && (
        <Radio.Group value={packId} onChange={handlePackCahnged}>
          <div className="grid grid-cols-1 px-6 gap-1">
            {packages.map((pack: MentorPackageType, i) => (
              <div className="p-4 grid grid-cols-[auto_1fr] bg-viol-100 rounded-lg" key={i}>
                <div className="flex gap-3 flex-row items-center">
                  <Radio value={i}>
                    <span className="font--text-bold text-black-900">{pack.lessons_count} sessions</span>
                  </Radio>
                  {i === 0 && (
                    <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">
                      Most common
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-row items-center justify-end">
                  <div>
                    <span className="text-black-900 font--text-medium">
                      ${`${Math.floor(pack.lessons_count * hourPrice - (pack.lessons_count * hourPrice * 5) / 100)} `}
                    </span>{" "}
                    <span className="text-gray-800 font--text2-regular line-through">
                      ${pack.lessons_count * hourPrice}
                    </span>
                  </div>
                  <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">-5%</div>
                  <div className="text-gray-800 font--text2-regular">
                    you are saving{" "}
                    <span className="font--text2-bold">${Math.ceil((pack.lessons_count * hourPrice * 5) / 100)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Radio.Group>
      )}
    </div>
  )
}
