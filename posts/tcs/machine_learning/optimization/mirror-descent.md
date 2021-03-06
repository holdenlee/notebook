---
title: Mirror descent
published: 2016-03-05
modified: 2016-03-05
tags: gradient
type: concept
---

# Summary

Mirror descent lemma
$$
\al\an{\nb f(z_k), z_k-u}\le \fc{\al^2}{2}\ve{\nb f(z_k)}^2 + \rc2\ve{z_k-u}^2 - \rc2 \ve{z_{k+1}-u}^2.
$$

See [AO15](AO15.html).

# Review

1. Define distance generating function and Bregman divergence. Give the example for $\ell_2$ and entropy.
1. Give 3 formulations of mirror descent (mirror step/argmin, step on gradient, RFTL). Show they are equivalent.
2. Give intuition for mirror descent.
2. Give the mirror descent lemma.
4. What is the convergence of mirror descent for general functions?
