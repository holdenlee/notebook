---
title: Probabilistic models - Ideas
published: 2016-11-07
modified: 2016-11-07
tags: none
type: research
showTOC: True
---

# Non-generative framework for learning probabilistic models

We can adapt Hazan and Ma's framework [HM16] to learning probabilistic models. Note that given a model, in the limit the number of bits needed to encode a sequence of samples (up to some level of accuracy) is the entropy of that sequence under the model. Thus the natural loss to look at here is the entropy. 

We say a distribution $D$ is $\ga$ C-learnable by a hypothesis class $\mathcal H$ of probabilistic models if there is an algorithm, that given $\ep$, with probability $1-\de$, outputs a model $m$ such that 
$$
\rc{l(\vec x)} \EE_{D} \ln \Pj(\vec x|m) le \rc{l(\vec x)} \min_{m\in \mathcal H} \EE_{D}\ln \Pj(\vec x|m) + \ep + \ga
$$
in time polynomial in the parameters, $\poly\pa{\rc\ep, \ln\prc{\de}, d}$.
Equivalently, the $m$ that is output satisfies
$$
KL(D || m)\le KL(D || \mu) \ep + \ga.
$$
where $\mu$ is the distribution minimizing $KL(D||\mu)$.

We say the hypothesis class $\mathcal H$ is C-learnable if any distribution $D$ is C-learnable by $\mathcal H$.

## HMM's

**Question**: Is the class of HMM's C-learnable? 

The tensor algorithm for HMM's reduces from the problem of learning from 3 independent views to learning a HMM. Learning from 3 independent views relies on 3-tensor decomposition.

The problem boils down to: **Can we find the closest rank $k$ tensor to a given 3-tensor?** (Consider the regime $k\le n$, $n$ the dimension.) (If there are $k$ hidden states, the the tensor of probabilities is
$$\pa{\sum_h \Pj(h)\Pj(x_1|h)\Pj(x_2|h) \Pj(x_3|h)}_{x_1x_2x_3} = \sum \Pj(h) (p_1)_h\ot (p_2)_h\ot (p_3)_h.$$

Actually, it's a little harder: the distance here is not the $L^2$ distance but the KL divergence. (We can also consider the $L^2$ distance.) For 2 independent views, this problem becomes: given a matrix $A$ with nonnegative entries summing to 1, find a matrix $B$ with nonnegative entries summing to 1, of rank $k$, and such that $KL(p_B||p_A)$ is as small as possible.

## Kernel HMM

Apply the kernel methods of [SBSG10] Hilbert Space Embeddings of Hidden Markov Models not to the spectral algorithm in [HKZ12] but to the tensor algorithm.

<!--A spectral algorithm for learning Hidden Markov Models, we get a kernel algorithm in an esy -->
This requires some calculation but is straightforward.

# Markov models with exponential state space

Can we learn (hidden) Markov models with exponential state space?

One model is that of a dynamic Bayes net (DBN). Even given pairs $(x,y)$ it may be difficult to learn in general (check this...)---if the graph is bounded degree $d$ with bounded edge weights then it could be fixed parameter tractable in $d$. (To be actually tractable probably the weights have to be $1/d$.) 

# Context vectors

Currently we model documents with the context vector undergoing a random walk ([ALLMR16](../nlp/randwalk.html)). I don't think the different coordinates are so interpretable. (?) A random walk is like a DBM where the connections are $1\to 1', 2\to 2'$, etc. Can we model the evolution of the context vector as something more complicated but still tractable?
