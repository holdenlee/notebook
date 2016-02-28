---
title: Censored block model
published: 2016-02-28
modified: 2016-02-28
tags: research
type: research
---

Model: Graph $G$ is given. Each node is iid red/blue with probability $\rc2$. An edge is labeled
$$\begin{cases}+&\text{nodes same color}\\-&\text{nodes different color}\end{cases}.$$
Each edge is flipped independently with probability $\rc2$.

Question: Under what conditions of $G$ can the communities be recovered (up to sign)

* exactly with high ($1-o(1)$) probability?
* with correlation tending to 1? (whp, the number of correctly classified nodes is $1-o(1)$)
* weakly (with $\rc2+\Om(1)$ correlation)?

Past work:

*   [ABSS12] For exact recovery
    * Necessary: $C_\ep \ln n$ average degree.
	* For random graphs $G(n, p)$, $p\ge \fc{2C_\ep\ln n}{n}$ is sufficient. (Factor of 2 gap, later closed by [??])
	* Algorithm is SDP relaxation. Sufficient criteria for it to work is that there is a constant spectral gap in the graph. Up to constants, this is the same as having a large Cheeger constant.
	* Spectral criteria are not necessary: for example, for 2 complete graphs with a $\ln n$ sized cut, recovery is possible.
*   Strong recovery - ?
*   Weak recovery - ?

Suggestion: Let $X$ be the node colors and $Y_\ep$ be the observed edges. Consider the entropy $H(X|Y_\ep)$. This is like a measure of connectivity "on average." Ex. When $\ep=0$, this measures the number of components. Think of it as a average-case Cheeger: rather than look at the proportionally minimal cut, we're looking at an average cut size. (Related is the probability of success for ML decoding, which is $\E_{X,Y_\ep}P(X|Y)$.)

Thoughts: Any nontrivial partition $A\sqcup B= V$ of the vertices is associated with a cut. For a set $S$, let $X_S$ be $X$ with the colors of vertices in $S$ flipped. Given observed $Y_\ep$, $P(X_S|Y_\ep)\ge P(X|Y_\ep)$ iff most of the edges of the cut $(A,V\bs A)$ are flipped. Thus, the ML decoding is the $X$ such that in no cut is the majority of the edges wrong.

Let $G_C$ be the (good) event that the majority of edges of cut $C$ are correct. Letting $|C|$ be the number of edges in the cut,
\begin{align}
P\pa{\bigwedge_C G_C} & \ge \prod P(G_C) & \text{Correlation inequality} \\
& = \prod_C P(\Binom(|C|, 1-\ep) > \fc{|C|}2)\\
& = \prod_C (1-e^{-K_\ep|C|})\\
& \ge 1-\sum_C e^{-K_\ep|C|}.
\end{align}
(By Chernoff, we can take $K_\ep = \fc{(\ep-\rc2)^2}{2\ep(1-\ep)}$.)

Question: is there an efficient algorithm to approximate $\sum_C e^{-K|C|}$? By Karger's algorithm, we can estimate the number of minimum cuts. By sampling, we can estimate the number of cuts of some size if it's $>\rc{\poly}$ proportion. But what about all cuts in between?

Note: The inequalities are not close to sharp because the events are very correlated when the cuts overlap a lot. Somehow it should be more affected by small cuts which *don't* share a lot of edges in common.
