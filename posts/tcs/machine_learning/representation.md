---
title: Representation learning
published: 2016-07-28
modified: 2016-08-13
tags: none
showTOC: True
---

Representation learning means you have to first find a good representation---some hidden structure---for the data in order to learn it.

# Low-dimensional structure in high-dimensional space

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
	
# Thoughts 8-13

The problem here is really about **unsupervised learning**: given that there is a representation of a certain form on top of which you can train a classifier, etc., in the *absence of labels* find the representation.

## Kernel dictionary learning

Let $x$'s be the data points and $X=[\Phi(x)]$ be the image under $\Phi$. $\Phi$ is such that $K(x,y) = \an{\Phi(x),\Phi(y)}$. Kernel dictionary learning seeks to find $X=DA$, $D\in \R^{\iy\times k}$. But assume $D=XE$ is a linear combination of $\Phi(x)$'s. Then the objective becomes minimizing $\ve{X-XEA}$ (what norm?) subject to sparsity constraints. Do alternting minimization, etc., using the fact that the norm (and gradients) can be evaluated easily using the kernel trick.

## Try to use kernel dictionary learning

Warning: these steps are not justified. 

Suppose that $x$'s are latent variables, that are sparse$+$noise, and we observe
$$y=Af(x).$$
In our case, $f=\ln$ (so that sparse$+$positive noise becomes few large entries). Then (maybe we should have $A^T$? Not sure)
\begin{align}
A^+ y &= f(x)\\
f^{-1}(A^+y) &= x\\
\Phi(A^+)\Phi(y) &= x \\
\Phi(y) &=\Phi(A^+)^+ x.
\end{align}
This suggests doing dictionary learning on $\Phi(y)$ (or a finite approximation of this), finding $x$'s, then solving the system of equations $A^TY=f(X)$. (Take many samples $(x,y)$ and do least squares.) In order for this to work, we need to 

* justify all the pseudo-inverses, transposes (e.g. OK if inputs random: $A^TAx\approx x$ coordinatewise so things like thresholding work)
* a finite approximation of $\Phi$ is OK.
* DL on $\Phi(Y)$ recovers something that is close to the desired solution.
* The noise model of $x$ meets the requirements for the DL algorithm.

This does DL in the larger space though. Can we use the kernel trick to make it more efficient? 

* We can try to do the kernel trick by first doing KSVD on $\Phi(Y)$. (Find the singular vectors as linear combinations of $\Phi(Y)$.)
* If the DL algorithm only relies on $Y^TY$, we're in good shape because we can compute this exactly using $\Phi$.

So an attempt at an algorithm.

1. KSVD
2. DL/ICA to find $X$.
3. Solve for $A$.

## Generalizing AGMM

