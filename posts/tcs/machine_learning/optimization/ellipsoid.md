---
title: Ellipsoid method
published: 2016-08-30
modified: 2016-08-30
tags: linear programming, algorithms
type: concept
---

* [OCW 18.433](http://ocw.mit.edu/courses/mathematics/18-433-combinatorial-optimization-fall-2003/lecture-notes/l1617.pdf)
* [Arora's course](http://www.cs.princeton.edu/courses/archive/fall15/cos521/lecnotes/lec17.pdf) ([course site](http://www.cs.princeton.edu/courses/archive/fall15/cos521/))
* LSW15 [paper](http://arxiv.org/abs/1508.04874)

# Ellipsoid method

This is a very general *polynomial time* algorithm for convex optimization. We can use it to solve convex optimization problems that are even too large to
write down.
<!--faster than gradient descent.-->

1. LP: $f(x)=c^T\cdot x$.
2. SDP: Infinitely many constraints $a^TXa\ge 0$.
3.  Held-Karp relaxation for traveling salesman: $\min \sum_{i,j}c_{i,j}X_{i,j}$ under conditions 
	\begin{align}
	0 \le X_{ij} &\le 1\\
	\forall S\ne \phi, V, \quad \sum_{i\in S, j\in \ol S} X_{ij} &\ge 2
	\end{align}
	(Last constraint is subtour elimination constraints. We can find a violation by finding a minimum cut with capacity $<2$.)

<!--
Recall convex optimization. In general there is no succinct description for $K$.
\begin{enumerate}
\item
LP: $f(x)=c^T\cdot x$.
\item
SDP: Think of $a^TXa\ge 0$ as infinitely many linear constraints. 
\item
Held-Karp relaxation for traveling salesman: $\min \sum_{i,j}c_{i,j}X_{i,j}$; for all $\sum_j X_{ij}=2$. 
\fixme{Can't require eigenvalue $>$something?}
To prevent disjoint cycles, for all $S\subeq [n],S\ne \phi,[n]$, $\sum_{i\in S,j\in \ol S} X_{ij}\ge 2$. (Exponentially many constraints. Nevertheless we can solve it!)
\end{enumerate}
We only need to be able to project to the convex body.-->

**Separation oracle** for convex $K$: given $x$, gives a plane that separates $K$ from $x$ in polynomial time. Think of hyperplane as "feedback" on why $x\nin K$.

**Farkas's Lemma**:
If $K$ is convex, for all $x\nin K$, there is a hyperplane $a^T\cdot x=b$ such that $K$ lies on one side and $y$ on the other.

Ex. 
1. PSD: Compute eigenvalues of $Y$. Say there is eigenvectors $u$ such that $u^TYu<0$. Use this hyperplane.
2. Traveling salesman: Cut with $<2$.

An ellipsoid is $(X-a)^TBB^T(X-a)\le 1$ where $B$ is PSD. The ellipsoid algorithm: given: an ellipsoid $\cal E$ containing $K$ and $K$ has a poly-time separation oracle.

To find a point of $K$, recurse: 

1. Is the center $x$ in $K$? If so, done.
2. Else, find a separating hyperplane $H$ going through $x$. Find the smallest ellipsoid containing the half cut by $H$. ($E_{i+1}=E_i\cap \set{x}{a^Tx\le b}$) This can be found in poly time with ellipsoids.

**Theorem**:
$\Vol(E_{i+1})\le \pa{1-\rc{2n}}\Vol(E_i)$.

What we need:
1. Rephrase optimization as feasibility. (Binary search.)
2. Find a "reasonably snug" bounding ellipsoid for $K$.
3. Implement separation oracle for $K$.
4. Implement computation to find $E_{i+1}$ given $E_i$ and separation oracle.

**Lemma**. The minimum volume ellipsoid containing $Ell(D,z)\cap \set{x}{a\cdot x\le a\cdot z}$ is $E'=Ell(D',z')$ where
\begin{align}
z' &= z-\rc{n+1} \fc{Da}{\sqrt{a^TDa}}\\
D' &= \fc{n^2}{n^2-1} \pa{D-\fc{2}{n+1}\fc{Daa^TD}{a^TDa}}\\
\fc{\Vol(E')}{\Vol(E)} &\le e^{-\rc{2n+2}}.
\end{align}

*Proof*. It suffices to prove this for $D=I$, $a=e_1$. Here
$$ D' = \fc{n^2}{n^2-1} \mattn{1-\fc{2}{n+1}}0{\cdots}0{1}{\cdots}{\vdots}{\vdots}{\ddots}.$$
Volume bound follows from determinant calculation. 


The number of steps needed is $n\ln \pf{V_1}{V_0}$ where $V_1$ is the volume of the smallest ellipsoid containing the body and $V_0$ is volume of the starting ellipsoid. Ex. If $P$ is a polyhedron, and $\nu$ is the number of bits required to write down any $n\times n$ subset of $(A,b)$, then $\Vol(P)\ge 2^{-2n\nu}$. (Use Cramer's rule to get expressions for vertices of $Ax\le b$.) Then the number of iterations is $O(n^2)$. ?? Each step takes $O(n^2L)O(mn)$ time ($L$-bit numbers, check validity of point) for a total of $O(mn^5L)$.


> How do you find a lion in the Sahara? Split it in half and recurse.
