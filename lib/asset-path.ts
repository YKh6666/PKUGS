const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (assetBasePath && path.startsWith(`${assetBasePath}/`)) {
    return path;
  }

  return `${assetBasePath}${path}`;
}
