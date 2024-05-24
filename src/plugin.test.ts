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

> #Baz_Qux
>
> #테스트

[This should be ignored: #FooBar](https://example.com/)

<a href="">This also should be ignored: #FooBar</a>
`,
    env,
  );
  assertEquals(env.hashtags, [
    "#FooBar",
    "#Baz_Qux",
    "#테스트",
  ]);
  assertEquals(
    html,
    `\
<p><strong>Hello</strong>, <em><a  href="#FooBar"><span class="hash">#</span><span class="tag">FooBar</span></a></em>!</p>
<blockquote>
<p><a  href="#Baz_Qux"><span class="hash">#</span><span class="tag">Baz_Qux</span></a></p>
<p><a  href="#테스트"><span class="hash">#</span><span class="tag">테스트</span></a></p>
</blockquote>
<p><a href="https://example.com/">This should be ignored: #FooBar</a></p>
<p><a href="">This also should be ignored: #FooBar</a></p>
`,
  );
});
