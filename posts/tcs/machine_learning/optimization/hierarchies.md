---
title: Hierarchies of convex relaxations
published: 2016-12-28
modified: 2016-12-28
tags: convex relaxation, Sherali-Adams, Lasserre
type: notes
showTOC: True
---

See also [SoS](../../complexity/sos.html).

# Sherali-Adams

The $k$-level Sherali-Adams hierarchy $SA(k)$ is a LP with variables $\mu_S(x_S)$, $x_S\in \{-1,1\}^{|S|}$ specifying marginals over all $S\subeq [n]$, $|S|\le k$. $\mu_S$ satisfies consistency:
$$
\forall |S\cup T|\le k, 
\mu_S[\{x_{S\cap T}=\al\}] 
= \mu_T[\{x_{S\cap T} = \al\}].
$$

The conditioning operation - sampling according to $\mu_{\{v\}}$ - defines a map from solutions of the $k$th level to solutions of the $k-1$th level.
$$
\mu_S(x_S) = \mu_{S\cup \{v\}}(x_{S\cup v}).
$$

# Lasserre

LAS($k$). This is a SDP:
$$
\forall |S\cup T|\le k, \mu_{S\cup T}(x_S=\al, x_T=\be) = \an{v_{S,\al}, v_{T,\be}}.
$$

