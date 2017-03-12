---
title: Learning to model structures and data
published: 2017-03-12
modified: 2016-03-12
tags: pseudorandomness, structure
type: notes
showTOC: True
---

# Miscellaneous notes

* Boosting: 
	* Generic boosting theorem
    * Easiest to state when assume access to whole distribution. Otherwise, have to sample and assume something about VC dimension to generalize. (See old 511 notes. Actual argument works with $\Pi_H(m)$, is there some reason we need to do that?)
	* Hardcore lemma
	* Strong version: Either allow real-number predictions, or think of real-number output as flipping a coin with that probability. This can save the vital factor of 2 compared to worst-case.
	* I don't get the potential argument. 
	* I do get the multiplicative weights argument of BHK, but there are some things to be careful about.
		* Familiar with MW with divergence applied to it.
		* How to make non-worst case? Is this already covered?
		* What about the AdaBoost improvement - algorithmically speaking, it makes sense to adapt weight based on number correct/wrong. Can you not redo the analysis here?
		* Important: need to keep track of density of $\de$.
		* Do we need to cap the weights at 1? What problem is this trying to solve? What happens if we don't?
* Dense model theorem
	* Got $\de''$ ($\wh \de$) part
	* Lots of algebra/$\ep$'s and $\de$'s here. I'm missing an additive factor of $\de^2$ ($\fc{\de}{1+\de}$ instead of $\de$)...
	* Todo: Understand example that shows optimality
* Weak regularity
	* Why do we need the condition on no cut having too many edges? Counterexample if this is not satisfied? Is there a statement that's not "X or Y"?
	* What subroutines are required for the algorithmic version?
	* Note that the points are $V\times V$, or edges in the complete graph. Tests are $A\not\cap B$. (These are not the points.)
	* Get directly from algorithmic DMT?
* Other things
    * Low-complexity approximation
	* Computational entropy
	* Structure theorem (my understanding is that the dense model theorem gives up if it finds a hot spot, while structure attempts to find all the hot spots because it's iterative).

# What does this say for learning?

* Relax "tests" to "functions", perhaps $[0,1]$-functions. Does everything still go through?
* Does this give a GAN formulation? Note that the dense model/structure theorem breaks into regions of constant density, and you get handle on the probability distribution, while in GAN, you have a generative model, not an assignment of probabilities. Can you make a GAN which knows about its probabilities? Is this a Bayesian NN?
* Does this jibe with the greedy algorithmic version of Barron's Theorem? Is the process of finding the best $h$ (if $H$ is linear thresholds/sigmoids/1-dimensional functions) correspond to finding the best new node? Can we make this convex? What if we just want weak learning here?
