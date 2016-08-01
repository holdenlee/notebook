---
title: Gradient descent
published: 2016-03-04
modified: 2016-03-04
tags: gradient
type: concept
---

(See 10/15 notebook for detailed notes.)

See also [AO15](AO15.html) and [mirror descent](mirror-descend.html).

#Summary

Algorithm|General|$\al$-strongly convex|$\be$-smooth|$\ga$-convex
---|---|---|---|---
Gradient descent|$\rc{\sqrt{T}}$|$\rc{\al T}$|$\fc{\be}T$|$e^{-\ga T}$
Accelerated gradient descent|$\fc{d}{T}$|$\rc{\al T^2}$|$\fc{\be}{T^2}$|$e^{-\sqrt{\ga} T}$
GD (average regret)|N/A| $\rc{\al} \ln T$ | $\rc{\sqrt T}$ | $\fc{n}{\ga} \ln T$

"$\ga$-convex" is also called "condition number $\ka$" ($\ka= \ga$).


##Gradient descent main points

* What is the general framework?
    1. Pick a descent direction $\De x$.
	2.  Choose a step size $\tau>0$:
	    $$x^{(t+1)} \leftarrow x+\tau \De x.$$
		* Backtracking OR
		* Exact line search OR
		* Fixed multiplier
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
			
#Different settings

*   $\be$-smooth: see [AO15](AO15.html). Note that proof starts with $f(x_k)-f(x^*)$ rather than $\ve{x_k-x^*}$, and telescopes on $\rc{D_k}$ instead of $\ve{x_k-x^*}$.

    Alternate proof off by factor of $\log T$: reduce to $\ga$-convex by adding $\fc{\al}2\ve{x-x_1}^2$. 
* $\al$-sc: Proof off by factor of $\log T$: average $f*\mu(\pl \bS_\de)$ is $\fc{dG}{\de}$ smooth; optimize parameters.
* General case: Consider $g(x)=f(x) + \fc{\al}2\ve{x-x_1}^2$. Use the $\al$-sc case to get error $\fc{\al}2R^2 + \rc{\al T}$. Take $\al = \sfc{1}{TR}$ to get $\sfc{R}{\sqrt T}$.

#Regret bounds

*   General (can replace gradient by subgradient): Suppose $\ve{\nb f(x)}_2\le M$ and $\ve{x_1-x^*}_2\le R$. 
	\begin{align}
    \rc 2\ve{x_{k+1}-x^*}_2^2
	& = \rc2 \ve{x_k-\al_k g_k -x^*}_2^2 \\
	&= \rc 2\ve{x_k-x^*}_2^2 - \al_k \an{g_k,x_k-x^*} + \fc{\al_k^2}{2}\ve{g_k}^2\\
	&\le \rc 2\ve{x_k-x^*}_2^2 - \al_k [f(x_k) - f(x^*)]+ \fc{\al_k^2}{2}\ve{g_k}^2& (f(x^*) \ge f(x_k) + \an{g_k,x^*-x_k}).
	\end{align}
	Rearranging,
	$$
	\al_k [f(x_k) - f(x^*)] \le \rc2 \ve{x_k-x^*}^2 \le 
	\rc2 \ve{x_k-x^*}-\rc2 \ve{x_{k+1}-x^*}^2 + \fc{\al_k^2}{2}\ve{g_k}_*^2.
	$$
	Summing and telescoping, (n.b. we don't divide through by $\al_k$ before summing)
	$$
	\sumo kK  \al_k [f(x_k)-f^*] \le \rc2\ve{x_1-x^*}_2^2 + \sumo kK \fc{\al_k^2}2 \ve{g_k}_2^2.
	$$
	Letting $\ol x_K = \rc K \sumo kK x_k$, (for simplicity of notation, set $\rc{2\al_0}=0$)
	$$
	f(\ol x_K) - f(x^*) \le \rc K\pa{
	\sum_k \pa{\sumo kK\rc{2\al_k}-\rc{2\al_{k-1}}\ve{x_k-x^*}} - \rc{2\al_K} \ve{x_{K+1}-x^*}^2+ \sumo kK \fc{\al_k}2\ve{g_k}^2}
	\le \rc{2\al K}R + \rc{2}\al M^2.
	$$
	Choose $\al=\fc{\sqrt{R}}{M\sqrt{K}}$ to get this is $\le \boxed{\fc{M\sqrt{R}}{\sqrt K}}$.
	<!--
	Letting $\ol x_K = \sumo kK \al_k x_k/\sumo kK \al_k$, 
	$$
	f(\ol x_K) - f(x^*) \le \fc{R^2+ \rc2 \sumo kK \al_k^2 M^2}{\sumo kK \al_k}.
	$$
	(By convexity, $f(\ol x_K)\le \sumo kK \al_kf(x_k)/\sumo kK \al_k$.)

	Choose $\al=\fc{R}{M\sqrt K}$ to get 
	$$
	f(\ol x_K) - f(x^*) \le \fc{RM}{\sqrt K}.
	$$
	Note if $\sum_k \al_k=\iy$ but $\al_k\to 0$, we get convergence.

	This is slow. If we want $f(x_k) - f(x^*)\le \ep$, we need $O\prc{\ep^2}$ steps.
    I'm very confused here. Isn't the above setting the $M$-smooth case, in which case you get $\rc{T}$ convergence? -->
	Note this is a regret bound, and it gives a bound on $\ol x_K$ not $x_K$. For the bound on $x_K$ see [AO15](AO15.html). Note that proof starts with $f(x_k)-f(x^*)$ rather than $\ve{x_k-x^*}$, and telescopes on $\rc{D_k}$ instead of $\ve{x_k-x^*}$.

