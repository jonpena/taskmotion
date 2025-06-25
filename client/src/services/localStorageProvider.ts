export const localStorageProvider = () => {
  const map = new Map(JSON.parse(localStorage.getItem('taskmotion-cache') || '[]'));
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('taskmotion-cache', appCache);
  });
  return map;
};
