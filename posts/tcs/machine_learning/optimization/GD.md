---
title: Gradient descent
published: 2016-03-04
modified: 2016-03-04
tags: gradient
type: concept
---

(See 10/15 notebook for detailed notes.)

#Summary

Algorithm|General|$\al$-strongly convex|$\be$-smooth|$\ga$-convex
---|---|---|---|---
Gradient descent|$\rc{\sqrt{T}}$|$\rc{\al T}$|$\fc{\be}T$|$e^{-\ga T}$
Accelerated gradient descent|$\fc{d}{T}$|$\rc{\al T^2}$|$\fc{\be}{T^2}$|$e^{-\sqrt{\ga} T}$

##Gradient descent main points

* What is the general framework?
    1. Pick a descent direction $\De x$.
	2.  Choose a step size $\tau>0$:
	    $$x^{(t+1)} \leftarrow x+\tau \De x.$$
    3. Continue until stop criterion.
* What is vanilla (one shot) gradient descent?
    *    Gradient descent lemma: Suppose $f$ is convex and $L$-smooth, $\ve{\nb f(x)-\nb f(y)}\le L\ve{x-y}$.
		 \begin{align}
		 x':&=x-\rc L \nb f(x)\\
		 \implies f(x')&\le f(x) - \rc{2L}\ve{\nb f(x)}^2.
		 \end{align}
	* There's no guarantee on smoothness unless we assume $f$ is $l$-strongly convex, $\ve{\nb f(x)-\nb f(y)}\le l\ve{x-y}$. Let $\ka=\fc{L}{l}, t = \fc{2}{L+l}$.[^f1] Then linear convergence holds:
	     \begin{align}
         \ve{x_{k+1}-x^*} \le \pf{\ka-1}{\ka+1} \ve{x_k-x^*}
	     \end{align}
* What is gradient descent with backtracking?
    * Parameters $\al\in (0,0.5)$, step size, $\be\in (0,1)$ scaling factor.
    * Choose $\De x=\nb f(x)$.
	*    Choose $\tau$ by backtracking:
		 Set $t=1$.
		 While $f(x+t\De x)>f(x)+\al \nb f^T\De x$,
	     $$\De x\leftarrow \al \De x.$$
	*   Lemma: suppose $mI \preceq \nb^2 f \preceq MI$. Then
	    $$\fc{f(x_t)-f(p^*)}{f(x_{t-1})-f(p^*)}\le 1-\min\bc{\fc{2\al \be m}{M}, 2m\al}.$$
* 

[^f1]: Think of this as the harmonic average of how much to move to get to the minima of the upper and lower-bounding quadratics.

#Proofs

Gradient descent lemma: Let $D=\nb f(x)$. Move to origin. Upper bound is
$$f(x) \le \fc{L}2 x^2 + Dx.$$
The minimum is at $-\fc{D}{L}$ and is $\fc{-b^2}{4a} = -\fc{D^2}{2L}.$

For strongly convex: Choose $s$ to maximize the minimum progress in terms of $x$.
$$\fc{s-\rc{l}}{\rc{l}} = \fc{\rc L-s}{\rc L} \implies s = \fc{2}{L+l}.$$
