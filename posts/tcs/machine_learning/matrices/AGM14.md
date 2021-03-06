---
title: (AGM14) New algorithms for learning incoherent and overcomplete dictionaries
published: 2016-04-02
modified: 2016-04-02
tags: none
type: summary
showTOC: True
---

Back to [Matrix factorization](matrix-factorization.html)

#Model

* $A$ is a $n\times m$ matrix.
* $\E X_i=0$ and $X_i\in [-C,1]\cup [1,C]$ when $X_i\ne 0$.
* $X_i$ is independent conditioned on $X_i\ne 0$ for $i\in S$.
* "Bounded $l$th moments" for some $l$: For $|S|=l$, $\Pj(\forall i\in S,X_i\ne 0)\le c^l \prod_{i\in S} \Pj(X_i\ne 0)$.

#Theorem

* The algorithm does the following: If the sparsity is $k\le c\min\pa{m^{\fc 25}, \fc{\sqrt n}{\mu\log n}}$ and $X$ has bounded 3-wise moments, taking $p_1=\poly(m,\rc k, \log\prc{\ep})$ samples and time $\wt O(p_1^2n)$, w.h.p. the algorithm recovers $A$ up to $\ep$ column-wise error.
* Same is true for $m^{\fc 25}$ replaced by $m^{\fc{l-1}{2l-1}}$ and $c$ replaced by $c_l$.
* The same is true when the samples are subject to noise: $y=Ax+n$ where $n$ is independent Gaussian, $\si=o(\sqrt n)$. The sample complexity becomes $\poly(m^l,\rc{k^l}, \log\prc{\ep})\poly\prc{\si^2}{\ep^2}$.

#Algorithm

* Create a graph with an edge between $i,j$ if $|\an{y^i, y^j}|>\rc2$.
* Run the following **overlapping community detection** algorithm.
	* Repeat $\Om(m^2\log m)$ times.
		* Take an edge $uv$.
		* Count the number of vertices that are connected to both $u$ and $v$.
		* Let $T=\fc{k/(2m)}{5} = \fc{k}{10m}$. If the number of common neighbors is $\ge T$, add to $S_{uv}$. (I.e., $S_{uv} = \set{w}{|\Ga(u)\cap \Ga(v)\cap \Ga(w)|\ge T}\cup \{u,v\}$. 
	* Take the minimal sets (with respect to set inclusion). These will be (whp) be the collection $\{C_i\}$ where $C_i$ consists of the vectors having $i$ in the support.
* To estimate $A_i$, find the largest singular value of $\wh{\Si}_i = \rc{|C_i|} \sum_{y\in C_i} yy^T$. (Alternatively, run the "Overlapping average" algorithm, which is not SVD but is similar in spirit.)
* Iteratively improve the estimate. (Wrks when $Y=AX$ exactly. Omitted here.)

For the $m^{\fc{l-1}{2l-1}}$ bound, look at common neighbors of $l$-tuple of samples.

#Analysis

##Graph construction

We have $\an{Y^{(i)}, Y^{(j)}} = \sum \an{A_p,A_q} X_p^{(i)}X_q^{(j)}$.

We want

* Completeness (if $\Supp(Y^i)\cap \Supp(Y^j)=\{i\}$, then with high probability $\an{Y^i,Y^j}>\rc2$).
* Soundness (if $\Supp(Y^i)\cap \Supp(Y^j)=\phi$ then whp $\an{Y^i,Y^j}<\rc2$.

Both come from the same matrix concentration bound. We show soundness. Condition on the supports.
Let $S_i = \Supp(X^i)$.
Write
\begin{align}
\an{Y^i,Y^j} &= X^T M X\\
M_{(S_1\cup S_2)^2} :&= \matt 0{\rc 2N^T}{\rc 2N}0\\
N :&= (A^TA)_{S_1\times S_2}.
\end{align}
Now use Hanson-Wright to show $X^TMX\approx \Tr(M)$ with high probability.

##Overlapping communities

We need to show

* if $\Om^i\cap \Om^j\cap \Om^k\ne \phi$ then likely $i,j,k$ have many common neighbors
* if $\Om^i\cap \Om^j\cap \Om^k=\phi$, then likely $i,j,k$ have few common neighbors

and find the right threshold.

* If $\Om^i\cap \Om^j\cap \Om^k\ne \phi$ then $\Pj_y(\forall j=1,2,3, |\an{y,y^j}|>\rc 2)\ge \fc{k}{2m}$.
*   If $\Om^i\cap \Om^j\cap \Om^k\ne \phi$ then letting $a=|\Om^1\cap \Om^2|$ and similarly for $b,c$,
    $$\Pj_y(\forall j=1,2,3, |\an{y,y^j}|>\rc 2|\Om^{(1)}, \Om^{(2)}, \Om^{(3)})\le \fc{k^6}{m^3} + \fc{3k^3(a+b+c)}{m^2}.$$
	* $\pf{k^2}{m}^3$ comes from intersecting each set separately.
	* $\fc{3k^3(a+b+c)}{m^2}$ comes from intersecting two together and the other separately.

