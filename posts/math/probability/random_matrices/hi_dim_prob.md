---
title: High-dimensional probability
published: 2016-08-01
modified: 2016-08-04
tags: random matrix
type: notes
showTOC: True
---

Based on Ramon von Handel's ORF570 notes.

# Introduction

Themes:

* concentration: if $X_{1:n}$ are independent or weakly dependent random variables, and $f$ is not too *sensitive* to any coordinate, then $f(X_{1:n})$ is *close* to its mean.
* suprema
* universality

# Variance bounds and Poincare inequalities

## 2.1

Trivial bound:
$$ \Var[f(X)]\le \rc4 (\sup f - \inf f)^2 \qquad \Var[f(x)] \le \E[(f(X)-\inf f)^2].$$

Tensorization gives a bound for functions of independent random variables from bounds for functions of each individual random variable.

**Theorem** (Tensorization of variance):
    $$\Var[f(X_1,\ldots, X_n)]\le \E\ba{\sumo in \Var_i f(X_1,\ldots, X_n)}$$
	whenever $X_{1:n}$ are independent.

This is sharp for linear functions.

*Proof*. Write
$$ f(X_{1:n}) - \E f(X_{1:n}) = \sumo kn \ub{\E[f(X_{1:n}|X_{1:k})] - \E[f(X_{1:n})|X_{1:k-1}]}{\De_k}. $$
The $\De_k$ form a martingale. By independence of martingale increments,
\begin{align}
\Var(f) &= \sumo kn \E[\De_k^2] \\
\E[\De_k^2] &= \E[\E[\wt \De_k |X_{1:k}]^2]\\
& \le  \E[(\ub{f - \E[f|X_{1:k-1,k+1:n}]}{\wt \De_k})^2] & \text{Jensen}\\
&= \E\ba{\sumo in \Var_f f(X_1,\ldots, X_n)}.
\end{align}

Define
\begin{align}
D_i f(x) &= (\sup_z-\inf_z)(f(x_{1:i-1},z,x_{i+1:n}))\\
D_i^- f(x) &= f(x) - \inf_z(f(x_{1:i-1},z,x_{i+1:n}))\\
\end{align}

**Corollary** (Bounded difference inequality): Tensorization + trivial inequality.

**Example**: Consider Bernoulli symmetric matrices. What is the variance of $\la_{\max}(M) = \an{v_{\max}(M), Mv_{\max}(M)}$? 
Fix $i,j$. Let
$$M^- = \amin_{\text{only }M_{ij} \text{ varies}} \la_{\max}(M).$$
Then
$$D_{ij}^-\la_{\max}(M) \le \an{v_{\max}(M), (M-M^-) v_{\max}(M)}\le 4|v_{\max}(M)_i||v_{\max}(M)_j|.$$
Use the corollary to get $\le 16$.

This is not sharp. ($\sim n^{-\rc 3}$ is correct.)

Drawbacks to this method:

* bounds using bounded di↵erence inequalities are typically restricted to situations where the random variables $X_i$ and/or the function $f$ are bounded.
* Bounded difference inequalities do not capture any information on the distribution of $X_i$. In the other direction, the tensorization inequality is too distribution-dependent.
* Tensorization depends on independence.

Inequalities in this section are roughly of the following form (Poincare inequalities):
$$\Var(f) \le \E[\ve{\nb f}^2].$$
"The validity of a Poincar´e inequality for a given distribution is intimately connected the convergence rate of a Markov process that admits that distribution as a stationary measure."

## Markov semigroups

A **Markov process** satisfies: For every bounded measurable $f$ and $s,t\in \R_+$, here is a bounded measurable $P_sf$ such that
$$\E[f(X_{t+s})|\{X_r\}_{r\le t}] = (P_s f)(X_t).$$
$\mu$ is **stationary** if $\mu(P_tf)=\mu(f)$ for all $t\in \R_+$, bounded measurable $f$.

**Lemma 2.7**. $\{P_t\}_{t\in \R_+}$ defines a semigroup of linear operators on $L^p(\mu)$. It is contractive and conservative ($P_t1=1$ $\mu$-a.s.).

*Proof*. Jensen.

The semigroup in fact acts on any $f\in L^1(\mu)$.

**Lemma 2.9**. If $\mu$ is stationary, for every $f$, $\Var_\mu(P_tf)$ is decreasing.

*Proof*. $L^2$ contractivity and semigroup property.

The **generator** is
$$\cal L f = \lim_{t\searrow 0} \fc{P_tf-f}t.$$
The set of $f$ where this is defined is the domain; $\cal L:\text{Dom}(\cal L) \to L^2(\mu)$.

