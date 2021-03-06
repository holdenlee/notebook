---
title: Tensor decomposition
published: 2016-08-30
modified: 2016-08-30
tags: tensors
type: topic
showTOC: True
---

# Basics

See "Tensor methods" in `new_thread.pdf`.

Review questions:

1. Define tensor and tensor decomposition. When is it unique? Discuss the intractability of tensor problems. Why would we work with them? Give an example where matrix methods fail but tensor methods work because of uniqueness.
2. What properties of matrix rank fail for tensor rank?
3. (\*) Give Jeinrich's algorithm. When does it work, and what is its complexity?
    * Suppose $T=\sum^r u_i\ot v_i\ot w_i$, where $\{u_i\}$ is linearly independent, $\{v_i\}$ is l.i., and every pair in $\{w_i\}$ is l.i. Then this decomposition is unique and there is an efficient algorithm to find it.
	* For a tensor $T\in V^{\ot 3}$, view $T_{\bullet}\in V\ot V^*\ot V^*$, with $\bullet$ corresponding to the last $V^*$. The slices are sums of rank 1 matrices $u_iv_i^*$ with coefficients given by the projections of $w_i$ onto $a$. 
	\begin{align}
	T_a &=\sum \an{w_i,a}u_iv_i^* =: UD_aV^*
	T_aT_b^+ &= UD_aD_b^+ U^+\\
	T_b^+T_a &= VD_b^+D_a V^+
	\end{align}
	WHP diagonalization recovers $U,V$.
4. Give a perturbation bound for finding eigenvalues and eigenvectors of a matrix. What does the bound depend on, in what way (polynomial?)? Make it quantitative. Use this to give a bound on convergence in tensor decomposition.
5. What is the Kruskal rank, why is it important?
6. Describe the phylogenetic tree/HMM setup. How can you solve it with tensor methods?
7. What about the non-full-rank case? (Give a reduction from noisy parity.)
8. Give the block stochastic model. When is it information theoretically posible to find the groups (is this exact, or up to some error)? Compare spectral algorithms with tensor methods. (What are the assumptions? Why are tensor methods more flexible?)
9. (\*) Describe and prove the tensor algorithm for the block stochastic model.
10. (\*) Give a tensor algorithm for a pure topic model, and then generalize under latent dirichlet allocation. Why is the Dirichlet distribution particularly nice here? Find the complexity and error in terms of parameters.
11. (\*) Give a tensor algorithm for independent component analysis. There is a dependence on non-Gaussianlity: explain. 
12. Define the cumulants of a distribution. Why are they nice to work with, and how do they help in algorithms?
