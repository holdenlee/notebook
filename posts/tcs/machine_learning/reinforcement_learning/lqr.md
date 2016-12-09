---
title: Linear quadratic regulator
published: 2016-12-09
modified: 2016-12-09
tags: control theory
type: topic
showTOC: True
---

We derive the solution to the linear quadratic regulator problem in the continuous, infinite-horizon setting. *Handwavy parts are in italics*. 

References: Ch. 5 of [course notes](https://math.berkeley.edu/~evans/control.course.pdf) and [Riccati equation paper](http://www.kybernetika.cz/content/1973/1/42/paper.pdf). Wikipedia on [LQR](https://en.wikipedia.org/wiki/Linear%E2%80%93quadratic_regulator) and [Riccati](https://en.wikipedia.org/wiki/Algebraic_Riccati_equation).

The problem:

\begin{align}
\dot x & = Ax + Ba = f(x,a)\\
r(x,a) & = -c(x,a) = -\rc2 x^TQx - a^Ta\\
\pat{Total reward} &= \iiy r(x(t), a(t))\,dt.
\end{align}
Here $Q$ is positive definite. Write $Q=C^TC$.

# Solve the Hamiltonian

We write down the corresponding Hamiltonian system and then solve it. (See [Control theory](control_theory.html) Section 5.)
\begin{align}
H(x,a) &= f(x,a)^T p + r(x,a) = f(x,a)^T p - \rc2 x^TQx - a^Ta\\
\dot x &= \nb_p H(x(t),p(t),a(t)) = Ax + Ba \\
\dot p &= -\nb_x H(x(t),p(t),a(t)) = -A^T p + Qx\\
a &= \amax_a H(x(t),p(t),a(t))\\
\iff 0 &= \nb_a H(x(t),p(t),a(t))\\
\iff B^T p - a &=0\\
\iff a &= B^T p
\end{align}
We get
\begin{align}
\dot x &= Ax + BB^Tp\\
\dot p &= -Qx + A^Tp\\
\ddd t \coltwo xp &= \matt{A}{BB^T}{-Q}{A^T} \coltwo xp.
\end{align}

# The algebraic Riccati equation

*Look for a solution in the form $p=-Px$.* (Note that in the finite-horizon setting, solving the Hamiltonian system with the appropriate boundary condition $p(T)=0$ gives that the solution is $p=-P(t)x$ where $P(t)$ satisfies a differential equation called the Matrix Riccati differential equation. In the infinite-horizon setting, $P$ doesn't change with time and we get a single $P$.)

Substituting $p=-Px$, the system becomes 
\begin{align}
-(PA - PBB^TP) x &= -P \dot x = \dot p = (Q+A^TP)x\\
-PBB^TP + PA + A^TP + Q &= 0 
\end{align}
This is called the [algebraic Riccati equation](https://en.wikipedia.org/wiki/Algebraic_Riccati_equation).

# Solve the Riccati equation

Write the Riccati equation as (set $Q=C^TC$)
$$
(-P\; I) \matt{A}{-BB^T}{-CC^T}{-A^T}\coltwo IP = 0
$$
Let $K=A-BB^TP$. This is
$$
\ub{\matt{A}{-BB^T}{-C^TC}{-A^T}}M\coltwo IP = \coltwo K{PK} = \coltwo IP K.
$$
*Assume $K$ is diagonalizable*. Write $K=XDX^{-1}$. 
\begin{align}
M\coltwo IP &= \coltwo X{PX} DX^{-1}\\
M\coltwo{X}{PX} &= \coltwo{X}{PX}D.
\end{align}
Hence the columns of $\coltwo{X}{PX}$ are eigenvalues of $M$.

So the $P$ that solve the algebraic Riccati equation are $P=YX^{-1}$ where the columns of $\coltwo XY$ are $n$ of the eigenvectors of $M$.

# Choose the stable solution

First some definitions.

* $\la$ is **stable** if $\Re \la<0$. $A$ is stable if all eigenvalues of $A$ are stable. (This means that any solution to $\dot x = Ax$ has $x(t)\to 0$.)
* $\la$ is a **controllable** eigenvalue for $(A,B)$ if for all row eigenvectors of $A$ corresponding to $\la$ ($wA=\la w, w\ne 0$), $wB\ne 0$. $(A,B)$ is controllable if all its eigenvalues are controllable. (Equivalently, $(A^T,B^T)$ is observable.)
* $(A,C)$ is **observable** if for all (column) eigenvectors of $A$, $Cz\ne 0$.
* $(A,B)$ is **stabilizable** if every unstable eigenvalue is controllable. (This is true for e.g. random matrices, because w.p. 1 a random vector is not in the left nullspace of $B$.) Equivalently, there exists $L$ (with real entries) such that $A+BL$ is stable.

**Theorem**. The following are equivalent.

1. There exists a stable solution $P$ to the algebraic Riccati equation, giving the solution $p = -Px$, $\boxed{a = B^Tp = -B^TPx}$.
2. All eigenvalues satisfy $\Re \la \ne 0$ and $(A,B)$  is stabilizable.

The stable solution is unique.

*Proof*. 

From the previous section, a solution $P$ has to be in the form $Y^{-1}X$ where $X, Y$ are such that $\coltwo XY$ are the eigenvectors corresponding to the stable eigenvalues. Note that the eigenvectors come in $\pm$ pairs because letting $J=\matt O{-I}{I}O$, $M^T = J M J$, $M^T \coltwo{-y}x = -JM\coltwo xy$. ($M$ is a [Hamiltonian matrix](https://en.wikipedia.org/wiki/Hamiltonian_matrix), i.e. $JM$ is symmetric.) So exactly $n$ of the $2n$ eigenvalues are stable, which is the unique choice for $\coltwo XY$ up to permutation.

1. $\Rightarrow$:  Take $L=-B^TP$. Then $A+B(-B^TP)=K$ is stable. (Its eigenvalues are exactly the eigenvalues of $M$.)
2. $\Leftarrow$: We just have to check that $Y$ is invertible, which is implied by the stabilizable condition. *Proof omitted*.

