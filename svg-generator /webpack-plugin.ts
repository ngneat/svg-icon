import run from './generator';
import { Config } from './types';
import chokidar from 'chokidar';

export class SvgGeneratorWebpackPlugin {

  constructor(private config: Config & { watch?: boolean }) {
    run(this.config);
  }

  apply() {
    if(!this.config.watch) return;

    const watcher = chokidar.watch(this.config.srcFiles, {
      ignored: /(^|[\/\\])\../,
      ignoreInitial: true,
      persistent: true
    });

    watcher.on('add', path => run(this.config))
      .on('change', path => run(this.config))
      .on('unlink', path => run(this.config));
  }
}