Warning: for Markov processes with continuous sample paths, such as Brownian motion, $Dom(\cL)\sub L^2(\mu)$. Functional analysis is required for rigor, but results usually extend.

$P_t$ is the solution of the Kolmogorov equation
$$ \ddd{t} P_t f = P_t \cL f, \quad P_0f=f.$$
The generator and semigroup commute.

A finite-state Markov process with
$$ \Pj[X_{t+\de}=j|X_t=i] = \la_{ij} \de + o(\de), \quad i\ne j$$
has generator equal to the transition matrix $\La$.[^f1]

[^f1]: The kernel is the same as $\La$ except it also records the probbability of staying. $K-I = \La$.

Then $P_t=e^{t\La}$. (In the non-finite case, this makes sense as a power series.)

$P_t$ is **reversible** if $P_t$ are self-adjoint on $L^2(\mu)$:
$$\an{f,P_tg}_\mu = \an{P_tf,g}_\mu.$$
Reversibility implies
$$P_tf(x) =\E[f(X_t)|X_0=x] = \E[f(X_0)|X_t=x];$$
i.e., the Markov process viewed backwards has the same law.
<!-- delta functions? -->

For finite state space, this is equivalent to
$$\mu_i \La_{ij} = \mu_j \La_{ji},$$
**detailed balance**.[^f2]

[^f2]: $K^*(x,y) = \fc{K(y,x)}{\pi(x)}\pi(y)$.

**Definition**. A Markov semigroup is **ergodic** if $P_tf \to \mu f$ in $L^2(\mu)$ as $t\to \iy$ for every $f\in L^2(\mu)$.

> A measure $\mu$ satisfies a Poincare inequality for a certain notion of
> "gradient" if and only if an ergodic Markov semigroup associated to
> this "gradient" converges exponentially fast to $\mu$.

The **Dirichlet form** is
$$\cal E(f,g) = -\an{f,\cL g}_\mu.$$
Note: for complex-valued functions, we take the real part.

**Theorem** (Poincare inequality). Let $P_t$ be reversible ergodic Markov semigroup with stationary measure $\mu$. For $c\ge 0$, TFAE:

1. (Poincare inequality) $\Var_\mu(f) \le c\cal E(f,f)$
2. $\forall f, t, \ve{P_t f- \mu f}_{L^2(\mu)} \le e^{-\fc tc}\ve{f-\mu f}_{L^2(\mu)}$
3. $\forall f, t, \cal E(P_t f, P_t f) \le e^{-2t/c} \cal E(f,f)$
4. $\forall f \exists \ka(f), \ve{P_t f-\mu f}_{L^2(\mu)} \le \ka(f) e^{-\fc tc}$.
5. $\forall f \exists \ka(f), \cal E(P_tf,P_tf)\le \ka(f)e^{-2t/c}$.

Note $5\Leftarrow 3\implies 1\Leftrightarrow 2\Rightarrow 4$ doesn't require reversibility.

Example: Gaussian distribution

1.  Define the **Ornstein-Uhlenbeck process** by
    $$X_t = e^{-t} X_0 + e^{-t} W_{e^{2t}-1}, \quad X_0\perp W$$
	where $W_t$ is standard Brownian motion. Note $N(0,1)$ is stationary.
