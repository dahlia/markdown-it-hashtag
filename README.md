<!-- deno-fmt-ignore-file -->

@fedify/markdown-it-hashtag
===========================

This is a [markdown-it] plugin that parses and renders Mastodon-style #hashtags.
It converts, for example, `#FooBar` into a link:

~~~~ html
<a href="#FooBar"><span class="hash">#</span><span class="tag">FooBar</span></a>
~~~~

The value of `href` attributes, other attributes (if any), and the content of
the link can be customized by passing options to the plugin:

~~~~ typescript
import MarkdownIt from "markdown-it";
import { hashtag, spanHashAndTag } from "@fedify/markdown-it-hashtag";

const md = new MarkdownIt();
md.use(hashtag, {
  link: (tag: string) => `https://example.com/tags/${tag.substring(1)}`,
  linkAttributes: (handle: string) => ({ class: "hashtag" }),
  label: spanHashAndTag,
});
~~~~

If you want to collect all hashtags in a document, you can pass an environment
object to the `render()` method:

~~~~ typescript
const env = {};
md.render(
  "Hello, #FooBar\n\n> #BazQux",
  env,
);
console.log(env.hashtags);  // ["#FooBar", "#BazQux"]
~~~~

[markdown-it]: https://github.com/markdown-it/markdown-it


Installation
------------

### Deno

~~~~ sh
deno add @fedify/markdown-it-hashtag
~~~~

### Node.js

~~~~ sh
npm add @fedify/markdown-it-hashtag
~~~~

### Bun

~~~~ sh
bun add @fedify/markdown-it-hashtag
~~~~
