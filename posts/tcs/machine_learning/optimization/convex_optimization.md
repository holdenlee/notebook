---
title: Convex optimization
published: 2016-03-04
modified: 2016-03-04
tags: convex optimization
type: topic
showTOC: True
---

Notes: 

* [Duality](duality.html) (BV Ch. 5)
    * [SDP duality](sdp-duality.html)
* [Convex problems](convex_problems.html)
* First-order methods
	* [Gradient descent](GD.html) (BV Ch. 9)
	* [Mirror descent](mirror-descent.html) 
	* [AGD by coupling](AO15.html)
	* [AGD, intuition by Chebyshev](/posts/math/analysis/numerical/chebyshev.html) - actually covers conjugate gradients.
* Second-order methods
	* [Newton's method](second-order.html) (BV Ch. 9)
* [Constrained optimization](constrained.html) (BV Ch. 10)
* [Interior point methods](ipm.html) (BV Ch. 11)
* [Ellipsoid method](ellipsoid.html)
* Stochastic and online methods
	* SGD
	* [SGD variance reduction](sgd_variance_reduction.html) (SAGA, SVRG)
* [Bandit convex optimization](bco.html) (OCO Ch. 6)

To learn about: 

* Accelerated gradient descent (see Bubeck, Moritz, Nesterov) (? see also: a universal catalyst, 4-12-16, S15 in alg-ml)
* AH15 Faster Convex Optimization: Simulated Annealing with an Efficient Universal Barrier [paper](http://arxiv.org/abs/1507.02528) (see also: 2 cultures)
* Review online/bandit methods
* Bandit algorithms---recent progress by Bubeck.
* Ellipsoid method
    * Yin-Tat Lee's improvements.
* Sampling methods
    * [Two cultures](http://www.minimizingregret.com/2016/03/the-two-cultures-of-optimization.html)
	* CV16 Gaussian cooling [paper](http://arxiv.org/pdf/1409.6011.pdf) and [followup](http://link.springer.com/article/10.1007/s12532-015-0097-z). See Karan's talk in alg-ml S4.
* Allen-Zhu's work. Posts from Minimizing regret
    * ICML 2016 papers.
    * [Improvements since SGD](http://www.minimizingregret.com/2016/07/faster-than-sgd-1-variance-reduction.html)
	* [OCO](http://www.minimizingregret.com/2016/07/more-than-decade-of-online-convex.html)
	* [Classification and regression](http://www.minimizingregret.com/2016/06/how-to-solve-classification-and-regression.html)
	* [Reductions](http://www.minimizingregret.com/2016/05/the-complexity-zoo-and-reductions-in.html)
	* [LiSSA](http://www.minimizingregret.com/2016/03/making-second-order-methods-practical.html)
* Recht on SGD
* ? Belief propagation
* Optimization on manifolds---write up notes.
