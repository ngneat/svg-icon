import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getWorkspace,
  InsertChange
} from 'schematics-utilities';
import * as ts from 'typescript';
import * as fs from 'fs';

import { Schema } from './schema';
import { insertImport } from './utils';

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

function injectImports(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, Object.keys(workspace.projects)[0]);
    const modulePath = getAppModulePath(host, (project as any).architect.build.options.main);

    const moduleSource = getTsSourceFile(host, modulePath);

    const change = insertImport(moduleSource, modulePath, 'SvgIconsModule', '@ngneat/svg-icon');

    if (change) {
      const recorder = host.beginUpdate(modulePath);
      recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      host.commitUpdate(recorder);
    }

    const icons = insertImport(moduleSource, modulePath, 'icons', '../assets/svg/svg-icons', true);
    if (icons) {
      const recorder = host.beginUpdate(modulePath);
      recorder.insertLeft((icons as InsertChange).pos, (icons as InsertChange).toAdd);
      host.commitUpdate(recorder);
    }

    return host;
  };
}

function addModuleToImports(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, Object.keys(workspace.projects)[0]);

    const moduleImport = `SvgIconsModule.forRoot({
      icons
    })`;

    addModuleImportToRootModule(host, moduleImport, null as any, project);

    context.logger.log('info', `✅️ @ngneat/svg-icon is imported`);

    return host;
  };
}

function log(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `👏 @ngneat/svg-icon ready to use`);

    return host;
  };
}

function addScripts({ project }): Rule {
  return (host: Tree, context: SchematicContext) => {
    const content = fs.readFileSync('./package.json', 'utf-8');
    const asJSON = JSON.parse(content);
    const workspace = getWorkspace(host);
    const { sourceRoot } = getProjectFromWorkspace(workspace, project || Object.keys(workspace.projects)[0] || 'src');

    asJSON.scripts['generate-icons'] = 'svg-generator';
    asJSON['devDependencies']['@ngneat/svg-generator'] = '^1.0.0';

    asJSON['svgGenerator'] = {
      outputPath: './src/app/svg',
      prefix: 'app',
      srcPath: './src/assets/svg',
      conversionType: 'files',
      svgoConfig: {
        plugins: [
          {
            removeDimensions: true,
            cleanupAttrs: true
          }
        ]
      }
    };

    fs.writeFileSync('./package.json', JSON.stringify(asJSON, null, 2));
    context.logger.log('info', `✅️ Update package.json`);

    return host;
  };
}

process.on('exit', function() {
  const dirPath = './src/assets/svg';
  if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }
  const dir = fs.readdirSync(dirPath);
  if(dir.length < 1){
    console.log(`✅️ Ready. Put your svg icons in src/assets/svg and then 'npm run generate-icons'`);
    return;
  }
  require('child_process').execSync('npm run generate-icons');
  console.log(`✅️ npm run generate-icons`);
  return;
});

export default function ngAdd(options: Schema): Rule {
  return chain([
    addScripts(options),
    installPackageJsonDependencies(),
    addModuleToImports(options),
    injectImports(options),
    log()
  ]);
}
