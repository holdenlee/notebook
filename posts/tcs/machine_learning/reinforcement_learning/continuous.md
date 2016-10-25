---
title: MDP's with continuous state space
published: 2016-10-14
modified: 2016-10-14
tags: none
type: summary
showTOC: True
---

Other pages

* [scratch](continuous_scratch.html)
* [papers](rl_refs.html)

# Finding optimal policy (given dynamics)

## Simplest problem

State is $s\in \R^n$.

Suppose 

* reward is given by $\an{r,s}$
* discount factor for future reward is $\ga$, 
* action set is $A$ (finite or convex),
* update is $s_{t+1} = Us_t + a_t$, $a_t\in A$. 

Then we can solve this in closed form. The best action is the same at each time step,
$$\max_{a\in A} \an{r, (I-\ga U)^{T\,-1}r, a}.$$

For infinite-horizon, we look at instead the average of rewards over next $T$ time steps as $T\to \iy$; interesting case is when $U$ has eigenvalues equal to 1. Straightforward.

## Different linear transformations

Now consider a more general case. (We don't put in probability yet.) 

* The reward is still $\an{r,s}$
* discount factor $\ga$
* Finite set $A$. (Think about $|A|=n$.)
* Given action $a$, the update is $s_{t+1} = U_a s_t + v_a$, $a\in A$. 

The typical way to solve this is to use policy iteration. However, the policy is a function in $n$ dimensions, and it's not even clear that we can represent it succinctly! If we discretize with a mesh, this takes exponential time/space.

Given fixed discount factor $\ga$, desired approximation $\ep$, can we find something that does at most $\ep$ worse in $\poly\prc{\ep}$ time? We can achieve $|A|^{\log_\ga\prc{\ep}} = \prc{\ep}^{O(\ln |A|)}$ time by searching over a tree.

1. Can we find a nice class of functions (SVM, etc.), and find the best $v$ within that class?
2. Is there a class that can approximate all possible $v$'s within $\ep$ or constant factor?
3. Can $v$'s be complicated? (Ex. break the space into exponentially many regions.)

Careful: finding the best approximation to a unitary transformation (take $U_a$ unitary and $v_a=0$) with a certain set of unitaries is a well-studied problem that can involve number theory---we want to exclude this. Ex. make sure we're not in this regime - have the discount factor, or add noise.
