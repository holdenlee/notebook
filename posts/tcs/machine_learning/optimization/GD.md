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

"$\ga$-convex" is also called "condition number $\ka$" ($\ka= \ga$).

##Gradient descent main points

* What is the general framework?
    1. Pick a descent direction $\De x$.
	2.  Choose a step size $\tau>0$:
	    $$x^{(t+1)} \leftarrow x+\tau \De x.$$
		* Backtracking OR
		* Exact line search
    3. Continue until stop criterion.
* What is vanilla (one shot) gradient descent?
    *    Gradient descent lemma: Suppose $f$ is convex and $L$-smooth, $\ve{\nb f(x)-\nb f(y)}\le L\ve{x-y}$.
		 \begin{align}
		 x':&=x-\rc L \nb f(x)\\
		 \implies f(x')&\le f(x) - \rc{2L}\ve{\nb f(x)}^2.
		 \end{align}
	* There's no guarantee for linear convergence unless we assume $f$ is $l$-strongly convex, $\ve{\nb f(x)-\nb f(y)}\le l\ve{x-y}$. Let $\ka=\fc{L}{l}, t = \fc{2}{L+l}$.[^f1] Then linear convergence holds:
	     \begin{align}
         \ve{x_{k+1}-x^*} \le \pf{\ka-1}{\ka+1} \ve{x_k-x^*}
	     \end{align}
	* This requires knowing the condition number. If we don't know the condition number, use something like backtracking to get similar convergence guarantees.
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

**Gradient descent lemma:** Let $D=\nb f(x)$. Move to origin. Upper bound is
$$f(x) \le \fc{L}2 x^2 + Dx.$$
The minimum is at $-\fc{D}{L}$ and is $\fc{-b^2}{4a} = -\fc{D^2}{2L}.$

For strongly convex: Choose $s$ to maximize the minimum progress in terms of $x$.
$$\fc{s-\rc{l}}{\rc{l}} = \fc{\rc L-s}{\rc L} \implies s = \fc{2}{L+l}.$$

**Backtracking analysis:**

* Translate to $(0,0)$ and look at 1-D slice. Then $f\le b x + \rc2 M x^2$, $b = \ve{\nb f(x)}$. The quadratic equals $\al bx $ at $x=\fc{2b(1-\al)}{M}$. 
*   One of the following holds.
    \begin{align}
	f(x+t_0\De x) &> f(x) + \al \nb f^T \De x\\
	t &= \fc{2\nb f^T\De x (1-\al)\be}{M} \ge \fc{\nb f^T \De x \be}{M}
	\end{align}
	where the last inequality follows from $\al<0.5$.
*   What's the right measure of progress?
    * It shouldn't be the absolute progress; it should depend on what the minimum actually is. Closer to $x^*$, we make a smaller step size but *more progress proportionally*. The right measure is $\fc{f(x_{n+1}) - f(x^*)}{f(x_n)-f(x^*)}$.
	* Abstractly, given a quadratic upper and lower bound for $f$, make progress towards minimum.
	*   Consider the 1-D case at $(0,0)$. We have
	    $\wt f(t) \in  - d^2 t + \rc 2 (m,M) d^2 t^2.$
		* The minimum possible is $-\rc 2 \fc{d^2}{M}$.
		* 1st case: $\wt f(1) > - \al d^2 t_0$.
		    * Progress $2m\al$.
		* 2nd case: $\wt f(t) > - \fc{2\al \be (1-\al)d^2}{M}$
		    * Progress $\fc{2\al \be m}{M}$.
		* Convergence $\fc{f(x_t) - f(x^*)}{f(x_{t-1}) - f(x^*)} \le 1-\min\pa{\fc{2\al \be (1-\al)d^2}{M}, 2m\al}$.
			
