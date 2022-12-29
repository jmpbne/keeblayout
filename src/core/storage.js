const LOCAL_STORAGE_KEY = "keeblayoutData";

export function load() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
}

export function save(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data);
}
