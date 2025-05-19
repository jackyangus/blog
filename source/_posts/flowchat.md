---
title: flowchat
tags:
  - 公式
  - 时序图
  - 流程图
flowchart: true
mathjax: true

abbrlink: 32609
date: 2017-04-12 09:25:46
---

{% asset_img enable_math.png image1 %}
{% asset_img enable_math2.png image2 %}

$$E=mc^2$$

$$\sum\_{i=1}^n a\_i=0$$
$$\sum ^ {j-1}{k=0}{\widehat{\gamma} {kj} z k } $$


$$
\Gamma(z) = \int\_0^\infty t^{z-1}e^{-t}dt\,.
$$

```flow
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|request

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```


## hello