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

Do a DFS.

* If the angle between $V$ and any other subspace in $\mathcal S$ is $>\ep$, not counting subspaces where all canonical angles between $V$ and it are $<\ep$, then find the orthogonal complement of atoms that are close to being in $V$, and let that be an atomic subspace. Now go upwards in the tree.
* Otherwise, approximately intersect $V$ with a subspace making it smaller, to get $W$. Draw $V\to W$. Repeat with $W$.

NO: These subspaces aren't spanned by the vectors!
