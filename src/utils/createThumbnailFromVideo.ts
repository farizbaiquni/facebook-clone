export const createThumbnail = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.addEventListener("loadeddata", () => {
      videoElement.currentTime = 1;
    });
    videoElement.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL();
        resolve(thumbnailUrl);
      }
    });
  });
};
