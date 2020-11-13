#!/usr/bin/env node
import run from './generator';
import { cosmiconfigSync } from 'cosmiconfig';
import { Config } from './types';

const explorerSync = cosmiconfigSync('svgGenerator');
const config: Config | null = explorerSync.search()?.config;

run(config);
