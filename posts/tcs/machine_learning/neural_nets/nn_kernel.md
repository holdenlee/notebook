---
title: Neural nets as kernel space
published: 2017-03-23
modified: 2017-03-23
tags: neural net
type: research
showTOC: True
---

I think that I can place neural networks with non-steep and well-separated sigmoids as low-norm elements of a RKHS, and that this will explain and unify some learning results.

Precise details to be ironed out. First, choice of RKHS:

* Sobolev space $H^{\fc n2}(\R^n)$, or
* $L^2(\R^n)$ or $H^1(\R^n)$ with bandlimited constraint.
* Quotient out by constant functions? Allow a sigmoid $\to 1$ at infinity as kernel?

For the bandlimiting, there are 2 technical steps, with parameters to vary.

* Convolve by Gaussian (or ball indicator) in Fourier space, or multiplying by Gaussian (or FT of ball indicator) in ordinary space.
* cutting off Fourier spectrum - how does this influence? I.e. what is Fourier decay? Expect exponential - so get $\ln \prc{\ep}$ in exponent.

Expect exponential dependence on steepness.

# Things this could explain

* Kalai's result on learning smooth NN.
* Learning linear separator with margin.
* Exponential dependence on dimension or $\rc{\ep}$ (what exactly?) for agnostically learning halfspace, etc.

# For neural nets

* Learn 2-NN with linear output, under some conditions (ex. incoherence)
* Maybe can learn 2-NN with sigmoid/majority output, by boosting (cf. majority of majorities).

# Followup

* What is relationship to gradient descent?
