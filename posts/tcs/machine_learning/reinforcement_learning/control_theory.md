---
title: Control theory
published: 2016-12-06
modified: 2016-12-06
tags: control theory
type: topic
showTOC: True
---

[Course notes](https://math.berkeley.edu/~evans/control.course.pdf)

# 1 Introduction

Setup
\begin{align}
\dot x(t) &= f(x(t),\al(t))\\
x(0) &= x^0\\
P[\al] &= \int_0^T r(x(t),\al(t))\,dt + g(x(T))
\end{align}
where $\al: [0,\iy)\to A$ is the control, $r:\R^n\times A\to \R$ is the reward and $g:\R^n\to \R$ is the terminal reward. The goal is to find the optimal $\al$. (We can think of $x$ as a function of $t, \al, x^0$, $x(t, \al, x^0)$.)

Example: Economics (investment) - $x$ is output and $\al$ is proportion to reinvest.
\begin{align}
\dot x &= k\al x\\
x(0)&=x^0\\
P(\al)&=\int_0^T (1-\al(t))x(t)\,dt.
\end{align}

Example: Try to stop a train with rockets on both sides - Here $T$ is not fixed, but the $\tau$, the first time that $(x,\dot x)=0$. $\al\in [-1,1]$, $x=\coltwo qv$.
\begin{align}
\dot x & = \matt 0100 x + \coltwo 01 \al\\
P(\al) & = -\tau
\end{align}

# 2 Controllability

Let $C(t)=\set{x}{\exists \al, x(t, \al, x^0)= x}$ and $C=\bigcup_{t\ge 0} C(t)$.

Consider linear systems with solution
\begin{align}
\dot x &= Mx + \ub{N\al}{f}\\
X&=e^{tM}\\
x(t) &= X(t) x^0 + X(t) \int_0^t X^{-1}(s) f(s)\,ds.
\end{align}

* $C, C(t)$ are symmetric and convex, and $C(t)$ is increasing.
    * *Proof.* If $x^0\in C(t), \wh x^0\in C(\wh t)$ with $\al,\wh \al$, $t\le\wh t$, then $\la x^0 + (1-\la)\wh x^0\in C(\wh t)$ with $\la \al \one_{\le t} + (1-\la)\wh \al$.
* Define the $n\times mn$ **control matrix** $G(M,N) = [N, MN, \ldots, M^{n-1}N]$. Then $\rank G = n \iff 0\in C^{\circ}$ (interior of $C$).
	* *Proof.* If $b^TG=0$, then $b^TM^kN=0$ for all $k$ by Cayley-Hamilton.
	* $b^TX^{-1}=0$ by Taylor expansion.
	* If $x^0\in C(t)$, $b^Tx^0=0$, then $C\perp b$.
	* If $0\nin C^0$, then there is a separating hyperplane, $\forall x^0, b^Tx^0\le 0$. 
		* *Lemma.* If for all $\al$, $\int_0^T b^T X^{-1}N\al\ge0$ then $b^TX^{-1}N\equiv 0$. 
			* *Proof.* Let $v=b^TX^{-1}N$. If $v\ne 0$ on $I$, define $\al = \fc{v}{|v|}$ on $I$.
		* From lemma, $bX^{-1} N = 0$. Differentiate to get $b^T M^k N=0$.
* If $A=[-1,1]^n$, and $\rank G=n$ and $\Re \la \le 0$ for all eigenvalues $\la$ of $M$, then $C=\R^n$.
	* If $C\ne \R^n$, find a separating hyperplane $b^T x^0\le \mu$.
	* We aim to get $b^Tx^0>\mu$ for contradiction.
	* $v=b^TX^{-1}N\nequiv 0$ because the rank of $G$ is $n$.
	* Let $\al = -\fc{v}{|v|}\one_{v\ne 0}$. Then $p\pa{-\ddd t}v = 0$ by CH, so $\ddd t p\pa{-\ddd t}\phi = 0$. So $\phi(t) = \sum p_i e^{\mu_i t}\not \to 0$ where $\mu_{n+1}=0$, $\mu_k=-\la_k$. So $\int_0^\iy|v|=\iy$ and $b^Tx^0\to \iy$.

(If $A=\R^n$, then $\rank G=n \iff C=\R^n$.)

## Observations

Suppose we observe $y=Nx$ where $N\in \R^{m\times n}$. Think of $m<n$.

Say the system is observable if $Nx_1\equiv Nx_2$ on $[0,t]$ implies $x_1\equiv x_2$.

**Duality**. $\dot x = Mx$, $y=Nx$ is observable iff $\dot z = M^Tz + N^T \al$, $\al\in \R^m$ is controllable.

*Proof*.

* Assume not observable.
	* $x=x_1-x_2$, $\dot x = Mx$, $Nx=0$. Then $\rank G<n$, so not controllable.
* Assume not controllable.
	* Then $\rank G<n$, take $x$ such that $x^TG=0$.

## Bang-bang

**Theorem**. Any extreme point of the set of admissible controls $\set{\al:\R^n\to [-1,1]^n}{x(t,\al,x^0)=x}$ has, for each $t\ge 0$, $i$, $|\al^i|=1$ (is "bang-bang"). In particular, there always exists a bang-bang solution.

*Proof*.

* The set of admissible controls is convex in $L^{\iy}$ and $w^*$ compact (show sequential compactness using Alaoglu.). 
* If an extreme point has $|\al^i|<1-\ep$ on $F$, then write as combination of $\al^*\pm \ep \be e_i \one_F$.
* Extreme points exist by Krein-Milman.

# 3

For the linear system and $A=[-1,1]^n$, there exist a time-optimal bang-bang solution. I.e. $\tau^*=\inf \set{t}{x^0\in C(t)}$ is attainable.

*Proof.* Take $t_n\to t$, $\al_n$. Use Alaoglu.

Let the reachable set be $K(t,x^0) = \set{x^1}{\exists \al, x(x^0, \al, t) = x^1}$. It is convex and closed (Pf. Alaoglu).

**Theorem**. There is $h$ (depending on $x_0$, but not on $t$) such that the optimal action is
$$
\al^*(t) = \max_{a\in A} [h^T X^{-1}(t)Na].
$$

*Proof.*

1. By convexity of $K(\tau, x)$, $0\in \pl K(\tau^*,x^0)$. Take $g$ such that $g^T x_1\le 0$ for $x_1\in K(\tau^*,x^0)$.
2. Write the trajectories $\al, \al^*$ ending in $x^1, 0$. Dot with $g$. Het $h^T = g^T X(\tau^*)$, get $\int_0^{\tau^*} h^T X^{-1}(s) N(\al^*-\al)\,ds\ge 0$.
3. If $h^TX^{-1}N\al^* \le \max_{a\in A}h^T X^{-1}Na$ on some set then we can replace $\al^*$ on that set and get something larger, contradiction.

**Corollary**. For $H(x,p,a) = (Mx + Na)^Tp$, the optimal trajectory solves
\begin{align}
\cdot x &= \nb_p H\\
\cdot p &= -\nb_x H\\
\al &= \max_a\in A H.
\end{align}

(Take $p(0) = h$, $p=h^TX^{-1}$.)

## Examples

* Rocket train: $\al^* = \sgn(-th_1+h_2)$ so switch at most once.
* Pendulum $\ddot x + x = \al$. $\al^* = \sign(\sin(t+\de))$, switch every $\pi$ (between 2 circles).

# 4 The Pontryagin Maximum Principle

Let $L:\R^n\times \R^r\to \R$ (a Lagrangian). Suppose we want to solve (action equation)
$$
\min I[x], \quad I[x] = \int_0^T L(x,\dot x)\,dt.
$$
Assume that $p=\nb_v L(x,v)$ can be solved for $v$. (How important is this?) 
The solution satisfies the Euler-Lagrange equation
$$
\ddd t \ub{[\nb_v L(x^*, \dot x^*)]}{p} = \nb_x L(x^*, \dot x^*).
$$

*Proof.* Consider "differentiating" in directoin $y:[0,T]\to \R^n$, $y(0)=y(T) = 0$. Consider $i(\tau) = I[x+\tau y]$. $i(\tau)\ge i(0)$ so $i'(0)=0$. 
$$
i'(0) = \sumo in \int_0^T L_x(x,\dot x)y_i + L_{v_i} (x,\dot x) \dot y_i\,dt.
$$
Choose $y = \psi(t) e_j$. IbP gives $L_{x_j} - (L_{v_j})_t=0$.

The solution to EL satisfies Hamiltonian system: let $H=p^Tv - L(x, v(x,p))$, 
\begin{align} 
\dot x &= \nb_p H\\
\dot p &= -\nb_x H.
\end{align}

*Proof.* 
\begin{align}
\nb_x H &= p\nb_x v - \nb_x L - \nb_v L \nb_x v = -\nb_xL\\
\nb_p H &= v(p) + p^T \fc{Dv}{Dp} - \nb_p L \\
&= \dot x + p^T \fc{Dv}{Dp} - (\nb_v L)^T\fc{Dp}{Dv}=\dot x.
\end{align}
(This is pretty confusing. $v$ is implicitly defined in terms of $p$, the value such that $p=\nb_v L(x,v)$.)

Example:
\begin{align}
L &= \fc{m|v|^2}{2} - V(x)\\
m\ddot x &= -\nb V(x(t))\\
p &= \nb_v L = mv\\
H(x,p) &= \fc{|p|^2}{2m} + V.
\end{align}

4.2. Constraints create Lagrange multipliers, which contain valuable information. If $x^*\in \pl R$, $R=\{g\le 0\}$, $x^*=\amax f$, then $\nb f = \nb g$, $\mu \nb f(x^*) = \la \nb g(x^*)$.

## Maximal principle

The control theory Hamiltonian corresponding to
\begin{align}
\dot x & = f(x(t),a(t))\\
P[\al] &=\int_0^T r(x(t),a(t))\,dt + g(x(T))
\end{align}
is 
$$ H(x,p,a) = f(x,a)^Tp+r(x,a)$$

1.  Fixed time, free endpoint
    \begin{align}
	\dot x &= \nb_p H\\
	\dot p &= -\nb_x H\\
	H(x,p,\al) &= \max_{a\in A} H(x(t),p(t),a)\\
	p(T) &= \nb g(x^*(T)).
	\end{align}
	Moreover $t\mapsto H(x(t), p(t),\al(t))$ is constant.
2.  Free time, fixed endpoint $P[\al] = \int_0^\tau r\,dt$. Everything is same except there is no end boundary value condition, and there is $H(x(t),p(t),\al(t))\equiv 0$.

(See warning on p. 50.)
	
Methodology: solve for $\al(x,p)$, substitute back, solve the DE, then sub $x,p$ into expression $\al$. "Feedback controls": set $\al(t) = c(t)x(t)$ and write equation for $c(t)$. (Cf. eigenfunctions??)

Transversality: adding condition to start in $X_0$ and end in $X_1$, we have $p^*(\tau^*)\perp T_1$, $p^*(0)\perp T_0$.

# Dynamic programming

Adding a variable can help. Ex.
$$
I(\al) = \iiy \redd{e^{-\al x}} \fc{\sin x}{x} \dx,\quad I'(\al) = -\rc{\al^2+1}.
$$

Fix $T$. Vary starting time and point:
$$
v(x,t) = \sup_{\al \in A} P_{x,t}[\al].
$$

Hamilton-Jacobi-Bellman equation
\begin{align}
v_t + \ub{\max_{a\in A}[f\cdot \nb_x v + r]}{a^*(x,\nb_x v)} &= 0\\
v(x,T) & = g(x).
\end{align}

*Proof.* Taking the first equation, dividing by $h\to 0$, using the chain rule
\begin{align}
v_t & \ge \int_t^{t+h} r\,ds + v(x(t+h), t+h) \\
v_t + \nb_x v \cdot x + r&\le 0.
\end{align}
Now take the max. Equality attained at optimal $\al^*$.

General procedure;:

1. Solve HJB, compute $v$.
2. Solve for $\al$, plug in.
3. The feedback control is $\al^*(s) = \al(x^*(s),s)$.

General linear-quadratic regulator
\begin{align}
\dot x &= Mx + N\al\\
P[\al] &= \int_t^T (x^TBx+\al^TC \al) \,ds - x(T)^T D x(T)\\
v_t + \max_{a\in \R^m} (\nb v^T Na - a^TCa) + (\nb v)^T Mx - x^TBx &=0\\
v(x,T)&=-x^TDx\\
a & = \rc 2 C^{-1} N^T\nb_x v\\
&=C^{-1} N^T Kx
\end{align}
where $K$ satisfies the matrix Riccati equation.

5.3. HJ equations...
