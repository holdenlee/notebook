---
title: Reinforcement learning
published: 2016-09-28
modified: 2016-09-28
tags: reinforcement learning
type: notes
showTOC: True
---

# References

* Barton, Sutto.
* Algorithms course Lecture 8
* ...

# 3 

Bellman optimality equations

\begin{align}
v_*(s) &= \max_\pi v_\pi(s)\\
q_*(s,a) &= \max_\pi q_\pi(s,a)\\
v_*(s)&= \max_{a\in \mathcal A(s)} \sum_{s'} p(s'|s,a) [r(s,a,s') + \ga v_*(s')\\
q_*(s) &= \sum_{s'} p(s'|s,a) [r(s,a,s') +\ga \max q_*(s',a')].
\end{align}

3 assumptions that are rarely all true in practice:

1. Know dynamics of environment
2. Have enough computational resources
3. Markov property

Many decision-making methods attempt to approximately solve the Bellman optimal equations.

A RL algorithm puts more effort into learning good decisions for frequently encountered states.

# 4 Dynamic programming

Three classes of methods for solving MDP's.

1. Dynamic programming
    * Well-developed mathematically
	* Require complete, accurate model of environment
2. Monte Carlo methods
    * Don't require model, conceptually simple
	* Not suitable for incremental computation
3. Temporal-difference learning
    * Don't require model, fully incremental
	* Complex to analyze

Think of other methods as attempts to achieve the same effect as DP with less computation and without a perfect model.

Use value functions to organize the search for good policies.

Iterative **policy evaluation**: (make value function consistent with current policy)
$$
v_{k+1}(s) = \sum_a \pi(a|s) \sum_{s'} p(s'|s,a) [r(s,a,s') + \ga v_k(s')].
$$
This is a full backup because we calculate $v_k(s)$ for all $s$ in each stage. (TODO: prove convergence.) Stop when maximum difference $\max_{s\in S}|v_{k-1}(s)-v_k(s)|<\te$.

(Can also update in-place. Then update order makes a difference.)

**Policy improvement theorem**. If $\pi,\pi'$ are deterministic policies such that for all $s\in S$, 
$$q_\pi(s,\pi'(s))\ge v_\pi(s),$$
then $\pi'$ is at least as good as $\pi$, $v_{\pi'}(s) \ge v_\pi(s)$.

*Proof*. Unfold and note convergence.

This shows that iterative policy improvement can only help:
$$
\pi'(s) = \amax_a \sum_{s'} p(s'|s,a) [r(s,a,s') + \ga v_\pi(s')].
$$
If it stops improving, then $\pi'$ is optimal.

Policy iteration: $\pi_k\xra E v_{\pi_k} \xra I \pi_{k+1}$. Alternately evaluate and improve.

<!-- assuming we know p's-->

<!-- Value iteration is when policy evaluation is stopped after one sweep.-->
Above, to evaluate, we have to keep doing policy iterations until convergence. For speed, we just do one (or a few) step of policy evaluation. Combining the improvement and evaluation steps:
$$v_{k+1} := \max_a \sum_{s'} p(s'|s,a)[r(s,a,s') + \ga v_k(s')].$$
(cf. EM/AM?)

<!-- Q: if this stabilizes, does it mean we have converged? p. 100-->

Asynchronous DP: back up values of states in any order, using whatever values of other states are available.
Can do with value iteration and policy iteration. Helps intermix computation with interaction (actually experiencing MDP---apply backups as agent visits states).

The time that DP methods take is polynomial in number of states and actions. LP can be used to solve MDP's but become impractical at smaller number of states than DP.

<!-- can such iterative methods solve LP? -->

# 5 Monte Carlo methods

Don't assume complete knowledge of the environment. Learn from online and simulated experience. The model only needs to generate sample transitions rather than give a complete probability distribution.

MC assumes experience is divided into episodes.

Each occurrence of a state in an episode is a *visit*. 

* Every-visit MC: estimate $v_\pi(s)$ as the average of returns following all visits to $s$
* First-visit MC: average just returns following first visits (in an episode) to $s$.

DP shows all possible transitions but the MC diagram only shows those sampled on one episode.

(Ex. of finding bubble surface given wire frame. Iterative = compute surface iteratively by averaging at each point. MC = take a random walk from each point; expected height at boundary is approximation of height. This is more efficient if we are interested in a small number of points.)

If the model is not available, it's mre useful to estimate action than state values.  (From the action-value function $q$ we can directly construct the greedy policy.)

Problem: if you follow a deterministic policy, you will only observe one action from each state. 

Solution: Explore! Assume each state-action pair has a nonzero probability of being selected at the start of an episode (exploring starts). More realistic: consider policies that are stochastic with nonzero probability of selecting all actions.

This works assuming:

1. episodes have exploring starts
2. policy evaluation can be done with infinitely many episodes.
    * Instead: approximate and keep track of error bounds. But this requires many episodes.
	* Forgo policy evaluation: move value function toward $q_{\pi_k}$.

MC ES cannot converge to any suboptimal policy (if it did, the value function converges to the value function for that policy, and the policy changes). *Open question*: does it always converge? [Tsitsiklis02]

5.4 On-policy MC control

Improve the policy used to make decisions.

Soft policy: $\forall s,a\in \mathcal A(s), \pi(a|s)>0$. $\ep$-soft: $\ge \fc{\ep}{|\mathcal A(s)|}$.

Policy iterations works for $\ep$-soft policies.

1. The policy improvement theorem shows that for any $\ep$-soft $\pi$, the $\ep$-greedy policy wrt $q_\pi$ is at least as good as $\pi$.
2. Equality only when both $\pi,pi'$ are optimal among $\ep$-soft. Use optimality for all policies, under the modified environment where an action is chosen randomly with probability $\ep$.

5.5 Evaluating One PolicyWhile Following An-other (Off-policy Policy Evaluation)

What if we have episodes generated from a different policy?

* $\mu$ behavior policy
* $\pi$ target policy.

Require ratio $\pi/\mu$ not be too large. Weight episodes by this ratio.
\begin{align}
V(s) &= \fc{\sumo i{n_s} \fc{p_i(s)}{p_i'(s)}G_i(s)}{\sumo i{n_s} \fc{p_i(s)}{p_i'(s)}}\\
\fc{p_i(S_t)}{p_i'(S_t)}&=\prod_{k=t}^{T_i(S_t)-1} \fc{\pi(A_k|S_k)}{\mu(A_k|S_k)}.
\end{align}

5.6 Off-policy MC control

Ex. estimation policy may be deterministic while behavior policy samples all possible actions. 

To do this, after generating an episode, look at the last time where $A_\tau \ne \pi(S_\tau)$, and update $Q$ using pairs $(s,a)$ appearing after that time.

Note: only learns from tails of episodes. Learning is slow if nongreedy actions are frequent.

5.7 Incremental implementation

For $V_n=\fc{\sumo k{n-1}W_kG_k}{\sumo k{n-1}W_k}$ is 
\begin{align}
V_{n+1} &=V_n+\fc{W_n}{C_n} (G_n-V_n)\\
C_{n+1} &=C_n+W_{n+1}.
\end{align}

Advantages of MC:

1. learn optimal behavior directly from interaction without model
2. used with simulation
3. focus MC on small subset of states
4. less harmed by violations of Markov property.

Maintaining sufficient exploration is an issue.

MC uses experience and does not bootstrap (update value based on other value estimates) (instead MC waits for a bunch of samples), unlike DP. 

Next chapter: experience + bootstrap.

# 6 Temporal-difference learning

MC methods can incrementally update $V$, after waiting to get the actual return,
$$V(S_t) \mapsfrom V(S_t) + \al [G_t-V(S_t)].$$
(n.b. $S_t$ is the state at time $t$, not the state labeled $t$.)
TD methods only wait until the next time step.
$$V(S_t) \mapsfrom V(S_t) + \al [R_{t+1} + \ga V(S_{t+1})-V(S_t)].
$$
I.e., it uses the estimate of $v_\pi = \EE_\pi [R_{t+1}+\ga v_\pi(S_{t+1})|S_t=s]$ as a target.

TD samples expected values and uses the current estimate $V$ instead of $v_\pi$.

Ech estimate is shifted towards the estimate that immediately follows it.

p. 133: driving home example.

In practice, TD methods converge faster than constant-$\al$ MC methods on stochastic tasks.

6.3 Optimality of TD(0)

Finite amount of experience: present it repeatedly until method converges. (cf. SGD?) Do batch updates.

Ex. p.139 example is enlightening.

Batch Monte Carlo
methods always find the estimates that minimize mean-squared error on the
training set, whereas batch TD(0) always finds the estimates that would be
exactly correct for the maximum-likelihood model of the Markov process.

<!-- ? certainty-equivalence estimate-->
6.4 Sarsa: On-policy TD control

For state-action pairs:
$$Q(S_t,A_t) \mapsfrom Q(S_t,A_t) + \al [R_{t+1} + \ga Q(S_{t+1}, A_{t+1})-Q(S_t,A_t)].
$$
($A_{t+1}$ is the action chosen by the ($\ep$-greedy?[^f61]) policy on $S_{t+1}$.)
SARSA refers to $(S_t,A_t,R_{t+1},S_{t+1},A_{t+1})$.

(Convergence guarantees: p. 142)

[^f61]: Why not greedy?

SARSA can learn during the episode!

6.5 Q-learning: Off-policy TD control

One-step Q-learning

$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t) + \al [R_{t+1} + \ga \max_a Q(S_{t+1},a) - Q(S_t,A_t)].
$$

$Q$ approximates the optimal $q_*$ *independently of the policy being followed*!

TODO: prove this. [Watkins Dayan 1992] [JJS94] [T94]

Ex. cliff

* SARSA learns the safe path steering clear of the cliff (because it takes account the $\ep$-greedy exploration).
* Q-learning learns the short path at the edge of the cliff (the optimal).

6.6 Games

A conventional state-value function evaluates states in which the agent has the option of selecting an action (arrived at $s'$ where you will select a new $a'$), but the state-value function in games of perfect information evaluates the board after the agent has mades its move---afterstates.

This is more efficient: many position-move pairs produce the same resulting position.

Often it's useful to break the environment's dynamics into

* immediate effect of action (deterministic) and
* unknown random processes.

