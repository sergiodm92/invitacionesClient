import InvitationProtected from '../../../components/invitationProtected/invitationProtected'

const Invitation = ({params}) => {
  const {name} = params
  return (
    <div>
      <InvitationProtected name={name}/>
    </div>
  )
}
export default Invitation

