---
title: Neural nets learn dictionaries
published: 2016-10-10
modified: 2016-10-10
tags: dictionary learning, neural nets
type: research
showTOC: True
---

[writeup](https://dl.dropboxusercontent.com/u/27883775/wiki/math/pdfs/nndl.pdf)

# Result

General idea: when each row of $B$ is sufficiently close to the row of $A^T$, gradient descent converges until $B$ is very close to $A^T$.

PROBLEM: I've done a lot of the calculations for neural nets learning dictionaries, and am getting stuck on the following: it appears that the gradient of the entire matrix is correlated with the right direction, but individual rows may not be (so a row may get far away until it no longer decodes correctly).

# Proof

# Further directions

* What are the dynamics of the dictionary vectors learned? If we start them randomly, will they converge to the $A_{\bullet i}$ or combinations of the $A_{\bullet i}$? Will they not be useless? Will they be far apart? (What if you simply do some sampling of $Ah$?)
* Agnostic dictionary learning. Suppose we learn a good dictionary. Can we guarantee that it will do well in classification?
* Would a local min for this neural net be good? Generalization follows from Rademacher, so we just care about driving down the cost.
* What weird properties does a NP-hard distribution for DL have---is there a simple way to exclude those?
* Not overcomplete, but sparse + noise (e.g. componentwise). (If not overcomplete, then a linear classifier works. But thresholding could remove the noise, while averaging wouldn't (ex. averaging could amplify it, though slowerly than linearly, $\sqrt n$).)
* If don't get $b^Th$ but only $\sgn(b^Th)$.
* Provable convolutional DL. (The difficulty is that translates that are close by overlap and are not close to orthogonal.) 
	* More general (mathematical) problem is DL under various invariances. Perhaps assuming locality of the filter and separation in distance of the nonzero patches (ex. different copies of the same filter don't overlap).
	* What if we add rotation?
	* Can't do recovery by multiplying by transpose... (Multiplying by transpose doesn't correspond to recovery.) Inverse is badly conditioned... Only allow sum of delta functions? Maybe represent as $\al\de_\be$?
	* Think of this as a kind of sparsity... Have both $\al,\be$ be nodes in the NN? Have location of max when max pooling?
		* Ex. angle: instead of having $\R^{\mathbb S^1}$, represent by $\R \times \bS^1$ (delta function at one location, the max). But can't combine values in $\bS^1$ with values in $\R$. Still need some kernel parametrized by $\bS\times \bS$. How are absolute vs. relative locations separated and kept? Kernel written as sum of simple basis functions?
	* (Use less precision in training than evaluation? Prevent too many parameters.)
	* Interpolation... lowpass filter?
