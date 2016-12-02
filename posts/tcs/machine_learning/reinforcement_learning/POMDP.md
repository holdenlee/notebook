---
title: POMDPs
published: 2016-11-29
modified: 2016-11-29
tags: none
type: paper
showTOC: True
---

[ALA16] Open problem - approximate planning of POMDPs in the class of memoryless policies

The relevant matrices/tensors are $f_T(x'|x,a) = T_{xx'a}$, $f_R(r|x,a) = \Ga_{xar}$, and $f_O(y|x) = O_{xy}$. View it two ways.

1.  As an extended MDP, with transition matrix $P_{(x,a), (y,b)} = T_{yxa}\Pi_{ay}$, $\om'$ the stationary vector. (I think it's $\om' = (I-P^T(PP^T)^{-1}P)e_1$.) We try to maximize
	$$\max_{\Pi\ge 0, \sum_a \pi(a|y)=1} \sum_{x,a} \om_\pi(x) \sum_y O_{xy} \Pi_{ay} \ol r(x,a).$$
2.  As a MDP with restricted class of policies - a linear subspace, 
	$$ \Pi_{ax} = O_{xy} \Pi_{ay}.$$

We are maximizing over a linear subspace, but the value is not convex in the policy. We can easily get to local min using policy gradient (this is easier than policy gradient because we know all parameters). 

Questions:

1. Why is this nonconvex? Since we are maximizing, actually the question is "why is this nonconcave"? Come up with a simple concrete example where this is nonconvex. Answer (this is not full-rank, but you can change it infinitesimally): Have a state machine that rewards you only if you choose LL or RR, not if you switch. Then the optimal strategy is to always play L or always play R, rather than somewhere in the middle. More complicatedly, you can set up something which rewards the player from playing probabilities close to $p_1,\ldots, p_k$, so there can be multiple local optima.
2. Simpler question: Suppose there are only 2 actions each step, and there is no view. Find the best strategy. Bellman's equation gives $Q=R + PQ\coltwo{p}{1-p}$. This is a linear equation in $2|S|$ variables, so the value is a rational function of degree $\le 2|S|$ in $p$. I think in general you get rational functions also, but in more variables! Can we reduce from something hard like tensor decomposition to this? The difficulty is writing polynomials as solutions to systems of equations... (The denominator is multilinear if you treat all states as the same... but perhaps you can get a broader class.) Or maybe we can't just perturb the non-full-rank case, we actually need something far enough from low-rank so that the strategy is not oblivious... (ALA16 don't restrict to full rank.)

See also Bertsekas on combining states.

The projection in the expression seems messy to deal with.

# NP-hardness

Finding the optimal memoryless policy for a POMDP is NP-hard. (Proof: We can reduce from any polynomial optimization problem over the simplex to a POMDP as follows. The observation space is trivial, $\{1\}$. Then a memoryless policy is just a vector of probabilities for different actions, summing to 1. Note a deterministic POMDP is a finite state machine where the actions correspond to characters read in by the machine. Given a polynomial is degree $n$, make a POMDP that is stratified in $n$ layers. For each monomial $a_{i_1\ldots i_n} x_{i_1}\cdots x_{i_n}$ create a path in the finite state machine that reads in actions $i_1,\ldots, i_n$, ends in a reward of $a_{i_1\ldots i_n}$ and then resets. Then the average reward is $1/n$ times the polynomial.)
