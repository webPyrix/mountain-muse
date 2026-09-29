import { API_BASE } from "@/libs/api";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/talents/upload.php`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || "Upload failed");
  }

  return data.path;
}