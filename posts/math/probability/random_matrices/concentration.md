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
$$ \Pj \ba{\la_{\max}\pa{\sumo kn X_k}\ge t} \le de^{-\fc{t^2}{2\si^2+\fc 23 Rt}}$$
where $\si^2 = \ve{\sumo kn \E(X_k^2)}$.

(Note that requiring $X_i\le R$ can be restrictive. If this doesn't hold use the following instead.)

Reference: THE EXPECTED NORM OF A SUM OF INDEPENDENT RANDOM MATRICES: AN ELEMENTARY APPROACH

**Theorem (Matrix Rosenthal)**: Let $S_1,\ldots, S_n$ be random $d_1\times d_2$ complex-valued matrices with $\E S_i=O$, and $Z:=\sumo in S_i$. Let
\begin{align}
v(X):&= \max\bc{\ve{\sum_i \E[S_iS_i^*]}, \ve{\sum_i \E [S_i^*S_i]}}\\
L:&= \pa{\E \max_i \ve{S_i}^2}^{\rc 2}\\
C(d_1,d_2):&= 4(1+2\ce{\ln(d_1+d_2)})\\
c:&=\rc4.
\end{align}
Then
$$\sqrt{c v(Z)} + cL \le \pa{\E \ve{Z}^2}^{\rc 2} \le \sqrt{C(d) v(Z)} + C(d)L  $$

*Proof*: pg. 9 of NB 13.
