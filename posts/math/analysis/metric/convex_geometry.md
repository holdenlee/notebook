---
title: Convex geometry
published: 2016-04-20
modified: 2016-04-20
tags: none
type: notes
understanding: 1
---

Notes from Vershynin's course [Geometric functional analysis](http://www-personal.umich.edu/~romanv/papers/GFA-book/GFA-book.pdf).

#Functional analysis and convex geometry

**Theorem (Approximate Caratheodory)**: Let $x\in \conv A$. There exist $N$ points $x_i\in A$ such that
$$\ve{x-\rc N\sumo iN x_i}\le \fc{r(A)}{N}.$$
(Given $x$ as a linear combination of elements of $A$, there is a probabilistic algorithm to find this combination.)

(Here, $r(A)$ is the radius of $A$.)

*Proof*. If $x=\sum a_i z_i$, sample by $a_i=\Pj(x=z_i)$. By Chebyshev,
$$\E\ve{x-\rc N \sumo jN z_j}\le \fc{r(A)^2}{N}.$$

*Remark*: This can be [adapted to $L_p$](../../../tcs/coding/ldc.html).

#Banach-Mazur distance

(Skipped.)

#Concentration of measure and Euclidean sections of convex bodies

Observation: Convex bodies like spheres tend to have a lot of mass concentrated in the "middle". This is a very powerful observation: concentration of measure for a set implies concentration for Lipschitz functions on the set.

Johnson-Lindenstrauss says that a random projection approximately preserves distances. A sophisticated way to look at this is the following. We can view this as a concentration result: the norm of the projection of $x$ is a Lipschitz function; it must be concentrated around its mean.

A powerful application of concentration of measure is Dvoretzky's Theorem (big generalization of JL?), which find large Euclidean-like subspaces in general Banach spaces. (What's the relationship between the $\log$ here and in Dvoretzky?)

##Concentration of measure

For a set $A$ let $A_\ep$ denote the $\ep$-neighborhood. 

###Sphere

1. (Isoperimetric inequality) Among all sets with given measure, spherical caps minimize $\si(A_\ep)$. (Proof?)
1. Let $\si$ be the measure on the sphere. For any measurable $A\subeq \bS^{n-1}$ with $\si(A)\ge \rc 2$, $\si(A_\ep)\ge 1-e^{-\fc{n\ep^2}2}$. Proof:
    * For the equator $E$, $\si(E_\ep)\ge 1-2e^{-\fc{n\ep^2}{2}}$. Use isoperimetric inequality.
2.  Corollary: For $f:\bS^{n-1}\to \R$ 1-Lipschitz, letting $M$ be the median,
    $$\si(|f-M|\le \ep) \ge 1-2e^{-\fc{n\ep^2}{2}}.$$
	This remains true if $M$ is replaced by the mean.

###Gaussians

Consider $\R^n$ with measure $\ga$ given by $N(0,I)$. 

1.  (Isoperimetric inequality) Among all sets with given measure, halfspaces minimize $\si(A_\ep)$.
2.  If $\ga(A)\ge \rc2$, then $\ga(A_t)\ge 1-e^{-\fc{t^2}{2}}$.
3.  Corollary: For $f:\R^{n-1}\to \R$ 1-Lipschitz, letting $M$ be the median,
    $$\ge(|f-M|\le \ep) \ge 1-2e^{-\fc{n\ep^2}{2}}.$$
	This remains true if $M$ is replaced by $(\E|X|^p)^{\rc p}$ for any $p\ge 1$.

##Johnson-Lindenstrauss

See [JL](../../../tcs/algorithms/jl.html).

**Theorem (Johnson-Lindenstrauss)**: 
Let $|X|=n$, $X$ a subset of Hilbert space. For any $\ep>0$, there exists a $(1+\ep)$-embedding of $X$ into $\ell_2^k$, $k\ge \fc{C}{\ep^2}\ln n$.

*Proof.* Project randomly using gaussians. We can directly bound the concentration, but let's be more sophisticated.

