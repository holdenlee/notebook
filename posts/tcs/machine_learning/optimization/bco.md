---
title: Bandit convex optimization
published: 2016-10-11
modified: 2016-10-11
tags: convex optimization
type: topic
showTOC: True
---

Settings of increasing complexity:

* Multi-armed bandit
* Bandit linear optimization
* Bandit convex optimization

# Multi-armed bandit

* $\de$-greedy algorithm: Balancing exploitation which gives $O(\sqrt T)$ regret and exploration which gives $O(T^{\fc 34} \sqrt n)$ regret.

## $\de$-greedy algorithm

* With probability $\de$, explore.
	* Play $i_t\sim U_n$.
	* $\wh f_t(x) = \wh \ell_t^T x$.
	* $\wh \ell_t = \fc{n}{\de}\ell_t(i_t)e_{i_t}$.
* With probability $1-\de$, exploit.
    * Play $i_t\sim x_t$.
	* $\wh f_t(x) = 0$. (We can't use information here because it wasn't uniformly generated.)
* Update using a bandit algorithm $x_{t+1} = A(\wh f_1,\ldots, \wh f_t)$. 

The $\wh \ell_t$ were chosen so
$$ \E \wh \ell_t(i) = \ell_t(i).$$
We have 
$$\E R_T \le 3 GD\sqrt T + \de T,$$
where $G\le \fc n\de$.

## EXP3

Exponential weights for exploration and exploitation

Adversarial setting.

