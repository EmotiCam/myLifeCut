export const photoName = (ext = "jpg") => {
  return `${new Date()
    .toISOString()
    .slice(0, 22)
    .replace(/:/g, "")
    .replace(".", "")}.${ext}`;
};
