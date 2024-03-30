import {
  errorHelper,
  buildRes,
} from "#root/utils/index.js";
import { FolderModel, PathModel, SavedFolderModel } from "#root/models/index.js";

export default async (req, res) => {
  try {
    const userInfo = req.body.userInfo;
    const folderId = req.body.folderId;
    const companyId = req.body.companyId;
    const folderInfo = await FolderModel.getFolderByFolderId(
      companyId,
      folderId
    );

    if (folderInfo?.rowCount) {
      let path = "/ " + folderInfo?.rows[0]?.Name;
      for (let i = 0; i < 2; i++) {
        const parentId = await PathModel.getAncestorIdByDepth(
          companyId,
          folderId,
          i + 1
        );
        if (parentId?.rowCount) {
          const folderDetail = await FolderModel.getFolderByFolderId(
            companyId,
            parentId.rows[0]?.AncestorID
          );
          path = "/ " + folderDetail?.rows[0]?.Name + " " + path;
          if (folderDetail?.rows[0]?.Name === "Root") break;
          if (i === 1) path = "..." + path;
        } else {
          path = ".../ " + path;
          break;
        }
      }
      path = path.replace("/ Root /", "");
      const isSave = await SavedFolderModel.checkSaveFolderByFolderId(
        companyId,
        folderId,
        userInfo.UserID
      )
      return res.send(buildRes({ path: path, isSave: isSave.rowCount? true: false }));
    }
    return res.status(400).json(errorHelper("00008"));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
