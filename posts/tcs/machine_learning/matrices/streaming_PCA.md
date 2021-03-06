---
title: Towards a better understanding of streaming PCA (Yuanzhi Li)
published: 2016-05-10
modified: 2016-05-10
tags: pca
type: talk
showTOC: True
---

Given data $x_i\in \R^d$ sampled from an unknown distribution with $\E[x_ix_i^T]=X$, where $x$'s are independent, compute top $k$ eigenvectors of $X$.

(For the asymmetric $xy^T$ case, finding the top $k$ is harder.)

Normal SVD is not memory efficient; you need to store a $d\times d$ matrix. Goal: compute $k$-SVD in space $O(kd)$.

A popular heuristic is to start with a random initial matrix $U_0\in \R^{d\times k}$. On receiving $x_i$, update $U_i=(I+\eta_i x_ix_i^T)U_{i-1}$ and let $U_i=QR(U)$ (orthogonalization). Let $\eta_i\sim \rc{i}$. (Orthogonalization is not a projection. It's a retraction onto the manifold.)

This works very well in practice but it's complicated to analyze from a theoretical point of view.

Let $g=\si_k-\si_{k+1}$. The bound is $\fc{k}{g^3T}$. We use the measure $\E\ba{\ve{W^TU}_F^2}$ (projection to last $k$ singular values. $U$ is the output, $W$ has the last $d-k$ singular values).

(Rank 1 is just gradient descent; there is no projection.)

Consider the offline case first: we get $X$ directly instead of $x_ix_i^T$. The algorithm is analogous to the **subspace power method**.

* Start with random $U_0\in R^{d\times k}$.
* $U=(I+\eta_iX)U_{i-1}$, $U_i = QR(U)$ decomposition. (This is not linear.)

We can do the QR decomposition in the last step. It seems nonlinear, how can it commute? In practice you need to do QR decomposition for numerical accuracy. "To TCS people" you can move QR decomposition to the end.

Analysis: Let $U_i = UR, U_{i+1} = U'R'$. Then $U_{i+1} = (I+\eta_{i+1}X)(I+\eta_iX) U_{i-1}RR'$.

(For a regret bound, you can't do this.)

This is how subspace QR is proved: you push everything to the end.
<!-- mult update project at end. -->

Let $V$ contain the top $k$ eigenvectors and $W$ the rest. Suppose $v_i=e_i$. Then for $P_t=\prod (I+\eta_{t-i}X)$, $P_t=\smatt{\text{large}}00{\text{small}}$. Multiplying by a random initialization gives $(\text{large}\,\text{small})^T$.

In the online setting, let $P_t=(I+\eta_{t-i}x_{t-i}x_{t-i}^T)$. The offdiagonal part $W_t^TP_tV$ is small compared to the diagonal part.
<!--Ohad strts with something close in Frobenius norm. Once you get in neighborhood, it doesn't wander away. -->

1.  Show the minimal singular value of $V^TP_tV$ is large. This is not easy to bound. (The maximal one can be bounded by trace norm; exchange $\E$ and $\Tr$.)
<!--larger than singular value: martingale concentration-->
    1.  Show $\Tr[(V^TP_tV)^{-T}(V^TP_tV)^{-1}]$ is small. This requires a lot of computation. (Use Sherman-Morrison formula for inverse for rank 1 update.) But this is suboptimal; lose an $\eta$ factor.
<!--use Sherman-Morrison, formula for inverse for rank 1 update-->
    2.  Attempt 2: show concentration. But it doesn't work because it's a product, not a sum. It doesn't even concentrate in the multiplicative scale.
<!--The world is against us, lower bounds are so hard --Sanjeev -->

	    Why? Suppose $k=1$. Think of $X$ as diagonal matrix with first eigenvale large and rest small. $(I+\eta e_1e_1^T)e_1e_1^T$. There is some chance that $x_t$ has some weight in the first and last entry. Then the $(1,d)$ entry of the product is $\rc{4}\eta_t$.
		<!-- In k=1, do epoching. This is not memory efficient? -->

	    Unlike the offline setting, $x_t$ is not perfectly aligned with the eigenspace of $X$; it can grab something from the eigenvector.
    3.  Try induction. Suppose $P_tP_t^T\succ c_tI$. Then $\E (P_{t+1}P_{t+1}^T) > c_t(I + \eta_{t+1}X)$. $\si_{\min}$ is not concave; we don't have $\E[\si_{\min}(A)]>\si_{\min}[\E(A)]$. (Counterexample: take $A=e_ie_i^T$ w.p. $\rc d$.)
	<!-- after taking expected value sigma min is good -->
	    Min singular value is not a good induction hypothesis. <!--hypnosis-->
		Summarize $P_t$ with a number. Let $f:$ matrix $\to$ value.

	    When you try to solve a hard problem, just write down the conditions. --Yin-Tat.

	    "The ideal girlfriend": $f(P_t)$
	    *   is a lower bound on the minimal singular value of $P_t$,
		*   takes care of all singular values of $P_t$,
		*   has diminishing margin (larger singular value have smaller effect)
		*   easy to compute and update
	    The magical $\al$-min-root barrier: unique solution $\la$ of $\sumo in \rc{\si_i - \la} = \al$, $\la\le \si_i$. <!-- monotone decreasing. ZAZ: equivalent to regularizer. barrier view. \la is like normalization parameter. s. entropy for q=1. -->
		It satisfies:
		*   lower bounds the minimum singular value,
		*   when $\al\to \iy$, the barrier approaches $\si_{\min}$.
		*   diminishing influence: larger $\si$ have smaller contribution
		*   monotone: $A\succ B\implies f(A)\succ f(B)$.
		<!-- solution of crazy function-->
		<!-- consider distribution of singular values-->
		Formula: $\sumo in \rc{\si_i-\la} = -\pdd{\la}\log \det(A-\la I)$. Matrix-determinant lemma (from Sherman-Morrison):
		$$\log \det(A-\la I + uv^T) = \pdd{\la} \log \det(A_\la I) + \fc{\pdd{\la}v^T(A-\la I)^{-1}u}{1+v^T(A-\la I)^{-1}u}$$
		Key observation: If $A=U\Si U^T$, then $\pdd{\la}v^T (A-\la I)^{-1} u = \sumo in \fc{(Uuv^TU^T)_{ii}}{(\si-\la)^2}$.
		<!-- barrier function increases-->
		<!-- von Neumann entropy more standard. (Elad and Tengyu uses characteric polynomial)-->
		
		**Rank 1 update lemma**: Let $A$ be a symmetric matrix. Then $\E[f(A+uu^T)]>f(A) + \si_{\min}(\E(uu^T))$.

		Apply this on $P_{t+1}$ vs. $P_t$. Prove the theorem by martingale concentration.
<!-- Matrix doesn't concentrate at all, but min singular value improves. -->
2.  Bound $W^TP_tW$ term. Using trace? But $W^TP_tW$ is not small at all. $W^TP_tW$ "mixes" with $V^TP_tV$; it can't interlace.

    Remove influence of $V^TP_tV$ from $W^TP_tW$.

	But they are not the same dimension.

	Use random initialization: whp $W^TP_tW(W^TQ)(V^TP_tQ)^{-1}$ is small.
<!-- Easiest to explain. PMI, weighted low rank approx, optimal regret for BCO, tight bound for approx convex opt, max-entropy disribution for calc partition, NMF without separability, SVD without being cool.-->
