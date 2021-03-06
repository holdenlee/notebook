---
title: Recursive Fourier Sampling
published: 2016-02-29
modified: 2016-02-29
tags: none
type: concept
understanding: 1
---

#Definition

##FS

$FS_n:B^{2^{n+1}} \to \{0,1,*\}$ is defined by
$$
FS_n(f,g)=\begin{cases}
g(s),&\text{if }\exists s\in B^n, f(x)=x\cdot s\\
*,&\text{else.}
\end{cases}
$$
$FS_n^g$ is where $g$ is fixed.

##RFS

Define by recurrence

\begin{align}
RFS_{n,1}(s,g)&=g(s)\\
RFS_{n,h}&: B^{n2^{n(h-1)} +\sumo j{h-1}} \to \{0,1,*\}\\
RFS_{n,h}(R_0,\ldots, R_{2^n-1},g) &=\begin{cases}
g(s),&\exists s\in B^n, \forall \si\in B^n, RFS_{n,h-1}(R_\si)=\si \cdot s\\
*,&\text{else}.
\end{cases}\\
\pat{Example}\; RFS_{n,2}(R_0,\ldots, R_{2^n-1},g) &=\begin{cases}
g(s),&\exists s\in B^n, \forall \si\in B^n, g(R_\si) = \si \cdot s\\
*,&\text{else}.
\end{cases}
\end{align}
