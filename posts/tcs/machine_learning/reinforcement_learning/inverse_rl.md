---
title: Inverse RL
published: 2017-04-03
modified: 2017-04-03
tags: reinforcement learning
type: summary 
showTOC: True
---

# [NR00] Inverse reinforcement learning

Compute constraints that characterize set of reward functions so observed behavior maximizes reward. Use max-margin heuristic.

# [HDAR16] Cooperative inverse reinforcement learning

Human knows reward function. Robot does not. Robot payoff is human reward.

IRL: $\Pj(u|\te, x_0) \propto e^{U_\te(x_0,u)}$.

* Reduction to POMDP and sufficient statistics
* Apprenticeship learning and suboptimality of IRL-like solutions (because H can use a suboptimal action to convey more information to R).

Desiderata:

1. Leverage action to improve learning.
2. Human is not uninterested expert, but cooperative teacher.

## Formalism

* $\Te$: static reward parameters observed by $H$.
* $R: S\times A^H\times A^R\times \Te \to \R$, reward.
* $\ga$: discount

At time $t$, observe $s_t$ and select action $a_t^H, a_t^R$. Both achieve reward $r_t=R(s_t,a_t^H, a_t^R;\te)$.

Note: decentralized POMDP - compute optimal joint policy is NEXP-complete. 

Here, private info is restricted to $\te$, so reduction to coordination-POMDP does not blow up state space. ($|S_C|=|S||\Te|$). (State is tuple or world state, reward parameters, and R's belief.)

Belief about $\te$ is sufficient statistic for optimal behavior. $(\pi^{H*},\pi^{R*})$ depends only on current state and R's belief.

Apprenticeship learning: imitate demonstrations.

ACIRL: 2 phases, human and robot takes turns; then robot acts independently (deployment). 

Ex. With linear dependence on $\te$, in deployment, optimal policy is to maximize reward induced by mean.

DBE (demonstration by expert): greedily maximizes immediate reward. Best response is to compute posterior over $\te$.

There exist ACIRL games where $br(br(\pi^E))\ne \pi^E$.

<!--Human objective $U_\te(x_0,u_R,u_H)$.-->

* ? Seems to require human knowing how robot learns. Unrealistic teaching assumption.
* ? Is reward observed by robot? No.

## Simple approximation scheme

Suppose reward is $\phi(s)^T\te$.

$$\tau^H = \amax_\tau \phi(\tau)^T \te - \eta\ve{\phi_\te-\phi(\tau)}^2.$$

Optimal $\pi^R$ under DBE tries to match observed feature counts. (**I don't get this.**.)

## Future work

Coordination problem.

# Other papers

* [RA07], [Z...08]: $\pi^H$ is noisy expert. Bayesian approach: prior on rewards, vs. prior on reward functions.
* [Nat...10] observe cooperating multiple actors.
* [Wau...11], [KS15]: infer payoffs from observed behavior in general.
* [Fer...14], hidden-goal MDP, goal unobserved. Human as part of environment
* [CL12] Teach learner reward for MDP.
* [DS13] Motion best communicating agent's intention.
