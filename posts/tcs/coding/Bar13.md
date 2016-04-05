---
title: [Bar13] Convexity of the image of a quadratic map via the relative entropy distance
published: 2016-04-02
modified: 2016-04-02
tags: none
type: paper
showTOC: True
---

**Theorem**: Let $q_1,\ldots, q_k:\R^n\to \R$ be positive definite quadratic forms, $\psi = (q_1,\ldots, q_k)$. Let $a\in \conv(\psi(\R^n))\cap \De$, where $\De$ is the probability simplex. There exists $b\in \psi(\R^n)\cap \De$ that is at most 4.8 away in KL divergence.

#Dines Theorem

(Just for some motivation here)

When $k=2$, $\psi(\R^n)$ is convex. Proof: When  system of linear equations in $X\succeq 0$ have a solution, and the number of equations is small, there is in fact a low-rank solution. Here, look for a rank 1 solution.

#Proof sketch

Note KL-divergence is easier to deal with---the logs mean that scaling comes out as constants---and is stronger than $L^p$ norms.

1.  Write down what it means for $a$ to be in the convex hull. This means there is $\ga_1,\ldots, \ga_n$, $x_1,\ldots, x_n$ such that
	$$a_i = \sum_j \ga_j \an{Q_i, x_jx_j^T}, \quad \sum\ga_j=1.$$
	Let $X=\sum_j \ga_j x_jx_j^T$. This is
	$$a_i = \an{Q_i, X}.$$
	Let $b=\psi(x)$ be the approximation we want to find. Then the KL divergence is
	$$\sum_i a_i\ln \fc{a_i}{q_i(x)},$$
	so we want to maximize
	$$\sum_i a_i \ln q_i(x).$$
	We want a bound that looks like something like the following
	$$\sum_i a_i \ln q_i(x)\ge \pa{\max_{X\succeq 0} \sumo ik a_i\ln a_i} - \be. $$
	However, we need to make sure we normalize everything consistently. A simple way to do this is to use a similarity transformation to make $\sum Q_i = I$, possible since the $Q_i$ are positive definite. Then the condition $\sum a_i=1$ becomes $1=\sum_i \an{Q_i, X}= \Tr(X)$. We maximize over all $X$ satisfying this. We would like the $b=\psi(x)$ we get to have $\sum b_i=x^Tx = 1$ as well. Thus, we would like to show (Theorem 3.2)
	$$\max_{x\in \bS^{n-1}} \sum_i a_i \ln q_i(x)\ge \pa{\max_{X\succeq 0, \Tr(X)=1} \sumo ik a_i\ln \an{Q_i,X}} - \be.$$
2.  Prove Theorem 3.2 by SDP rounding. Let $X$ be the optimal solution, write $X=T^2$. In SDP rounding, take $x\sim N(0,I)$, $y=Tx$, and hope that $y$ is a good solution to the original problem. (If $X=xx^T$, then $T$ would be a projection.) We use the Quadratic Sampling Lemma---the expectation of $q(y)$ for any quadratic $q$ is the same as the $\an{Q,X}$.

    Thus $\E q_i(y) = \an{Q_i,X}=1$.

    Now do some calculations (Lemma 2.1). Calculate that
    \begin{align}
    \E |\ln q_i(y)| & \le C_1 \implies \E\ab{\sumo ik a_i \ln q_i(y)}\le C\\
    \Pj( \ve{y}^2 \ge C_2) & \le \ep_3
    \end{align}
    for some $C_1,C_2,\ep_3$. Use Markov's inequality on the first inequality. Find there is a point with $\ve{y}^2<C_2$, $\sumo ik a_i\ln q_i(y)>-C_4$. Let $y' = \wh y$ be the solution.
