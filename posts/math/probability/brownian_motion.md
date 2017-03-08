---
title: Brownian Motion
published: 2017-03-07
modified: 2017-03-07
tags: brownian motion
type: notes
showTOC: True
---

Notes from Schilling, Partzsch.

# Robert Brown's new thing

A particle 

* starts at $x=0$.
* at times $k\De t$, move $\De x$ units to L or R with equal probability.

Let $X_t$ be position at time $t\in [0,T]$.

* $\Var(X_t)=\si^2 T$ where $\fc{(\De x)^2}{\De t}=\si^2$.
* CLT: $X_T \to \sqrt T \si N(0,1)$.

**Definition**. A $d$-dimensional Brownian motion $B=(B_t)_{t\ge 0}$ is a stochastic process indexed by $[0,\iy)$, 
\begin{align}
B_0(\om)&=0\\
B_{t_n}-B_{t_{n-1}},\ldots, B_{t_1}-B_{t_0} & \text{ independent}, 0=t_0\le t_1<\cdots < t_n\\
B_t - B_s &\sim B_{t+h} - B_{s+h}\\
B_t &= N(0,t)^{\ot d}\\
t&\mapsto B_t(\om) \text{ continuous.}
\end{align}
Note the last property is implied by the previous.

# Brownian motion as a Gaussian process

Characteristic function of Gaussian:
$$
\E e^{i\an{\xi,\Ga}} = e^{i \E\an{\xi, \Ga} - \rc \Var\an{\xi, \Ga}} = e^{i\an{\xi, \Ga}} = e^{i\an{\xi, m} - \rc 2\an{\xi, \Si\xi}}.
$$

* $B_t$ is Gaussian with mean 0, variance $t$. $\E e^{\ze B_t} = e^{t\ze^2/2}$. 
* $\E (B_t^{2k}) = t^k \fc{2^k \Ga(k+\rc 2)}{\sqrt \pi}$.
* $\Cov(B_s,B_t) = \min(s,t)$.

$(X_t)_{t\ge 0}$ is a Gaussian process if for all $0\le t_1<t_2<\cdots$, $(X_{t_1},\ldots, X_{t_n})$ is a Gaussian random vector.

**Theorem**. $(B_t)_{t\ge 0}$ is a Gaussian process. The covariance of $(B_{t_1},\ldots, B_{t_n})$ is $C = (\min(t_j,t_k))_{j,k}$.

*Proof*. Linearly transform $(t_1-t_0,t_2-t_1,\ldots)$.

Converse: If the covariance matrices are given by the above and $(X_t)_{t\ge 0}$ has continuous sample paths, then $(X_t)_{t\ge 0}$ is 1-D Brownian.

## 2.2 Invariance properties

* Reflection $-B_t$
* Renewal $W(t) = B(t+a)-B(a)$.
* Markov property: $B(t):0\le t\le a$ independent to $W(t), t\ge 0$.
* Time inversion $W_t=B_{a-t}-B_a$.
* Scaling $B_{ct}\sim c^{\rc 2}B_t$.
* Projective reflection $W(t) = tB(\rc t)$

## 2.3 $\R^d$

$B_t$ is $BM^d$ iff its coordinates are $BM^1$.

*Proof*. Forward: Show increments are independent---characteristic function factorizes. 

$Q$-Brownian motion: $X_t-X_s\sim N(0,(t-s)Q)$, $s<t$.

# 3 Constructions of Brownian motion

## 3.1 Levy-Ciesielski

Write paths as random series wrt complete orthonormal system of $L^2([0,1],dt)$.
Let $(G_n)_{n\ge 0}$ be sequence of $N(0,1)$ variables. 
$$
W_N(t):=\sumz n{N-1} G_n\an{\one_{[0,t)}, \phi_n}_{L^2}.
$$

**Theorem**. $\lim_{N\to \iy} W_N(t)$ is Brownian motion.

*Proof*.

