import "./Mentor.scss"

import { Button } from "@shared/ui"
import cn from "classnames"

const CNPackages = "user-packages"

export const Packages = () => (
  <div className={cn(CNPackages, "flex flex-col gap-y-5")} id="packages">
    <div className="font--h3-bold text-white mt-10 mb-5">Select your mentoring plan</div>

    <div className="packages bg-black-1000 rounded-3xl p-6 flex flex-col gap-4 gap-4">
      <div className="bg-black-900 rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 pt-6 pb-10 items-start">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-white">Free 15-minute trial session</div>
          <div className="font--text-regular text-gray-700">
            15-minute trial session without any commitment, to give you a taste of what's to come.
          </div>
        </div>

        <Button size="big" type="submit" color="white">
          Book now
        </Button>
      </div>

      <div className="bg-white rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 py-6 items-start gap-4">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-black-900">
            Mentoring session with <em className="text-violet">Gina T.</em>
          </div>
          <div className="font--text-regular text-gray-800">
            1-hour personal mentoring session.
            <br />
            No nonsense, just straight-up support and guidance.
          </div>
          <div className="font--text-regular text-black-900 pt-1">
            <em className="font--text-bold">$100</em> / 60 min session
          </div>
        </div>

        <Button size="big" type="submit" color="violet">
          Book now
        </Button>
      </div>

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

        <div className="grid grid-cols-1 px-6 gap-1">
          <div className="p-4 grid grid-cols-[auto_1fr] bg-viol-100 rounded-lg">
            <div className="flex gap-3 flex-row items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-full bg-white border-violet text-viol-200 ring-viol-200 outline-violet"
                style={{ borderRadius: "50%", backgroundBlendMode: "difference" }}
                defaultChecked
              />
              <span className="font--text-bold text-black-900">5 sessions</span>
              <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">Most common</div>
            </div>

            <div className="flex gap-2 flex-row items-center justify-end">
              <div>
                <span className="text-black-900 font--text-medium">$475</span>{" "}
                <span className="text-gray-800 font--text2-regular line-through">$500</span>
              </div>
              <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">-5%</div>
              <div className="text-gray-800 font--text2-regular">
                you are saving <span className="font--text2-bold">$25</span>
              </div>
            </div>
          </div>

          <div className="p-4 grid grid-cols-[auto_1fr] bg-viol-50 rounded-lg">
            <div className="flex gap-3 flex-row items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-full bg-white border-violet text-viol-200 ring-viol-200 outline-violet"
                style={{ borderRadius: "50%", backgroundBlendMode: "difference" }}
              />
              <span className="font--text-regular text-black-900">10 sessions</span>
              <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">Most common</div>
            </div>

            <div className="flex gap-2 flex-row items-center justify-end">
              <div>
                <span className="text-black-900 font--text-medium">$900</span>{" "}
                <span className="text-gray-800 font--text2-regular line-through">$1000</span>
              </div>
              <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">-10%</div>
              <div className="text-gray-800 font--text2-regular">
                you are saving <span className="font--text2-bold">$100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
