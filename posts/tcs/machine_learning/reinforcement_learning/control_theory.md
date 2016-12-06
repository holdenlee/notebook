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