* Convergence: $\E [W_N(t)^2] \to t$.
* Covariances correct: $\E[(W(t)-W(s))(W(v)-W(u))] = \an{\one_{[s,t)}, \one_{[u,v)}}$.
* Continuity of $t\mapsto W(t,\om)$: Proof for a specific system: Haar functions $H_n$.
    * (? Uniform convergence $\liminf_{n,N\to \iy} \ve{W_{2^N}-W_{2^n}}_{L^{\iy}(t)}=0$. By Arzela-Ascoli (?) there is convergent subsequence.
	
<!-- * (Invariance - translation is orthonormal transformation?) (not necessary)-->

## 3.2 Levy's original argument

# 4 The canonical model

Identify $\Om$ (in $(\Om, A, \Pj)$) as a subset of $(\R^d)^I$, actually $C_{(0)}$ consisting of continuous $w:[0,\iy)\to \R^d$, $w(0)=0$.

Consider the product $\si$-algebra 
$$
B^I(\R^d) = \si\set{\pi_t^{-1}(B)}{B\in B(\R^d), t\in I} = \si\set{\pi_t}{t\in I}.
$$
Consider the intersection with $C_{(0)}$,
$$
C_{(0)}\cap B^T(\R^d) = \si(\pi_t|_{C_{(0)}}:t\in I).
$$
$C_{(0)}$ is complete separable metric space with metric of locally uniform convergence $\rh(w,v)=\sumo n{\iy} (1\wedge \sup_{0\le t\le n} |w(t)-v(t)|)2^{-n}$.

The finite-dimensional distributions uniquely determine $\mu$ (cylinder sets generate). $\mu$ is **Wiener measure**, the space is the **path space**.

**Theorem** $(C_{(0)}, B(C_{(0)}), \mu)$: $(\pi_t)_{t\ge 0}$ is Brownian motion (**canonical model of Brownian motion**).
<!-- *-stable generator? -->

Some properties

* $\Ga\in B^I(\R^d)$ is determined by countably many indices: for every $\Ga\in B^I(\R^d)$ there exists countable $S\sub I$, such that $f\in (\R^d)^I, w\in \Ga, f|_S=w|_S \implies f\in \Ga$. *Proof*. $\set{\Ga \subeq (\R^d)^I}{\pat{holds for some countable }S}$ is a $\si$-algebra.
* $C_{(0)}\nin B^{[0,\iy)}\nin B^I (\R^d)$. Proof: can't enforce continuity using values at countably many points. (What is the point of this? Saying we can't work in $B^I(\R^d)$, have to work in $\cap C_{(0)}$?)

## 4.2 Kolmogorov's Theorem

**Theorem**. Let $I\subeq [0,\iy)$, $p_{t_1,\ldots, t_n}$ be probability measures defined on $(\R^d)^n$. If the family is consistent ($p_t(C) = p_{t_{\si}} (C_\si)$ and $p_{t_{1:n-1},t_n}(C_{1:n-1}\times \R^d) = p_{t_{1:n-1}} (C_{1:n-1})$), then there exists $\mu$ on $((\R^d)^I, B^I(\R^d))$, $p_{t_{1:n}}(C) = \mu(\pi_{t_{1:n}}^{-1}(C))$.

Corollary: can construct canonical process for any family of consistent finite dimensional probability distributions.

(Still not too clear on it sufficing to consider finite-dim projections...)

Can use this theorem to construct BM. Continuity follows from Theorem 4.11.

# 6 Brownian motion as a Markov process

