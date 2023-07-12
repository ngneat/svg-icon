import {resolveIdentifierName} from "../tree";
import {defaultConfig, GeneratorConfig} from "../config";

type InvalidName = string;
type Expected = string;

describe('resolveIdentifierName', () => {
  const invalidNames: Array<[InvalidName, Expected]> = [
    ['1inch', `$inch`],
    ['sth.b', `sthB`],
    ['st_b_', `stB`],
    ['some-n#me', `someN$me`],
    ['_some', `some`],
  ];

  it('should normalize the icon name', () => {
    for (const item of invalidNames) {
      assertName(item, defaultConfig);
    }
  });

  it('should be configurable',  () => {
    const customConfig = {
      ...defaultConfig,
      invalidCharReplacer: () => '$$'
    }
    assertName(['1inch', `$$inch`], customConfig)
  });

});

function assertName([name, expected]: [InvalidName, Expected], config: Required<GeneratorConfig>) {
  expect(resolveIdentifierName(name, config)).toEqual(`${expected}${config.postfix}`);
}
