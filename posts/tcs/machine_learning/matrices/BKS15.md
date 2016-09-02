---
title: [BKS15] Dictionary Learning and Tensor Decomposition via the Sum-of-Squares Method
published: 2016-08-30
modified: 2016-08-30
tags: dictionary learning, tensor, sparse coding
type: paper
showTOC: True
---

**Theorem**. Given $\ep>0,\si\ge 1, \de>0$ there exists $d$ and a polytime algorithm that given input 

* a $\si$-dictionary $n\times m$,
* $(d,\tau=n^{-\de})$-nice $\{x\}$, 
* $n^{O(1)}$ samples from $y=Ax$,

outputs with probability $\ge 0.9$ a set $\ep$-close to columns of $A$. 

* A $\si$-dictionary has $AA^T\preceq \si I$ (analytic proxy for overcompleteness $\fc mn$).
* A distribution is $(d,\tau)$-nice if $\E x_i^{d/2}x_j^{d/2}\le \tau$ for all $i\ne j$, and $\E x^\al=0$ for all $|\al|\le d$. (Ex. Bernoulli($\tau$) times Gaussian with $\E z_i^d = \rc\tau$.)

Note on running time:

* $\ep$-accuracy with running time depending on $\poly\prc{\ep}$ in the exponent. So this is better for giving an initial solution for local search methods.

# Noisy tensor decomposition

Given noisy version of $\sumo im \an{a^i, u}^d = \ve{A^Tu}_d^d$, recover $\{a^1,\ldots, a^m\}$.

**Theorem** (Noisy tensor decomposition). For every $\ep>0,\si\ge 1$ there exist $d,\tau$ such that a probabilistic $n^{O(\ln n)}$-time agorithm, given $P$ with 
$$\ve{A^T u}_d^d - \tau \ve{u}_2^d \preceq P \preceq \ve{A^Tu}_d^d + \tau \ve{u}_2^d,$$
outputs with probability 0.9 $S$ that is $\ep$-close to $\{a^1,\ldots, a^m\}$. ($\preceq$ means the difference is a sum of squares.)

Note this allows significant noise since we expect $\ve{A^Tu}_d^d\sim mn^{-\fc d2}\ll \tau$.

## Reduction

Take 
$$ P = \EE_{i} \an{y_i, u}^{2d}.$$

## Algorithm

1. Use SoS to find degree-$k$ pseudo-distribution $\{u\}$ that maximizes $P(u)$ under $\ve{u}^2=1$.
2. Let $W$ be a product of $O(\ln n)$ rndom linear functions.
3. Output top eigenvector of $M$, $M_{ij} = \wt \E W(u)^2 u_iu_j$.

SoS Algorithm: given $\ep>0, k,n,M$, $P_1,\ldots, P_m\in \R[x_1,\ldots, x_n]$ with coefficients in $[0,M]$, if there exists a degree $k$ pseudo-distribution with $P_i=0,i\in [m]$, then we can find $u'$ satisfying $P_i\le \ep, P_i\ge -\ep$ for every $i\in [m]$ in time $(n\polylog\prc{M}{\ep})^{O(k)}$. 

(This is a feasibility problem? Use ellipsoid method?)

Steps

1. If $u$ is an actual distribution, the the output is close to a column.
2. Generalize to pseudo-distributions.
3. Generalize to getting all columns.

Idea: If not correlated, then $P(u)$ is small. The inequalities can be turned into polynomial inequalities provable by SoS.
