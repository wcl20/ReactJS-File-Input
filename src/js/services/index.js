export const services = { upload };

function upload(files) {
  const data = new FormData();
  files.forEach(file => data.append("images", file));
  return fetch("http://localhost:8080/upload", {
    method: "POST",
    body: data
  });
}
