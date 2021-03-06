---
title: k-means clustering
published: 2016-06-28
modified: 2016-06-28
tags: clustering
type: notes
showTOC: True
---

[Reference](http://cs229.stanford.edu/notes/cs229-notes7a.pdf)

[wikipedia](https://en.wikipedia.org/wiki/K-means_clustering) (??Feature learning)

The $k$-means clustering is the following. (Lloyd's algorithm) Let data points be $x^{(i)}$.

1. Initialize $\mu_1,\ldots, \mu_k$.
2. Repeat until convergence.
    1. Let $c(i) = \amin_j |x^{(i)}-\mu_j|$.
	2. Let $\mu_j = \EE_{c(i)=j} x^{(i)}$.

This is alternating minimization on the distortion function
$$J(c,\mu) = \sumo im \ve{x^{(i)}-\mu_{c(i)}}^2$$
with respect to $c$ and $\mu$. This value decreases and so converges (possible to local optimum); in practice, the $\mu$'s converge.

(Objective function $\amin_S \sumo ik \sum_{x\in S_i} \ve{x-\mu_i}^2$.)

# Questions

Are there provable guarantees on $k$-means clustering---if so, what? And/or is there a (worst-case) hardness result?

See also [k-NN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm).
