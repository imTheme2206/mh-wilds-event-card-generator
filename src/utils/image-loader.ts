import { loadImage, Image } from 'canvas';
import { resolve, join, dirname } from 'path';
import { existsSync } from 'fs';

export async function loadAssetImage(relativePath: string): Promise<Image> {
  // Normalize package name for various installation methods
  const packageName = 'mh-wilds-event-card-generator';
  const packagePattern = new RegExp(`.*${packageName}.*`);

  // Try multiple possible asset locations
  const possiblePaths = [
    // Path when running from the package directly
    resolve(__dirname, '../assets', relativePath),
    // Path when installed as a dependency (npm)
    resolve(__dirname, '../../../assets', relativePath),
    // Path to dist/assets - where your build script copies assets
    resolve(__dirname, '../../assets', relativePath),
    // Path for pnpm structure - walking up from current file to find package root
    ...findPnpmPath(__dirname, packageName, relativePath),
    // Path relative to node_modules folder
    resolve(process.cwd(), 'node_modules', packageName, 'assets', relativePath),
    // Local assets folder
    join(process.cwd(), 'assets', relativePath),
  ];

  // Find the first path that exists
  const existingPath = possiblePaths.find((path) => existsSync(path));

  if (!existingPath) {
    // Create more helpful error message
    console.error('Asset not found:', relativePath);
    console.error('Current directory:', __dirname);
    console.error('Tried paths:', possiblePaths);

    throw new Error(
      `Asset not found: ${relativePath}. Make sure you have the assets directory properly set up.`
    );
  }

  return loadImage(existingPath);
}

// Helper function to find assets in pnpm directory structure
function findPnpmPath(
  startDir: string,
  packageName: string,
  relativePath: string
): string[] {
  const paths: string[] = [];
  let currentDir = startDir;

  // Walk up directory tree to find node_modules
  for (let i = 0; i < 10; i++) {
    // Limit to avoid infinite loop
    const parentDir = dirname(currentDir);

    // Check for various pnpm path patterns
    const pnpmPaths = [
      // Standard pnpm path
      join(
        parentDir,
        'node_modules',
        '.pnpm',
        '**',
        'node_modules',
        packageName,
        'assets',
        relativePath
      ),
      // Direct node_modules path
      join(parentDir, 'node_modules', packageName, 'assets', relativePath),
      // dist/assets within package
      join(
        parentDir,
        'node_modules',
        packageName,
        'dist',
        'assets',
        relativePath
      ),
    ];

    paths.push(...pnpmPaths);

    if (parentDir === currentDir) break; // We've reached the root
    currentDir = parentDir;
  }

  return paths;
}
