---
title: Function approximation
published: 2016-11-01
modified: 2016-11-01
tags: reinforcement learning
type: notes
showTOC: True
---

See also "Factored MDPs, MDPs with exponential/continuous state space" in [refs](rl_refs.html).

* [GWTC13]
* Reinforcement learning and DP using FA
* Bertsekas Ch. 6, ADP
* [Powell, ADP](http://site.ebrary.com/lib/princeton/reader.action?docID=10501323)
* Sutton, Ch. 8 (v1)

# 3 DP and RL in large and continuous spaces

$F(\te)(x,u_j) = \phi^T(x,u_j)\te$, $\phi$ normalized so entries sum to 1.

### 3.3.2 Nonparametric appoximation

Kernel-based approximator of $Q$ function $\ka: (X\times U)^2\to \R$.

Form and number of BF's not defined in advance
$$
\wh Q(x,u) = \sumo{l_s}{n_s} \ka((x,u), (x_{l_s}, u_{l_s}))\te_{l_s}.
$$

(I haven't been exposed to nonparametric methods - what guarantees do nonparametric methods have?) <!-- relies on kernel function that makes sense for the space -->

### 3.3.3

In between: derive small number of good BF's from data.

## 3.4 Approximate value iteration

* LSQI: take a bunch of samples, take $Q$ minimizing least squares.
* Online: use gradient descent on parameters $\te$.

Approximate Q-learnig requires exploration.

### 3.4.4 Convergence

Proofs for approximate value iteration rely on contraction mapping arguments. Ex. require $F$ and projection $P$ to be nonexpansions.

Suboptimality for convergence point $\te^*$ bounded in terms of min distance between $Q^*$ and fixed point of $F\circ P$, $\ze_{QI}^*$.

(Ditto for nonparametric (kernel-based) approximators.)

### 3.4.5 Example: Approximate Q-iteration for a DC motor

Fitted $Q$-iteration using ensembles of extremely randomized trees.

## 3.5 Approximate policy iteration

