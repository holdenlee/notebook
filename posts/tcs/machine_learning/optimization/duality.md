---
title: Duality
published: 2016-03-04
modified: 2016-03-04
tags: duality
type: concept
showTOC: True
---

# Summary

## Duality

These problems are dual.
\begin{align}
\min_{f_i\le 0, Ax=b} f & \lra \max_{\la \ge 0,\nu} \ub{\min_x \ub{f+\la^T\vec{f} + \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}\\
\max_{f_i\ge 0, Ax=b} f & \lra \min_{\la \ge 0,\nu} \ub{\max_x \ub{f+\la^T\vec{f} - \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}
\end{align}
In (1) the $f_i$ are convex; in (2) they are concave. In (1), we have dual$\le$primal:
$$
\min_{f_i\le 0, Ax=b} f \ge \max_{\la \ge 0,\nu} \ub{\min_x \ub{f+\la^T\vec{f} + \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}
$$
Note: $f^*(y)=\sup_x y^Tx - f(x)$ is the conjugate or **Legendre transform**. It is convex, and for convex functions, the double conjugate is the original function.

**Slater's constraints**: Equality holds if the problem is strictly feasible: there exists $x$ such that $f_i(x)<0, Ax=b$. Linear inequalities are allowed to be non-strict, $f_i(x)\le 0$.

## KKT conditions

The KKT conditions are (here $h=Ax-b$)

1. (derivative 0) $\nb f+\sum \la_i \nb f_i + \nu^TA=0$.
2. (constraints satisfied)  $\la \ge 0, f_i\le 0, h_i=0$.
3. (complementary slackness) $\la f_i=0$.

Interpretation: 

* If $x,\la,\nu$ satisfy the conditions, then $x$ and $(\la,\nu)$ are primal and dual optimal (and $x$ is a minimizer of $\cL(x,\la,\nu)$) and the optimal values are equal.
* Conversely, if $x$ is any primal optimum, $(\la, \nu)$ is any dual optimum, and the optimal values are equal, then KKT holds. (Proof: $f(x) = g(\la,\nu) \le f(x)$.)
* If Slater's condition is satisfied, $x$ is optimal if and only if there exist, $\la,\nu$ that satisfy KKT conditions.

<!-- (If $h_i\ne 0$, 
If $f_i(x)>0$, then it would have been strictly better for P1 to choose $\la=0$. If -->

## Examples

1.  Linear programming (equality when there exists a feasible solution)
    \begin{align}
	\min_{Ax=b,x\ge 0} c^Tx &= \max_{\la\ge 0, A^T\nu\ge -c} -b^T\nu\\
	\min_{Ax\le b} c^Tx &= \max_{\la\ge 0, A^T\nu=-c} -b^T\nu.
	\end{align}

### Dual functions

(Check this.)

Function|Dual
---|---
$u\ln u$|$e^{v-1}$
$\ve{x}$|$\begin{cases}0,&\ve{y}_*\le 1\\ \iy,&\text{else}\end{cases}$
$\ln \det(X^{-1})$|$\ln \det(-Y)^{-1}-n$

# Proofs and intuition

## Weak duality

Given a dual feasible $\la,\nu$, choose $x=x^*$. Then
$$
g(\la,\nu) \le f(x^*) + \sum \la_i \ub{f_i(x^*)}{\le 0} + \nu^T \ub{(Ax^*-b)}{=0}\le f(x^*).
$$

(Convexity not needed here.)

## Strong duality

1.  Express in terms of graphs. Let
    \begin{align}
	\mathcal G &= \{(\vec f, \vec h, f)\}\\
	\mathcal A &= \mathcal G = (\R_+^m \times \{0\} \times \R_+).
	\end{align}
	Then
	\begin{align}
	p^* &= \inf_{(u,v,t)\in \mathcal G, u\le 0, v=0} = \inf_{(0,0,t)\in \mathcal A} t\\
	g(\la,\nu) &= \inf_{(u,v,t)\in \mathcal G\text{ (or }\mathcal A)} \an{(\la,\nu, 1),(u,v,t)}.
	\end{align}
	Each value of $g(\la,\nu)$ gives the $t$-intercept of a nonverticl supporting hyperplane $\an{(\la,\nu,1), (u,v,t)}\ge g(\la,\nu)$.
2.  Weak duality (again). Set $(\la,\nu)=(0,0)$ to get $g(0,0) = \inf_{(u,v,t)\in \mathcal A} t \le \inf_{(0,0,t)\in \mathcal A} = p^*$.
3.  <!--We've interpreted $p^*$ as an "extreme" point of $\mathcal A$. Now we reinterpret the dual optimum.--> 
	The idea is that there exists a supporting hyperplane tangent at $(0,0,p^*)$. To make this precise we separate $\mathcal A$ from a ray
	$$ \mathcal B = \set{(0,0,s)}{s<p^*}.$$
	Note $\mathcal A,\mathcal B$ are disjoint.
	There is a separating hyperplane
	$$ (u,v,t)\in \begin{cases}\mathcal A\\\mathcal B\end{cases} \implies \wt \la^T u + \wt \nu^T v + \mu t \begin{cases}\ge \\ \le \end{cases} \al.$$
	By definition of $\mathcal A$, $\wt \la \ge 0, \mu\ge 0$. The second part in the equation gives $\mu p^*\le \al$. 
4.  Case $\mu>0$: Going back to the definition of $\mathcal A$, we get $L(x,\wt \la/\mu, \wt \nu/\mu)\ge p^*$. Then $g(\wt \la/\mu, \wt \nu/\mu) \ge p^*$.
5.  Case $\mu=0$: Applying the hyperplane inequality to the point $\wt x$ satisfying Slater, $\sumo im \wt \la_i f_i(\wt x)\ge 0$. Get $\wt \la=0$, $\wt \nu\ne 0$. Assume $\rank A=p$ (what if this is not true?) Then there are points with $\wt \nu^T (Ax-b)<0$, contradiction. (Slater shows the hyperplane cannot be vertical.)

(I don't have intuition for this proof.)

## Intuition

Think of the dual as (1) relaxing the strict conditions that $f_i\le 0$ and (2) being a game. If you fail to meet the constraint $f_i\le 0$, you are penalized by cost $\la_if_i$ (and you gain money from constraints that are met). The adversary first sets "shadow prices" $\la_i,\nu_i$, the cost for violating the constraints, and then you choose $x^*$. Duality says you can't do better in this game. (You can do just as well by choosing your original $x^*$; this is weak duality.)

Let $p^*(u,v)$ be the optima under constraints $f_i\le u_i,h_i=v_i$. The sensitivity to the constraints are given by the dual optima. We have the following (the derivative equations hold if $p^*$ is differentiable).[^f1]
\begin{align}
p^*(u,v) &\ge p^*(0,0)-\la^{*T} u - \nu^{*T} v\\
\pd{p^*}{v_i} &= -\nu_i\\
\pd{p^*}{u_i} &= -\la_i.
\end{align}

[^f1]: Otherwise maybe an inequality? Multiple dual optima are possible.

# Applications

von Neumann minimax theorem. 
$$
\min_{1^T p = 1,p\ge 0} \max_{1^T q =1,q\ge 0} p^TAq = \max_q\min_p...
$$
Proof: Write the LHS as $\min_{p\ge 0, 1^Tp=1, P^Tp \le t\one}t$ and use strong duality.

# Review

1. Give the dual problems for $\min_{f_i\le 0, Ax=b}f$. Ditto for $f_i\ge 0$.
1. What is weak duality? Prove it.
1. Give Slater's conditions for equality (strong duality).
1. Give the KKT conditions.
1. What is duality for linear programming?
1. Give intuition for duality. Explain what "shadow prices" are. What quantities represent sensitivity to constraints?

# Questions

If $x$ is a primal optimal, is there necessarily a $(\la,\nu)$ that satisfies the equations? I think if $x$ is primal optimal and $(\la,\nu)$ is dual optimal, $(x,\la,\nu)$ does not necessarily satisfy. Check this.
