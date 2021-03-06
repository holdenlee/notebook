---
title: Reinforcement learning theory
published: 2016-10-22
modified: 2016-10-24
tags: reinforcement learning
type: notes
showTOC: True
---

Figure out what's provably known about RL!

* [References](dl_refs.html)
* [Convergence for basic algorithms](rl_convergence.html)

# Known model

* LP solves in poly time.
* Policy improvement converges to global optimum. Is it poly time? (cf. simplex method is not poly-time, but is under smoothed analysis)
	* This seems unclear - it's an open problem as of 04.
* Does alternating policy estimation/improvement converge? In poly time? (cf. alternating minimization)
* What about attaining the optimal Cesaro sum?

# Unknown model

* Episodic: does MC converge? What is the convergence rate (regret)? 
	* Exploring starts, etc. (ability to choose starts? cf. optimal learning)
* TD learning (non-episodic): Convergence (or non-convergence) rate of 
	* SARSA (model estimation)
	* Q-learning.

# Parametrized policy

Suppose payout is convex in policy parameters. But why would this ever be the case???

Or: have to decide between several experts.

# References

