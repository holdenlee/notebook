---
title: High-dimensional probability
published: 2016-08-01
modified: 2016-08-01
tags: random matrix
type: notes
showTOC: True
---

Based on Ramon von Handel's ORF570 notes.

#Introduction

Themes:

* concentration: if $X_{1:n}$ are independent or weakly dependent random variables, and $f$ is not too *sensitive* to any coordinate, then $f(X_{1:n})$ is *close* to its mean.
* suprema
* universality

#Variance bounds and Poincare inequalities

##2.1

Trivial bound:
$$ \Var[f(X)]\le \rc4 (\sup f - \inf f)^2 \qquad \Var[f(x)] \le \E[(f(X)-\inf f)^2].$$

Tensorization gives a bound for functions of independent random variables from bounds for functions of each individual random variable.

**Theorem** (Tensorization of variance):
    $$\Var[f(X_1,\ldots, X_n)]\le \E\ba{\sumo in \Var_f f(X_1,\ldots, X_n)}$$
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

###Problems

1. Use $\Var\pa{\ve{\rc n \sumo kn X_k}_B} = \sup_{y\in B^*} \an{\rc n\sumo kn X_k, y}$. Use the corollary, get $D_k^-\le 2 \sup_{y\in B^*}\an{\rc X_k,y} \le \fc{2C}{n}$. Now square and sum.
2. .
3. .
4. .
5. We have $(f(x) - f(..., a, ...))^2\le \ve{(b-a)\nb f}^2$. Now take expectations and sum over different coordinates.

##Markov semigroups

A **Markov process** satisfies: For every bounded measurable $f$ and $s,t\in \R_+$, here is abounded measurable $P_sf$ such that
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

##2.4 Variance identities and exponential ergodicity

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
