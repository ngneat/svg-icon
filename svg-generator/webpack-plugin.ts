import { generateSVGIcons } from './generator';
import { GeneratorConfig } from './types';
import chokidar from 'chokidar';

export class SvgGeneratorWebpackPlugin {

  constructor(private config: GeneratorConfig & { watch?: boolean }) {
    generateSVGIcons(this.config);
  }

  apply() {
    if(!this.config.watch) return;

    const watcher = chokidar.watch(this.config.srcPath, {
      ignored: /(^|[\/\\])\../,
      ignoreInitial: true,
      persistent: true
    });

    watcher.on('add', path => generateSVGIcons(this.config))
      .on('change', path => generateSVGIcons(this.config))
      .on('unlink', path => generateSVGIcons(this.config));
  }
}
