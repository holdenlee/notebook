---
title: Convnets ideas
published: 2016-08-02
modified: 2016-08-02
tags: neural nets
type: research
showTOC: True
---

* In the Fourier basis translation is diagonalized. So can we train better in the Fourier basis?
    * This seems tempting, but it doesn't seem to lead anywhere. Local convolution with shared parameters commutes with translation. Here, diagonal maps commute with translation (=multiplication by eigenfunctions). So in terms of computing a linear map, it's easier.
	* But then we follow by a nonlinearity: pointwise sigmoid, or local pooling. In the Fourier space, this doesn't correspond to anything nice! Fourier transform scrambles locality, and locality is important here...
* Adding more invariances:
    * Rotational invariance. (See [CW16] Group Equivariant Convolutional Networks)
	    * Make local rotated copies of the image (have to be careful with cropping, interpolating) and stack them. Now do a 3-D convolution in $(x,y,\te)$ space.
		* This is less efficient. We should be able to reduce the number of parameters, but by how much?
		* Beyond translation symmetry, the dimensionality of symmetries becomes greater than the dimensionality of the image (there is more than one symmetry taking one point to another point). This redundancy causes inefficiency.
		* Do 3D convolution over $[0,1]\times[0,1]\times \mathbb S^1$.
	* Scaling invariance.
	    * Run the same convnet on the picture at different scales.
	* Coloration (does this cause problems typically?)
	* There's some classical result in theoretical computer vision that identifies the dimensionality of the manifold of image alterations... check Amit Singer's notes.
* Apply the variant on convolutional dictionary learning [HA16](../nlp/HA16.html), except 2-D.
* What if we did global convolutions? (This would add many parameters...)
* Add regularization to penalize non-smooth/non-simple kernels. For example, write the kernel in a Fourier or wavelet basis, and penalize larger Fourier or wavelet vectors (ex. term based on Fourier expectation).
* I "get" max pooling now: it preserves translation invariance. Pool across close-by transformations.
    * Does overlapping impose consistency?
* Could you compute max-pooling across many local transformations (ex. $(x,y,\te)$) more efficiently? Ex. finding the distance from a manifold of transformations of the image.
* How to incorporate common sense? Ex. "A thin object in a person's hand is likely to be a pencil."
* Can we train on the quotient manifold, quotiented out by symmetries? The problem is that the quotient manifold has cusps. Ex. $\R^2/(x,y)\mapsto (y,x)$ has "cusps" at $(x,x)$. Add regularization/change metric to keep it away? cf. keeping things in the simplex.
* (General NN) How much can you sparsify a fully connected layer and still have it work? (cf. dropout)
* How much can you reduce parameters in a trained NN and still get similar performance? (+ an explanation of why more parameters that needed helps learning) Can you iterate reducing parameters and training?
    * READ: Deep-fried convnets.
* Fooling neural nets...
* Train twice independently and put together?
* Hyperuniformity: sample at non-grid points. 
