#!/usr/bin/env node
import { Command } from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';
import { generateSVGIcons } from './generator';
import { GeneratorConfig } from './types';

const program = new Command();
program
  .name('svg-generator')
  .description('Transform SVG files into Angular-compatible TS files')
  .version('4.0.0')
  .option(
    '-c, --config-dir <value>',
    'Specify a directory for the config file (defaults to current working directory)',
    process.cwd()
  );

program.parse();
const opts = program.opts();

const explorerSync = cosmiconfigSync('svgGenerator');
const config: GeneratorConfig | null = explorerSync.search(opts.configDir)?.config;

generateSVGIcons(config);
