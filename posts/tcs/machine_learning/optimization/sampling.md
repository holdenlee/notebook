---
title: Sampling
published: 2016-05-17
modified: 2016-05-17
tags: sampling
type: notes
showTOC: True
---

A TOC for the sampling faction of optimization, including

* MCMC
    * Metropolis-Hastings (rejection sampling)
	* Gibbs sampling
* Variational inference

From a TOC viewpoint:

* [Counting and statistical physics](https://dl.dropboxusercontent.com/u/27883775/wiki/math/pdfs/counting_and_stat_phys1.pdf) (Local file: C:/Users/Owner/Dropbox/Math/Computation/general/tnoc)
* Andrej's talk at Gems, Section 9 [here](https://dl.dropboxusercontent.com/u/27883775/wiki/math/pdfs/gems_of_tcs.pdf)

See [two cultures of optimization](http://www.minimizingregret.com/2016/03/the-two-cultures-of-optimization.html). 

# Markov Chain Monte Carlo

This is a catch-all term for *any* method for sampling by running a Markov chain on the state space.

Formally, running MCMC for a distribution $\pi$ on $\Om$ means running a Markov chain $X_t$ on $\Om$ with stationary distribution $\pi$.

## Metropolis-Hastings

Suppose
* $\Om$ has a graph structure where at each vertex we can easily choose a neighbor. (Ex. for valid colorings, it is easy to tweak a valid coloring to get another one, but it is hard to simply choose a random coloring.)
* We want to sample a distribution on $\Om$, but all we know is a function $f$ such that $P(x) \prop f(x)$. Equivalently, we only know the ratios between probabilities.

Can we sample from $\Om$? Yes, using Metropolis-Hastings. We already have a way to choose a neighbor randomly. However, running this Markov chain may give the wrong stationary distribution, so we sometimes "reject" a proposed move, using what we know about the desired distribution.

**Definition**. Consider a Markov chain where the probability of transitioning from $x$ to $y$ is $\Psi(x,y)$. The **Metropolis chain** corresponding to $\Psi$ is
$$P(x,y) = \begin{cases}
\Psi(x,y) \ba{\fc{\pi(y)\Psi(y,x)}{\pi(x) \Psi(x,y)} \wedge 1},&\text{if } y\ne x\\
1- \sum_{z:z\ne x} \Psi(x,z) \ba{\fc{\pi(z)\Psi(z,x)}{\pi(x)\Psi(x,z)}\wedge 1},&\text{if }y=x.
\end{cases}.$$
In particular, if $\Psi$ is symmetric, then it cancels out in the ratio.

**Theorem**. The stationary distribution of this Metropolis chain is $\pi$.

*Proof/derivation*. At $x$, we propose to move to $y$ with probability $\Psi(x,y)$. For the new chain, let's accept this move with probability $a(x,y)$, and reject with probability $1-a(x,y)$ and stay at the current location. Then $P(x,y) = \Psi(x,y) a(x,y)$ for $y\ne x$. For $\pi$ to be stationary, we want detailed balance,
\begin{align}
\pi(x) \Psi(x,y) a(x,y) &= \pi(y) \Psi(y,x) a(y,x)\\
\fc{ a(x,y)}{a(y,x)} &= \fc{\pi(y) \Psi(y,x)}{\pi(x) \Psi(x,y)}.
\end{align}
We want $a$ to be as large as possible for fast mixing, so choose $a$ as defined.

Examples: coloring, optimization

##Gibbs sampling/Glauber dynamics

<!--Q: is detailed balance necessary?-->

