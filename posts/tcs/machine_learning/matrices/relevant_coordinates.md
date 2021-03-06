---
title: Relevant coordinates
published: 2016-06-02
modified: 2016-06-02
tags: linear algebra++
type: research
showTOC: True
---

#Problem

General problem: Often, given high dimensional data in $\R^n$, only a subset $S\sub [n]$ of coordinates are "relevant". Identify them.

Here are possible formalizations of the problem.

##Clustering

Let $|S|=c_1m$ be a random subset of $[m]$. Let $k$ be fixed. Let $((x^{(i)},\si^{(i)2})\in \R^{S})_{i=1}^k$ be $k$ centers and variances. (Assume some reasonable separation.) Each data point comes from some cluster $i\in [k]$ (ex. uniformly at random). If $x$ comes from cluster $i$, then generate $x$ by
\begin{align}
x_S &\sim N(x^{(i)}, \si^{(i)2})\\
x_j &\sim N(0,1),&j&\nin S.
\end{align}
The goal is to find $S$. (Then we can recover the centers by standard clustering algorithms.)

Note: There may be a cheap way to do this by identifying which coordinates are $\sim N(0,1)$. We want something more generalizable. Ex. assume $x_j\sim N(y_j, \tau_j^2)$. Even better, assume that the $x_j$ are independent but their distribution is arbitrary.

##SVD

Let $A$ be a matrix such that taking the rows with indices in $S$ ($|S|=c_1m$ as above), and suppose that $A$ is $\ep$-close[^f1] in $L^2$ to a rank $k$ matrix, and the rest of the entries are generated as $N(0,1)$. Identify $S$.

A probabilistic version: $A_{S,i}$ is $N(0, \Si)$ where $\Si$ is close to rank $k$.

[^f1]: What $\ep$?

#Approaches

##L1 vs. L2 norm

Look at the $L^1$ norm and variance ($L^2$ norm) of each row.

*   For the noise rows, we have (whp)
    \begin{align}
	A=\EE_{j=1}^n |A_{ij}| & =2\iiy x e^{-\fc{x^2}2}\rc{\sqrt{2\pi}}\dx\\
	B=\EE_{j=1}^n |A_{ij}|^2 - (\EE_{j=1}^n |A_{ij}|)^2 &=1,
	\end{align}
	and the ratio $\fc{\sqrt B}A$ between these is concentrated at some constant (whp).
*	For the non-noise rows,
	\begin{align}
	A=\EE_{j=1}^n |A_{ij}| & > \sfc{2}{\pi}\sum|\si_{k_j}|\\
	B=\EE_{j=1}^n |A_{ij}|^2 - (\EE_{j=1}^n |A_{ij}|)^2 &=\sum_i \si_i^2,
	\end{align}
	and $\fc{\sqrt B}{A}>\sfc{2}{\pi}$.

But this is heavily dependent on the exact distribution of noise! We want something more generalizable.

##Community detection/SDP

Sometimes we can recover even if the noise seems to be larger than the signal, because the noise is uncorrelated. Ex. a random $n\times n$ matrix with $N(0,1)$ entries has eigenvalues on the order of $O(\sqrt n)$.[^f2]
<!-- check this-->

[^f2]: $\Pj(\la_{\max} \ge t) \le 2ne^{-\fc{t^2}{2\si^2}}$. Here $\si^2 = \ve{\sum E_{ij}^2}=\sqrt n$, get concentration to $O(\sqrt n\ln n)$.

Reference: Synchronization problem, Amit Singer.

# Baby problem: Recovering clusters

Problem: Let $x\in \{\pm 1\}^n$. Given $xx^T + E$ where each entry of $E$ is $N(0,\si^2)$, recover $x$ (whp). What level of noise $\si$ can we tolerate?

(We want to recover all of $x$, rather than just something correlated with $x$.)

##Try 1: SVD

