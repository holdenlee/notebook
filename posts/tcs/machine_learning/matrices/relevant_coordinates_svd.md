---
title: Relevant coordinates: Low-rank
published: 2016-06-07
modified: 2016-06-07
tags: linear algebra++
type: research
showTOC: True
---

See also [Relevant coordinates](relevant_coordinates.html).

#Low-rank submatrix

Suppose $I\subeq [m]$ is a subset of indices. Draw each column of $A$ as follows. $v_I$ is drawn from some distribution close to being supported on a $k$-dimensional subspace. (For example, first draw $w\in \R^I$ from a distribution supported on a $k$-dimensional subspace. Now let $v_I=w+\ep$ where $\ep$ is error, independent on different indices. We can relax this in various ways.) For each $i\nin I$, suppose there is a distribution $D_i$. Draw $v_i$ from $D_i$ (independently). 

<!-- Let $B_{I\times [n]}$ be a rank-$k$ matrix, and let $A_{I\times [n]}=B_{I\times[n]}+E$ where $E$ is noise. For $i\nin I$, let $A_{ij},1\le j\le m$ be independent draws from some distribution, and suppose that $A_{ij}$ for $i\nin I$ are independent. Recover $I$. -->

##Assumptions

* Suppose for simplicity that for each $i$, $\E v_i=0$, $\E v_i^2=\Var(v_i)=1$. We can always normalize so this is the case (paying a little bit error for estimation for $\E v_i$, $\Var(v_i)$). 
* Suppose the distribution on $\R^I$ satisfies the following. For every $i\in I$, there exists $j\in I, j\ne i$ such that $\E |v_iv_j|\ge \ep$ (for example, $\ep=\rc k$). (Is this a reasonable assumption? Can we replace it by something more standard?) (This is basically saying that you can't delete a coordinate and make the distribution on $\R^{I\bs \{i\}}$ almost $(k-1)$-dimensional.)
    *   Actually, we don't need this, because:

        Lemma: if $B_{ii}=1$, $B$ is symmetric, has entries in $[-1,1]$, and $B_i$ is a linear combination of $k$ other rows, then there is some $j\ne i$ such that $|B_{ij}|\ge \rc k$.

	    Proof. Suppose the $k$ rows are $[1,k]$, and the $(k+1)$th row is a linear combination of these with coefficients $w$, i.e., letting $C=B_{[1,n]\times [1,n]}$, $w^TC = [B_{k+1,1},\ldots, B_{k+1,k}]$. Looking at this linear combination on the $k+1$th column, $w^T[B_{k+1,1},\ldots, B_{k+1,k}]=1$. Putting these together, we get $w^TCw=1$. Because the entries of $C$ are at most 1 in absolute value, this means
		$$(|w_1|+\cdots +|w_{k}|)^2\ge 1\implies \exists i, |w_i|\ge \rc k.$$

        Apply this to the covariance matrix.
* Suppose $\ep$, the noise, is such that each entry is in $[-C,C]$, zero-centered, and independent.

##Algorithm

Idea: on average, there is greater correlation between 2 random vectors in a $k$-dimensional subspace than 2 random vectors in $n$ dimensions.

* Take $n=\Om(\prc{\ep^2}(\ln m))$ samples. Let them be the columns of $A$.
* Calculate $\rc n AA^T$ (as a guess for the covariance matrix for $v$).
* Declare $i\in I$ iff there is $j\ne i$ such that $(\rc{n}AA^T)_{ij}>\fc{\ep}2$.
<!-- * In a graph, connect up $i,j\in[n]$ by an edge iff $|A_{ij}|>\fc{\ep}{2}$.
* W.h.p., all non-isolated vertices are in a connected component. This is $I$. (I.e., declare $i\in I$ iff there is $j\ne i$ such that $(\rc{n}AA^T)_{ij}>\fc{\ep}2$.)-->

##Proof

*   Let $\wt \E$ be the empirical average, i.e., $\wt \E v_iv_j = \rc n(AA^T)_{ij}$. We have $|v_iv_j|\le 1$, so by Chernoff,
	$$\Pj(\ab{\wt \E v_iv_j - \E v_iv_j} \ge t) \le 2e^{-nt^2}$$
	for $i,j\nin I$. We get a similar bound if $i\in I$ or $j\in I$, where the randomness is over the noise in $E$.
	Union-bounding,
	$$\Pj(\text{for some $i\ne j$, }\ab{\wt \E v_iv_j - \E v_iv_j} \ge \fc{\ep}{2})\le m^2 e^{-cn\ep^2}.$$
	Take $n=\Om(\prc{\ep^2}\ln m)$ to get this to be $o(1)$.
*   When either $i\nin I$ or $j\nin I$, we have $\E v_iv_j=0$ so the above event makes $|\wt\E v_iv_j|<\fc{\ep}{2}$; when $i\in I$, there is $j\in I$ such that $\E |v_iv_j|>\fc{\ep}{2}$ by assumption so the above event makes $|\wt \E v_iv_j|>\fc{\ep}{2}$.

##Extensions

* It's not really necessary for $v_I$ to be independent. It's enough that $A_{I\times [n]} = B_{I\times [n]}+E$ where $B_{I\times [n]}$ is a rank $k$-matrix such that for every $i\in I$, there is $j\in I$ such that $\an{B_i,B_j} >\ep \ve{B_i}\ve{B_j}$, and $E$ is random-enough error.
* Can we get a result using fewer generative assumptions?
	* Connect $i,j$ if $|\wt \E v_iv_j|>\fc{\ep}{2}$. We probably reduce to a graph problem, where we want to find a subset where the graph is more dense.
    * How much can we relax independence? Esp. independence of coordinates $i\nin I$. 
	* Is worst-case hard (cf. max clique, planted clique)? "Find the subset of size $cn$ that is $\ep$-close to a rank $k$ matrix." What about a gap-problem, i.e., there's a guarantee that there is no subset of size $c'n$ that is $\ep'$ close to rank $c''k$?
