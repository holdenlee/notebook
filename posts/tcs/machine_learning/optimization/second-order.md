---
title: Second-order methods
published: 2016-04-22
modified: 2016-04-22
tags: Newton, second-order
type: topic
showTOC: True
---

See [gradient descent](GD.html).

* What is the general framework?
    1. Pick a descent direction $\De x$.
	2.  Choose a step size $\tau>0$:
	    $$x^{(t+1)} \leftarrow x+\tau \De x.$$
    3. Continue until stop criterion.

#Main points

* What's the shortcoming of gradient descent that we want to fix?
    * It is not invariant under linear transformation.
	* When the condition number of the Hessian is large, it has bad convergence.
* Steepest descent
    *   For a norm $\ved$, the steepest descent direction is (sd = steepest descent, nsd = normalized steepest descent)
	    \begin{align}
		\De x_{sd} &= \min_{\ve{y}} \nb f(x)^T y.
		\end{align}
* Newton method
    *   Let
	    \begin{align}
		\De x_{sd} &= -H^{-1}\nb f\\
		\De x_{nsd} &=\fc{H^{-1} \nb f}{\ve{H^{-\rc 2} \nb f}} = \fc{H^{-1} \nb f}{\la(x)^2}\\
		\la(x) &= \ve{H^{-\rc 2}\nb f}^{\rc 2} = (\nb f^T H^{-1} \nb f)^{\rc 2}.
	    \end{align}
		Here $\la(x)$ is the Newton decrement.
* What are the drawbacks of Newton's method and how to fix them?
    * Naively it requires computing 

#Proofs

*   Newton method is steepest descent for $H$:
	*   Let $A$ be a symmetric positive definite matrix. Defining $\ved_A$ as follows, we note that the dual norm is the norm corresponding to the inverse.
		\begin{align}
		\ve{A} :&= x^TAx = \ve{\sqrt A}_2\\
		\ve{x}_{A}^* & = \ve{x}_{A^{-1}}.
		\end{align}
		*   *Proof.*
			$$\ve{x}_A^* = \max_{\ve{y}_A=1} x^Ty \stackrel{z = \sqrt{A}y}{=} \max_{\ve{z}=1} x^T A^{-\rc 2} z = \ve{A^{-\rc 2}x^T}  = \ve{x}_{A^{-1}}.$$
		*   This calculation also shows that
		    $$\amin_{\ve{y}_A=1} v^Ty = \fc{A^{-1} x}{\ve{A^{-\rc 2}x}}.$$
		*   Thus,
			\begin{align}
			\De x_{nsd} &= \fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}.
			\end{align}
	*   Why is $\De x_{nsd}$ the right normalization?
	    $$ f\pa{x - t\fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}} \approx f(x) + (-t+\fc{t^2}2) \fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}$$
		and $t=1$ minimizes this.
* Why do we use $\ved_H$?
	*   It appears in the second-order Taylor approximation. $f(x) + \nb f^T v + \rc 2 v^T \nb^2 f v$ has a minimum at $\fc{H^{-1}f}{\ve{H^{-\rc 2}f}}$, not in the gradient direction!
	*   It is invariant to linear transformation: $\De x_{nsd} (f\circ A) = \De x_{nsd} f$.
*   Give an example where gradient descent performs poorly compared to Newton.
    $f = x_1^2 + \ep x_2^$, $-\nb f = (-2x_1,-2\ep x_2)$. 


#Scraps

estimating Hessian?
