import {
  copyFileSync,
  readdirSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import path from "path";
import type { OriginRoute } from "~/cli/types";
import { toPascalCase } from "~/cli/utils/string-utils";
import type { Config } from "~/utils/config";
import { makeDirectory, toPosixPath } from "~/utils/fs-utils";
import { getTemplateCompiler } from "./getTemplateCompiler";

let prevRoutes: OriginRoute[] = [];

export function generateLocalizedRoutes(
  config: Config,
  originRoutes: OriginRoute[],
  updatedOriginPath?: string,
) {
  const { newPaths, removedPaths } = getPathDiffs(prevRoutes, originRoutes);
  prevRoutes = originRoutes;
  originRoutes.forEach((originRoute) => {
    if (!needsUpdate(originRoute, newPaths, updatedOriginPath)) return;
    const originPath = path.join(config.routes.originDir, originRoute.path);
    const originPathDir = path.dirname(originPath);
    const compileTemplate = getTemplateCompiler(config, originRoute);
    Object.entries(originRoute.localizedPaths).forEach(
      ([locale, localizedRoutePath]) => {
        const localizedPath = path.join(
          config.routes.localizedDir,
          localizedRoutePath,
        );
        const localizedPathDir = path.dirname(localizedPath);
        makeDirectory(localizedPathDir);
        if (originRoute.type === "copy") {
          return copyFileSync(originPath, localizedPath);
        }
        const originFilename = path.basename(originPath);
        const relativeFilename =
          originRoute.type === "markdown" ? originFilename : originRoute.type;
        const relativeDirPath = path.relative(localizedPathDir, originPathDir);
        const relativePath = path.join(relativeDirPath, relativeFilename);
        const compiledContents = compileTemplate({
          routeType: toPascalCase(originRoute.type),
          relativePath: toPosixPath(relativePath),
          locale,
        });
        writeFileSync(localizedPath, compiledContents);
      },
    );
  });
  deleteRemovedPaths(config, removedPaths);
}

function getPathDiffs(prevRoutes: OriginRoute[], originRoutes: OriginRoute[]) {
  const prevPaths = new Set(
    prevRoutes.flatMap(({ localizedPaths }) => Object.values(localizedPaths)),
  );
  const currentPaths = new Set(
    originRoutes.flatMap(({ localizedPaths }) => Object.values(localizedPaths)),
  );
  const newPaths = new Set([...currentPaths].filter((k) => !prevPaths.has(k)));
  const removedPaths = new Set(
    [...prevPaths].filter((k) => !currentPaths.has(k)),
  );
  return { newPaths, removedPaths };
}

function needsUpdate(
  originRoute: OriginRoute,
  newLocalizedPaths: Set<string>,
  updatedOriginPath?: string,
) {
  const isUpdatedOriginRoute =
    !updatedOriginPath || updatedOriginPath === originRoute.path;
  const hasNewLocalizedPaths = Object.values(originRoute.localizedPaths).some(
    (path) => newLocalizedPaths.has(path),
  );
  return isUpdatedOriginRoute || hasNewLocalizedPaths;
}

function deleteRemovedPaths(config: Config, removedPaths: Set<string>) {
  removedPaths.forEach((localizedPath) => {
    try {
      const fullPath = path.join(config.routes.localizedDir, localizedPath);
      rmSync(fullPath);
      let dirPath = path.dirname(fullPath);
      while (readdirSync(dirPath).length === 0) {
        rmdirSync(dirPath);
        dirPath = path.dirname(dirPath);
      }
    } catch (_) {
      // Silent catch
    }
  });
}
