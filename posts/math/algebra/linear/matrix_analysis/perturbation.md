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

Let $\Si,\wh \Si$ be symmetric with eigenvalues $\la_1\ge \cdots \la_p$, $\wh \la_1\ge \cdots \ge \wh \la_p$ corresponding to eigenvectors $\la_i,\wh\la_i$. Fix $1\le r\le s\le p$. Suppose $\wh \la_{r-1}>\la_r \ge \la_s >\wh \la_{s+1}$, $\de = \min (\wh \la_{r-1}-\la_r, \la_s - \wh \la_{s+1})$. (Let $\wh \la_0=-\iy, \wh \la_{p+1}=\iy$.) Then 
$$\ve{\sin \Te(\wh V, V)}_F \le \fc{\ve{\wh \Si - \Si}_F}{\de}.$$
($\ve{\sin \Te(\wh V, V)}_F$ has some definition as a matrix, but I think you can interpret the LHS as the sin of the angle between the spaces.)

## Proof

References are to Stewart and Sun.

1.  First, define the canonical angles and relate them to the projection matrix. The largest canonical angle can be thought of as the distance between the 2 subspaces. However, a single angle doesn't characterize the positioning of the 2 subspaces. There are as many canonical angles as dimensions in the subspace.
	
	**Definition** (Theorem I.5.2). Let $X_1,Y_1\in \C^{n\times l}$ have orthonormal columns, $X_1^{\dagger}X_1=I$, $Y_1^{\dagger}Y_1=I$
	
	* If $2l\le n$, there are $Q,U_{11}, V_{11}$ (i.e., a change of basis on either side) such that 
	\begin{align}
	QX_1U_{11} &= \colthree IOO\\
	QY_1V_{11} &= \colthree \Ga \Si O
	\end{align}
	where $\Ga, \Si$ are positive diagonal. The diagonal of $\Si$ are the sines of the canonical angles, and $\Ga$ are the cosines.
	* If $2l>n$, then the matrices are $\colthree{IO}{OI}{OO}$ and $\colthree{\Ga O}{O I}{\Si O}$.
	
	*Proof*. The CS decomposition block-diagonalizes a matrix with block-diagonal unitary matrices: $\diag(U_{11},U_{22})^{\dagger} W \diag(V_{11},V_{22}) =\mattn{\Ga}{-\Si}O{\Si}{\Ga}OOOI$ where $U_{11}$ is $l\times l$, $2l\le n$, and the partition is $l,l,n-2l$. Use the CS decomposition on $X^{\dagger}Y$.
	
	Use the CS decomposition to make 
	
	**Lemma**. Let $P_X=XX^T$, $P_Y=YY^T$ be the projections. Let $k=\min \{l,n-l\}$. Then 
	
	1. Singular values of $P_X(1-P_Y)$ are $\si_1,\ldots, \si_k,0,\ldots, 0$. 
	2. Singular values of $P_X-P_Y$ are $\si_1,\si_1,\ldots, \si_k,\si_k,0,\ldots$.
	
	*Proof*. Change into the basis above.
2. Consider the linear operator $T:X\mapsto AX-XB$. 

    * The eigenvalues are $L(T)=L(A)-L(B)$. Thus its conditioning (and invertibility) is related to how close the eigenvalues of $A,B$ are.
	* Define $sep_{\ved}(L_1,L_2) = \inf_{\ve{P}=1}\ve{T(P)}$.
	* (Theorem V.3.1) We have $sep_F(L,M) = \min |L(L) - L(M)|$.
	* (Lemma V.3.5) Considering the condition number, if $AX-XB=C$, $\ve{A}\le \al$, $\ve{B^{-1}}^{-1}\ge \al+\de$, then $\ve{X}\le \fc{\ve{C}}{\de}$.
3.  Relate the canonical angle to Sylvester's equation.

    *   (Theorem V.3.4) If $\coltwo{X_1^{\dagger}}{X_2^{\dagger}} A (X_1\,X_2) = \diag(L_1,L_2)$, letting $R=AZ-ZM$, supposing $L(M)\subeq [\al,\be]$, $L(L_2)\subeq \R\bs [\al-\de, \be+\de]$, 
		\begin{align}
		X_2^{\dagger}A &= L_2X_2^{\dagger}\\
		X_2^{\dagger}(AZ-ZM) &= L_2 X_2^{\dagger} Z - X_2^{\dagger} ZM.
		\implies \ve{\sin\Te[R(X_1),R(Z)]} = \ve{X_2^{\dagger} Z} \le \fc{\ve{R}}{\de}
		\end{align}

(Can be generlized to other norms. More involved---need to show existence of fixed point by a contractive iteration. V.2.1, V.2.11.)

## Generalization

**Theorem**: Let $A$ have eigenvalues, vectprs $\la_i, v_i$, and $A+E$ have eigenvalues, vectors $\wh \la_i, \wh v_i$. Suppose $\la_s-\ve{E}_2>\la_t$. Then 
$$\sin \angle' (\spn (\wh v_1, \ldots, \wh v_s), \spn (v_1,\ldots, v_{s+t})) \le \fc{ve{E}_2}{\la_s-\ve{E}_2 - \la_t}$$
where $\angle'(U,V)$ is asymmetrically defined as 
$$
\max_{u\in U}\min_{v\in V} \angle(u,v).
$$

*Proof*. Note that $X, Y$ don't have to be the same dimension in the above. 

Consider $(I-P_X)P_Y$ where $X$ has more columns than $Y$, $m>l$. Add in $m-l$ columns from $Y$, that are orthonormal to the columns of $X$. Then apply the theorem with $X,Y$ having the same dimension, noting we have $m-l$ extra 0's. These angles are now interpreted as the angle between $X$ and the projection of $X$ to $Y$. (Abusing notation and identifying subspaces with matrices.)

Now the rest of the proof goes as in 3.4. We include the perturbation part. Break up int
$$
L_{2.2} X_{2.2}^{\dagger}
$$

For simplicity consider $A$ symmetric. (Otherwise, consider $\matt OA{A^{\dagger}}O$.) Let $\wh A$ be diagonalized by $\wh X_1,\wh X_2$ (first $s$ eigenvectors). Let $\wh A+E=A$ be diagonalized by $X_1,X_{2.1},X_{2.2}$ (first $s$, next $t-s$, others). We have
\begin{align}
L_{2.2}X_{2.2}^{\dagger} \wh X_1 - X_{2.2}^{\dagger}\wh X_1 \wh X_1^{\dagger} (A+E) \wh X_1 &= X_{2.2}^{\dagger} (A\wh X_1 - (A+E) \wh X_1) \\
&=X_{2.2}^{\dagger} (-E\wh X_1)\\
\implies \ve{X_{2.2}^{\dagger}\wh X_1} & \le \fc{\ve{E}}{|\si_s-\si_{t+1}|}.
\end{align}

# Weyl's Theorem

# Wedin's Theorem

(Davis-Kahan for $r=s=1$.)

Let $v_1(A)$ be the top eigenvector of $A$. If $\de=|\la_1(A)-\la_2(A)|$, then $\sin(\angle (v_1(A), v_1(A+E)))\le \fc{\ve{E}_2}{\de}$.

<!--?? What's the analogue of this for subspaces? Ex. $\la_1,\ldots, \la_c$ large and $\la_{c+1}$ small.-->


# Other

* [singular vectors under random perturbation](https://arxiv.org/pdf/1004.2000.pdf)
