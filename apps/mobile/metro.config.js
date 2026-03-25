const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in monorepo
config.watchFolders = [workspaceRoot];

// Resolve modules from workspace root first
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Path alias: @/ → src/
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (_, name) => {
      if (name === '@') return path.join(projectRoot, 'src');
      return path.join(projectRoot, 'node_modules', name);
    },
  }
);

module.exports = config;
