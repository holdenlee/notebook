---
title: Matrix factorizations
published: 2016-04-04
modified: 2016-04-04
tags: none
type: survey
showTOC: True
---

#Flavors

* **Sparse coding/Dictionary learning**: Write $M=AX$ where the columns of $X$ are sparse. Assume some properties on $A$ (e.g., incoherence) and on the distribution of $X$.
* **Nonnegative matrix factorization**: Sparse coding with the caveat that $A,X$ are positive. Write $M=AW$ where $A,W$ have nonnegative entries. $A$ is fixed (assume some properties on $A$) and $W$ consists of random samples. I.e., we are given many samples $y=Ax$. 
* **Topic modeling**: Given $x$, we see samples from the probability vector $Ax$ (rather than $Ax$). Learn $A$ and infer the $x$'s. ??

NMF is the least understood.

#Previous work

* NMF
    * Hardness: If there exists a $n^{o(r)}$ time algorithm, then there exists a $2^{o(n)}$ algorithm for 3SAT.
	* [AGKM12, M14] Given that the rank equals the nonnegative rank, there is a $n^{O(r)}$ time algorithm for NMF. (Relies on solving polynomial inequalities.)
	* [AGKM12] Under separability, NMF can be solved in polynomial time in $n$. (Use the geometry.)
	* Inference: [A16](arora-topic-models.html) Given $A$, recover $x$ from $Ax$ if $x$ is sparse and $A$ has small $\ell_\iy\to \ell_1$ condition number. ("Parameter learning" is learning $A$, "inference" is finding $x$.)
* Topic modeling
	* ... see p. 23 in new_thread.pdf.
	* [AGHMMSWZ12] A Practical Algorithm for Topic Modeling with Provable Guarantees: 
* Sparse coding/ Dictionary learning
	* [SW08](SW08.html): Algorithm for full-rank matrices (no noise).
	    * Apply a $\ved_0\to \ved_1$ relaxation.
	* [AGM14](AGM14.html): Fixed-parameter tractable algorithm for overcomplete (incoherent) dictionaries, up to sparsity $n^{\rc 2-\ep}$.
		* Use the fact that high dot product between two vectors indicates intersection of supports to reduce to a **overlapping community detection** problem.
		* Run **SVD** within communities.
	* [AGMM15](AGMM15.html): Efficient polytime algorithm for overcomplete (incoherent) dictionaries, that works up to sparsity $\fc{\sqrt{n}}{\mu\poly\log n}$.
		* Initialize with **SVD**, noting that with good probability the **intersection of supports** of two vectors $x,x'$ will have one index in common.
		* Apply **alternating minimization** and analyze using **approximate gradient descent** (correlation with the right direction).
		* To get a sparse decoding, apply **thresholding** in the decoding step of AM.
