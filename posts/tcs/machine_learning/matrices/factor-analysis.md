---
title: Factor analysis
published: 2016-06-28
modified: 2016-06-28
tags: factor analysis
type: notes
showTOC: True
---

[Reference](http://cs229.stanford.edu/notes/cs229-notes9.pdf)

If $n\gg m$, and we have data points $x^{(i)}\in \R^n$, $1\le i\le m$, how can we find Gaussian structure? We don't have enough data points to even fit a single Gaussian.

#Solution 1: Assume independence

If the covariance matrix $\Si$ is diagonal, minimize the negative log likelihood
$$\sum\pa{\pf{\pa{x_j^{(i)}-\mu_j}^2}{2\si_j^2} + \ln \si_j}$$
to get $\Si_{jj} = \EE_{i=1}^m (x_j^{(i)}-\mu_j)^2$. If $\Si=\si I$, then $\si^2 = \EE_{i,j}(x_j^{(i)}- \mu_j)^2$.

#Solution 2: Factor analysis

Break the coordinates into 2 parts $x$ and $z$ and assume
\begin{align}
z&\sim N(0,I)\\
\ep &\sim N(0,\Psi)\\
x &= \mu+ \La z + \ep.
\end{align}
Calculate
$$\coltwo zx \sim N\pa{\coltwo 0\mu, \matt{I}{\La^T}{\La}{\La\La^T+\Psi}}.$$
Now do EM on the log likelihood with respect to $z$ and $\La$. (details...)

* "This is just matrix factorization."
* "Often allows more domain knowledge to be incorporated."