[Blog post](https://jeremykun.com/2013/11/08/adversarial-bandits-and-the-exp3-algorithm/).

We can explore and exploit at the same time if we (a) keep track of a probability distribution and update it, and (b) if we reweight the loss functions to make the expected value correct.

Idea: Use the MWU (hedge) algorithm.

Updates
\begin{align}
y_{t+1}(i) & = x_t(i) e^{\ep \wh\ell_t(i)}\\
x_{t+1}&= \pa{1-\rc{\sqrt T}} \fc{y_{t+1}}{\ve{y_{t+1}}_1} + \rc{n \sqrt T}\one.
\end{align}
**Question**: wht's the purpose of the $x_t$ update? To make sure every arm is played at least with some probability? (E.g. will be played infinitely many times.)

Get $R_T\le O(\sqrt{Tn \ln n})$.

## UCB1 

Stochastic setting.

"Optimism in the face of uncertainty."

[Blog post](https://jeremykun.com/2013/10/28/optimism-in-the-face-of-uncertainty-the-ucb1-algorithm/).

Algorithm: first play each once; then at each step play the action with highest upper confidence bound
$$j = \amax_j \ol x_j + \ub{\sfc{2\ln T}{n_j}}{a(n_j, T)}.
$$

UCB on MAB with $K$ actions where $X_{i,t}\in [0,1], X_{i,t}\sim D_i$ are independent, has expected cumulative regret, $\ol x_{i,s}$ the empirical mean after playing $i$ $s$ times, 
$$ \E R(T) = O(\sqrt{KT \ln T}). $$

*Proof.*

1.  Let $\De_i = \mu^*-\mu_i$, $P_i(T)$ be the number of times $i$ is picked by time $T$, $I_t$ be the $t$th choice, $a(s,t)$ be the width of the CI at time $t$ after $s$ observations. Then
	\begin{align}
	\E G_A(T) &= \sum_i \mu_i \E P_i(T)\\
	\E P_i(T) &= 1+\sum_{t=K}^T (I_t=i)\\
	&\le m + \sum_{t=K}^T (I_t=i\wedge P_i(t-1)\ge m)\\
	&\le m + \sum_{t=K}^T (U_i(t-1) \ge U^*(t-1), P_i(t-1)\ge m)\\
	&\le m + \sumo t{\iy} \sum_{s=m}^{t-1}\sum_{s'=1}^{t-1} (\ol x_{i,s} + a(s,t-1) \ge \ol x_{s'}^* + a(s',t-1))\\
	&\le \ff{8\ln T}{\De_i^2} + \sumo t{\iy} \sum_{s=m}^t \sum_{s'=1}^t 2t^{-4} = \fc{8\ln T}{\De_i^2} + 1 + \fc{\pi^2}{3}.
	\end{align}
	We chose $m$ so that $\mu^* \ge \mu_i +2a(m,t)$. This implies either
	\begin{align}
	\ol x_{s'}^* &\le \mu^* - a(s',t)\\
	\ol x_{i,s} & \ge \mu_i + a(s,t)
	\end{align}
	which happen with probabilities $t^{-4}$.
2.  This gives regret
    $$\E R(T) \le \min(8 \sum_{i:\mu_i <\mu^*} \fc{\ln T}{\De_i} + \pa{1+\fc{\pi^2}3}\pa{\sumo jK\De_j}, \max \De_i T).$$
3.  Optimizing gives $\De_i = O(\sqrt{\ln T})$.

The idea is to upper bound by events that cover and we can better estimate. This involves summing over all $(s,s')$. The $m$ is introduced so that at that time $\mu^*$ and $\mu_i$ will be far enough apart.

## Thompson sampling

(from 229T p. 191)

For each time $t = 1,\ldots, T$:

* Sample a model from the posterior: $\theta_t\sim p(\te | a_{1:t-1}, r_{1:t-1})$
* Choose the best action under that model: $a_t = \amax_a p(r | \te_t, a)$.

Thompson sampling outperforms UCB in many settings.

$$
\E[\text{Regret}]
\le (1+\ep)
\sum_{j:\De_j>0}
\fc{\De_j\ln T}{KL(\mu_j||\mu^*)}
+O\pf{d}{\ep^2}.
$$

* Thompson sampling generalizes to RL.
* It does not choose actions that take into accound the value of information gained.

Gittins index?

# BLO

## SCRIBLE

Attains $O(\sqrt T\ln T)$ regret.

# BCO

* [BE16] [paper](https://arxiv.org/pdf/1507.06580v1.pdf) [JMLR version](http://www.jmlr.org/proceedings/papers/v49/bubeck16.pdf) - inefficient, $\wt O(\poly(n)\sqrt T)$-regret algorithm.
* [BEL16] [paper](https://arxiv.org/pdf/1607.03084.pdf) - $\wt O(\poly(n)\sqrt T)$-regret and $\poly(T)$-time algorithm.

## FKM

Generic reduction from BCO to (first-order) OCO by using gradient estimators. FKM is an instantiation of the algorithm with regret $O(T^{\fc 34})$.

# Contextual bandits

* EXP4 (adversarial) - Exponential weights for exploration and exploitation with expert advice. Do MWU with the experts. (Where does it use the context?)
* [LCLS10] A Contextual-Bandit Approach to Personalized News Article Recommendation
	*   Model: stochastic setting, at time $t$, expected payoff of $a$ is linear in feature $x_{t,a}$ (given for all $a$, in the simplest case they are equal over all $a$), ($\te_a^*$ is the unknown coefficient vector)
	    $$ \E[r_{t,a}|x_{t,a}] = x_{t,a}^T\te_a^*.$$
	* Assume iid context and reward vectors. <!--(Did LCLS10 assume iid context?)-->
    * Algorithm: LinUCB attains regret $\wt O(\sqrt{KdT})$. Combine UCB with linear regression. (Think of linear functions as the "policy space".)
	* Requires time at least linear in the number of arms.
* [DHKK] Efficient Optimal Learning for Contextual Bandits
	* Compare not to the best fixed policy (choosing the same arm), but best policy in some space $\Pi$. (**Question**: what about comparing to best policy for other bandit problems? Ex. what's the algorithm for vanilla MAB?)
	* Solves the contextual bandit problem for large policy spaces (in tie $\poly\log(N)$, $K$ the number of arms, and achieves regret $O(\sqrt{TK\ln N})$). (Complexity analysis assumes existence of argmax oracle (AMO) which gives $\amax_{\pi\in \Pi} \sumo{t'}t r_{t'}(\pi(x_{t'}))$.
	* Idea: 
		* Policy elimination (intractable)
			* Choose a distribution over the remaining experts that minimizes some kind of maximum variance. 
			* Eliminate bad experts: all policies that are suboptimal by more than $2b_t$. (NTS: whp the best policy remains, $\pi_{\max}\in \Pi_t$, and remaing policies are good, $\eta_D(\pi_{\max}) - \eta_D(\pi) \le 4b_t$.
			* Unbiased estimator of policy values $\eta_t(\pi) = \rc{t} \sum \fc{r \one(\pi(x) = a)}{p}$.
		* Randomized UCB (tractable given AMO; frequency of choosing, confidence bound determined by estimated regret)
			* Approximately minimize a certain variance. (Do this optimization problem with the argmax oracle. How?)
			* Smooth out distribution and play according to it.
			* No elimination here.
	* **Question**: how about nonfinite sets - ex. VC dimension, Rademacher complexity?

Concrete Q: In the MAB setting, what if you compare to the best policy in a given set? I'm confused: can the policies have memory (depending on past results)? In this case, you can't start following a policy midway. Let's say they don't. Now some policies may recommend the same action and some actions may not be recommended so scale accordingly.

A: Yes. See [ACFS02]; they get regret $O((\ln N)^{\rc 2}\sqrt{T})$ where $N$ is the number of strategies.
