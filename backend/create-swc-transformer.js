/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createTransformer: createSwcTransformer } = require('@swc/jest');

const extensionsToSkip = [
  'spec.ts',
  'mock.ts',
  'fixture.ts',
  'index.ts',
  'entity.ts',
  'config.ts',
];
const tsDecorateNeedle = '_ts_decorate';
const tsMetadataNeedle = '_ts_metadata("design:paramtypes"';
const found = (result) => result !== -1;

/**
 * Exclude decorators on methods and properties from coverage.
 */
function ignoreTsDecorate(code) {
  return code.replace(
    /_ts_decorate/g,
    '/* istanbul ignore next */_ts_decorate',
  );
}

/**
 * Exclude decorated constructor parameters from coverage.
 *
 * This takes a more "manual" approach to search/replacement due to perf
 * issues encountered with the regex approach for matching here.
 */
function ignoreTsMetadata(code, fromIndex = 0) {
  const tsMetadataStart = code.indexOf(tsMetadataNeedle, fromIndex);

  if (!found(tsMetadataStart)) {
    return code.substring(fromIndex);
  }

  const tsMetadataEnd = code.indexOf('])', tsMetadataStart) + 1;
  const leadingCode = code.substring(fromIndex, tsMetadataStart);
  const updatedCode = code
    .substring(tsMetadataStart, tsMetadataEnd)
    .replace(/typeof/g, '/* istanbul ignore next */typeof');

  return leadingCode + updatedCode + ignoreTsMetadata(code, tsMetadataEnd);
}

/**
 * Custom transformer that wraps the `@swc/jest` transformer to workaround
 * incorrect code coverage calculations.
 *
 * See relevant Github issues:
 * - https://github.com/swc-project/swc/issues/3854,
 * - https://github.com/istanbuljs/istanbuljs/issues/70
 */
function createTransformer(config) {
  const transformer = createSwcTransformer(config);

  return {
    canInstrument: transformer.canInstrument,
    process(source, fileName, jestOptions) {
      const result = transformer.process(source, fileName, jestOptions);

      if (extensionsToSkip.some((ext) => fileName.endsWith(ext))) {
        return result;
      }

      if (found(result.code.indexOf(tsDecorateNeedle))) {
        result.code = ignoreTsDecorate(result.code);
      }

      if (found(result.code.indexOf(tsMetadataNeedle))) {
        result.code = ignoreTsMetadata(result.code);
      }

      return result;
    },
    getCacheKey(...args) {
      return transformer.getCacheKey(...args);
    },
  };
}

module.exports = { createTransformer };
