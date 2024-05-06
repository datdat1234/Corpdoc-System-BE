import { get, post, put, remove } from './APICaller.js';
import { esUrl } from '#root/config/index.js';

export const postNewFileIndex = (companyId) => {
  return put(`${esUrl}/${companyId}_file`, {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 1,
    },
    mappings: {
      properties: {
        FileID: {
          type: 'text',
        },
        Name: {
          type: 'text',
        },
        Criteria: {
          type: 'text',
        },
        CreatedDate: {
          type: 'date',
        },
        Description: {
          type: 'text',
        },
        HashValue: {
          type: 'text',
        },
        Author: {
          type: 'text',
        },
        Type: {
          type: 'text',
        },
        Size: {
          type: 'long',
        },
        Deleted: {
          type: 'boolean',
        },
        Status: {
          type: 'text',
        },
        IsPrivate: {
          type: 'boolean',
        },
        NewValue: {
          type: 'object',
        },
        SharedDeptID: {
          type: 'text',
        },
        DeptID: {
          type: 'text',
        },
        UploaderID: {
          type: 'text',
        },
        Path: {
          type: 'text',
        },
      },
    },
  });
};

export const postNewFolderIndex = (companyId) => {
  return put(`${esUrl}/${companyId}_folder`, {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 1,
    },
    mappings: {
      properties: {
        FolderID: {
          type: 'text',
        },
        Name: {
          type: 'text',
        },
        Criteria: {
          type: 'text',
        },
        CreatedDate: {
          type: 'date',
        },
        Description: {
          type: 'text',
        },
        Author: {
          type: 'text',
        },
        Deleted: {
          type: 'boolean',
        },
        IsPrivate: {
          type: 'boolean',
        },
        SharedDeptID: {
          type: 'text',
        },
        DeptID: {
          type: 'text',
        },
        CreatorID: {
          type: 'text',
        },
      },
    },
  });
};
