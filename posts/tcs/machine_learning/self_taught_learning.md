---
title: Self-taught learning ([RBLPN07] Self-taught Learning: Transfer Learning from Unlabeled Data)
published: 2016-08-31
modified: 2016-08-31
tags: self-taught learning, dictionary learning, sparse coding
type: paper
showTOC: True
---

[website](http://www.andrewng.org/portfolio/self-taught-learning-transfer-learning-from-unlabeled-data/)

# Definition

Unlabeled data (ex. random Internet images, unlimited audio) need not have the same class labels or generative distribution as labeled data. This is different from

* semi-supervised learning setting (same distribution/classes)
* transfer learning (requires labels for both groups)

Makes ML easier and cheaper. Much of human learning is believed to be from unlabeled data. (Order of magnitude: $10^{14}\pat{synapses}/10^9s=10^5$bits/s)

<!-- (? Ex. maybe just overlap in dictionary features?)-->

# Approach

1.  Use sparse coding to construct higher-level features using unlabeled data. (cf. representation learning)
	
	They use $L^1$ norm regularization. $\min_{A,x, \ve{A_{\cdot j}}\le 1} \sum_i \ve{y^{(i)} - Ax}_2^2 + \be \ve{x}_1$. Use AM.
2.  For each input, do sparse recovery (same objective, fixing the $A$ now). This is a convex problem.
3.  Now apply supervised learning algorithm, e.g. SVM.

# Discussion

?? Sparse
coding model also suggests a specific specialized similarity function (kernel) for the learned representations.
Once the bases b have been learned using unlabeled
data, we obtain a complete generative model for the
input x. Thus, we can compute the Fisher kernel to
measure the similarity between new inputs.

(Disadvantages of PCA: linear and undercomplete)

What about auto-encoders and NMF?
