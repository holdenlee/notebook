---
title: Neural nets learn dictionaries
published: 2016-10-10
modified: 2016-10-10
tags: dictionary learning, neural nets
type: research
showTOC: True
---

# Result

General idea: when each row of $B$ is sufficiently close to the row of $A^T$, gradient descent converges until $B$ is very close to $A^T$.

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
