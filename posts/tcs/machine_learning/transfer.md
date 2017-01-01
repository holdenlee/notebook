---
title: Transfer learning
published: 2016-12-29
modified: 2016-12-29
tags: transfer learning
type: notes
showTOC: True
---

# Changes at test time

Ex. Google Flu Trends

Training $x\sim p^*$, test $x\sim q^*$.

Instance weighting: upweight examples underrepresented at test time
$$
\wh L(\te) = \rc n \sumo in \wh w(x) \ell((x,y);\te).
$$

Problems: have to estimate $\wh w$, have to assume $q^*$ is absolutely continuous wrt $p^*$.

# Domain adaptation/multi-task learning

Even $p^*(y|x)$ can be different. 

Solve joint ERM problem assuming weight vectors are close.

Regularize by e.g. $\sum_{i\ne j}\ve{w_i-w_j}^2$, $\ve{W}_*$, or $\ve{W}_{2,1}$ (sum of $L^2$ norms of rows - for sparse set of features).

NN: share same hidden layer.

Deep NN non-robust: perturbation
$$
\min_{r\in \R^d} (f(x+r) - y_{\text{wrong}})^2
+ \la\ve{r}^2.
$$

Robust optimization: $K$ features zeroed out at test time.
