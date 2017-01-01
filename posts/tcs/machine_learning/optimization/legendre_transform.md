---
title: Legendre transform
published: 2016-12-28
modified: 2016-12-28
tags: convexity, duality
type: notes
showTOC: True
---

[Wikipedia](https://en.wikipedia.org/wiki/Legendre_transformation)

[Reference](http://www.maths.manchester.ac.uk/~goran/legendre.pdf)

# Definition

The **Legendre transform** (or conjugate dual) of a function $f:X \to \R$ is defined as[^f1]
$$
f^*(y) = \sup_{x\in \Om} [\an{y,x} - f(x)]
$$
$f^*$ is a function $Y\to \R$ where $Y=\set{y}{\sup_{x\in X} [\an{y,x} - f(x)]<\iy}$.

[^f1]: This definition is suited for convex functions. The definition suited for concave functions is $$f^(y) = \inf_{x\in \Om} [\an{y,x} - f(x)].$$

**Proposition**. $f^*$ is convex.

*Proof*. $f^*$ is a sup of linear (hence convex) functions.

Note that if $f$ is differentiable, the argmax satisfies $f'(x) = y$.

**Theorem**. If $f$ is convex with domain $X$ that is compact (and convex), then $f=f^{**}$.

(Does this work without $X$ being compact?)

*Proof*. We have
$$
f^{**}(x') = \sup_{y\in Y} \inf_{x\in X} \an{x',y}-\an{y,x} + f(x).
$$
We want this to 
$$
=\inf_{x\in X} \sup_{y\in Y}  \an{x',y}-\an{y,x} + f(x).
$$
$\le$ is clear (it's better to go second). We want to show $\ge$ using minimax. A technical point is that we have to restrict to compact sets by adding a penalty term. Take compact sets $\bigcup K_i = \R^n$
\begin{align}
&= \lim_{i\to \iy}
\sup_{y\in K_i} \inf_{x\in X} \an{x',y}-\an{y,x} + f(x)\\
& = \lim_{i\to \iy}
\inf_{x\in X} \sup_{y\in K_i} \an{x'-x,y} f(x)\\
& = \lim_{i\to \iy} \inf_{x\in X} f(x) + (\sup_{y\in K_i} \an{x'-x,y}).
\end{align}
Thus first player would choose $x=x'$, giving the value $f(x')$.

# Appendix: von Neumann minimax

Let $K\subeq \R^n$, $L\subeq \R^m$ be compact and convex. Let $f:K\times L\to \R$ where $f$ is concave in $x$ and convex in $y$. Then there exists $(x_*,y_*)\in K\times L$ such that for all $x\in K$, $y\in L$, 
$$
f(x,y^*) \le f(x_*,y_*) \le f(x_*,y).
$$
