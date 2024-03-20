import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

class FilePath {
  constructor(path, fileInfo) {
    this.path = path;
    this.fileInfo = fileInfo;
  }
}
class FolderInSupport {
  constructor(name, childs) {
    this.name = name;
    this.childs = childs?? [];
  }

  setName(name) {
    this.name = name;
  }

  setChilds(childs) {
    this.childs = childs;
  }

  setFileInfo(fileInfo) {
    this.fileInfo = fileInfo;
  }

  getChilds() {
    return this.childs;
  }

  getName() {
    return this.name;
  }
}

// Function to get index of occurrence
function getPos(str, subStr, i) {
  return str.split(subStr, i).join(subStr).length;
}

function findFolderStructure(files, parentName, index) {
  let pathParent = parentName + '/';
  let firstCatch = "-1";
  let childs = [];
  let nextChilds = [];
  let isFinal = false;

  for (let i = 0; i < files.length; i++) {
    if (files[i].path.indexOf(firstCatch) === -1) {
      if (nextChilds.length) {
        console.log(nextChilds)
        childs.at(-1).setChilds(childs.at(-1).getChilds().concat(findFolderStructure(nextChilds, childs.at(-1).getName(), index+1)));
      } 
      nextChilds = [];
      let pos = getPos(files[i].path, '/', index+1);
      if (pos < files[i].path.length) {
        let child = new FolderInSupport();
        child.setName(files[i].path.slice(getPos(files[i].path, '/', index)+1, pos));
        childs.push(child);
        firstCatch = files[i].path.substring(0, pos);
        nextChilds.push(files[i]);
      }
      else {
        isFinal = true;
        childs.push(files[i].fileInfo);
      }
    }
    else {
      nextChilds.push(files[i]);
    }
  }
  if (nextChilds.length) {
    // console.log(childs.at(-1))
    childs.at(-1).setChilds(childs.at(-1).getChilds().concat(findFolderStructure(nextChilds, childs.at(-1).getName(), index+1)));
  } 
  return childs;
}

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const deptId = req.query.deptId;
    const typeDoc = req.query.typeDoc;
    let dataRes;

    let typeQuery = "";
    if (typeDoc === "book") {
      typeQuery = "Sách";
      dataRes = new FolderInSupport("Thư viện sách", []);
    }
    else if (typeDoc === "admin-doc") {
      typeQuery = "VBHC";
      dataRes = new FolderInSupport("Văn bản hành chính", []);
    }

    const fileInfo = await FileModel.getFileSupport(companyId, deptId);
    
    if (!fileInfo) { 
      return res.send(buildRes({ files: dataRes }));
    }

    const files = fileInfo.rows;
    let filesWithSinglePath = []

    for (let i = 0; i < fileInfo.rowCount; i++) {
      let path = files[i].Path;
      for (let j=0; j < path.length; j++) {
        if (path[j].indexOf(typeQuery) !== undefined && path[j].indexOf(typeQuery)=== 0) {
          let fileOfType = new FilePath(path[j]+'/', files[i])
          filesWithSinglePath.push(fileOfType);
        } else {
          break;
        }
      }
    }

    filesWithSinglePath.sort((a, b) => {return a.path.localeCompare(b.path);});

    dataRes.setChilds(findFolderStructure(filesWithSinglePath, typeQuery, 1));

    return res.send(buildRes({ dataRes }));
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
