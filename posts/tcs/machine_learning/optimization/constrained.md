---
title: Constrained optimization
published: 2016-04-28
modified: 2016-04-28
tags: convex optimization
type: topic
showTOC: True
---

# Setup

Consider $\min_{Ax=b}f$.

* How can we reduce this problem to one without inequality constraints? Let $x_0+Fu$ parametrize $\set{x}{Ax=b}$.
* Why wouldn't you want to do this? It can be inefficient---somehow the equality constraint captures more of the problem's structure.

Give the example for quadratic minimization. What do the KKT equations say?
\begin{align}
\min_{Ax=b} \rc 2 x^T P x + q^T x + r & \\
Px^* + q + A^T \nu^*&=0\\
\iff \matt{P}{A^T}{A}0 \coltwo{x^*}{\nu^*} &= \coltwo{-q}{b}.\label{eq:kkt-mat}
\end{align}
This is unbounded below if there exist $v,w$ such that $Pv+A^Tw=0$, $Av=0$, $-q^Tv+b^Tw>0$ (left-multiply by $(v^T\,w^T)$) to see that the equation above doesn't have a solution).

Recall the dual function. Why do we care about it?
$$g(\la,\nu) = \min_x f+\nu^T (Ax-b) = -\nu^Tb - f^*(-\nu^TA), \qquad f^*(y)=\max y^Tx - f(x).$$
Equality constraints disappear in the dual. If the dual is nice, we can just solve an unconstrained problem $\max_{\la \ge 0} g(\la,\nu)$.

# Newton

## Feasible start

Describe the Newton method starting with a feasible $x, Ax=b$. The Newton step is the minimizer for the quadratic approximation under the constraint. (Finding the minimum of a quadratic amounts to solving a linear equation.) Using \eqref{eq:kkt-mat}
$$\matt{\nb^2 f}{A^T}A0 \coltwo{\De x_{nt}}w = \coltwo{-\nb f}{0}.$$
Define $$\la(x) = (\De x_{nt}^T \nb^2 f \De x_{nt})^{\rc 2}$$.

Note this *is* normal Newton if you use a parametrization.

(Convexity makes the KKT matrix invertible.)

## Infeasible start

Describe the infeasible start Newton method. Approximate $f$ by a quadratic using $P=\nb^2 f$ in $\eqref{eq:kkt-mat}$ and find $\De x_{nt}$ so that $x+\De x_{nt}$ satisfies the KKT conditions. The equation for $\De x_{nt}$ is
$$\matt{\nb^2 f}{A^T}A0 \coltwo{\De x_{nt}}w = \coltwo{-\nb f}{b-Ax}.$$

Note here we're just updating $x$ by solving for $\De x_{nt}$. Ech time $w$ is treated just as an auxiliary variable. But $w$ comes from the dual solution $\nu$. Can we look at $(x,\nu)$ together as a primal-dual pair and update both of them?

Let the (dual and primal) residual be (recall KKT says we want $\nb f + A^T\nu =0$)
\begin{align}
r &= (\nb f + A^T \nu, Ax-b).
\end{align}
Instead of minimizing $f$, we minimize the residual for the KKT conditions. The residual has a component for minimizing $f$, and a component for trying to satisfy $Ax=b$.

Here is the algorithm.

1. Start with $x$ (not necessarily satisfying $Ax=b$).
2.  Calculate $\De x_{nt}$, keeping track of $\nu$. Backtrack (by multiplying by $\be$) until you find $t$ such that
    $$\ve{r(x+t\De x_{nt}, \nu + t\De \nu_{nt})}_2\le (1-\al t) \ve{r}_2.$$
3.  Repeat until $Ax=b$, $\ve{r}_2\le \ep$. 
