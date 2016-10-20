---
title: MDP's with continuous state space
published: 2016-10-14
modified: 2016-10-14
tags: none
type: summary
showTOC: True
---

[Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter)

 Come up with a class of MDPs on exponentially large/continuous space that is interesting and tractable. Think of generalizing from contextual bandits
	* Basically we want a reasonable model of a MDP with a very large (exponential or continuous) state space and be able to do something with it. Wanted to include some dynamics like in Kalman filters but we weren't sure whether Kalman filters are tractable
	* Todo: learn about Kalman filters
	
# Starting points

1.  HMM's have discrete state space. What happens with continuous state space? Suppose there are some dynamics as in Kalman filters. Infer the hidden state. References
	* Continuous HMM paper (RKHS)
	* Kalman filters (see examples)
	* Grad descent learning dynamical systems.
2.  Contextual bandits + MDP's. Don't assume there's a hidden state here, just that next state depends, say, linearly on action and noise. 
3.  Context vector/random walk model for documents: transition probabilities $\propto \exp(-\an{c_1,c_2})$ and observation probabilities $\propto \exp(-\an{c_1,x})$.

# Model 

## First try

* Stochastic setting.
* $c_t$ is context at time $t$.
* Set of actions $A$. (For example, $A=\{e_1,\ldots, e_n\}$.)
* Next context $c_{t+1}=$ (Here $w_t$ is noise.)
	* $F_a c_t + w_t$. (Transformation depends on action.)
	* $F c_t + B a + w_t$. (Action is a forcing term. This matches Kalman formulation. More reasonable?) (\*)
* Payoff depends on context and actions in some way.
	* Model 1: depends only on context $\te^T c_t$. (\*)
	* Model 2: depends on context and action $\te^T[c_t;a]$.
	* ? Some probability?

This setting looks like reinforcement learning + control theory. Prior work? How is RL used in continuous systems right now? Basic control theory background?

Need the model to be a generalization of regular MDP.

(\*) may be interesting from control theory perspective, but doesn't generalize discrete MDP. (Seems like best to learn the dynamics, and then do optimal thing from there...)

## Second try

* Finite number of actions
* $c_{t+1} = F_a c_t + w_t$. (Only probability is noise.)
* Payout $\te_^T c_t$.

Captures deterministic MDP, but not probabilistic, by letting $A=\{e_i\}$.

# References

## Online

* [CASTLE Labs](http://castlelab.princeton.edu/)
    * [Optimal learning](http://optimallearning.princeton.edu/)
	* [Approximate dynamic programming](http://adp.princeton.edu/)
		* [Intros](http://adp.princeton.edu/adpIntros.htm)
	* [Unified framework](http://castlelab.princeton.edu/jungle.htm#unifiedframework)
* [Deep RL](https://github.com/andrewliao11/Deep-Reinforcement-Learning-Survey/blob/master/Reinforcement-Learning-Papers.md)

## Books

* [Puterman14](https://books.google.com/books?id=VvBjBAAAQBAJ&printsec=frontcover&dq=continuous+markov+decision+processes&hl=en&sa=X&ved=0ahUKEwjo3OLywOnPAhVHWD4KHXzgDWUQ6AEIKTAC#v=onepage&q=continuous%20markov%20decision%20processes&f=false)
* [Bertsekas87](https://books.google.com/books?id=-6RiQgAACAAJ&dq=Dynamic+Programming:+Deterministic+and+Stochastic+Models&hl=en&sa=X&ved=0ahUKEwjc0pfAyefPAhUGFz4KHaVIDecQ6AEIHjAA)

## Papers

* [AAKMR02] A Note on the Representational Incompatibility of Function Approximation and Factored Dynamics.pdf
    * Barrier to solving factored MDP's is not just computational, it is representational (there is no succinct policy)
	* DBN-MDP (factored MDP): transition law $\de$ is dynamic Bayes net. The first layer are the variables (and action) at time $t$, the second layer are the variables at time $t+1$, the graph is directed, the indegree of each second-layer node is at most constant.
	* Rewards are linear.
	* Connection with AM-games: V's state corresponds to state, P implements policy.
	* If PSPACE is not contained in P/POLY, then there is a family of DBN-MDPs, such that for any two polynomials $s,a$, there exist infinitely many $n$ such that no circuit $C$ of size $s(n)$ can compute a policy having expected reward greater than $\rc{a(n)}$ times the optimum.
	* (This is the policy optimization part. Can you learn Bayes nets? @Andrej)
	* (Note that the "drifting context vector (RANDWALK)" model can be represented by a model with $1\to 1', 2\to 2',\ldots$.)
	* What if you only compared to the best policy in a class of policies? (cf. EXP4)
* (\*) [ALA16] Reinforcement Learning of POMDPs using Spectral Methods.pdf
* [G] Reinforcement learning - a Tutorial Survey and Recent Advances.pdf
* [HSMM15] Off-policy Model-based Learning under Unknown Factored Dynamics.pdf
	* Under 3 assumptions, using a greedy approach to finding parents, estimate the transition function (parameters to Bayes net) (compre with prob models literature?)
	* This is for off-policy evaluation; it doesn't tell us how to find the optimal policy.
	* (Is the model learning and policy evaluation coupled or not?)
	* (It seems to be learning the Bayes net rather than evaluating $\pi$. Ah, once you learn the Bayes net then you can evaluate just by sampling.)
	* The difference from simpling learning a Bayes net is that the samples aren't independent---they were from following a certain policy. Assumptions will ensure that you can still learn the model even if you only have samples from that policy.
* [KAL16] Contextual-MDPs for PAC-Reinforcement Learning with Rich Observations.pdf
* [KLM96] Reinforcement Learning - A Survey.pdf
* (\*) [P14] Clearing the Jungle of Stochastic Optimization.pdf
* [P14] Energy and Uncertainty - models and algorithms for complex energy systems.pdf
* (\*) [P16] A Unified Framework for Optimization under Uncertainty.pdf
* [PB79] On the convergence of policy iteration in stationary dynamic programming.pdf
* (\*) [SR04] Convergence properties of policy iteration.pdf
* (\*) [WD92] Q-learning.pdf

# Misc

Do as well as best Bayes net? Actions in some class. Finite set of actions, vs. exponential/continuous set of actions. In latter case, will depend on optimizability of that set...

<!--Definitely need something stronger than: there exist something that works! if can encode crypto -->
