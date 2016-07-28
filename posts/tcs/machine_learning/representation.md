---
title: Representation learning
published: 2016-07-28
modified: 2016-07-28
tags: none
showTOC: True
---

Representation learning means you have to first find a good representation---some hidden structure---for the data in order to learn it.

#Low-dimensional structure in high-dimensional space

Consider a distribution on a low-dimensional space. Now suppose this low-dimensional space is embedded in a high-dimensional space, and noise in the complementary (may be orthogonal) subspace is added. Recover the low-dimensional space and the structure on this space.

* Suppose complementary noise is Gaussian. [TV16] show how to recover given that the fourth moments of the distribution on the low-dim space are bounded away from that of a Gaussian. (Ex. clusters; a product distribution is limited by the dimension closest to Gaussian, etc.)
* Can we weaken the assumption on the complementary noise? (Arora, Ge, Ma) Put an assumption on "unimodality" in other directions.
* Suppose the subspace is a coordinate subspace, and the structure is a low-rank subspace within that. See [relevant coordinates](matrices/relevant_coordinates.html).

Consider a dictionary-learning setting. There are many variations here. What we want to say is the following: given there's a transformation in a certain class---ex. a neural net---that makes the data structured, can you learn the structure/parameters?

* Suppose the samples are sparse linear combinations of $a_i$. This is the setting of dictionary learning. See [AGM14](matrices/AGM14.html), [AGMM15](matrices/AGMM15.html)
    * Can we generalize from independent $p\de_0+(1-p)D$ distributions to non-Gaussian distributions?
    * Suppose that noise is added. The algorithm above works if the dot product between 2 noise vectors is $o(1)$. Ex. each coordinate is $o\prc{n^{\rc 4}}$. Then the dot product is summing $n$ numbers $o\prc{n^{\rc 2}}$ which is $o(1)$. Can we do noise up to $o(\sqrt n)$? The overlapping communities problem seems hard now. Before we could threshold at $\rc 2$, but now, noise is up to $\sqrt n$. cf. in SBM, you can deal with $\rc{\sqrt n}$ difference in probabilities; in SVD, you can add a random matrix of entries $o(\sqrt n)$ because the eigenvalues are much smaller.
	* In the undercomplete case, if the noise is orthogonal to the subspace spanned by $a_i$, we're in the setting of [TV16]. Products of non-Gaussians are OK.
	* Changing the formulation instead to that $(\an{x,a_i})_i$ is sparse is equivalent to learning the dictionary $(A^+)^T$. (Warning: this looks different in the over/undercomplete case.) 
	


