import Button from "app/components/common/Button/Button"
import DropDown from "app/components/UI/DropDown/DropDown"

function AdminPersonalPageMentorCard() {
  return (
    <div className="admin-mentor-card">
      <Button>-</Button>
      <Button>+</Button>
      <DropDown expanded onSelect={() => { 1 }}>
        <option>1</option>
        <option>2</option>
      </DropDown>
    </div>
  )
}


export default AdminPersonalPageMentorCard
