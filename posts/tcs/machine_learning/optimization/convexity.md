---
title: Convexity
published: 2016-04-23
modified: 2016-04-23
tags: convex optimization
type: topic
showTOC: True
---

#Questions

* Define strongly convex. What estimates can you make using strong convexity? Why is it useful?
* Define smoothness. What does it give you?
* Define condition number for sets and matrices. What is the relationship? What do bounds on $\nb^2$ give on condition number?

#Answers

*   Strongly convex means
    $$ f(y) \ge f(x) + \nb f(x)^T (y-x) + \fc m2 \ve{y-x}_2^2. $$
	For twice-differentiable functions, this is equivalent to $\nb^2 f\succeq mI$.
	Strong convexity lower-bounds suboptimality: if the gradient is small, then you are not too far from the minimum, because the gradient changes fast. (Ex. for $c+dx+\fc m2x^2$, the minimum is at $-\fc dm = -\rc m \nb f$.)
	The following inequality hold: (bound the optimal value in terms of the gradient, and bound the distance in terms of the gradient.
	\begin{align}
	p^* &\ge f(x) - \rc{2m}\ve{\nb f(x)}_2^2\\
	\ve{x-x^*}_2 & \le \fc 2m \ve{\nb f}_2^2.
	\end{align}
*   Smoothness means
	$$ f(y) \le f(x) + \nb f(x)^T (y-x) + \fc M2 \ve{y-x}_2^2. $$
	For twice-differentiable functions, this is equivalent to $\nb^2 f\preceq MI$.
	Smoothness upper-bounds suboptimality, and ensures that step sizes don't overshoot the minimum (much)
	\begin{align}
	p^* &\le f(x) - \rc{2M}\ve{\nb f}_2^2.
	\end{align}
*   The condition number of a convex body $C$ is ($W_{\max},W_{\min}$ are max and min width)
    $$ \text{cond} (C) = \fc{W_{\max}^2}{W_{\min}^2}.$$
	For an ellipsoid defined by $x^TA^{-1}x\le 1$,
	$$ \text{cond} (\mathcal E) = \fc{\la_{\max}(A)}{\la_{\min}(A)} = \ka(A).$$
	Strong convexity and smoothness together bound the condition number of sublevel sets $C_\al =\set{x}{f(x)\le \al}$. We have for $p^*<\al$,
	$$B_{\sfc{2(\al-p^*)}{M}}\subeq C_\al \subeq B_{\sfc{2(\al-p^*)}{m}},$$
	$\text{cond}(C_\al)\le \fc{M}{m}$. Moreover, $\lim_{\al\to 0^+} \text{cond}(C_\al) = \ka (\nb f(x^*))$.
