import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as ts from 'typescript';
import * as fs from 'fs';

import { Schema } from './schema';

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing package...`);

    return host;
  };
}

function getTsSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();

  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

function log(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `👏 @ngneat/svg-icon ready to use`);

    return host;
  };
}

function addScripts(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const content = fs.readFileSync('./package.json', 'utf-8');
    const asJSON = JSON.parse(content);

    asJSON.scripts['generate-icons'] = 'svg-generator';
    asJSON['devDependencies']['@ngneat/svg-generator'] = '^4.0.0';

    asJSON['svgGenerator'] = {
      outputPath: './src/app/svg',
      prefix: 'app',
      srcPath: './src/assets/svg',
      svgoConfig: {
        plugins: [
          "removeDimensions",
          "cleanupAttrs"
        ],
      },
    };

    fs.writeFileSync('./package.json', JSON.stringify(asJSON, null, 2));
    context.logger.log('info', `✅️ Update package.json`);

    return host;
  };
}

process.on('exit', function () {
  const dirPath = './src/assets/svg';
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  const dir = fs.readdirSync(dirPath);
  if (dir.length < 1) {
    console.log(`✅️ Ready. Put your svg icons in src/assets/svg and then 'npm run generate-icons'`);
    return;
  }
  require('child_process').execSync('npm run generate-icons');
  console.log(`✅️ npm run generate-icons`);
  return;
});

export default function ngAdd(options: Schema): Rule {
  return chain([
    addScripts(),
    installPackageJsonDependencies(),
    log(),
  ]);
}
