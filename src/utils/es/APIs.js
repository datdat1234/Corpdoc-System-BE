import { get, post, put, remove } from './APICaller.js';
import { esUrl } from '#root/config/index.js';

export const postNewFile = (companyId, fileId, fileData) => {
  return post(`${esUrl}/${companyId}_file/_doc/${fileId}`, fileData);
};

export const postNewFolder = (companyId, folderId, folderData) => {
  return post(`${esUrl}/${companyId}_folder/_doc/${folderId}`, folderData);
};

export const updateFileOCR = (companyId, fileId, fileData) => {
  return post(`${esUrl}/${companyId}_file/_update/${fileId}`, {
    doc: {
      Criteria: fileData?.criteria,
      Path: fileData?.path,
    },
  });
};
