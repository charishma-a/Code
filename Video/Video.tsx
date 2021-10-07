import { Video as CloudinaryVideo } from 'cloudinary-react'
import React from 'react'

interface VideoProps {
  controls?: boolean
  onPause?: () => void
  onPlay?: () => void
  publicId: string
}

const VideoFn: React.FC<VideoProps> = ({
  controls = true,
  onPause,
  onPlay,
  publicId,
}) => {
  const fullPublicId = `kernls/videos/${publicId}`
  return (
    <CloudinaryVideo
      cloudName="kernls"
      controls={controls}
      publicId={fullPublicId}
      onPause={onPause}
      onPlay={onPlay}
      secure
      width="100%"
    >
      Can not display <strong>video</strong>
    </CloudinaryVideo>
  )
}

export const Video = React.memo(
  VideoFn,
  (prevProps, nextProps) => prevProps.publicId === nextProps.publicId
)
