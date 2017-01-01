---
title: (HMR16) Gradient descent learns linear dynamical systems
published: 2016-12-27
modified: 2016-12-27
tags: dynamical systems, quasi-convexity
type: paper
showTOC: True
---

Main theorem:

1.  (5.1) Suppose $\Te$ is $\al$-acquiescent and $\ve{C}\le 1$. With $N$ samples of length $T\ge \Om\pa{n+\rc{1-\al}}$, SGD with projection set $B_\al$ returns $\wh \Te = (\wh A, \wh B, \wh C, \wh D)$ with population risk
    $$
    f(\wh \Te) - f(\Te) \le O\pa{\fc{n^2}N + \sfc{n^5 + \si^2 n^3}{TN}}\poly\pa{\rc{1-\al}, \rc{\tau_0}, \rc{\tau_1}, \tau_2, R=\ve{a}}.
    $$
2.  (5.2) For long sequences, dividing into samples of length $\be n$ for large enough constant $\be$ gives (suppressing the polynomial dependence on the other parameters)
	$$
	f(\wh \Te) - f(\Te) \le f(\Te) + O\pa{\sfc{n^5 + \si^2 n^3}{TN}}.
	$$
3.  (6.2) Suppose $\Te$ has transfer function $G(z) = \fc{s(z)}{p(z)}$ with characteristic function $p(z)$ that is $\al$-acquiescent by extension of degree $d$, $\ve{G}_{H_2}\le1$. Projected SGD with $m=n+d$ states returns $\wh \Te$ with risk 
	$$
	f(\wh \Te) - f(\Te) \le f(\Te) + O\pa{\sfc{m^5 + \si^2 m^3}{TK}}.
	$$

Note: 

1. Any poly of degree $n$ with distinct roots inside circle of radius $\al$ is $\al$-acquiescent by extension of degree $d = O(\max\{(1-\al)^{-1} \ln (\sqrt n \Ga\ve{p}_{H_2}), 0\})$.
2. If $p$ has random conjugate pairs of roots inside a circle of radius $\al$, whp $\Ga(p)\le \exp(\wt O(\sqrt n))$ and $\ve{p}_{H_2}\le \exp(\wt O(\sqrt n))$, so $p$ is $\al$-acquiescent by extension of degree $\wt O((1-\al)^{-1}n)$.

# Optimization background

A function $f$ is $\tau$-weakly-quasi-convex ($\tau$-WQC) over $B$ with respect to a global minimum $\te^*$ if there is a positive $\tau>0$ such that for all $\te\in B$,
$$
\nb f(\te)^T(\te-\te^*) \ge \tau (f(\te) - f(\te^*)).
$$
$f$ is $\Ga$-weakly smooth if 
$$
\ve{\nb f(\te)}^2 \le \Ga(f(\te)-f(\te^*)).
$$

Note a convex function satisfies
$$
f(\te^*) - f(\te) \ge \nb f(\te)^T (\te^*-\te)
$$
so is 1-WQC.
If $f''\ge a$ everywhere, then $f(\te)-f(\te^*) \ge \ve{\nb f(\te)}^2$ so $f$ is $4a$-weakly smooth.

For stochastic gradient descent, weak QC and S are enough for convergence guarantees.

**Theorem**. Suppose $f$ is $\tau$-WQC and $\Ga$-WS and $r$ is an unbiased estimator for $\nb f(\te)$ with variance $V$, $\te^*\in B$, $\ve{\te_0-\te^*}\le R$. Then projected SGD with a suitable learning rate returns $\te_K$ with error
$$
\E f(\te_K)-f(\te^*) \le O\pa{
\max\bc{\fc{\Ga R^2}{\tau^2 K}, \fc{R\sqrt V}{\tau \sqrt K}}
}.
$$
(Dependence on $K$ is most important here. Check this.) (Variance makes the convergence $\rc{\sqrt K}$ rather than $\rc K$.)

# Control theory background