(I'm confused about what more 6.1 says. Is this related to stopping times? $F_t$ is info up to time $t$?)

Let
$$
\Pj^x(B_{t_i}\in A_i:1\le i\le n) = \Pj(B_{t_i}+x\in A_i:1\le i\le n).
$$

# 7 Brownian motion and transition semigroups

Linear operators: transition semigroup and resolvent
\begin{align}
P_t u(x) &= \E^x u(B_t)\\
U_\al u(x) &= \E^x \ba{\iiy u(B_t)e^{-\al t}\,dt}
\end{align}
A semigroup $(P_t)_{t\ge 0}$ on a Banach space is family of linear operators $P_t:B\to B, t\ge 0$, satisfying $P_tP_s=P_{t+s}$, $P_0=\id$.

Banach spaces:

* $B_b$: Borel measurable $\R^d\to \R$ with uniform norm $\ved_{\iy}$.
* $C_\iy$: continuous functions vanishing at infinity with uniform norm $\ved_{\iy}$.

Lemma 7.2. $(B_t)_{t\ge 0}$ is uniformly stochastically continuous, 
$$ \lim_{t\to 0}\sup_{x\in \R^d} \Pj^x (|B_t-x|>\de)=0$$
for all $\de>0$.

Properties

1. Conservative $P_t1=1$.
2. Contraction on $B_b$: $\ve{P_t u}_\iy \le \ve{u}_{\iy}$, $u\in B_b$
3. Positive preserving: $u\ge 0\implies P_tu\ge 0$, $u\in B_b$.
4. Sub-Markovian: $0\le u\le 1$, $u\in B_b\implies 0\le P_tu\le 1$.
5. Feller: $u\in C_\iy\implies P_t u\in C_\iy$.
6. Strongly continuous on $C_\iy$: $u\in C_\iy\implies \lim_{t\to 0}\ve{P_tu-u}_\iy = 0$.
7. Strong Feller: $u\in B_b\implies P_tu\in C_b$.

(1-4 is Markov, 2-4 is sub-Markov, 2-6 is Feller, 2-4+7 is strong Feller.)

7.5:
$$\Pj^x(B_{t_i}\in C_i:1\le i\le n) = P_{t_1}[\one_{C_1} P_{t_2-t_1}[\one_{C_2}\cdots ]].$$

This gives a way to construct a Markov process from a semigroup of operators. (Apply to indicator functions.) A Feller semigroup has a corresponding Feller process.

## 7.2 The generator

Motivation: If $\phi:[0,\iy)\to \R$, additive, $\phi(0)=1$, then $\phi(t) = e^{at}$, $a=\ddd t^{+}\phi(t)|_{t=0}$.

**Definition**. Let $(P_t)_{t\ge 0}$ be Feller semigroup on $C_\iy(\R^d)$. Then
\begin{align}
Au :&= \lim_{t\to 0} \fc{P_t u-u}t\\
D(A) :&= \set{u\in C_\iy(\R^d)}{\exists g\in C_\iy(\R^d), \lim_{t\to 0} \ve{\fc{P_tu-u}t-g}_{\iy}=0}
\end{align}
is the infinitesimal generator of $(P_t)_{t\ge 0}$. $A$ is a function $A:D(A)\to C_\iy(\R^d)$.

Ex. for $BM^d$, $P_tu(x) = \E^xu(B_t)$, $A=\rc 2 \De$ on $C_\iy^2(\R^d)$. Proof: Taylor expansion.

Lemma 7.10. Let $P_t$ be Feller semigroup with generator $A$. $P_t$ and $\int_0^t P_s\cdot\,ds$ are $D(A)\to D(A)$. 
\begin{align}
\ddd tP_tu &= AP_tu = P_tAu\\
P_t u - u &= A\int_0^t P_su\,ds.
\end{align}

*Proof.* Use: $P_t$ is contraction to get $\ddd t^+$. Use this and strong continuity to get $\ddd t^-$. Fubini's Theorem for part 2.

Corollary 7.11. Let $(P_t)_{t\ge 0}$ be Feller semigroup with generator $A$.

1. $D(A)$ is dense in $C_\iy(\R^d)$.
2. $A$ is a closed operator.
3. If $(T_t)_{t\ge 0}$ is also Feller with generator $A$, $P_t=T_t$.

*Proof*.

1. $\ep^{-1}\int_0^\ep P_su\,ds\to u$. (Decay it a little!)
2. If $u_n\to u$, $Au_n\to w$, then $Au=w$.
3. $\ddd sP_{t-s} T_su = 0$.

**Proposition 7.13**. Let $P_t$ be Feller. Then $\al U_\al$ is conservative, contraction on $B_b$, positivity preserving, Feller, strongly continuous on $C_\iy$. Moreover

1. $(U_\al)_{\al>0}$ is resolvent: $U_\al = (\al \id -A)^{-1}$.
2. Resolvent equation $U_\al u - U_\be u = (\be-\al) U_\be U_\al u$, $u\in B_b$.
3. There is 1-to-1 relationship between $(P_t)$ and $(U_\al)$.
4. $(U_\al)$ is sub-Markovian iff $(P_t)$ is sub-Markovian.

(Intuition for (1). $\iiy e^{(A-\al I) t}u\,dt = (A-\al I)^{-1}$.)


Example 7.14. For Brownian motion
$$
U_\al u(x) = \begin{cases}
\int \fc{e^{-\sqrt{2\al}y}{\sqrt{2\al}}u(x+y)\dy,&d=1\\
\int \rc{\pi^{\fc d2}}\pf{\al}{2y^2}^{\fc d4-\rc2} K_{\fc d2-1}(\sqrt{2\al}y) u(x+y)\dy,&d\ge 2.
\end{cases}
$$

Determining domain of generator: 

**Theorem**. If $(A', D(A'))$ extends $(A,D(A))$, and for any $u\in D(A)$, $A'u=u\implies u=0$< then $(A,D(A))=(A', D(A'))$. (? I don't get this.)

# 8 The PDE connection

> For many classical PDE problems probability theory yields concrete representation formulae for the solutions in the form of expected values of a Brownian functional. These formulae can be used to get generalized solutions of PDEs (which require less smoothness of the initial/boundary data or the boundary itself) and they are amenable to Monte-Carlo simulations

**Lemma** 8.1. $f\in D(\De)$, $u(t,x):=\E^x f(B_t)$. $u$ is unique bounded solution of heat equation with initial value $f$.

*Proof*. Laplace transform and IbP. Use uniqueness of resolvent operator.
