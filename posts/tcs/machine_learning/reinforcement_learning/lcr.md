---
title: Linear convex regulator
published: 2016-12-14
modified: 2016-12-14
tags: none
type: summary
showTOC: True
---

Project evolved from [Continuous MDP](continuous.html).

# Linear quadratic regulator

The linear quadratic regulator is
\begin{align}
\dot x & = Ax + Ba = f(x,a)\\
r(x,a) & = -c(x,a) = -\rc2 x^TQx - \rc 2 a^Ta\\
\pat{Total reward} &= \int_0^T r(x(t), a(t))\,dt.
\end{align}
The optimal action (for fixed horizon $T$, take $T= \iy$ to get the infinite-horizon case) is given by 
$$
a = -P_{t}x
$$
where $P_{t}$ satisfies the matrix Riccati equation.
For the infinite horizon case, take $T=\iy$ and find that $a=-Px$ where 
<!-- , and $P_{-\iy}$ is the steady-state solution, which can be solved by solving -->
$P$ is the solution to an algebraic Riccati equation, which has an expression in terms of eigenvalues of $\matt{A}{BB^T}{Q}{-A^T}$.

# Linear convex regulator

Generalize this to 
\begin{align}
\dot x & = Ax + Ba = f(x,a)\\
r(x,a) & = -c(x,a) = -g(x) - a^Ta\\
\pat{Total reward} &= \int_0^T r(x(t), a(t))\,dt.
\end{align}
For example, take $g$ to be a convex function.

Idea: Approximate $g$ locally with a quadratic function and then make the action that optimizes the linear quadratic system.

# Problem

The starting point is the linear quadratic regulator, which is well-understood. The linear quadratic regulator is (here $x\in \mathbb R^n, a\in \mathbb R^k$)
\begin{align}
\dot x & = Ax + Ba = f(x,a)\\
r(x,a) & = -c(x,a) = -\frac12 x^TQx - \rc2 a^Ta\\
x(0) &= x_0\\
V_t(x,a(\cdot)) &= \int_t^T r(x(t), a(t))\,dt, \quad x(t) = x, \dot x = f(x,a).
\end{align}
The problem to find the function $a(t)$ that maximizes $V_{t}(x,a)$. Especially we care about when $T\to \iy$. There are two ways to solve this problem:

1.  Use Pontryagrin's maximal principle to write this as a Hamiltonian system. One can show the optimal control has the form $a(t) = -P(t)x(t)$. Get a differential equation in $P(t)$ which is the matrix Riccati equation.
    
	For infinite-horizon, the optimal control is $a= -Px$ independent of time. (Reparameterizing $[0,\iy)$ as $(-\iy, 0]$, the solution $P$ is the limit $\lim_{t\to \iy}P(-t)$. <!-- can be solved for explicitly. Then $a=-Px$ is the optimal action when the time horizon is infinite.-->
2.  Use the Bellman-Jacobi-Hamilton equation. Let $v(x,t) = \max_{a(\cdot)} V_{t}(x,a(\cdot))$. Then $v$ satisfies $v_t + \max_a [r(x,a) + (\nabla_x v)^T f(x,a)]=0$. $v(x,t)=-x^TK(t)x$ is quadratic in $x$, $a$ is linear in $x$, and we also get a matrix Riccati equation in $K$. 
    
	For infinite-horizon, reparameterizing $[0,\iy)$ as $(-\iy, 0]$, the solution $v$ is a steady-state solution, $\max_a [r(x,a) + (\nabla_x v)^T f(x,a)]=0$.

We want to generalize $\rc 2 x^TQx$, e.g. to $g(x)$. Suppose that $g$ is convex. In general it's infeasible to solve for the optimal action (you can only numerically approximate the solution, which is infeasible in high dimension); the question is whether we can find a simple policy $a$ that approximates the optimal action (e.g. up to a constant factor depending on properties of $g$). For example $a(x)$ could be chosen based on a quadratic approximation of $g$. For a particular choice of $a(x)$, the value satisfies
$$ -g(x) - \rc2 a^Ta + (\nb_x v)^T f(x,a) = 0
$$
and for the optimal choice $a(x) = B^T(\nb_x v)$ the value satisfies
$$
-g(x) + \rc 2 (\nb_x v^*)^T BB^T (\nb_x v^*) + (\nb_x v^*)^T Ax=0
$$
We'd have to relate $v$ and $v^*$ in some way.


# Email

Hi ...,

I'm trying to develop a way to approximate an optimal control for some general class of control problems. This involves understanding some differential equations. I don't really have intuition or have a good idea of whether what we're trying to do is feasible. Would you have time to talk? Just getting some qualitative understanding or knowing what tools are available would be great!

