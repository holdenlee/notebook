---
title: (HKY17) Hyperparameter Optimization - A Spectral Approach
published: 2017-07-19
modified: 2017-07-19
tags: hyperparameters
type: paper
showTOC: True
---

The main theorem (Alg. 1, Thm. 6) is a theorem on learning Fourier-concentrated functions with much better sample complexity than [LMN93], using compressed sensing applied to orthonormal polynomials. Apply this theorem to the loss as a function of hyperparameters (A.g. 2, Harmonica). (Note this is heuristic.)

# Compressed sensing for orthonormal polynomials

An orthonormal family with respect to distribution $D$ has $\EE_D[\psi_i (X) \psi_j(X)]=\de_{ij}$. 

* $s$-sparse: $L_0(f)\le s$
* $(\ep,d)$ concentrated: $\ve{f - \pi_{\{\psi_{i}\}_{i\in S}}(f)}_2\le \ep$. 
* $(\ep,d,s)$-bounded: additionally, $\ve{f}_1\le s$.
* Note we can approximate $L_1(f)\le s$ to $\ep$ with $L_0(g)\le \fc{s^2}{\ep}$. (Sampling. Cf. Barron proof)

LASSO: With appropriate $\la$, 
$$
\min_{x\in \R^n} [\ve{x}_1 + \la \ve{Ax-y}_2^2]
$$

For $z^1,\ldots, z^m\sim D$, $A_{ij}=\psi_j(z^i)$, $y=Ax+e$, $\ve{e}_2\le \eta\sqrt m$, $x^*$ solving LASSO,
$$
\Pj(\ve{x-x^*}_2\le C \fc{\si_s(x)_1}{\sqrt s}+d\eta) \ge 1-\de
$$
where $\si_s(x)_1=\min\set{\ve{x-z}_1}{z\text{ is s-sparse}}$, $c,d$ constants, with $m\ge CK^2 s \poly\log(K,s,N,\rc{\de})$ samples.

Apply for low-degree recovery: if $f$ is ($\ep,d,s$)-bounded, then using this finds $g\equiv_\ep f$ in time $O(n^d)$, with $T=\wt O(K^2s^2 \ln N/\ep)$ samples. (? $\ep$ outside)

(LMN93 needs $\Om\pf{NL_\iy(f)^2}{\ep}$ samples.) (? What is $N$ here? Number of orthonormal polys. Shouldn't it be $n^d$?)

# Harmonica

Apply in stages, with some degree $d$ and sparsity $s$. Note this can involve at most $ds$ variables. Suppose the approximation $g$ to $f$ only involves variables in $J$.

Take the best $t$ solutions $x_i*$ to $g$ on $J$, and now apply to $\rc t \sumo it f_{J \leftarrow x_i^*}(x)$.

# Questions

* Why does multiple stages help?
