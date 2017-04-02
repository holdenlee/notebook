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

# Thoughts 3/30/17

* How to get something for convolutional neural nets? 
    * As an easier question, think about having filters over the entire image, rather than a grid.
	* Think of periodic case even.
	* Then this works by Fourier transform over $\R^\N$ (suitably weighted). 
	* Problem: the simplest convnet is more complicated than this, includes maxpool and then fc. How to deal with maxpool? What if you don't do maxpool? Sigmoid and then average, or weighted average? 
	* Kernel on Fourier transform space. (See how well FT matches...)
	* See [ZLW16]
* Overcomplete bases
	* Can define RKHS norm by giving norm when written in terms of basis element.
	* Can't define norm with overcomplete set of elements.
	* Can we define some kind of norm and do something kernel-like with overcomplete basis?
		* Project from larger space?
	* Cf. wanting symmetries beyond translation
	* Cf. wavelets offer a natural overcomplete basis respecting symmetries
	* Perhaps first thing to do is just try wavelet regularization on MNIST.
	* If you want to use nonconvolutional kernel method on images, you should first convert to Fourier or wavelet basis. Probably wavelet (except that's not quite a basis). (Multiply by log size.) (This doesn't give you translation invariance, just resets the norm.)
* Three kernels
	* Fourier-based.
	* $\rc{2-\an{x,y}}$.
	* Arccosine.
* I'm super-confused about why toggling just one parameter $n$ changes the number of layers. $K^{(n)}(x,y)=\fc{n-1}n + \fc{1/n}{(n+1) - n\an{x,y}}$.
* Idea to prove NN separation for Lipschitz layers: Show a function that has exponentially higher norm in terms of $l-1$ norm than $l$. Problem: norm required to express neural net also increases super-exponentially in dimension.
* Improper tensor decomp using same method (use case?) cf. Livni's poly network
* Barron functions form a convex set... The reason why it's intractable is that it's infinite-dimensional. Hilbert spaces are infinite-dimensional, but the representor theorem saves you.
* Can you cut down representation (after using representor theorem) by sampling? Keep norm, but be cruder? (Pick some elements and rescale.)
* Using kernel representation at first level of neural network? Do some kind of AM? How to mix nonparametric and parametric? Power and limit of kernel coming from its nonparametricity.

