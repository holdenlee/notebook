---
title: Algorithms
published: 2016-03-03
modified: 2016-03-03
tags: LDC
type: notes
showTOC: True
---

#Summary

(Taken from lecture 11 of algorithms)

1. Given $\ep$ there are $e^{c_\ep d}$ vectors in $\R^d$ that are almost orthogonal (up to $\ep$). In fact, a random collection of vectors will do.
2. (Johnson-Lindenstrauss) Given $n$ points $z_i\in \R^n$, there is a projection onto $m=C_1\fc{\ln n}{\ep^2}$ dimensions such that the metric restricted to the points is almost preserved: $d(u_i,u_j)\in [1,1+\ep]d(z_i,z_j)$.

#Proofs and intuition

1. Choose vectors in $\{-1,1\}^d$ at random and normalize. By Chernoff, $\Pj(|\cos \te_{x,y}|>\sfc{\ln (2c)}{n})<\rc c$. We can choose $\sqrt{c}$ vectors such that this doesn't hold between any pair.
2. The choice of $m$ is so we can use Chernoff and union. Choose $x^i\in \{\pm 1\}\sfc{1+\ep}{m}$ randomly, take the linear mapping $z\mapsto z[x^1\quad \cdots \quad x^m]$. Now use Chernoff and union bound.

Distance being preserved up to $\ep$ is the same as saying that
$$|\an{Mv_i,Mv_j} -\an{v_i,v_j}|\le \ep \ve{v_i}\ve{v_j}.$$
This is good for vectors with large $L^1/L^2$ ratio, and not good for sparse vectors.

#Further questions

* Derandomizing JL.

#Generalities

Because many algorithms rely on finding a closest neighbor---nearest neighbor, minimum spanning tree, point location etc.---have a running time depending upon exp(d).

In machine learning and statistics sometimes the term refers to the fact that available
data is too sparse in high dimensions; it takes exp(d) amount of data (say, points on the
sphere)to ensure that each new sample is close to an existing sample

Blessing of dimensionality. This refers to the fact that many
phenomena become much clearer and easier to think about in high dimensions because one
can use simple rules of thumb (e.g., Chernoff bounds, measure concentration) which don't
hold in low dimensions.

##Applications

Suppose we wish to hash high-dimensional vectors so that nearby vectors tend to hash
into the same bucket. To do this we can do a random projection into say the cube in 5
dimensions. We discretise the cube into smaller cubes of size $\ep$. Then there are 1/$\ep^5$
smaller
cubes; these can be the buckets.

Can reduce dimension while keeping the margin!
