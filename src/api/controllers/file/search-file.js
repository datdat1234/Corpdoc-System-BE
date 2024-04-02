import { buildRes, searchFile } from '#root/utils/index.js';
import { DeptModel, SavedFileModel } from '#root/models/index.js';

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
    var deptId = '';
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
    const searchResult = await searchFile(companyId, searchObj);
    var searchData = searchResult?.hits?.hits;
    const recordNum = searchResult?.hits?.hits.length;

    // Check to return saved data
    if (isSave === "true") {
      const savedFileRes = await SavedFileModel.getFileByUserID(
        companyId,
        userId
      );
      const savedFileData = savedFileRes.rows;
      const savedFileIds = savedFileData.map((file) => file.FileID);
      searchData = searchData.filter(obj => savedFileIds.includes(obj._source.FileID));
    }

    // Response the request
    res.send(buildRes({ data: searchData, count: recordNum }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
