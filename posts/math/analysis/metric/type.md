---
title: Type and Cotype
published: 2016-03-14
modified: 2016-03-14
tags: none
type: notes
understanding: 1
---

1. Say that $X$ has **type** $p$ if there exists $C>0$ such that for every $n, y_1,\ldots, y_n\in X$, 
\[
\EE_{\ep\in \{\pm 1\}^n} \ve{\sum_{i=1}^n \ep_i x_i}_X\le C\ba{\sum_{i=1}^n \ve{x_j}_Y^p}^{\rc p}.
\]
    *  This is always true for $p=1$ by the triangle inquality.
	*  The RHS decreases as $p$ increases.
	*  Let $T_p(X)$ be the infimum of valid $T$.
	*  $X$ has **nontrivial type** if it has type $>1$.
2. Say that $X$ has **cotype** $r$ if there exists $C>0$ such that for every $n, x_1,\ldots, x_n\in Y$, 
\[
\EE_{\ep\in \{\pm 1\}^n} \ve{\sum_{i=1}^n \ep_i x_i}_Y\le C\ba{\sum_{i=1}^n \ve{x_j}_X^p}^{\rc p}.
\]
    *  This is always true for $p=\iy$ by Jensen.
	*  Let $C_r(X)$ be the infimum of valid $C$.
	*  $X$ has **finite cotype** if it has type $<\iy$.
