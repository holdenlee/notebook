---
title: Goemans-Williamson
published: 2016-04-02
modified: 2016-04-02
tags: none
type: concept
---

See also [SoS](../complexity/sos.html).

(From Algorithms 15)

Relaxing a combinatorial optimization to a SDP: let $x_i$ be unit vectors instead of $-1,1$. Recover by partitioning with a random hyperplane. Ex. for min-cut, $\sum_{\{i,j\}\in E}\rc 4|v_i-v_j|^2$.

We find
$$
\E(\text{cut edges})=\sum_{ij\in E}\fc{\te_{ij}}{\pi}\ge\ub{\min_{\te\in [0,\pi]}\fc{2\te}{\pi(1-\cos\te)}}{\approx .878} \sum_{ij\in E} \rc2(1-\cos\te_{ij}).
$$

For MAX-2SAT, have a dummy vector $u_0$ for true (so that variable assignments correspond to $u_i=\pm u_0$), maximize
\begin{align}
OPT=\sum1-\rc4(u_0-u_{k1})(u_0-u_{k2})&=\sum \rc 4(1+u_0\cdot u_{k1})+\rc 4(1+u_0\cdot u_{k2})+\rc 4(1 - u_{k1}\cdot u_{k2})\\
&=\sum \rc4(1 +\cos \fc{\te_{0,k1}}{\pi})+\cdots \\
\E&=\sum\rc 4(1-\fc{\te_{0,k1}}{\pi})+\cdots\\
&\ge \min_{\te\in[0,\pi]}\fc{2(\pi-\te)}{\pi(1+\cos\te)}\cdot OPT,
\end{align}
so we get .878-approximation.