The largest eigenvector of $A=xx^T$ is $v_1(A) = x$. By Wedin's Theorem,
$$ \sin\angle(v_1,v_1') \le \fc{\ve{E}_2}{|\la_1(A) - \la_2(A)|} = \fc{\ve{E}_2}{n} \stackrel?{\ll} \rc{\sqrt n}, $$
since the closest vector $w$ to $v_1$ is at an angle $\te$ away where $\cos \te = \fc{n-2}n$, $\sin \te \sim \rc{\sqrt n}$.  So we need $\ve{E}_2=\wt o(\sqrt n)$[^f3].

[^f3]: Write $\wt o(f(n))$ to mean $o\pf{f(n)}{\poly\log(n)}$.

To get $\ve{E}_2=\wt o(\sqrt n)$ we need $\si=\wt o(1)$. Using this method we can only tolerate a level of noise $\ll 1$.

##Try 2: SDP

We want $\min_{x\in \{\pm 1\}^n}\ve{xx^T-A}_F^2$. (Minimize the sum of squares because this is $\propto$ the log-likelihood.)

Relax this:
$$
\amin_{x\in \{\pm 1\}^n}\ve{xx^T-A}_F^2
=\amax_{x\in \{\pm 1\}^n}x_iA_{ij}x_j
=\amax_{x\in \{\pm 1\}^n} \Tr(xx^T)
=\amax_{B\succeq 0 , B_{ii}=1} \Tr(AB)
$$

WLOG the optimal solution is $\one$[^f4]. By SDP duality, $\one\one^T$ is the unique best solution if there exists $Q\succeq 0$, $\Tr(\one\one^T(Q-W))=0$ where $W=A+E$ is observed.

Let's consider when $E$ is symmetric.[^f5] We choose $Q=\diag((\sum_{j}A_{ij})_i)$. Then $M:=Q-W = \mattn{A_{12}+\cdots +A_{1n}}{-A_{12}}{\cdots}{-A_{21}}{A_{21}+A_{23}+\cdots}{\cdots}{\vdots}{\vdots}{\ddots}$.

We can think of this as a sum of random matrices $\matt{1+\ep}{-(1+\ep)}{-(1+\ep)}{1+\ep}$ in the submatrix at indices $\{i,j\}\times \{i,j\}$. The average is $\mattn{(n-1)}{-1}{\cdots}{-1}{n-1}{\cdots}{\ldots}{\ldots}{\ddots}$ with eigenvalues $n,\ldots, n,0$.

There is concentration up to $\sqrt{n\ln n}\si$. We just need this to be $<n$ in order to make the second smallest eigenvalue of $M$ be $>0$. (The smallest eigenvalue is 0.)

Thus we can tolerate noise up to $\si = o\pa{\sfc{n}{\ln n}}$, much better!

[^f4]: Why WLOG?

[^f5]: We can reduce to this case, I think.

**Next step: try to generalize this!**

##More than 2 groups

We want to recover the clustering from $\mattn JOOOJOOOJ$ plus noise.

Let $x\in\R^{3n}$ be the (proposed) clustering, where we think of $x\in (\R^3)^n$ and $x_i=e_j$ if $i$ is in the $j$th cluster.

We want $\min\sum_{i,j} (x_{i1}x_{j1}+x_{i2}x_{j2}+x_{i3}x_{j3} - a_{ij})^2$ over valid $x$'s. For valid $x$'s, the quadratic term is 0 or 1, so we want
$$\amax_{x_{i1}^2+x_{i2}^2+x_{i3}^2=1, x_{i1}+x_{i2}+x_{i3}=1} \sum (a_{ij}-1)(x_{i1}x_{j1}+x_{i2}x_{j2}+x_{i3}x_{j3}).$$
We can write the expression in matrix form as $\an{B,xx^T}$ where $B=(a_{ij}I)_{i,j}$ (block matrix). For a SDP relaxation, replace $xx^T$ with $M$, $M\succeq 0$.

How does this relaxation do?

##Clustering

In clustering we're given $v_1,\ldots, v_n$ each of which is either $v$ or $w$ plus noise. We can find $V^TV$ and work off that matrix.

Look up literature on clustering and learning mixtures of Gaussians.

#SVD

See [Relevant coordinates: low-rank matrix](relevant_coordinates_svd.html).
