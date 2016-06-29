---
title: Stanford quals
published: 2016-06-29
modified: 2016-06-29
tags: none
type: toc
showTOC: True
---

(from Jacob's notes on Stanford quals)

# Supervised learning [1]

[CS229](http://cs229.stanford.edu/materials.html)

* Perceptron, logistic regression, SVMs
* Kernel methods, Gaussian processes
* Boosting (AdaBoost)
	* What is the convergence rate?
		* $\exp(-\sum_{t=1}^T \gamma_t^2)$
		* Key property: *adaptive*
	* What problems can it be applied to?
		* binary classification on fixed dataset
	* [notes](http://cseweb.ucsd.edu/~yfreund/papers/IntroToBoosting.pdf)
* [Decision trees, random forests](cart.html)
	* Bagging (given subset of size $N$, create many versions of the dataset by subsampling $N$ things with replacement repeatedly)
	* For each of these versions, also subsample $\sqrt{d})$ of the features to use for the decision tree
* Neural networks
* Linear regression
* Regularization: L1, L2 and their properties

#Unsupervised learning [1]

[CS229](http://cs229.stanford.edu/materials.html)

* [K-means](matrices/k-means.html)
* [Linear dimension reduction](matrices/dimensionality_reduction.html) PCA, CCA, factor analysis, ICA
	* What is PCA / what is it used for?
	  * Given input dataset, assuming it's elliptical, finds the principle axes of the ellipse
		* In more statistical language, this finds a low-dimensional representation that explains as much of the variance as possible
	  * Can be computed by just taking SVD of covariance matrix
	  * Typically we mean-center first
	  * Sometimes want to do other scalings but no clear consensus on the best one
    * [CCA](matrices/cca.html) What is CCA / what is it used for?
	  * Same intuition as PCA, but wants to find cross-correlations between two sets of variables (X and Y)
	  * Obtained by taking singular vectors of $\Cov(X,X)^{\rc 2}\Cov(X,Y)Cov(Y,Y)^{-\rc2}$.
	  * ?Isn't this used for semi-supervised learning?
		* ?E.g. given two sets of features, use CCA as a regularizer.
	* [Factor analysis](matrices/factor-analysis.html) What is factor analysis / what is it used for?
	  * Basically, this is just matrix factorization
	  * Often allows more domain knowledge to be incorporated
	* [ICA](matrices/ica.html) What is ICA / what is it used for?
	  * Blind source separation
	  * Tries to break into independent signals
	  * Often done by maximizing non-gaussianity of signals
* EM
  * What theoretical property does EM satisfy?
	* Maximizes lower bound $\log p(x)  - KL(q(z|x) || p(z|x))$
  * What are the general updates?
	* Compute expectation of log-likelihood under current model
	* Minimize expectation
	  * Sort of like iteratively approximating setting the gradient to zero

