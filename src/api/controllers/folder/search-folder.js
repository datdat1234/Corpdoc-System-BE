import { buildRes, searchFolder } from '#root/utils/index.js';
import { DeptModel, SavedFolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req?.query?.companyId;
    const userId = req?.query?.userId;
    const userDeptId = req?.query?.deptId;
    const name = req?.query?.data?.name;
    const dept = req?.query?.data?.dept;
    const author = req?.query?.data?.author;
    const date = req?.query?.data?.date;
    const criteria = req?.query?.data?.criteria || [];
    const isSave = req?.query?.data?.isSave;

    // Get dept ID
    let deptId = '';
    if (dept !== '') {
      const deptRes = await DeptModel.getDeptIDByName(companyId, dept);
      deptId = deptRes.rows[0].DeptID;
    }

    // Create search JSON
    const searchObj = {
      query: {
        bool: {
          must: [
            ...(name !== ''
              ? [
                  {
                    match: {
                      Name: name,
                    },
                  },
                ]
              : []),
            ...(author !== ''
              ? [
                  {
                    match: {
                      Author: author,
                    },
                  },
                ]
              : []),
            ...(date
              ? [
                  {
                    match: {
                      CreatedDate: date,
                    },
                  },
                ]
              : []),
            ...(criteria.length !== 0
              ? [
                  {
                    match: {
                      Criteria: criteria,
                    },
                  },
                ]
              : []),
            {
              match: {
                DeptID: userDeptId,
              },
            },
            ...(deptId !== ''
              ? [
                  {
                    match: {
                      SharedDeptID: deptId,
                    },
                  },
                ]
              : []),
          ],
        },
      },
    };

    // Search for the files
    const searchResult = await searchFolder(companyId, searchObj);
    const searchData = searchResult?.hits?.hits;
    const recordNum = searchResult?.hits?.hits.length;
    
    // Check to return saved data
    if (isSave === "true") {
      const savedFolderRes = await SavedFolderModel.getFolderByUserID(
        companyId,
        userId
      );
      const savedFolderData = savedFolderRes.rows;
      const savedFolderIds = savedFolderData.map((folder) => folder.FolderID);
      searchData = searchData.filter(obj => savedFolderIds.includes(obj._source.FolderID));
    }

    // Response the request
    res.send(buildRes({ data: searchData, count: recordNum }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
