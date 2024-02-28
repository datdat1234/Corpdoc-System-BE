const findFolderPath = (data, folderId) => {
  const folder = data.find((item) => item.FolderID === folderId);
  if (!folder) {
    return [];
  }
  if (!folder.ParentID) {
    return [folder.Name];
  }
  const parentPath = findFolderPath(data, folder.ParentID);
  return [...parentPath, folder.Name];
};

export default findFolderPath;