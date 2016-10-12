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

Adversarial setting.

[Blog post](https://jeremykun.com/2013/11/08/adversarial-bandits-and-the-exp3-algorithm/).

We can explore and exploit at the same time if we (a) keep track of a probability distribution and update it, and (b) if we reweight the loss functions to make the expected value correct.

Idea: Use the MWU (hedge) algorithm.

Get $R_T\le O(\sqrt{Tn \ln n})$.

## UCB1 

Stochastic setting.

"Optimism in the face of uncertainty."

[Blog post](https://jeremykun.com/2013/10/28/optimism-in-the-face-of-uncertainty-the-ucb1-algorithm/).



# BLO

## SCRIBLE

Attains $O(\sqrt T\ln T)$ regret.

# BCO

* [BE16] [paper](https://arxiv.org/pdf/1507.06580v1.pdf) [JMLR version](http://www.jmlr.org/proceedings/papers/v49/bubeck16.pdf) - inefficient, $\wt O(\poly(n)\sqrt T)$-regret algorithm.
* [BEL16] [paper](https://arxiv.org/pdf/1607.03084.pdf) - $\wt O(\poly(n)\sqrt T)$-regret and $\poly(T)$-time algorithm.

## FKM

Generic reduction from BCO to (first-order) OCO by using gradient estimators. FKM is an instantiation of the algorithm with regret $O(T^{\fc 34})$.

# Contextual bandits

* EXP4 (?)
* [LCLS10] A Contextual-Bandit Approach to Personalized News Article Recommendation
	*   Model: stochastic setting, expected payoff of $a$ is linear in feature $x_{t,a}$, ($\te_a^*$ is the unknown coefficient vector)
	    $$ \E[r_{t,a}|x_{t,a}] = x_{t,a}^T\te_^*.$$
    * Algorithm: LinUCB attains regret $\wt O(\sqrt{KdT})$.
* [DHKK] Efficient Optimal Learning for Contextual Bandits
