---
title: Martingales
published: 2016-04-08
modified: 2016-04-08
tags: none
type: notes
showTOC: True
---

Durrett Ch. 5

#Conditional expectation

#Martingales, Almost Sure Convergence

#Examples

#Doob's inequality, $L^p$ convergence

1.  If $X_n$ is a submartingale and $N$ is a stopping time with $\Pj(N\le k)=1$, then
	$$ \E X_0\le \E X_N \le \E X_k.$$
	(Note the first inequality is not true in general if $N$ is unbounded.)
	*Proof.*
	1. Show that $X_n - X_{N\wedge n}$ is a submartingale. To see this, wrie it as a dot product with a predictable sequence, $X_n-X_{N\wedge n} = (1_{\{n-1 \ge N\}}\cdot X$.[^f41]
	2. (Alternative) Condition on $N$ and use the submartingale property. See exercise 1.
2.  **Doob's inequality**: Let $X_m$ be a submartingale, $\ol X_n = \max_{0\le m\le n} X_m^+$, $\la>0$. Then
    $$ \la \Pj(A) \le \E X_n 1_A \le \E X_n^+.$$

    *Proof.* Interpret the event $A$ as early stopping by defining the stopping time $N=\inf \set{m}{X_m\ge \la \text{ or }m=n}$. Now apply 1.

    *Corollary*: Kolmogorov's inequality
3.  **$L^p$ maximum inequality**: If $X_n$ is a submartingale then for $p>1$,
    $$ \E (\ol X_n^p) \le \pf{p}{p-1}^p \E(X_n^+)^p.$$
	*Proof.* Our "only tool" is to use Doob's inequality to bound $\Pj(\ol X_n\ge \la)$ (actually, $\ol X_n\wedge M$). To make this term appear, bound $\E[(\ol X_n\wedge M)^p]$ by $\int_0^{\iy} p\la^{p-1}\Pj(\ol X_n\wedge M \ge \la)$. We get one less power of $\ol X_n \wedge M$ on the RHS. Use Holder and bootstrap.
4.  ($L^1$ version)
5.  **$L^p$ convergence theorem**: If $X_n$ is a matringale with $\sup \E|X_n|^p<\iy$ when $p>1$, then $X_n\to X$ a.s. and in $L^p$.
    *Proof.* The hypothesis implies $(\E X_n^+)$ is bounded so a.s. follows from martingale convergence. To show $X_n\to X$ in $L^p$, it suffices to show that $|X_n-X|^p\le Y$ with $\E|Y|<\iy$ and $X_n\to X$ a.s. (Dominated convergence theorem.) Bound $|X_n-X|^p\le (2\sup |X_n|^p)$ and use $L^p$ maximal inequality to bound the RHS (use MCT on $\sup_{0\le m\le n}X_n$).
6.  **Orthogonality of martingale increments**: Let $X_n$ be a martingale with $\E X_n^2<\iy$ for all $n$. If $m\le n, Y\in \cal F_m, \E Y^2<\iy$, then
    $$ \E[(X_n - X_m)Y]=0. $$
	*Proof.* Cauchy Schwarz gives this is $L^1$. Now just use the martingale property.
7.  **Conditional variance formula**: If $X_n$ is a $L^2$ martingale, $\E[(X_n-X_m)^2|\cal F_m]=\E [X_n^2|\cal F_m]-X_m^2$.
8.  **Branching processes**: Letting $X_n=Z_n/\mu^2$, use 7 to get an expression for $\E[X_n^2|\cal F_{n-1}]$ and $\E X_n^2$. This shows $\sup \E X_n^2<\iy$, so $X_n\to X$ in $L^2$.

##Exercises

1. Use submartingale property with the fact that $N=j$ is in $\cal F_j$. Now sum over $N$.
2. 
3. 
4. ?
5. 

[^f41]: Recall this means dot product with the differences.


A good counterexample is the 1-D simple random walk starting at 1 with absorbing barrier at 0.

1. We have $\E X_0=1>\E S_N$ where $N=\inf\set{n}{S_n=0}$.
2. We have $\E(\max_m X_m) = \iy$, so no $L^1$ maximal inequality holds.