* Can we generalize to $x=$ sparse + noise rather than $y=A\pat{sparse} + \pat{noise}$? We still need noise part to be $o(1)$ though so $\E x_i =o(1)$ (why? otherwise I don't think you can even do sparse recovery.) Suppose the noise distribution is known; perhaps we can correct for the noise in the AGMM algorithm. If the noise is not known, ex. its mean is not known, this seems difficult.
* The algorithm involves thresholding and looking at a graph. Can we instead have weights, ex. a triangle has weight $\an{u,v}\an{v,w}\an{w,u}$? The problem is if $u,v,w$ are in 2 communities this multiplies by 8. It's not a natural additive decomposition. But perhaps something can still be done. Ex. Find overlapping communities such that most triangles are fully inside one community, and triangles occupy a large proportion of each community.
* AGMM just requires $YY^T$, so knowledge of the dot products is enough. (Kernel trick works.)
* When threshold is not known? Noise is $<\al$, signal is $>\al$. Add an entry $1$ to every vector, but *that* entry is not 0-centered...

Different optimization problem? (Ex. add sparsity regularization, ex. $\ved_1$.) SDP relaxation? It's hard to integrate the sparsity constraints.

Redo analysis with continuous observations?

Tensor decomp for mixed community detection [Anandkumar, Ge]: look at $(\E_{x\in X} \an{x,a}\an{x,b}\an{x,c})_{a,b,c}$.

I think I'm trying to do too many things at once. Allow larger noise, agnostic noise, arbitrary mean/cutoff...

Look at the simplest problem inspired by the problem. Ex. Assume there are $k=10$ functions $\si_k(A_k^Tx+b_k)$ (normalized) that map data to close to $e_1,\ldots, e_{10}$? Completely unsupervised learning. AGM is much simpler with sparsity 1...

## DL vs. ICA, tensor decomposition

Why can't we just solve dictionary learning with tensor decomposition? Suppose $x_i$ are independent, symmetric, non-Gaussian, mean 0. (Symmetric mean 0 can probably be loosened if we modify this.) Then 
$$\E y^{\ot 4} -(\E y^{\ot 2})^{\ot 2} =\sum_i A_i^{\ot 4} [(\E x_i)^4 - (\E x_i^2)^2].$$
We don't even need the $x_i$ to be from a sparse distribution---any non-Gaussian distribution (actually, want 4th moments to be non-Gaussian) will do! 

Reasons why this doesn't trivialize the problem?

1. Overcomplete tensor decomposition is hard/not well-understood.
1. The $x_i$ aren't completely independent. (But we can assume almost 4-wise independence, etc.---the AGMM algorithm also requires similar assumptions.)
1. Tensor decomposition is inefficient.
1. It doesn't find $x$'s. (But we can do inference separately.)
1. Tensor decomposition in this regime just doesn't work in practice. (Practically, what can you expect???)

I think I need to familiarize myself with practical tensor decomposition and DL!

# Previous work

Unsupervised SVM

* [Unsupervised SVMs: On the Complexity of the Furthest Hyperplane Problem](http://www.jmlr.org/proceedings/papers/v23/karnin12/karnin12.pdf). FHP is NP-hard.
    * Randomized algorithm, running time $n^{O(1/\te^2)}$. (Exponential dependency tight assuming ETH)
	* Approximation algorithm: $1-3\al$ fraction is $\ge\al$ times separation margin.
	* No PTAS. Gap-preserving reduction from PCP.
* [Quora](https://www.quora.com/Is-it-possible-to-use-SVMs-for-unsupervised-learning-density-estimation). One-class SVM, support vector clustering.
* [Support vector clustering](http://jmlr.csail.mit.edu/papers/volume2/horn01a/rev1/horn01ar1.pdf) "Data points are mapped by means of a Gaussian kernel to a high dimensional feature space, where we search for the minimal enclosing sphere."
* ? http://stats.stackexchange.com/questions/212080/yet-another-unsupervised-svm
* [Unsupervised SVM (thesis)](https://www.uni-oldenburg.de/fileadmin/user_upload/informatik/download/Promotionen/phdthesis_fabian_gieseke.pdf)
* [Multi-class SVM](http://www.aaai.org/Papers/AAAI/2005/AAAI05-143.pdf)

# Relaxing independent sparsity

Independent sparsity---required for [AGM14](matrices/AGM14.html) and [AGMM15](matrices/AGMM15.html) (actually, 2-wise "almost independence" is good)---is unrealistic because features may be correlated/co-occur. A first step may be to consider group sparsity.

Google for "dictionary learning group sparsity":

* [Proximal Methods for Sparse Hierarchical Dictionary Learning](http://machinelearning.wustl.edu/mlpapers/paper_files/icml2010_JenattonMOB10.pdf)
* [Group Sparsity and Geometry Constrained Dictionary Learning for Action
Recognition from Depth Maps](http://www.cv-foundation.org/openaccess/content_iccv_2013/papers/Luo_Group_Sparsity_and_2013_ICCV_paper.pdf)
* [Sparsity-based Image Denoising via Dictionary Learning and Structural
Clustering](http://see.xidian.edu.cn/faculty/wsdong/Papers/Conference/0697.pdf) (clustering based sparse representation)
* [Dictionary Learning with Group Sparsity and Graph Regularization (DL-GSGR)](http://ieeexplore.ieee.org/document/6296694/?arnumber=6296694)
