import {
  Transform,
  type TransformOptions,
  type TransformCallback,
} from "stream";
import { TokenParser, type TokenParserOptions } from "https://deno.land/x/streamparser_json@v0.0.15/index.ts";

export default class TokenParserTransform extends Transform {
  private tokenParser: TokenParser;

  constructor(
    opts: TokenParserOptions = {},
    transformOpts: Omit<
      TransformOptions,
      "readableObjectMode" | "writableObjectMode"
    > = {},
  ) {
    super({
      ...transformOpts,
      writableObjectMode: true,
      readableObjectMode: true,
    });
    this.tokenParser = new TokenParser(opts);

    this.tokenParser.onValue = (parsedTokenInfo) => this.push(parsedTokenInfo);
    this.tokenParser.onError = (err) => {
      throw err;
    };
    this.tokenParser.onEnd = () => {
      if (!this.writableEnded) this.end();
    };
  }

  /**
   * Main function that send data to the parser to be processed.
   *
   * @param {Buffer} chunk Incoming data
   * @param {String} encoding Encoding of the incoming data. Defaults to 'utf8'
   * @param {Function} done Called when the proceesing of the supplied chunk is done
   */
  override _transform(
    chunk: any,
    encoding: BufferEncoding,
    done: TransformCallback,
  ) {
    try {
      this.tokenParser.write(chunk);
      done();
    } catch (err: unknown) {
      done(err as Error);
    }
  }

  override _final(done: any) {
    try {
      if (!this.tokenParser.isEnded) this.tokenParser.end();
      done();
    } catch (err: unknown) {
      done(err);
    }
  }
}
