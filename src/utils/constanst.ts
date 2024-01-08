export async function fileImageToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export const urlImageToBase64 = (url: string) => {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    });
};

export const handleObjectKeyData = (data: any) => {
  const list = (data || []).reduce((obj: any, item: { id: any }) => {
    obj = {
      ...obj,
      [item.id]: item
    };
    return obj;
  }, {});
  return list;
};
