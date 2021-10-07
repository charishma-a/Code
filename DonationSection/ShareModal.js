import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'

/* components */
import { ProjectShare } from '../ProjectShare'

/* data */
import { SharingSection } from '../../data/projects'

/* utils */
import { device } from '../../utils/device'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  @media ${device.tablet} {
    padding: 2rem;
  }
`
const CloseButton = styled.button`
  border: none;
  color: #979797;
  background-color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.3125rem;
`

const CloseIconButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const CloseIcon = styled.img``

const ShareModal = ({ open, onClose, projectId }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={false}>
      <Container>
        <CloseIconButton onClick={onClose}>
          <CloseIcon
            src="/assets/images/close_24px.png"
            alt="close"
            width={15}
            height={15}
          />
        </CloseIconButton>
        <ProjectShare
          projectId={projectId}
          sharingSection={SharingSection.Project}
        />
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Container>
    </Dialog>
  )
}

export default ShareModal
