---
title: Variational Bayes
published: 2017-02-06
modified: 2017-02-06
tags: neural nets
type: notes
showTOC: True
---

* [Wiki](https://en.wikipedia.org/wiki/Variational_Bayesian_methods)
* [Notes by Blei](https://www.cs.princeton.edu/courses/archive/fall11/cos597C/lectures/variational-inference-i.pdf)

Two purposes: 

1. To provide an analytical approximation to the posterior probability of the unobserved variables, in order to do statistical inference over these variables.
2. To derive a lower bound for the marginal likelihood (sometimes called the "evidence") of the observed data (i.e. the marginal probability of the data given the model, with marginalization performed over unobserved variables). This is typically used for performing model selection.

Monte Carlo techniques provide a numerical approximation to the exact posterior using a set of samples. Variational Bayes provides a locally-optimal, exact analytical solution to an approximation of the posterior.

Find the minimizer of $D_{KL}(Q||P)$ over some class $Q$ of distributions. 

Ex. for $Q(Z) =\prodo iM q_i(Z_i|X)$, 
$$
q_j^*(Z_j|X) = \fc{e^{\E_{i\ne j}[\ln p(Z,X)]}}{\int e^{\E_{i\ne j}[\ln p(Z_{-j},X)]}\,dZ_j}.
$$
Simplify, get circular dependencies between parameters in one and other partition, solve in iterative fashion like EM.
