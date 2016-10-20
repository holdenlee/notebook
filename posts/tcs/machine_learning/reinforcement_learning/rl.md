---
title: Reinforcement learning
published: 2016-09-28
modified: 2016-10-07
tags: reinforcement learning
type: notes
showTOC: True
---

# References

* Barton, Sutto.
* Deep RL tutorial, ICML 2016.
* Algorithms course Lecture 8
* ...

# 3 

Bellman optimality equations

\begin{align}
v_*(s) &= \max_\pi v_\pi(s)\\
q_*(s,a) &= \max_\pi q_\pi(s,a)\\
v_*(s)&= \max_{a\in \mathcal A(s)} \sum_{s'} p(s'|s,a) [r(s,a,s') + \ga v_*(s')\\
q_*(s,a) &= \sum_{s'} p(s'|s,a) [r(s,a,s') +\ga \max_{a'} q_*(s',a')].
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

## 5.4 On-policy MC control

Improve the policy used to make decisions.

Soft policy: $\forall s,a\in \mathcal A(s), \pi(a|s)>0$. $\ep$-soft: $\ge \fc{\ep}{|\mathcal A(s)|}$.

Policy iterations works for $\ep$-soft policies.

1. The policy improvement theorem shows that for any $\ep$-soft $\pi$, the $\ep$-greedy policy wrt $q_\pi$ is at least as good as $\pi$.
2. Equality only when both $\pi,pi'$ are optimal among $\ep$-soft. Use optimality for all policies, under the modified environment where an action is chosen randomly with probability $\ep$.

## 5.5 Evaluating One PolicyWhile Following An-other (Off-policy Policy Evaluation)

What if we have episodes generated from a different policy?

* $\mu$ behavior policy
* $\pi$ target policy.

Require ratio $\pi/\mu$ not be too large. Weight episodes by this ratio.
\begin{align}
V(s) &= \fc{\sumo i{n_s} \fc{p_i(s)}{p_i'(s)}G_i(s)}{\sumo i{n_s} \fc{p_i(s)}{p_i'(s)}}\\
\fc{p_i(S_t)}{p_i'(S_t)}&=\prod_{k=t}^{T_i(S_t)-1} \fc{\pi(A_k|S_k)}{\mu(A_k|S_k)}.
\end{align}

## 5.6 Off-policy MC control

Ex. estimation policy may be deterministic while behavior policy samples all possible actions. 

To do this, after generating an episode, look at the last time where $A_\tau \ne \pi(S_\tau)$, and update $Q$ using pairs $(s,a)$ appearing after that time.

Note: only learns from tails of episodes. Learning is slow if nongreedy actions are frequent.

## 5.7 Incremental implementation

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

Each estimate is shifted towards the estimate that immediately follows it.

p. 133: driving home example.

In practice, TD methods converge faster than constant-$\al$ MC methods on stochastic tasks.

## 6.3 Optimality of TD(0)

Finite amount of experience: present it repeatedly until method converges. (cf. SGD?) Do batch updates.

Ex. p.139 example is enlightening.

Batch Monte Carlo
methods always find the estimates that minimize mean-squared error on the
training set, whereas batch TD(0) always finds the estimates that would be
exactly correct for the maximum-likelihood model of the Markov process.

<!-- ? certainty-equivalence estimate-->
## 6.4 Sarsa: On-policy TD control

For state-action pairs:
$$Q(S_t,A_t) \mapsfrom Q(S_t,A_t) + \al [R_{t+1} + \ga Q(S_{t+1}, A_{t+1})-Q(S_t,A_t)].
$$
($A_{t+1}$ is the action chosen by the ($\ep$-greedy?[^f61]) policy on $S_{t+1}$.)
SARSA refers to $(S_t,A_t,R_{t+1},S_{t+1},A_{t+1})$.

(Convergence guarantees: p. 142)

[^f61]: Why not greedy?

SARSA can learn during the episode!

## 6.5 Q-learning: Off-policy TD control

One-step Q-learning

$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t) + \al [R_{t+1} + \ga \max_a Q(S_{t+1},a) - Q(S_t,A_t)].
$$

$Q$ approximates the optimal $q_*$ *independently of the policy being followed*!

TODO: prove this. [Watkins Dayan 1992] [JJS94] [T94]

Ex. cliff

* SARSA learns the safe path steering clear of the cliff (because it takes account the $\ep$-greedy exploration).
* Q-learning learns the short path at the edge of the cliff (the optimal).

## 6.6 Games

A conventional state-value function evaluates states in which the agent has the option of selecting an action (arrived at $s'$ where you will select a new $a'$), but the state-value function in games of perfect information evaluates the board after the agent has mades its move---afterstates.

This is more efficient: many position-move pairs produce the same resulting position.

Often it's useful to break the environment's dynamics into

* immediate effect of action (deterministic) and
* unknown random processes.

# 7 Eligibility traces

A general mechanism that can be combined with any TD method.

2 views:

1. (theoretical, forward) bridge from TD to MC. (understand what is computed)
2. (mechanistic, backward) temporary record of event occurrence. Only "eligible" states/actions are assigned credit/blame. (intuition for algorithms)

## 7.1 n-step TD prediction

Perform backup based on an intermediate number of rewards. (MC depends on entire sequence until end of episode, TD depends on 1 next reward.)

Replace the 1-step target by $n$-step target (corrected $n$-step truncated return).
\begin{align}
G_t^{(1)} &= R_{t+1} + \ga V(S_{t+1})\\
G_t^{(n)} &= \sumo i{n-1} \ga^{i-1} R_{t+i} + \ga^n V(S_{t+n})\\
\De V_t(S_t) &= \al [G_t^{(n)} - V_t(S_t)].
\end{align}
MC methods are infinite-step returns.

2 ways to update.

* Online updating: during episode.
* Offline updating: accumulated and not used to change estimates until the end.

Error-reduction property of $n$-step returns: (exponential reduction in worst-case error)
$$
\max_s\ab{\EE_\pi\ba{G_t^{(n)} | S_t=s}-v_\pi(s)}
\le \ga^n \max_s |v(s) - v_\pi(s)|.
$$

Rarely used because inconvenient to implement; waiting $n$ states is problematic.

## 7.2 The forward view of TD($\la$)

Complex backup: Backup can be done toward any average of $n$-step returns. <!--$G_t^{avg}= \rc2 G_t^{(2)} + \rc2 G_t^{(4)}$.-->

$TD(\la)$ is averaging $n$-step backups $\propto \la^{n-1}$, i.e., with weights $(1-\la)\la^{n-1}$. The $\la$-return is
$$
G_t^\la = (1-\la) \sumo n\iy \la^{n-1}G_t^{(n)}.
$$

* $\la=1$ reduces to MC.
* $\la=0$ reduces to $G_t^{(1)}$, one-step return.

Forward view: look forward to all future rewards and decide how to combine them.

<!-- don't you have to wait until end of episode?-->

## 7.3 The backward view of TD($\la$)

The **eligibility trace** is a memory variable associated with each state. It is a *random variable* $Z_t(s)\in \R^+$, 
$$
Z_t(s) = \begin{cases} 
\ga \la Z_{t-1}(s), &\text{if }s\ne S_t\\
\ga \la Z_{t-1}(s) + 1, &\text{if }s=S_t.
\end{cases}
$$
$\la$ is the trace-decy parameter. Traces indicate the degree to which each state is eligible for undergoing learning changes.
$$\De V_t(s) = \al \ub{(R_{t+1}+\ga V_tS_{t+1} - V_t(S_t))}{\de_t} Z_t(s).$$
<!-- Q: \ga\la (Z+1) or \ga\la Z + 1? latter one. They update before multiplying by $\ga\la$-->

Note TD(1) is MC but it can also be applied to discounted continuing tasks, and can be applied incrementally and online.

## 7.4 Equivalence of forward and backward views

<!-- what if also influence actions/policy? -->
For offline updating,
$$\sumz t{T-1} \De V_t^{TD}(s) = 
\sumz t{T-1} \al \de_t \sumz kt (\ga \la)^{t-k} I_{sS_k} =
\sumz t{T-1} V_t^\la(S_t)I_{sS_t}.$$
(Online updating is different because $V_t$ changes as $t$.)

Online algorithm generally works better over a broader range of parameters.

To maintain equivalence in online case, $\de_t= R_{t+1} + \ga V_t(S_{t+1})-V_{t-1}(S_t)$, $R_t^{(n)} = \sumo in \ga^{i-1}R_{t+i} + \ga^n V_{t+n-1}(S_{t+n})$.

# 7.5 Sarsa($\la$)

How to use eligibility traces for control? Learn $q$ rather than $V$. Keep a trace for each $(s,a)$.
\begin{align}
Q_{t+1}(s,a) &= Q_t(s,a) + \al \de_t Z_t(s,a)\\
\de_t &= R_{t+1} + \ga Q_t(S_{t+1}, A_{t+1}) - Q_t(S_t,A_t)\\
Z_t(s,a) &= \begin{cases}
\ga \la Z_{t-1} (s,a) + 1, &\text{if }s=S_t, a=A_t\\
\ga \la Z_{t-1} (s,a), &\text{otherwise.}
\end{cases}
\end{align}

## 7.6 $Q(\la)$

### Watkin's $Q(\la)$

We can use subsequent experience only as long as the greedy policy is being followed! Look ahead as far as the next exploratory action.

If $A_{t+n}$ is first exploratory action, the longest backup is toward
$$
 \sumo in \ga^{i-1}R_{t+i} + \ga^n \max_a Q_t(s_{t+n},a).
$$
Q: why 1 step past?

Set eligibility traces to 0 whenever an exploratory action is taken.

But cutting off traces every time an exploratory action is taken loses the advantage of eligibility traces.

### Peng's $Q(\la)$

Hybrid of Sarsa and Watkin's $Q(\la)$.

Converges to some hybrid of $q_\pi, q_*$. If made gradually more greedy, may still converge to $q_*$.

Cannot be implemented as simply.

Naive $Q(\la)$: traces not set to 0.

<!-- formula? -->

## 7.7 Replacing traces

$$Z_t (s) = \begin{cases}
\ga \la Z_{t-1}(s), & s\ne S_t\\
1, & s=S_t.
\end{cases}$$
(Max out at 1.)

Can produce significant improvement in learning rate.

Ex. when this helps: reward at rightmost. Sequence WWWWWWWWWWRRRR (wrong stays, right goes right) reinforces W more times.

Another solution: set the traces of all other actions from the revisited state to 0.

<!-- check 7.12-->

## 7.8 Implementation issues

Larger computational cost.

## 7.9 Variable $\la$

Never been used practically, but interesting/useful theoretically.

Ex. Vary as function of state: depend on confidence

$$G_t^\la = \sum_{k=t+1}^{T-1} G_t^{(k-t)} (1-\la_k) \prod_{i=t+1}^{k-1} \la_i + G_t\prod_{i=t+1}^{T-1}\la_i.$$

# 8 Planning and learning with tabular methods

Planning requires a model of the environment; learning methods don't.

## 8.1 Models and planning

A model is anything an agent cn use to predict how the environment responds to its actions. 

* Distribution model (e.g. needed in DP)
* Sample model

Models can simulate experience.

Planning takes a model as input and produces or improves a policy.

Approaches:

* State-space planning: search through state-space for optimal policy or path to goal.
* Plan-space planning: search through space of plans.
    * Evolutionary methods
	* Partial-order planning

State-space planning methods share common structure.

1. Involve computing value functions
2. Compte value functions by backup applied to simulated experience.

Go from... to... 

1. model
2. simulated experience
3. values
4. policy

Common structure means many ideas/algorithms can be transferred between planning and learning. (They differ only in source of experience.)

Planning in small incremental steps helps intermix planning with acting/learnig.

## 8.2 Integrating planning, acting, and learning

* New information from interaction may change the model and interact with planning.
* Customize planning to the states/decisions under consideration or expect in the near future.

Two roles for experience:

1. improve model (model-learning) - make fuller use of limited experience
2. directly improve value function (direct reinforcement learning) - simpler, not affect by model biases

Dyna-Q: repeat

1. Run ($\ep$-greedy) Q-learning for 1 step.
2. Update model (assume deterministic environment)
3. Repeat $n$ times Q-learning using simulated experience. (Take a random $(S,A)$ pair that has been observed.)

<!-- what if instead of greedy, use temperature? -->
Q: why is only 1 step added without planning? A: because rewards only go back 1 step.

## 8.3 When the model is wrong

* Sometimes the suboptimal policy computed leads to discovery/correction of the modeling error. Happens when model is optimistic.
* Difficulties arise when the environment changes to become better and the formerly correct policy does not reveal the improvement.

Dyna-Q+: This agent keeps track for each state{action pair of how many time steps
have elapsed since the pair was last tried in a real interaction with the environment.
The more time that has elapsed, the greater (we might presume)
the chance that the dynamics of this pair has changed and that the model of
it is incorrect. Bonus reward for long-untried actions, $R+\ka \sqrt \tau$ if not tried for $\tau$ time steps.

## 8.4 Prioritized sweeping

Planning can be more efficient if simulated transitions and backups are focused on particular state-action pairs.

Work backwards from goal state/reward?

Ex. change estimated value of 1 state. The only useful 1-state backups are those of actions leading directly into that state. Propagate.

Prioritize backups according to urgency and perform in order of priority.

1. Execute 1 step of Q-learning
2. If the update is $>\te$, insert $(S,A)$ into the priority queue with priority |update|.
3. Repeat $n$ steps: take $(S,A)$ from the top of the queue. Update it. Then for all $(\ol S, \ol A)$ predicted to lead to $S$, update. If difference is $>\te$, insert into queue.

Problem: algorithms rely on the assumption of discrete states.

For stochastic environments: keep counts. Backup each pair with a full backup.

## 8.5 Full vs. sample backups

1-step backups vary in 3 ways.

1. State vs. action values
2. Estimate value for optimal policy vs. arbitrary policy.
3. Full vs. sample backups.

Sample backups are TD(0), Sarsa, and Q-learning.

Full backup requires $b$ times as much computation, $b$ the branching factor.

Sample backups have the advantage that the values backed up from successor states will be more accurate.

## 8.6 Trajectory sampling

2 ways of distributing backups

1. (classical, DP, exhaustive) sweep through entire state space, backing up each state (or state-action pair) once per sweep.
2. sample from state/state-action space according to distribution, ex. according to on-policy distribution. Simulate trajectories and perform backups at those encountered. (This ignores large, uninteresting parts of the space.)

Experimentally: sampling according to on-policy results in faster planning initially and retarded planning in long run. (In the long run, commonly occurring states already have correct values.)

## 8.7 Heuristic search

Heuristic search is concerned with policy computation, i.e., making improved action selections given the current value function.

Unlike in usual heuristic search, it's natural to consider allowing the value function to be improved.

When we have a perfect model and imperfect $Q$, deeper search usually yields better policies.

Grow the search tree selectively. How to use this idea for backups?

Focus on the states and actions that might immediately follow the current state.

# Deep RL

"AI = RL + DL": RL defines objective, DL gives mechanism.

<!-- value, policy, model-based -->

Use deep NN to represent value function, policy, and model. 

*   Value: $Q$-network $Q(s,a,w)$. (either accept $a$ as input, or list out $Q$ for all values of $a$)
	
	Tread $r+\ga \max_{a'} Q(s',a',w)$ as target. Minimize
	$$I = (r+\ga \max_a Q(s',a',w) - Q(s,a,w))^2.$$
	* Converges using lookup table representation, but diverges using NN due to 
		* correlations between samples
			* To remove correlations, build data-set from agent's own experience
		* non-stationary targets
			*   Hold target parameters $w^-$ fixed
			    $$I = (r+\ga \max_a Q(s',a',w^-) - Q(s,a,w))^2.$$
	* Ex. Atari: Stack of 4 previous frames $4\times 84\times 84$, conv layers. Output for 18 joystick positions. Reward is change in score.
	*   Double DQN: Remove upward bias caused by $\max_a Q(s,a,w)$ (?). Use current network to select actions and older network $w^-$ to evaluate actions.
		$$ I = \pa{ r + \ga Q(s', \amax_{a'} Q(s', a', w), w^-) - Q(s,a,w)}^2.$$
	*   Prioritized replay: weight experience according to surprise. Priority queue according to 
		$$ |r + \ga \max_{a'} Q(s',a', w^-) - Q(s,a,w)|.$$
	* Duelling network: Split $Q$-network into 2 channels, $Q(s,a) = V(s,v) + A(s,a,w)$.
		* Action-independent value function $V(s,v)$
		* Action-dependent advantage function $A(s,a,w)$.
	* Asynchronous: execute instances in parallel.
*   Policy: stochastic $\pi(a|s,u)$, deterministic $a=\pi(s,u)$, objective 
	$$ L(u) = \E\ba{\sumo n{\iy} \ga^{n-1}r_n|\pi(\cdot, u)}.$$
	* Actor-critic: Estimate $Q(s,a,w)$ and update $u$ by SG ascent. (What more does this gain from just having Q-network? See below.)
	* A3C, Asynchronous Advantage Actor-Critic: Estimate $V$, $Q$ value estimated from $V$, actor updated towards target, critic updated.
	* High-dimensional continuous action spaces: Can't compute $\max_a Q(s,a)$, learn without max. $Q$ differentiable wrt $a$.
	    *   DPG
			$$I_w = \pa{r + \ga Q(s', \pi(s', u^-), w^-) - Q(s,a,w)}^2.$$
			Actor improves $Q$. Critic provides loss function for actor.
* Model - ???
			

Notes: 

* Can use LSTM (how?)
* Simulated physics.
* Fictitious self-play. Nash equilibria in multi-agent games?

# Search

Tree search, etc.
