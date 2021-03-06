---
title: (JSA15) Beating the Perils of Non-Convexity - Guaranteed Training of Neural Networks using Tensor Methods
published: 2016-06-27
modified: 2016-06-27
tags: neural net
type: paper
showTOC: True
---

Gives the first provable risk bounds for 2-layer neural nets via an efficient algorithm. Assumes that the generative distribution for the inputs $x$'s is known or estimable (the algorithm uses the 3rd order score function). Algorithm is based on tensor decomposition.

Remarks:

*   The distribution $p(y|x)$ defined by the NN seems funny. $y\in \{0,1\}$ with
	$$f(x) = \E[\wt y|x] = \an{\si_2,\si(A_1^T x + b_1)}+b_2.$$
	But this means that we must have $f(x)\in \{0,1\}$! Usually this is put through another sigmoid function...

#Notes

See [JSA14].

**Lemma (Stein's identity)**: Under some regularity conditions,
$$\EE_{x\sim p} [G(x) \ot \nb_x\ln p(x)] = \EE_{x\sim p} \nb_x G(x).$$
(For example, for $p(x)$ Gaussian, $\nb_x \ln p(x) = -x$.)

*Proof*. By IbP,
$$\int G(x)_i \pdd{x_j} \ln p(x) p(x) \dx = \int G(x)_i \pdd{x_j}p(x) = -\int \pdd{x_j} G(x)_i p(x)\dx.$$

#Algorithm

1. Tensor decomposition
2. Fourier algorithm
3. Ridge (linear) regression
