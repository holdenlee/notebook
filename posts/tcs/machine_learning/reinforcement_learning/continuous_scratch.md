---
title: MDP's with continuous state space (scratch)
published: 2016-10-14
modified: 2016-10-25
tags: none
type: summary
showTOC: True
---

[written-up things](continuous.html)

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

# Misc

Do as well as best Bayes net? Actions in some class. Finite set of actions, vs. exponential/continuous set of actions. In latter case, will depend on optimizability of that set...

Ex. class is a SVM.

"Do as well as best estimator of $q$ function in a certain class (assume convexity or something?)" (cf. contextual bandits first)

<!--Definitely need something stronger than: there exist something that works! if can encode crypto 

Upper confidence bounds
-->
