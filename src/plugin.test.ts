import { assertEquals } from "@std/assert/assert-equals";
import MarkdownIt from "markdown-it-impl";
import { hashtag } from "./plugin.ts";

Deno.test("hashtag()", () => {
  const md = new MarkdownIt({
    html: true,
  });
  md.use(hashtag);
  // deno-lint-ignore no-explicit-any
  const env: any = {};
  const html = md.render(
    `\
**Hello**, *#FooBar*!

> #BazQux

[This should be ignored: #FooBar](https://example.com/)

<a href="">This also should be ignored: #FooBar</a>
`,
    env,
  );
  assertEquals(env.hashtags, [
    "#FooBar",
    "#BazQux",
  ]);
  assertEquals(
    html,
    `\
<p><strong>Hello</strong>, <em><a  href="#FooBar"><span class="hash">#</span><span class="tag">FooBar</span></a></em>!</p>
<blockquote>
<p><a  href="#BazQux"><span class="hash">#</span><span class="tag">BazQux</span></a></p>
</blockquote>
<p><a href="https://example.com/">This should be ignored: #FooBar</a></p>
<p><a href="">This also should be ignored: #FooBar</a></p>
`,
  );
});
