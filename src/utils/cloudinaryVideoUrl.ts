/** Same Cloudinary cloud as CloudinaryBackgroundVideo — plain MP4 URL for the
 *  legacy `BackgroundVideo` component, which takes a full src string. */
export const cloudinaryVideoUrl = (videoId: string) =>
  `https://res.cloudinary.com/di4fbucgh/video/upload/${videoId}.mp4`
