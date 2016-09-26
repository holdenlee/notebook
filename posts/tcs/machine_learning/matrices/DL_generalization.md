---
title: DL generalization
published: 2016-09-19
modified: 2016-09-19
tags: dictionary learning, sparse coding
type: research
showTOC: True
---

# Group sparsity

Suppose that we have group sparsity with partition $\bigsqcup S_i$.

In AGMM15, we get instead $\ve{E_1+E_2+E_3}\le O^*\pa{\fc{\mu k^2 \ln^2 n}{m\sqrt n}\max |S_i|^2}$. For example, if $\max|S_i|^2$ is a constant, the bound is still the same. As long as this is $\le O^*\pf{k}{m\ln m}$, the bound is still OK.

(Basically we get larger terms in $E_2,E_3$: In $E_2$ we have $\sum_{i,j\in S_k, i\ne j} q_i \be_i\be_i' A_jA_j^T$---this is larger because $i,j$ cooccur, we have $q_i$ rather than $q_{i,j}$, $q_i$ is $\Te\pf km$ not $\Te \pf{k^2}{m^2}$. Lump these terms into the 1st sum. Ditto for $E_3$.)

See notebook 15 (end) for details.

Rely on [modification of Davis-Kahan](/posts/math/algebra/linear/matrix_analysis/perturbation.html).

Take $u,v$ and estimate $M_{u,v} = \E \an{u,Ax}\an{v,Ax}(Ax)(Ax)^T$. Instead of taking the largest singular vector, take the subspace spanned by all singular values of size $\ge C_1 \fc{k}{m}$. What is the angle between this subspace and the projection of this onto the space of $A_{\cdot i}$ where $i\in \Supp(u)\cap \Supp(v)$? By generalized Davis-Kahan, $\fc{C_0\fc km - C_1\fc km}{C_2 \fc{k}{m\ln m}} = \fc{C_3}{\ln m}$. 

Now iteratively refine the set of subspaces $\mathcal S$. Start with a subspace $V$, and set of atoms $\mathcal A=\phi$. Let $\ep = \fc{C}{\ln m}$.

## From subspaces to vectors

### Try 1

Do a DFS.

* If the angle between $V$ and any other subspace in $\mathcal S$ is $>\ep$, not counting subspaces where all canonical angles between $V$ and it are $<\ep$, then find the orthogonal complement of atoms that are close to being in $V$, and let that be an atomic subspace. Now go upwards in the tree.
* Otherwise, approximately intersect $V$ with a subspace making it smaller, to get $W$. Draw $V\to W$. Repeat with $W$.

NO: These subspaces aren't spanned by the vectors!

### Try 2

This seems difficult if we don't make assumptions. 

Let's suppose for each vector, it is in a small subset of things that cooccur. (Make this more precise.) Ex. constant size.

The issue is that some subspaces/vectors will be inside a $S_i$ (one of the groups in group sparsity) completely---if we can get all the vectors inside a $S_i$ all we have to do is get a basis, good---but others will be inside $\spn(S_i,S_j)$, or more, and we have to tell them apart.

Idea: do a best-first search, adding subspaces until $\si_{C+1}$ is too large, in which case discard it. (Singular value may not be the right measure here. Maybe: max perpendicular to span of $v_1,\ldots, v_C$?) The large subsets we get will be inside a $S_i$.

(Or some kind of clustering?)

# Big picture

What are we trying to do here? 

* Generalize the settings under which we have provable DL. 
* Define agnostic DL as something worth studying and approachable.
    * Idea that neural nets are easier to train if you have more nodes. More opportunities to converge to columns of $A$.
		* Look at convergene in easy case?
	* Have *any* provable result on agnostic DL.
		* Why we would have agnostic rather than normal: some features are correlated, so the basis could rotate within the subspace of correlated vectors.
		
We already have practical DL algorithms that just rely on AM and adding sparsity penalty. How could theory improve this? (AGM14, AGMM15 don't look like they are used in practice.) Are there theoretical guarantees for AM with sparsity penalty? (There are theoretical guarantees for AM w/ decoding.)

What's a better model in practice: DL with sparsity or $L^1$? (And how does ICA compare?)

TODO: program DL and look at empirical performance.

TODO: 2-layer NN learning dictionary?
	
Dual view between $x=Ah$ and $h=A^Tx$?

Sparse recovery has this thing where $\ved_1$ actually optimizes $\ved_0$. Not true of sparse coding?

## DL experiments

What to try?

* Program classic AM DL with $L^1$ sparsity penalty.
* Program AGMM15 DL. 
* ICA.

Test sets

* Image patches 
* Words embeddings
* Artificial data (sparse, Laplace, etc. @Bianca)
* Artificial group-sparse data, or data correlated in some way (ex. geometrically).

How to evaluate?

* Closeness of columns.
* Loss: how much sparsity, and how far away. (Reconstruction error)
    * How does reconstruction error compare to SVD? (Make dimensions comparable.)
* Put in random SVM on top. Can it learn the SVM well?

Experiments with NN

* Top-$k$ thresholding to enforce $k$-sparsity. Autoencoder?
* Try group-sparse penalty/architecture.
* Does adding more nodes improve things (cf. agnostic DL)?

I think sparseness helps interpretability. Does convergence become quicker if we have sparsity?
