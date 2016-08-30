---
title: SGD Variance Reduction
published: 2016-03-04
modified: 2016-03-04
tags: convex optimization, sgd, variance reduction
type: topic
showTOC: True
---

$$\min_{x\in \R^d} \set{F(x):=f(x)+\psi(x) := \rc n \sumo in f_i(x) + \psi(x).$$

2 ways to choose a better gradient estimator.

# SVRG

Keep a snapshot vector $\wt x=x_k$ every $m\approx 2n$ iterations.
$$\wt \nb_k := \nb f_i(x_k) - \nb f_i(\wt x) + \nb f(\wt x)$$
where $i\sim[n]$ randomly.

# SAGA

Store $\phi_1,\ldots, \phi_n$ in memory, initially 0. In iteration $k$,
$$\wt \nb_k := \nb f_i(x_k) - \nb f_i(\phi_i) + \rc n \sumo jn \nb f_j(\phi_i),$$
where $i\sim [n]$. Update $\phi_i\leftarrow x_k$.

# Intuition

Ensure variance approaches 0, $\E\ba{\ve{\wt nb_k - \nb f(x_k)}^2} \le O(f(x_k) - f(x^*))$.

Gradient complexity is $O\pa{\pa{n+\fc L\si}\ln \prc{\ep}}$. (What is it for SGD?)
