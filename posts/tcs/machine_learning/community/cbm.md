---
title: Censored block model
published: 2016-02-28
modified: 2016-02-28
tags: research
type: research
showTOC: True
---

#Summary

Model: Graph $G$ is given. Each node is iid red/blue with probability $\rc2$. An edge is labeled
$$\begin{cases}+&\text{nodes same color}\\-&\text{nodes different color}\end{cases}.$$
Each edge is flipped independently with probability $\rc2$.

Question: Under what conditions of $G$ can the communities be recovered (up to sign)

* exactly with high ($1-o(1)$) probability?
* with correlation tending to 1? (whp, the number of correctly classified nodes is $1-o(1)$)
* weakly (with $\rc2+\Om(1)$ correlation)?

Past work:

*   [ABSS14] For exact recovery
    * Necessary: $C_\ep \ln n$ average degree.
	* For random graphs $G(n, p)$, $p\ge \fc{2C_\ep\ln n}{n}$ is sufficient. (Factor of 2 gap, later closed by [HWX14])[^q3]
	* Algorithm is SDP relaxation. Sufficient criteria for it to work is that there is a constant spectral gap in the graph. Up to constants, this is the same as having a large Cheeger constant.
	* Spectral criteria are not necessary: for example, for 2 complete graphs with a $\ln n$ sized cut, recovery is possible.
*   Strong recovery
    * [YP14] give a spectral algorithm.
*   Weak recovery - ?
    * For the grid graph, recovery with correlation $(1-Cp^2)$ is optimal, [GRSY15](GRSY15.html).
* Open: What is the SNR-distortion curve[^q4](what is this?) for 2-CBM? What is the limit for recover in the general (asymmetric) CBM?

[^q3]: How? The paper talks about SBM not CBM.

##Literature

* [ABBS14] DECODING BINARY NODE LABELS FROM CENSORED EDGE MEASUREMENTS: PHASE TRANSITION AND EFFICIENT RECOVERY
* [HWX14] Achieving Exact Cluster Recovery Threshold via Semidefinite Programming
* [GRSY15](GRSY15.html) How Hard is Inference for Structured Prediction?
* [YP14] Accurate Community Detection in the Stochastic Block Model via Spectral Algorithms
* [Ban15] RANDOM LAPLACIAN MATRICES AND CONVEX RELAXATIONS

#Necessity

Exact recovery occurs with high probability only if $\fc{d}{\ln n} ge 2\fc{1-\fc{3\tau}2}{(1-2\ep)^2}$.

Proof idea: If more than half of the edges coming out of a node are noisy, then we fail. If the average degree is small, find a large independent set---nodes whose incident edges do not overlap. Now multiply.

#SDP relaxation

##Formulation

Let $\rh_{ij}$ be the edge labels. Relax
$$ \min_{g_i\in \{\pm 1\}} \sum_{ij\in E}(g_i-\rh_{ij}g_j)^2 $$
to
$$\max_{X_{ii}=1,X\succeq0}\Tr(WX),\; W=A_G-2A_H$$
where $A_G$ is the adjacency matrix of $G$ and $A_H$ is the graph where the $-1$'s are.

(Details: we want $\max \rh_{ij}g_ig_j = \max_{g\in \{\pm 1\}^n}Wgg^T$; now replace $gg^T$ with $X$.)

By duality, this is
$$\le \min_{\sum \nu_i E_{ii} \succeq W}\sum \nu_i = \min_{Q\succeq W} \Tr(Q).$$

WLOG, we can take the solution to be $W=11^T$.

By [SDP duality](SDP-duality.html), $X=11^T$ is the optimal solution iff
\begin{align}
\Tr(Q)&=\Tr(W11^T)\\
\Tr(11^T(Q-W))&=0.
\end{align}
I'm pretty confused here.[^q1] If $L_G-2L_H\succeq0$ then we can let $Q=D_G-2D_H$. Claim: If $L_G-2L_H\succeq 0$ and $\la_2(L_G-2L_H)>0$ then the unique solution is $gg^T$. The first condition makes sure that $gg^T$ is an optimal solution, the second makes sure it is unique. (Proof: The gap between a solution $X$ and $Q$ is $\Tr((Q-W)X)$. (We can multiply $Q$ by $X$ because $X_{ii}=1$ and $Q$ is diagonal. The second smallest eigenvalue of $Q-W$ needs to be $>0$ for there to be unique $X$ making this 0.)

[^q1]: Where does the second equation come from? The claim is complementary slackness. But that seems to give $\Tr(W+Q)=0$.

##Random graph

For a randomly chosen $H\subeq G$, what is $\Pj(L_G-2L_H\succeq0)$ large? Write this as a sum of random matrices with expectation 0:
$$
L_G-2L_H = \sum_{i<j} \al_{ij} \La_{ij}, \quad \al_{ij}=\begin{cases}0,&wp(1-p)\\1,&wp(p(1-\ep))\\-1&wp(p\ep)\end{cases}.
$$
Now use matrix Bernstein
$$
\Pj(\la_{\max}(A)\ge t) \le ne^{-\fc{t^2/2}{\si^2+Rt/3}}.
$$
For $|ep\to \rc2$, get the bound that when $\fc{d}{\ln n}\ge 4\fc{1+\de}{(1-2\ep)^2}+o\prc{(1-2\ep)^2}$, get exact recovery w.p. $\ge 1-n^{-\de}$.

##Fixed graph

$G$ is now fixed; all the randomness comes from $A_H$. The eigenvalues of $G$ enter in. See Theorem 5.3. Notably, we need $\la_{\max}$ to be bounded away from 1 (?). This is equivalent up to parameters to having the Cheeger constant be lower-bounded by a constant.

#Thoughts: Fixing a graph

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

