---
title: Perfect LCCs
published: 2016-04-13
modified: 2016-04-13
tags: none
type: summary
showTOC: True
---

There are many proofs showing we must have $n=2^k$ for perfect 2 LCCs. Can we extend these methods to give

* exponential lower bounds for LCCs?
* lower bounds for perfect $q$-LCCs, $q>2$?

A perfect $q$-LCC of input length $k$ in $n$ dimensions is a set of $2^k$ points in $\{\pm 1\}^n$, together with $n$ unions of perfect $q$-matchings $M_i$ (or just matchings) and a sign $s_m$ for each $m\in M_i$, such that on codewords, the decoding process defined by taking any $m\in M_i$ and taking $s_m \prod_{j\in m}x_i$ recovers $x_i$ with probability 1. In other words, 
$$\EE_{m\in M_i} s_m\prod_{j\in m} x_j = 1.$$

#Proof 1

For $q=2$, these are quadratic forms $Q_i$, with associated matrices $A_i$. The fact that they are matchings means that $A_i = \rc nS_i$ where $S_i$ is (doubly) stochastic. (In fact, we can deal more generally with perfectly smooth LCCs that recover perfectly on codewords.) The codewords are those with
$$Q_i(x)=x \iff \an{x,A_ix}=x_i.$$
Now $S$, being stochastic, satisfies $\ve{S}_{\iy\to \iy} \le 1$. Now $\ve{x}_{\iy}\le 1$ so $\ve{A_i x}_{\iy}\le \rc{n}$.
We have
$$n=\ve{x}_1 =\sum_i |\an{x,A_ix}|\le \sum_i \ve{A_ix}_{\iy}\ve{x}_1=n,$$
so equality holds and $A_ix = x_ix$.

This means the $x\in C$ are simultaneous eigenvalues for the $A_i$. The sequences of eigenvectors are different, so $|C|\le n$, i.e., $2^k\le n$. Equality is acheived for the Hadamard code.

To extend this: some notion of "approximate eigenvector," "well-conditioned linear dependency"?

#Proof 2

For LDCs whose matching correspond to a group action, every $i$ corresponds to a matching $M_i=\{(y, y+x_i)\}$. Now for any $\ep\in \{-1,1\}^k$, there must exist a set $S$, the support of the codeword $x=C(\ep)$, for which $M_i$ only has edges in $S$ if $\ep_i=1$, and $M_i$ only has edges between $S,S^c$ if $\ep_i=-1$. We must have $|S|=\fc n2$.

Now if $x_k=\sum_{i=1}^{k-1} a_ix_i$, consider the set $S$ where $\ep_i=1$ iff $a_i=1$, but $\ep_{k}=-1$. Then $S = S+x_i$ for all $i$, and $S\ne S+x_k$, contradiction.

This is very much related to the first proof. There, one can use a linear dependency argument to show there can't be more than $n$ eigenvectors with distinct sequences of eigenvalues. (Make this relationship more explicit?)
