---
title: Matrix concentration
published: 2016-03-13
modified: 2016-03-13
tags: random matrix
type: concept
---

See [wikipedia](https://en.wikipedia.org/wiki/Matrix_Chernoff_bound).

**Theorem (Matrix Bernstein)**: Let $\{X_k\}_{k=1}^n$ be a sequence of independent random $d\times d$ matrices with
$$ \E X_k = 0, \quad \la_{\max}(X_k)\le R\text{ a.s.}$$
Then for all $t\ge 0$,
$$ \Pj \ba{\la_{\max}\pa{\sumo kn X_k}} \le de^{-\fc{t^2}{2\si^2+\fc 23 Rt}}$$
where $\si^2 = \ve{\sumo kn \E(X_k^2)}$.

(I don't understand what a.s. means here. The second inequality is for a finite sum---so we need to quantify the probability that $\la_{\max}(X_i)>R$. a.s. means with probability 1 so we have to truncate the probability distribution of the $X_i$? But we can't do this when there are many $X_i$.)
