import path from 'path';

function getArchiveNameFromPath(archivePath: string) {
  return path.basename(archivePath, path.extname(archivePath));
}

export default getArchiveNameFromPath;