Consider dynamical systems in the form
\begin{align}
h_{t+1} &= A h_t + B x_t\\
y_t &= C h_t + D x_t + \xi_t\\
\xi_t & \sim N(0,\si^2).
\end{align}
(This is a SISO - single-input single-output system.)
The population risk is
$$
f(\wh \Te) = \EE_{\{x_t\}, \{\xi_t\}} \ba{
\rc T \sumo tT \ve{\wh y_t - y_t}^2
}
$$
where $\wh y_t$ is generated from the estimated parameters without noise.
Evert SISO of order $n$ can be put into **controllable canonical form**
$$
A = \matt{\vec 0}{I_{n-1}}{-a_n}{-a_{n-1:1}}, \quad B = \colthree{0}{\vdots}{1} = e_n.
$$
Write $A=CC(a)$, where $a=-[a_n,\ldots, a_1]$.

A SISO is **controllable** iff $[B|AB|\cdots|A^{n-1}B]$ has rank $n$. (See [Control theory/2 Controllability](../reinforcement_learning/control_theory.html#controllability).)

Let 
$$
p_a(z) = z^n + a_1z^{n-1}+\cdots + a_n = \det (zI-A)
$$
be the characteristic polynomial of $A$.

The **transfer function** of the linear system is
\begin{align}
G(z) &= C(zI - A)^{-1}B=:\fc{s(z)}{p(z)}\\
& = \sumo t{\iy} z^{-t} \ub{CA^{t-1}B}{r_{t-1}}\\
& = \fc{c_1+\cdots + c_n z^{n-1}}{z^n + a_1z^{n-1}+\cdots + a_n}
\end{align}
where $p$ is monic. (We have $M^{-1} = \fc{\text{cofactor}(M)}{\det(M)}$.)

(Why is the transfer function useful?)

Define the **idealized risk** as 
$$
g(\wh A, \wh C) = \sumz k{\iy} (\wh C\wh A^k B - CA^k B)^2.
$$
In the Fourier domain,
$$
g(\wh A, \wh C) = \int_0^{2\pi} |\wh G (e^{i\te}) - G(e^{i\te})|^2\,d\te
$$
(The hat on the parameters means "estimate", the hat on $G$ means "Fourier transform".)

*Explanation*. By unfolding the recurrences, then taking the average, 
\begin{align}
\E [\ve{\wh y_t - y_t}^2] & = \ve{\wh D - D}^2 + \sumo k{t-1} \ve{\wh C \wh A^{t-k-1} \wh B - CA^{t-k-1} B}^2 + \E[\ve{\xi_t}^2]\\
f(\wh \Te) & = \ve{\wh D - D}^2 + \sumo k{t-1} \pa{1-\fc kT}\ve{\wh C \wh A^{k-1} B - CA^{k-1} B}^2 + \si^2.
\end{align}
The idealized risk takes $T\to \iy$, and ignores the first term. Now by Parseval's Theorem,
\begin{align}
G(z) &= \sumo t{\iy} CA^{t-1} Bz^{-t}\\
\wh G(z) &= \sumo t{\iy} \wh C \wh A^{t-1} B z^{-t}\\
\int_0^{2\pi} |\wh G(e^{i\te}) - G(e^{i\te})|^2 & = \sumo t{\iy} \ve{CA^{t-1}B - \wh C \wh A^{t-1} B}^2.
\end{align}
(This can give some motivation for definition of $G$. Simply put $CA^kB$ as coefficients of power series; we get $G$. This also motivates looking at the Fourier series.)

(Why is it useful to pass to the Fourier domain?)

# Conditions

*    Fix $\tau_0,\tau_1,\tau_2$. Consider the trapezoidal region on the real axis,
     $$ C = \set{z}{\Re z \ge (1+\tau_0)|\Im z|} \cap \set{z}{\tau_1<\Re z <\tau_2}.$$.
* $p$ is $\al$-acquiescent if $\set{\fc{p(z)}{z^n}}{|z|=\al}\subeq C$. A linear system with transfer function $\fc sp$ is $\al$-acquiescent if $p$ is.
* $p$ is $\al$-acquiescent by extension of degree $d$ if there is monic $u$ of degree $d$ such that $pu$ is $\al$-acquiescent.
* Let $B_\al=\set{a\in \R^n}{\set{\fc{p_a(z)}{z^n}}{|z|=\al}\subeq C}$.
    * If $a\in B_\al$, then $A$ has spectral radius $\rh(A)<\al$.
	* *Proof*. $C$ does not intersect the negative real axis, so by Rouche's Theorem $z^n, p_a$ have the same number of roots. Thus $g$ has all roots inside $|z|=\al$. (NOTE: this only requires $\fc{p_n}{z^n}\nin\R$. Where do we use $\subeq C$? In the no blow-up property.)
	* $0<\al<\be\implies B_\al\sub B_\be$. *Proof*. Maximum modulo principle. If $q(z)\subeq C$ for $|z|=\rc \al$, then $q(z)\subeq C$ for $|z|=\rc \be$.
*    No blow-up:
     \begin{align}
	 \sumz k{\iy} \ve{\al^{-k} A^k B}^2 &\le 2\pi n\al^{-2n}/\tau_1^2\\
	 \ve{A^k B}^2&\le \min\{2\pi n/\tau_1^2, 2\pi n\al^{2k-2n}/\tau_1^2\}.
	 \end{align}
	 * Load these as coefficients into a Fourier series and use Parseval. Get $\int_0^{2\pi} |(I-\al^{-1}e^{i\la}A)^{-1}B|^2\,d\la$ which depends on the value of $p_a$ at $|z|=\al$. (Use forms of $A,B$.) (NOTE: this only requires $\fc{p_n}{z^n}\nin \{|z|\le \tau_1\}$.
* Define $H_2$ norm by $\ve{G}_{H_2}^2 = \rc{2\pi}\int_0^{2\pi} |G(e^{i\te})|^2\,d\te$.
* Let $\Ga(h) = \sum_{j\in [n]}\af{\la_j^n}{\prod_{i\ne j}(\la_i-\la_j)}$. (TODO, Q: how related to Lagrange, Chebyshev interpolation?)
	 
**Rouche's Theorem**. [wikipedia](https://en.wikipedia.org/wiki/Rouch%C3%A9's_theorem)

1. If $f,g$ are holomorphic in closed $K$, $|g|<|f|$ on $\pl K$, then $f$, $f+g$ have the same number of zeros inside $K$.
2. (Symmetric form) ... $|f-g|<|f|+|g|$ on $\pl K$ then $f,g$ have the same number of zeros.
	
# Proof

## Showing quasi-convexity

*   $g(\wh A, \wh C)$ is $\tau$-WQC over 
    $$N_\tau(a) = \set{\wh a\in \R^n}{\forall |z|=1, \Re\pa{p_a}{p_{\wh a}}\ge \fc\tau2}.$$
	*   *Proof*. Calculate $h_{\wh s},h_{\wh p}$. Then compute
		$$ \an{h_{\wh a}, \wh a - a} + \an{h_{\wh C}, \wh C-C} = 2\Re \pa{p}{\wh p} |\wh G - G|^2.$$
		Use the Fourier expression for $g$.
*   $g$ is $\Om\pf{\tau_0\tau_1}{\tau_2}$-WQC in $B_\al \ot \R^n$ and $O\pf{n^2}{\tau_1^4}$-WS.
	*   *Proof*. For $\wh a, a\in B_\al$, show that $\wh a\in N_\tau(a)$. Restricting $C$ to be a sector means the angle between any 2 points in $C$ is at most $\pi - \Om(\tau_0)$ and the magnitude is at least $\Om\pf{\tau_1}{\tau_2}$.
	*   Smoothness (3.4). Use chain rule with $p$ and CS.

## Unbiased estimator

Let $T_1=\fc T4$. 
Using loss function 
$$
\ell((x,y),\wh\Te) = \rc{T-T_1} \sum_{t>T_1} \ve{\wt y_t - y_t}^2,
$$
gradients wrt $\wh a, \wh C, \wh D$ are almost (exponentially) unbiased.

## Bounded variance

Omitted.

## Extensions

Ex. when we can't hope to properly recover: $G(z) = G_1(z) \fc{z^n-r_1^n}{z^n-r_2^n}$ where $r_1\approx r_2\approx 1$. They are exponentially close but the characteristic polys are very different.

Approximation: Prove that the inverse of a poly can be easily approximated (cf. proof for conjugate gradients, Chebyshev approx). 

Using the approximation result, get $\ab{\fc{pu}{z^{n+d}} - 1} <0.5$, so $\fc{pu}{z^{n+d}}\in C$ for appropriate $\tau_i$.
