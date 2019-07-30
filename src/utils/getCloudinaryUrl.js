export default function getCloudinaryUrl(src) {
  if (!src) {
    return "";
  }

  const index = src.indexOf("upload");
  const imageUrl = src.substr(0, index + 7) + "c_scale,q_auto,w_371" + src.substr(index + 6);
  return imageUrl;
}
