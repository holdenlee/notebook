---
title: Linear convex regulator 2
published: 2017-01-10
modified: 2017-01-10
tags: none
type: summary
showTOC: True
---

[Part 1](lcr.html)

Fix $x_1$. Let the cost function (jointly convex in $x,a$) be $c(x,a)$ (for example, $g(x) + \ve{a}^2$) the actions be $a_1,a_2,...$ and the recurrence describing the dynamics be $x_{n+1} =Ax_n+Ba_n$, we want

\begin{align}
&\quad
\min_{a_1} [c(x_1,a_1) + \min_{a_2} [c(Ax_1+Ba_1,a_2) + ...]] \\
&=
\min_{a_1,...,a_T} c(x_1,a_1) + c(Ax_1+Ba_1,a_2) + ...
\end{align}
This objective is jointly convex because we are assuming $c$ is convex, and a convex function composed with a linear function is convex.
Letting $f_a(x) = Ax + Ba$ be the function describing the dynamics and $f_{a_1\cdots a_n} (x) = f_{a_n}\circ \cdots \circ f_{a_1}(x)$, we can write this as
$$
\min_{a_1,...,a_T} \ub{c(x_1,a_1) + c(f_{a_1}(x_1),a_2) + c(f_{a_1a_2} (x_1),a_3)+\cdots}{F(a_1,\ldots, a_T)}
$$

# Convex optimization

What guarantees do we get from convex optimization? We can consider different settings:

* We know the function $c$ (full information) vs. we don't know $c$, only get access to $c$ through the trajectories that we sample, i.e., for each episode we choose a sequence of actions $(a_1,\ldots, a_T)$ and observe $c(x_1,a_1), c(f_{a_1}(x_1),a_2),\ldots$. (Then we can care about regret bounds, etc.)
* If we don't know $c$: $c$ can be deterministic or stochastic (so we care about $\min_{a_1,...,a_T} \E c(x_1,a_1) + c(f_{a_1}(x_1),a_2) + c(f_{a_1a_2} (x_1),a_3)+\cdots$). (Stochasticity not incorporated below, but easy to include.)

## Full information

This is just gradient descent. The dimension is $Tn$, the gradient is a sum of gradients of $c$'s, see below. If $c$ is stochastic, then this is SGD.

## See only costs of sampled trajectories

**Theorem 6.6 in OCO**. Online gradient descent without a gradient attains regret bound
$$
\E R_T \le 9nDGT^{\fc 34}
$$
where

* $n$ is the dimension.
* $D=\diam K$, where $K$ is the convex set we're optimizing over.
* $G=\sup_{x\in K} \ve{\nb f(x)}$.
* $T$ is the number of steps.

Applying this here, we have 

* The dimension is $Tn$.
* Suppose each action is in $K$. Then $D=\sqrt n \diam(B)$.
*   Suppose $f_a(x)$ is a function $K\times C \to C$ and $x_1\in C$. Let 
	\begin{align}
	m &= \max_{x\in C, a\in K^T}\nb_x c(x,a)\\
	L &= \max_{x\in C, a\in K^T}\nb_a c(x,a).
	\end{align}
	Let $\ga$ be the max eigenvalue of $B$. Then 
	\begin{align}
	\ve{\nb_{a_i}F} &= \ve{
	\nb_{a_i} c(f_{a_{1:i-1}}(x_1),a_i)
	+\nb_{a_i} c(f_{a_{1:i}}(x_1), a_{i+1})
	+\cdots \nb_{a_i} c(f_{a_{1:T-1}}(x_1),a_T)}\\
	&\le L + \be (1+\ga +\cdots + \ga^{T-1-i})m\\
	&\le L + \fc{\be}{1-\ga}m\\
	\ve{\nb_{a_{1:T}}F} & \le \sqrt{T} (L + \fc{\be}{1-\ga}m).
	\end{align}

## Notes

* This does not use any kind of function approximation, so the optimization only gives us information about the optimal action at $x_1$. **If we choose a different starting point, we have to run the optimization procedure with that new starting point.**
* **We ignore the structure of each point $x$ in the space being a tuple of actions** $(a_1,\ldots, a_T)$. Is there a way to use the structure of the cost function (as a sum of costs) to get better complexity?
* Complexity scales as lookahead time $T$. We can do better by realizing that later actions are less important - so e.g. to estimate the gradient we can do ellipsoid sampling instead of sphere sampling.
* This assumes we know the dynamics. Otherwise we would have to learn them (cf. [HMR16](../optimization/HMR16.html)). (This is only interesting if there is noise in the observation.)

# Noisy dynamics

The problem changes when there is noise in the dynamics.
$$
x_{n+1} = Ax_n+Ba_n + \ep_n.
$$

* The convex optimization problem solves for the best actions if all actions $a_{1:T}$ have to be chosen ahead of time - you don't get to choose your action $a_n$ online after observing $x_n$. This may be very suboptimal.
	* For general MDP's, there can be a significant gap between what you can achieve with and without an online strategy (not sure how significant the gap is for convex $c$, but I expect it will still be there).
* (If the noise is nice, ex. Gaussian, then because we are basically convolving with the noise, convexity is preserved.)
* If we want an online strategy (which makes much more sense), we can't unroll like this and get a convex optimization problem. **What to do?**

# References

Might be useful.

* Kernel methods solve bandit convex optimization: [BEL16] Kernel-based methods for bandit convex optimization (Can something like this work in the RL setting?)
* Relationship between sampling and interior point methods: [AH15] Faster Convex Optimization - Simulated Annealing with an Efficient Universal Barrier

