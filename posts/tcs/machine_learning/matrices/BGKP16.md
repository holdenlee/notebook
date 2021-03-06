---
title: (BGKP16) Non-negative matrix factorization under heavy noise
published: 2016-06-27
modified: 2016-06-27
tags: NMF
type: paper
showTOC: True
---

#Summary

A provable algorithm for NMF $A=BC$ without assuming that the noise of every column of $A$ has small noise.

Under **heavy noise**
$$\forall T\subeq [n], |T|\ge \ep n\implies \rc{|T|}\ve{\sum_{j\in T}N_{\bullet,j}}_1\le \ep$$
and in the dominant NMF model (dominant features, dominant basis vectors, nearly pure records), the TSVDNMF algorithm finds
$$\ve{B_{\bullet,l}-\wt B_{\bullet, l}}_1\le \ep_0.$$

Under dominant NMF assumptions D1, D3, $B$ is identifiable.

Remarks:

* Dominant features is a relaxation of anchor words.
* [AGKM12] (the original algorithm for NMF) requires separability, and does poorly under noise (because under noise the vertices of the simplex may no longer be the vertices of the simplex). Under error $\ve{M-AW}_F^2\le \ep \ve{M}_F^2$, the algorithm takes time $\exp\pf{r^2}{\ep^2}$.
* Almost pure documents is an assumption not in AGKM12.
* It only achieves constant error. (Can we do better than this?)
* Heavy noise subsumes many noise models. Note that heavy noise is a bound on $\ve{\sum_{j\in T}N_{\bullet, j}}_1$, not $\sum_{j\in T}\ve{N_{\bullet, j}}_1$.

#Assumptions

*   Heavy noise was defined above. If the covariance of noise in each column is large enough, $\ve{\Si_j}_2=O\pf{\sqrt d}{\ep^2}$, then whp the heavy noise assumption holds.[^f1]
    * For example, if it is the sum of $w$ random vectors each with covariance matrix $O(1)$ in norm, then we need $w=\Om\pf{d}{\ep^4}$. Ex. multinomial noise.[^f2]

[^f1]: The paper isn't clear on the $\ep$ dependence... see supplement. In any case this is true in the case that noise is a sum of many $O(1)$ noises.

[^f2]: The covariance matrix is $(-1_{i\ne j} p_ip_j)_{i,j}$. Max eigenvalue is at most $\max p_i(1-p_i)$ in absolute value.
	
*   Dominant NMF: See picture. Left: Dominant features (D1). (Note: sets have to be disjoint, not necessarily a partition.) Right: Dominant basis vectors (D2) and nearly pure records (D3). 

<img src="/images/bgkp16-dnmf.png" width="640">

#Algorithm

1. Apply thresholding to get $D$.
    * Initialize $R=[d]$.
	* For each row $i$, calculate a cutoff $\ze_i$. Set $D_{ij}=(A_{ij}\ge \ze_i) \sqrt{\ze_i}$.
	*   Sort rows in ascending order and prune rows as follows. (Why? We want to prune the non-catchwords. They may be associated with significantly more documents than the catchwords.)
	    <img src="/images/bgkp16-alg1.png" width="640">
2.   Take rank-$k$ SVD $D^{(k)}$ of $D$. (We hope that this is close to a block matrix with nonzeros in $S_l\times T_l$.)
	
     <img src="/images/bgkp16-alg2.png" width="640">
3. Identify dominant basis vectors.
    * $k$-means clustering of columns of $D^{(k)}$.
	* Apply Lloyd's algorithm to $D$ with this initialization.
	* Let $(R_i)$ be the $k$-partition of $[n]$.
4. Identify dominant features $J_l$ for each basis vector by: for each $l$, take the features $i$ (words) with largest $A_{il}$.
5.   Find the basis vectors by averaging the "purest" documents in each $J_l$.
	 <img src="/images/bgkp16-alg3.png" width="640">

<!-- Suppose $\ve{M-AW}_F^2\le \ep \ve{M}_F^2$. Devise a better algorithm for separable approximate NMF. -->
