---
title: Distribution of critical points
published: 2016-08-13
modified: 2016-08-13
tags: none
type: question
---

[MO question](http://mathoverflow.net/questions/247469/expected-number-of-local-minima-of-random-polynomial-in-high-dimensions)

Consider the inner product space $P_k$ of polynomials of degree $\le k$ on the unit sphere $\mathbb S^{n-1}\subset \mathbb R^n$. Let $p\sim N(0,\sigma^2 I)$ be a randomly chosen polynomial in $P_k$, according to the standard Gaussian distribution. What is the average number of local minima of $p$?

[Nicolaescu](http://arxiv.org/pdf/1101.5990.pdf) used the Kac-Rice formula to address the case where $n$ is kept fixed and $k\to \infty$. In fact, his result is more general: the manifold is fixed and the space of eigenfunctions of the Laplacian with eigenvalue $\le L$ is considered.

However, I'm interested in the asymptotics when $k$ is fixed (ex. take $k=3$ or 4) and $n\to \infty$, in order to help understand the tractability of random optimization problems as $n\to \infty$. I'm also interested in any other asymptotics that are known, e.g. distribution of values at local minima, distribution of other critical points, etc.

<!--  (modulo $\sum_{i=1}^{n} x_i^2-1$)-->
