import { readFileSync } from "fs";
import path from "path";

type GuidecharFileName = `${string}.guidechar`;
export const importGuidechar = (fileName: GuidecharFileName) => {
  return readFileSync(path.resolve("./__mocks__/" + fileName)).toString();
};
