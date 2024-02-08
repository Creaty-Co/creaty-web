import "./PackagesWrapper.scss"

import { MentorPackageType } from "@store/mentor/mentor.types"
import cn from "classnames"

import { Hour } from "./body/Hour"
import { Packages } from "./body/Packages"
import { Trial } from "./body/Trial"

const CNPackages = "user-packages"

interface IProps {
  hourPrice: number
  mentorSlug: string
  mentorName: string
  minutsOfTrialMeeting?: number | null
  packages: MentorPackageType[]
}

export const PackagesWrapper = ({ hourPrice, mentorSlug, mentorName, minutsOfTrialMeeting, packages }: IProps) => (
  <div className={cn(CNPackages, "flex flex-col gap-y-5")} id="packages">
    <div className="font--h3-bold text-white mt-10 mb-5">Select your mentoring plan</div>

    <div className="packages bg-black-1000 rounded-3xl p-6 flex flex-col gap-4 gap-4">
      <Trial minutsOfTrialMeeting={minutsOfTrialMeeting} mentorName={mentorName} mentorSlug={mentorSlug} />
      <Hour hourPrice={hourPrice} mentorName={mentorName} mentorSlug={mentorSlug} />
      <Packages hourPrice={hourPrice} packages={packages} mentorName={mentorName} mentorSlug={mentorSlug} />
    </div>
  </div>
)
