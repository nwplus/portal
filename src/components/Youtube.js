import React from 'react'

export default ({ className, src }) => {
  const getYoutubeEmbedUrl = url => {
    if (url.includes('youtube')) {
      const youtubeID = new URL(url).searchParams.get('v')
      return `https://youtube.com/embed/${youtubeID}?modestbranding=1`
    }
    if (url.includes('youtu.be')) {
      const youtubeID = new URL(url).pathname
      return `https://youtube.com/embed${youtubeID}?modestbranding=1`
    }
    return ''
  }

  const embedUrl = getYoutubeEmbedUrl(src)

  return embedUrl ? (
    <iframe
      title="YouTube Video"
      id="ytplayer"
      type="text/html"
      className={className}
      src={embedUrl}
      frameBorder="0"
      allowFullScreen
    />
  ) : (
    <p>Video not submitted</p>
  )
}