1.  Project randomly using gaussians. Let $f:\R^{k\times n}\to \R$ be defined by $G\mapsto \ve{Gx}_2$. This is 1-Lipschitz. Use concentration of measure for Gaussian space, and then union bound.
2.  Take a uniformly random projection (ise the Grassmannian, or equivalently, take a uniform rotation followed by a fixed projection). Let $f:\bS^{n-1}\to \R$ be defined by $x\mapsto \ve{Tx}_2$. Use concentration of measure for the sphere.

##Dvoretzky's Theorem

###Statements

Dvoretzky finds large Euclidean subspaces.

1.  **Theorem (General Dvoretzky)**: Let
    $$M(K) = \int_{\bS^{n-1}}\ve{x}\,d\si(x).$$
	There exists a subspace $E$, $\dim E=c(\ep) nM^2$ such that
	$$ \ve{x}\in [1-\ep,1+\ep] M \ve{x}_2.$$
	We can take $c(\ep) = C\fc{\ep^2}{\ln \rc{\ep}}$.
2.  **Theorem (Dvoretzky)**: Let $X$ be $n$-dimensional Banach. Given $\ep>0$ there exists a subspace $E$ of $X$ of dimension $k=k(n,\ep)\to \iy$ as $n\to \iy$, such that $d(E,\ell_2^k)\le 1+\ep$.
3.  **Theorem (Geometric Dvoretzky)**: Let $K$ be a symmetric convex body in $\R^n$. Given any $\ep > 0$, there exists a section $K \cap E$ of $K$ by a subspace $E$ of $\R^n$ of dimension $k = k(n, \ep)\to \iy$ as $n \to \iy$ such that $E \subeq K \subeq (1 + \ep)\mathcal E$ for some ellipsoid $\mathcal E$.

There is an alternative formulation for gaussian space, which is often computationally easier.

Define $\ell_X:=\pa{\int_{\R^n} \ve{x}^2\,d\ga_n(x)}^{\rc 2} = (\E\ve{g}^2)^{\rc 2}$. This is off from $M$ by a factor of $\sqrt n$:
$$ \ell_X\sim \sqrt n M_X.$$
Thus we can replace $M_X$ by $\fc{\ell_X}{\sqrt n}$ in the bound.

###Proofs

1.  Show it suffices to bound on $\ep$-nets, and bound the size of the smallest $\ep$-net.
    1.  Let $\mathcal{N}_\de$ be a $\de$-net of $S_X$. Then
	    \begin{align}
		\ve{T}&\le \rc{1-\de} \sup_{x\in \mathcal{N}_\de}\ve{Tx}\\
		\inf_{y\in S_X} &\ge \inf_{x\in N} - \de\ve{T}.
		\end{align}
		Applying this to the identity map from $\ved_2$ to $\ved$, obtain: if $\ve{x}\in [1-\ep,1+\ep]M$ for all $x\in \cal N$, then for all $x\in \bS^{n-1}$,
		$$\ve{x} \in \ba{1-\ep-2\de, \pf{1+\ep}{1-\de}M}.$$
	2.  There is an $\ep$-net of size $\pa{1+\fc 2\ep}^n$.
1.  General Dvoretzky: Apply concentration of measure to a fixed vector $x$ of the function $\ved$. Union bound over a $\de$-net and approximate the sphere by the $\de$-net using 1.
3.  (Aside) We can calculate $\ell_X$ for many spaces. Standard concentration bounds give
    \begin{align}
	1\le p\le 2\implies \ell_{\ell_p^n} &= c(\ep) n&\implies k(\ell_p^n) &\ge c(\ep)n\\
	q\ge 2\implies \ell_{\ell_q^n} &= c(\ep) q n^{\fc 2q}&\implies k(\ell_q^n) & \ge c(\ep)q n^{\fc 2q}\\
	\ell_{\ell_{\iy}^n} & c\sqrt{\ln n} &\implies k(\ell_\iy^n) & \ge c(\ep)\ln n.
	\end{align}
4.  We show $k(\ell_\iy^n) \asymp\ln n$. Spherical caps!
