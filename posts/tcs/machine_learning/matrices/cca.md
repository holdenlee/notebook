---
title: CCA (Canonical correlation analysis)
published: 2016-06-28
modified: 2016-06-28
tags: CCA
type: notes
showTOC: True
---

[Wikipedia](https://en.wikipedia.org/wiki/Canonical_correlation)

Goal: Find the linear combination of $(X_i)$ and $(Y_j)$ with maximum correlation.

Let $\Si_{XY} = \Cov(X,Y)$.

We want to maximize (let $\ve{v}_M=v^TMv$)
$$\max_{a,b} \ve{a^T\Si_{XY}b}{\ve{a}_{\Si_{XX}}\ve{b}_{\Si_{YY}}}.$$
Let $c=\Si_{XX}a^{\rc 2}$ and $d=\Si_{YY}^{\rc 2}b$. Then this is
$$\fc{c^T \Si_{XX}^{-\rc2} \Si_{XY} \Si_{YY}^{-\rc2}d}{\ve{c}_2\ve{d}_2}.$$
Thus, find the SVD of
$$\Si_{XX}^{-\rc2} \Si_{XY} \Si_{YY}^{-1} \Si_{YX} \Si_{XX}^{-\rc 2}.$$
Change coordinates back to find $a,b$.