2.  Using Gaussian integration by parts $\E_{N(0,1)} [\xi f(\xi)] = \E_{N(0,1)} [f'(\xi)]$, show that
    * $X_t$ is a Markov process with semigroup $\E[f(e^{-t} x + \sqrt{1-e^{-2t}}\xi)]$, $\xi\in N(0,1)$.
	* The generator is $\cL f(x) = -xf'+f''$.
	* $\cE (f,g) = \an{f',g'}_\mu$.
    * In particular, $\cE(f,f) = \ve{f'}^2_{L^2(\mu)} = \E[f'(\xi)^2]$ is exctly the expected square gradient.
3.  From the expression for $P_t$ obtain $\ddd{x} P_t f(x) = e^{-t} P_t f'(x)$. Then $\cE (P_tf,P_tf) \le e^{-2t} \cE(f,f)$. Hence for $\mu=N(0,1)$, 
    $$\Var_\mu(f) \le \ve{f'}_{L^2(\mu)}.$$
4.  By tensorization,
	$$\Var_\mu(f) \le \E[\ve{\nb f(X_1,\ldots, X_n)}^2].$$

Note: The O-U process is the solution of the stochastic differential equation
$$dX_t = -X_t \,dt + \sqrt2 \, dB_t.$$
Revisit this after I learn stochastic calculus.

Tensorization using Poincare inequality:

1.  Construct a random process $X_t=(X_t^1,\ldots, X_t^n)$ by having coordinates re-randomize according to independent Poisson processes.
2.  Then
    $$P_tf(x) = \sum_{I\subeq [n]} (1-e^{-t})^{|I|} e^{-t(n-|I|)} \int f(x_1,\ldots, x_n) \prod_{i\in I}\mu_i(dx_i)+o(t).$$
	(Note the integral is only over the indices in $I$.) Only the $|I|=1$ terms matter in the limit (makes sense, we're taking the derivative!),
	\begin{align}
	\cL f &= -\sumo in \de_i f\\
	\de_if(x)&:= f(x) - \int f(x_1,\ldots, x_{i-1}, z, x_{i+1},\ldots, x_n)\,\mu_i(dz).
	\end{align}
3.  $\int h\de_i g\,d\mu=0$ if $h$ does not depend on $x_i$. Thus $\cE(f,g) = \sumo in \int \de_i f\de_i g\,d\mu$. This is symmetric, so the process is reversible.
4.  We have $\cE(f,f) = \sumo in \int \Var_if \,d\mu$, so the tensorization inequality is exactly $\Var_\mu(f) \le \cE(f,f)$.
5.  Conclude ergodicity. Conversely, we can prove the tensorization inequality from ergodicity: Note
    $$\de_i P_t f=e^{-t} \sum_{I\nin i} (1-e^{-t})^{|I|} e^{-t(n-1-|I|)} \int \de_i f\prod_{i\in I}\mu_i(dx_i)$$
	so $\cE(P_tf,P_tf) \le \ka(f) e^{-2t}$.

## 2.4 Variance identities and exponential ergodicity

We prove the Poincare inequality.

1. **Lemma**. $$\ddd t \Var_\mu(P_t f) = -2\cal E(P_tf,P_tf)$$. *Proof*. Use $\mu(P_tf)=\mu(f)$. Both are equal to $\mu(2P_t f\ddd tP_tf)$.
2. **Corollary**. $\cE(f,f)\ge 0$.
3. Integral representation of variance: If the Markov semigroup is ergodic, integrating gives $\Var_\mu (f) = 2\iiy \cE(P_tf,P_tf)\,dt$.
4. ($3\implies1$) Use the integral representation.
5. ($1\implies2$) Using $\cal E\propto -\ddd t \Var$, get a differential inequality that gives exponential decay.
6. ($2\implies1$) Write $\cE$ as a limit and apply the inequality to $\Var$.
7.  If $P_t$ is reversible, then $t\mapsto \log\ve{P_t f}_{L^2(\mu)}^2$, $\log \cE(P_tf,P_tf)$ are convex. Proof. First derivative is $-\fc{2\an{\cL P_tf, f}}{\ve{P_tf}^2}$. Differentiate again, use CS.
8.  ($2\implies3$) The first derivative is increasing. Rearrange to get
    $$\fc{\cE(P_tf,P_tf)}{\cE(f,f)}\le \fc{\ve{P_tf}_{L^2(\mu)}^2}{\ve{f}_{L^2(\mu)}^2}$$.
9.  ($4\implies2$, $5\implies3$) Use the lemma: if $g$ is convex and $g(t)\le K-\al t$ for $t\ge 0$ then $g(t)\le g(0)-\al t$ for $t\ge 0$.

Intuition: If reversibility holds,
\begin{align}
\cE(f,g) &=\rc2 \sum \mu_i \La_{ij} (f_i-f_j)(g_i-g_j)\\
\cE(f,f) &=\rc2 \sum \mu_i \La_{ij} (f_i-f_j)^2.
\end{align}
[^f3]In finite dimensions, if $\mu f=0$,
$$
\cE(f,f) \ge (\ub{\la_1}0-\la_2) \Var_\mu(f).
$$
The best constant in the Poincare inequality is the spectral gap. The spectral gap controls the exponential convergence rate. Note it's essential that $\La$ admits a real spectral decomposition.

[^f3]: (cf. Laplacian)

##Problems

1. Use $\Var\pa{\ve{\rc n \sumo kn X_k}_B} = \sup_{y\in B^*} \an{\rc n\sumo kn X_k, y}$. Use the corollary, get $D_k^-\le 2 \sup_{y\in B^*}\an{\rc X_k,y} \le \fc{2C}{n}$. Now square and sum.
2. .
3. .
4. .
5. We have $(f(x) - f(..., a, ...))^2\le \ve{(b-a)\nb f}^2$. Now take expectations and sum over different coordinates.
6. .
7.
8. 
    1.  Smooth $f$ and use the Gaussian Poincare inequality.

	    Note we have $\Var[f(x)]\le \E[(f(x)-f(0))^2]\le \E L^2x^2 = L^2$ but this doesn't help us, because if we sum up derivatives along different coordinates, we overestimate $L$ to $Ln$ instead.
	2.  Note $(\Si^{\rc Y})_i$ is $\ve{(\Si^{\rc 2})_i}$-Lipschitz, so $\max((\Si^{\rc 2}Y)_i)$ is $\max \ve{(\Si^{\rc 2})_i}$-Lipschitz. By (a),
		$$ \Var[\max_i X_i] \le \max\ve{(\Si^{\rc 2})_i} = \max \ve{\Si_{ii}} =\max_i \Var(X_i).$$
	3. The sum of variances on the LHS is $\sum_j \sum_i F_{x_j}^2 = \ve{\nb F}^2$. Use the central limit theorem to show that the LHS var approaches the RHS var. There's a factor of $(\max -\min)^2/4=1$. 
9.
10.
    1.  Let $p_I$ denote the probability of seeing sequence $I$ of jumps in $[0,t]$. (We don't need to calculate it.) Let $\Pj(x|I)$ be the probability of $x$ after observing jumps in $I$. We have
	    $$\E [f(Z_t)] = \sum_I p_I \int \Pj(x|I) f(x)\dx$$
		which can be written $P_tf$. Note this converges. ($\sum_I p_I = 1$.)
	2.  Only the $|I|=\phi, 1$ terms are significant as $\sum_{|I|=k} p_I = Poisson(n, t, k)$.

	    \begin{align}\cL f &= \lim_{t\to 0^+} \pf{e^{-tn} \E f - \E f + \sum (1-e^{-t}) e^{-t (n-1)} \int f\, \mu_i (dx_i|x)}{t}\\
		&= \sum_{i=1}^n \ub{\pa{\pa{\int f(x)\mu_i(dx_i|x)} - f(x)}}{=: - \de_if}\\
		\cE (f, g) &= -\int f \cL g\,d\mu\\
		&= -\int \pa{-\sumo in f\de_i g}\,d\mu\\
		&= \sumo in \int \de_if\de_ig\,d\mu
		\end{align}
		where we used $\int (f-\de_if)\de_ig=0$ because the first term has mean 0 and $\de_ig$ doesn't depend on $x_i$.
	3.
		\begin{align}
		\De_i f &= \max_x |f(..., 1_i,...) - f(..., -1_i, ...)|\\
		\De_j f \,d\mu_i & = \max_x \ab{\int f(\ldots 1_j\ldots)\,d\mu_i - \int f(\ldots -1_j\ldots)}\\
		&\max_x |\Pj(x_i=1|x_{-i, j\leftarrow 1}) f(1_j1_i) - \Pj(x_i=1|x_{-i, j\leftarrow-1}) f(-1_j1_i) + \Pj(x=-1|\cdots)\cdots
	    \end{align}
		The probabilities of $=1|1$ and $=1|-1$ differ by $C_{ij}$ (n.b. typo) so we get
		\begin{align}
		&\le \max_x |f(x,1_j) - f(x,-1_j)| + C_{ij} \De_i f = \De_j f + \De_i fC_{ij}.
	    \end{align}
	4.
		\begin{align}
		\De_j\pa{f+\fc tn \cL f} &=
		\De_jf + \fc tn \De_j \pa{\pa{\int f(x) \,d\mu_i (dx_i|x)} - f(x)} \\
		&\le \pa{1-\fc tn}\De_j f + \fc tn \sumo in \De_i fC_{ij}\\
		\De(f+t\cL f/n) &\le \De f(I-t(I-C)/n).
	    \end{align}
	5.  Iterate $n$ times and take $n\to \iy$ to get
	    $$\De (e^{t\cL}f) = \De P_t f \le \De f e^{-t(I-C)}.$$
	6.
		\begin{align}
		\cE(f, f)&=\sumo in \int (f-\int f\,d\mu_i)^2\,d\mu\\
		&\le \sumo in |\De_i f|^2\\
		\cE(P_tf,P_tf) &\le \sumo in \ve{\De f e^{-2t(I-C)}}^2\\
		&\le \ka(f) (\la_{\min}(I-C))^{-1} \\
		& = \ka(f) (1-\la_{\max}(C))^{-1}
	    \end{align}
		Use $5\implies 1$ of Poincare.

#3 Subgaussian concentration and log-Sobolev inequalities

**Lemma 3.1** (Cheroff bound). Define the **log-moment generating function**
\begin{align}
\psi(\la) :&= \log \E[e^{\la (X-\E X)}]\\
\psi^*(\la)&=\sup_{\la \ge 0} (\la t-\psi(\la)).	
\end{align}
Then $\Pj(X-\E X \ge t) \le e^{-\psi^*(t)}$ for all $t\ge 0$.

*Proof*. Exponentiate and Markov.

The log-moment generating function is continuous and can be investigated using calculus.

**Example**. Gaussian: $\psi(\la) = \fc{\la^2\si^2}2$ and $\psi^*(t) = \fc{t^2}{2\si^2}$ so bound of $e^{-\fc{t^2}{2\si^2}}$.

A rv is $\si^2$-**subgaussian** if $\psi(\la)\le \fc{\la^2\si^2}2$. Then we get tail bounds of $e^{-\fc{t^2}{2\si^2}}$.

**Lemma 3.6** (Hoeffding): If $X\in [a,b]$ a.s., then $X$ is $(b-a)^2/4$ subgaussian.

*Proof*. Interpret $\psi''$ as a variance, get $\psi''\le \fc{(b-a)^2}{4}$, integrate twice.

##3.2 The martingale method

We want to show $f$ is subgaussian with variance proxy controlled by a "square gradient" of $f$.

The subgaussian property does not tensorize.

The proof of subgaussian inequailties can be reduced to a strengthened form of Poincare inequalities, **log-Sobolev** inequalities, that do tensorize.

**Lemma** (Azuma): Let $\cF_k$ be a filtration, and
1. (Martingale difference) $\De_k$ is $\cF_k$-measurable, $\E[\De_k |\cF_{k-1}]=0$.
2. (Conditional subgaussian) $\E[e^{\la \De_k}|\cF_{k-1}]\le e^{\la^2\si_k^2/2}$. Then $\sumo kn \De_k$ is subgaussian with variance proxy $\sumo kn \si_k^2$.

**Corollary** (Azuma-Hoeffding): Replace (2) by $A_k\le \De_k\le B_k$ where $A_k,B_k$ are $\cF_{k-1}$-measurable. The variance proxy is $\rc 4 \sumo kn \ve{B_k-A_k}^2_{\iy}$. The tail bound is $\exp\pa{-\fc{2t^2}{\sumo kn \ve{B_k-A_k}^2_{\iy}}}$.

**Theorem 3.11** (McDiarmid): For $X_{1:n}$ independent, $f(X)$ is subgaussian with variance proxy $\rc 4\sumo kn \ve{D_kf}_{\iy}^2$ where
$$D_if(x) = (\sup_z-\inf_z)f(x_{1:i-1},z,x_{i+1:n}).$$

*Proof*. Use Azuma-Hoeffding on martingale differences $\De_k =\E[f|X_{1:k}] - \E[f|X_{1:k-1}]$.

This is unsatisfactory because the variance proxy is controlled by a uniform upper bound on square gradient rather than its expectation. Something like $\ve{\sumo kn |D_kf|^2}_{\iy}$ would be better.

## 3.3 The entropy method

The subgaussian property is equivalent to $\la^{-1}\psi(\la)\precsim \la$, so it suffices to show $\ddd{\la}(\la^{-1}\psi)\precsim 1$.

* Define $\Ent(Z) = \E[Z\ln Z] - (\E Z)(\ln \E Z)$.
* (Entropic formulation of subgaussianity) $\forall \la \ge 0, \Ent(e^{\la X}) \le \fc{\la^2\si^2}{2} \E e^{\la X}\implies \forall \la \ge 0,  \psi(\la) \le \fc{\la^2\si^2}2$.
    * *Proof*. Integrate $\ddd{\la} \fc{\psi(\la)}{\la} = \rc{\la^2} \fc{\Ent(e^{\la x})}{\E (e^{\la x})}$.
* Variational characterization of entropy: $\Ent(Z) = \sup\set{\E(ZX)}{\E(e^X)=1}$.
    *   *Proof*.
	    \begin{align}
		\Ent(Z) - \E[ZX] &= \Ent_Q (e^{-X}Z)\ge0
	    \end{align}
		with equality when $X=\ln\pf{Z}{\E Z}$.
* Tensorization: $\Ent(f) \le \E\ba{\sumo in \Ent_i f}$.
    *   *Proof*. Let $Z=f(X)$.
	    \begin{align}
		U_k :&= \ln \E[Z|X_{1:k}] - \ln \E[Z|X_{1:k-1}]\\
		\Ent (Z) &= \sum \E[ZU_k]\\
		\E[e^{U_k}|X_{-k}]&=1\implies & \E[ZU_k|X_{-k}]&\le \Ent_k f.
	    \end{align}

The entropic formulation of subgaussianity and the tensorization inequality tell us that if we prove (for some notion of $\nb$)
$$ \Ent(e^g) \precsim \E[\ve{\nb g}^2]$$
in one dimension, then in any number of dimensions,
$$ \Ent(e^{\la f})\precsim \E[\ve{\nb (\la f)}^2e^{\la f}]$$
so $f$ is subgaussian with $\max\ve{\nb f}^2$.

*   Discrete log-Sobolev: Let $D^-f=f-\inf f$. Then
    $$\Ent[e^f] \le \Cov[f,e^f] \le \E[|D^-f|^2e^f].$$
    * *Proof*. Jensen and convexity.
* On product measure, $f$ is subgaussian with variance proxy $2\ve{\sumo in |D_if|^2}_{\iy}$. Upper and lower tail bounds with $D_i^-$ and $D_i^+$.

**Example** (Random Bernoulli symmetric matrices). Using $D_{ij}^-\la_{\max(M)}$, get
$$ \Pj(\la_{\max}(M) - \E\la_{\max}(M)\ge t)\le e^{-\fc{t^2}{64}}. $$
We can't use the same technique to look at the lower tail because the bound is in terms of different $M^{(ij)}$'s.

##3.4 Log-Sobolev inequalities

We have an entropic analogue of just the easy parts of the Poincare inequality equivalence.

**Theorem**. 1 and 2 are equivalent. 3 implies 1, 2 if $\Ent_\mu(P_tf)\to 0$ (entropic ergodicity).

1. $\Ent_\mu(f)\le c\cE(\ln f, f)$ (log-Sobolev inequality)
2. $\Ent_\mu(P_tf) \le e^{-t/c} \Ent_\mu(f)$ (entropic exponential ergodicity)
3. $\cE(\ln P_tf , P_tf) \le e^{-t/c}\cE(\ln f, f)$.

*Proof*.

* ($3\implies1$) Note $\ddd{t} \Ent_\mu(P_tf) = -\cE(\ln P_tf,P_tf)$ using $\mu(\cL P_tf)=0$. $\Ent_\mu(f) = \lim -\iiy \ddd{\mu} \Ent_\mu(P_tf)$.
* ($1\implies2$) Inequality for exponential decay
* ($2\implies1$) Take the limit.

**Example** (Discrete log-Sobolev inequality). Consider Poisson resampling under $\mu$. Then
\begin{align}
P_t f&= e^{-t}f + (1-e^{-t}) \mu(f) \\
\cE(f,g)&=\int \de f\de g\,d\mu = \Cov_\mu[f,g]\\
P_tf \ln (P_tf)&\le e^{-t}\ln f + (1-e^{-t}) \mu f\ln \mu f\\
\implies \Ent_\mu[P_t f] &\le e^{-t} \Ent_\mu(f)\\
\implies \Ent_\mu(f) &\le \Cov_\mu(\ln f, f) &(2\implies 1)
\end{align}

The log-Sobolev equivalences cannot reproduce the tensorization inequality for entropy.

**Theorem** (Gaussian log-Sobolev). For independent Gaussian variables,
\begin{align} 
\Ent[f] &\le \rc 2 \E [\nb f \cdot \nb \ln f]& (f\ge 0)\\
\Ent[e^f] & \le \rc 2 \E[\ve{\nb f}^2 e^f].
\end{align}
As a result $f$ is  $\si^2 = \ve{\ve{\nb f}^2}_{\iy}$ subgaussian and we get Gaussian concentration,
$$\Pj[f - \E f\ge t] \le e^{-t^2/2\si^2}.$$

*Proof*. Recall $\cE(f,g) = \mu(f'g')$, $(P_tf)' = e^{-t}P_t f'$. Note $|P_t(fg)|^2 \le P_t(f^2)P_t(g^2)$ by CS (expand out).
\begin{align}
(\ln P_t f)' (P_tf)' &= e^{-2t} \fc{|P_tf|^2}{P_tf}\\
|P_t f'|^2 &\le P_t((\ln f)'f') P_t f&\text{by CS}\\
\implies \cE(\ln (P_tf), P_tf) &\le e^{-2t}\cE(\ln f, f) &\text{by }\int\\
\implies \Ent_\mu(f) &\le \cE(\ln f, f)&(3\implies 1).
\end{align}

Note several different forms of log-Sobolev, equivalent in the Gaussian case (or anytime the chain rule holds for $\cE$):
\begin{align}
\Ent(f) &\le \rc 2 \E[\nb f \cdot \nb \ln f] = \rc2 \cE (\ln f, f)\\
\Ent(f) &\le \rc 2 \E\pf{\ve{\nb f}^2}{f}\\
\Ent(e^f) &\le \rc 2 \E[\ve{\nb f}^2 e^f]\\
\Ent(f^2) &\le 2\E[\ve{\nb f}^2] = 2\cE(f,f)\\
\E(f^2\ln f)-\E[f^2]\ln \ve{f}_2 &\le c\ve{\nb f}_2^2.
\end{align}
Classical Sobolev inequalities are for $\ved_q$, $q\ge 2$ and do not tensorize.

**Lemma 3.28**: Log-Sobolev $\Ent(f) \le c\cE (\ln f, f)$ implies the Poincare inequality $\Var(f) \le 2c\cE (f,f)$.

*Proof*.
$$
\ub{\E[\la f e^{\la f}]}{\la^2\cE(f,f) + o(\la^2)} - 
\ub{\E[e^{\la f}] \ln \E[e^{\la f}]}{\la \E f + \la^2(\E[f^2] + \E[f]^2)/2 + o(\la^2)} = 
\ub{\E[\la f e^{\la f}]}{\la \E f + \la^2 \E [f^2] + o(\la^2)}
$$

##Problems

Equivalent conditions for subgaussianity:

1.  The tails are dominated by the tails of the Gaussian:
    $$\Pj(|X|\ge t) \le 2\exp(-t^2/K_1^2).$$
2.  Moments: For all $p\ge 1$,
	$$
	\ve{X}_p = (\E|X|^p)^{\rc p} \le K_2\sqrt p
	$$
3.  Moment generating function of $X^2$:
	$$\E\exp(X^2/K_3^2)\le 2.$$
4.  (If $\E X=0$,) MGF of $X$: 
	$$\E \exp(\la X) \le \exp(\la^2 K_4^2)$$
	for all $\la\in \R$. 

Problems

1.
    1.  Expanding $\E(e^{\la (X-\E X)}) \le e^{\la^2\si^2/2}$ gives
	    $$ 1+\fc{\la^2}2 (X-\E X)^2 \le 1+ \fc{\la^2}2 \si^2.$$
	2.  Easy.
	3.  ($4\implies1$) This is Chernoff. $\inf_\la \psi(\la)-\la t \le \inf \pa{\fc{\la^2\si^2}2 - \la t} = -\fc{t^2}{2\si^2}$.
	4.  ($1\implies 3$)
		\begin{align}
		\E e^{X^2/6\si^2} &= 1+\iiy \fc{t}{3\si^2} e^{\fc{t^2}{6\si^2}} \Pj(|X|\ge t)\,dt\\
		& = 1+\iiy \fc{t}{3\si^2} e^{\fc{t^2}{6\si^2}} e^{-\fc{t^2}{2\si^2}}\,dt=2.
	    \end{align}
	5.  ? ($3\implies 4$) <!--Expanding $\E e^{\la X}\le e^{\fc{\la^2\si^2}2 + \la \E X}$ gives-->
	    Weaker: Expanding $\E e^{X^2/6\si^2}\le 2$ gives $\rc{q!}\pf{X^2}{6\si^2}^q\le 1$, $\E X^{2q}\le (6\si^2)^qq!$.
	6.  $\E(e^{X^2/8\si^2}) = \E\pa{\sumz q\iy \rc{q!} \pf{x^2}{8\si^2}^q} \le \E\sumz q\iy\prc{2}^q=2$.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12. Let $Z=\fc{e^{\la X}}{\E e^{\la X}}$. Then 
    \begin{align}
	\Ent(e^{\la X}) &\le \E(e^{\la X}) \E(Z\ln Z)\\
	&\le \E(e^{\la X}) \ln \pf{\E[(e^{\la X})^2]}{(\E e^{\la X})^2}\\
	&\le \E(e^{\la X}) (\fc{\la^2\si^2}2 + \ln \pf{e^{2 \la \E X}}{\E(e^{\la X})^2})\\
	&\le \E(e^{\la X}) (\fc{\la^2\si^2}2).
    \end{align}
13.
    1.  We have
	    \begin{align}
		\Ent Z &= \inf_{t>0} \E[Z\ln Z - Z\ln t - Z+t]\\
		\iff (\E Z)(\E \ln Z+1) &=\inf_{t>0} \E(-Z\ln t+t)
		\end{align}
		Take the derivative; this is minimized at $t=\rc{\E Z}$.
	2.  \begin{align}
		\Ent(e^f) &=\inf_{t>0}\E [e^f (f - \ln t - 1) + t]\\
		&\le e^f (f-\inf f + e^{\inf f-f} - 1) & t=e^{\inf f}.
		\end{align}
	3.  $\phi(x) = e^{-x}+x-1 \le 1-x+\fc{x^2}2 + x-1 = \fc{x^2}2$.
	4.  $\E[\ph(D^-f) e^f] \le \rc{2}\E[|D^-f|^2 e^f]$.
	    ?? Stuck.

# 4 Lipschitz concentration and transportation inequalities

> Rather than measuring the sensitivity of the function f
> in terms of a gradient, we will introduce a metric viewpoint that emphasizes
> the role of Lipschitz functions.

## 4.1 Concentration in metric spaces

We can express Gaussian concentration and McDiarmid's inequalities in terms of Lipschitz functions.

* Gaussian concentration:
	* For $X\sim N(0,I)$, $f$ is $\ve{\ve{\nb f}^2}_{\iy}$-subgaussian.
    * **Lemma 4.3** For $f:\R^n\to \R$ a $C^1$ function. $\ve{\ve{\nb f}^2}_{\iy}\le L^2 \iff $f$ is $L$-Lipschitz.
* McDiarmid's inequality
	* For $X_i\in \mathbb X_i$ independent, $f$ is $\rc 4 \sumo kn \ve{D_k f}_{\iy}^2$-subgaussian.
	* **Lemma 4.5** Define weighted Hamming distance $d_c(x,y) = \sumo in c_i 1_{x_i\ne y_i}$. For $f:\mathbb X_1\times \cdots \mathbb X_n\to \R$, $\ve{D_i f}_{\iy}\le c_i$ for all $i$ iff $f$ is 1-Lipschitz with respect to $(\prod \mathbb X_i , d_c)$. (Proof: telescope.)
	* So $f$ is $\rc{4}\ve{c}^2$-subgaussian.

> In the case of gradient bounds, the sensitivity of the function
> f is measured locally, while the Lipschitz property quantifies the sensitivity
> in a global manner.

Basic question:

> For which probability measures μ on the metric space $(X, d)$ is it true
> that if $X\sim \mu$, then $f(X)$ is $\si^2$-subgaussian for every $f \in Lip(\mathbb X)$?

**Wasserstein distance**: For $\mu,\nu\in \cP_1(\mathbb X)=\set{\rh}{\int d(x_0,x)\rh(dx)<\iy}$, the Wasserstein distance is
$$ W_1(\mu, \nu) := \sup_{f\in Lip(\mathbb X)} \ab{\int f\,d\mu - \int f\,d\nu}.$$

**Relative entropy**: $D(\nu||\mu) = \Ent_{\mu}\pa{\dd{\nu}{\mu}}$.

**Theorem 4.8 (Bobkov-Gotze)**: Let $\mu\in \cP_1(\mathbb X)$. TFAE for $X\sim \mu$:

1. $f(X)$ is $si^2$-subgaussian for $f\in Lip(\mathbb X)$.
2. $W_1(\nu,\mu)\le \sqrt{2\si^2 D(\nu||\mu)$.

**Example (Pinsker's inequality)**:

* Hoeffding: $f$ is $\rc 4 (\sup f - \inf f)$-subgaussian.
* Pinsker: $\ve{\mu-\nu}_{TV} \le \sqrt{\rc 2 D(\nu||\mu)}$.

*Proof*. 

1.  **Lemma 4.10 (Gibbs variational principle)** $\log \E_{\mu} e^f = \sup_\nu [\E_\nu [f] - D(\nu||\mu)]$. 
    
	*Proof*.  $\log \E_\mu[e^f] - D(\nu||\wt \mu) = \E_\n [f] - D(\nu||\mu)$.
	
	(?? "Dual convex optimization to the variational formula for entropy.")
2.  Restate
    \begin{align}
	\forall \la\in \R, f\in Lip(\mathbb X), \log \E_\mu[e^{\la (f-\E_\mu f)}]&\le \fc{\la^2\si^2}2\\
	\sup_{\la\in \R, f\in Lip(\mathbb X), \nu} \ba{
	\la (\E_\nu f - \E_\mu f) - D(\nu||\mu) - \fc{\la^2\si^2}2
	},
	\end{align}
	evaluate over $f$ to get $W_1$, then evaluate over $\la$.
	
