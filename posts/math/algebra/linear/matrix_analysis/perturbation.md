---
title: Matrix perturbation
published: 2016-08-30
modified: 2016-08-30
tags: matrices
type: notes
showTOC: True
---

# Davis-Kahan

(Theorem 4.8 [here](http://ocw.mit.edu/courses/mathematics/18-s997-high-dimensional-statistics-spring-2015/lecture-notes/MIT18_S997S15_Chapter4.pdf))

[Original paper](http://epubs.siam.org/doi/pdf/10.1137/0707001) (In a different form here---how does it connect?)

Distance between eigenvectors.

Theorem 1 [here](http://www.statslab.cam.ac.uk/~yy366/index_files/Biometrika-2015-Yu-biomet_asv008.pdf), Theorem V.3.6 in Stewart and sun

Let $\Si,\wh \Si$ be symmetric with eigenvalues $\la_1\ge \cdots la_p$, $\wh \la_1\ge \cdots \ge \wh \la_p$ corresponding to eigenvectors $\la_i,\wh\la_i$. Fix $1\le r\le s\le p$. Suppose $\wh \la_{r-1}>\la_r \ge \la_s >\wh \la_{s+1}$, $\de = \min (\wh \la_{r-1}-\la_r, \la_s - \wh \la_{s+1}$. (Let $\wh \la_0=-\iy, \wh \la_{p+1}=\iy$.) Then 
$$\ve{\sin \Te(\wh V, V)}_F \le \fc{\ve{\wh \Si - \Si}_F}{\de}.$$
($\ve{\sin \Te(\wh V, V)}_F$ has some definition as a matrix, but I think you can interpret the LHS as the sin of the angle between the spaces.)

Question: is the following true? Or something like it?

**Conjecture**: Let $A$ have eigenvalues, vectprs $\la_i, v_i$, and $A+E$ have eigenvalues, vectors $\wh \la_i, \wh v_i$. Suppose $\la_s-\ve{E}_2>\la_t$. Then 
$$\sin \angle' (\spn (\wh v_1, \ldots, \wh v_s), \spn (v_1,\ldots, v_{s+t})) \le \fc{ve{E}_2}{\la_s-\ve{E}_2 - \la_t}$$
where $\angle'(U,V)$ is asymmetrically defined as 
$$
\max_{u\in U}\min_{v\in V} \angle(u,v).
$$

# Weyl's Theorem

# Wedin's Theorem

(Davis-Kahan for $r=s=1$.)

Let $v_1(A)$ be the top eigenvector of $A$. If $\de=|\la_1(A)-\la_2(A)|$, then $\sin(\angle (v_1(A), v_1(A+E)))\le \fc{\ve{E}_2}{\de}$.

<!--?? What's the analogue of this for subspaces? Ex. $\la_1,\ldots, \la_c$ large and $\la_{c+1}$ small.-->


# Other

* [singular vectors under random perturbation](https://arxiv.org/pdf/1004.2000.pdf)
