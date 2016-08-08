---
title: Approximation theory and approximation practice
published: 2016-08-08
modified: 2016-08-08
tags: none
type: notes
---

# 1 Introduction

# 2 Chebyshev points and interpolation

Define **Chebyshev points** of parameter $n$ to be $x_j$ where
\begin{align}
\te_j &= \fc{j\pi }n\\
z_j & = e^{\pi j/n}, &0\le j\le n\\
x_j & = \Re (z_j) = \fc{z_j+z_j^{-1}}2 = \cos\te_j.
\end{align}
Write
```matlab
xx=chebpts(n+1)
```
(Note: from now on we will reverse the order of the $x_j$, to go from left to right.)

The **Chebyshev interpolant** of $(f_j)$ is the unique polynomial of degree ($\le$) $n$ going through points $x_j,f_j$. To construct the interpolant for a function,
```matlab
x = chebfun('x');
f = (function of x);
p=chebfun(f,n+1); hold on, plot(p,'.-')
```
(Note: `x` is like a vector here. So you must write `.*` for multiplication, etc.) `.-` makes it point out the Chebyshev interpolation points.

# 3 Chebyshev polynomials and series

Define [Chebyshev polynomials](chebyshev.html).

The following are Chebyshev, Laurent, and Fourier expansions.
\begin{align}
f(x) &\approx \sumz kn a_kT_k(x), && x&\in [-1,1]\\
F(z) &= \rc 2 \sumz kn a_k(z^k+z^{-k}) & f(x)&=F\pf{z+z^{-1}}2&|z|&=1\\
\cF (\te) &\approx \rc 2 \sumz kn a_k(e^{ik\te} + e^{-ik\te})& \te&\in [-\pi,\pi]
\end{align}

One can expand a polynomial in Chebyshev basis using the FFT or Fast Cosine Transform.

Chebyshev series: If $f$ is Lipschitz continuous on $[-1,1]$, it has a unique representation
$$f(x)=\sumz k\iy a_k T_k(x),\quad a_k = \fc2\pi \int_{-1}^1 \fc{f(x)T_k(x)}{\sqrt{1-x^2}} \dx. $$

*Proof*.
\begin{align}
a_k &= \rc{2\pi i} \oint_{|z|=1} (z^{-1+k}+z^{-1-k})F(z)\,dz\\
&= \rc{\pi i} \int_{|z|=1} z^{-1}T_k(x) F(z)\,dz\\
&=-\rc{\pi}\fc{f(x)T_k(x)}{\Im z}\,dz & dx&=\rc 2 \pf{z-z^{-1}}{2z}dz = \rc2 i z^{-1}\Im z\\
&=\fc2\pi \int_{-1}^1 \fc{f(x)T_k(x)}{\sqrt{1-x^2}} \dx.
\end{align}

Orthonormality:
$$ \fc 2\pi\int_{-1}^1 \fc{T_l(x)T_k(x)}{\sqrt{1-x^2}} = \de_{kl}.$$

# 4 Interpolation, projection, and aliasing

There are 2 ways to approximate $f$ by a Chebyshev expansion.

1. Interpolation of Chebyshev points $p_n$
2. Truncation of Chebyshev expansion $f_n$

In computation, $p_n$ are usually almost as good and easier to evaluate.

**Theorem** (aliasing). $T_k$ takes the same value on the $(n+1)$-point Chebyshev grid as $T_m$, $m=|(k+n-1)\bmod{2n} - (n-1)|$. (i.e., $T_m$ takes the same value as $T_k$ with $k=2jn\pm m$.)

*Proof*. Look at $2n$th roots of unity.

**Theorem** (aliasing for Chebyshev coefficients). Let $a_k,c_k$ be Chebyshev coefficients of $f$ and $p_n$. Then 
\begin{align}
c_k &= \sum_{i\in \{2jn\pm k\}\cap \N} a_i.
\end{align}

So 
$$f(x)-p_n(x) = \sum_{k=n+1}^{\iy} a_k(T_k(x) - T_{m(k,n)}(x)).$$

In Chebfun, to get truncation, interpolation use
```matlab
a = chebpoly(f) % truncation/projection
fn = chebfun(f, 'trunc', n+1) % truncation
pn = chebfun(f, n+1)
c = chebpoly(pn) % interpolation
```

# 5 Barycentric interpolation formula

How to evaluate a Chebyshev interpolant?

* $O(n\ln n)$ for single point evaluation: Compute coefficients and use the series.
* $O(n)$ work, stable: Barycentric interpolation formula.

Lagrange interpolation:

\begin{align}
p(x) &= \sumz jn f_jl_j(x)\\
l_j(x) &=\fc{\prod_{k\ne j}(x-x_k)}{\prod_{k\ne j} (x_j-x_k)}
\end{align}
The computation of $l_j$ is unstable and takes $O(n^2)$ operations.

Modified Lagrange formula (first barycentric formula)
\begin{align}
p(x) &= l(x) \sumz jn \fc{\la_j}{x-x_j} f_j\\
l(x) &= \prod_{k=0}^{n} (x-x_k)\\
\la_j &= \rc{\prod_{k\ne j}(x_j-x_k)} = \rc{l'(x_j)}.
\end{align}
This takes $O(n)$ operations to evaluate. (Computing the weights takes $O(n^2)$ but only needs to be done once.)

**Theorem** (Barycentric interpolation formula).
$$p(x) = \left. \sumz jn \fc{\la_j f_j}{x-x_j} \right/ \sumz jn \fc{\la_j}{x-x_j}.$$

*Proof*. Note $\sumz jn l_j(n)=1$. so just replace the $l_j$ by $\fc{\la_j}{x-x_j}$ and then normalize afterwards.

For Chebyshev points $\la_j = (-1)^j \fc{2^{n-1}}{n} (1-\rc 2(j=0\text{ or }n))$. Obtain
$$p(x) = \left. \sumz jn' \fc{(-1)^jf_j}{x-x_k}\right/\sumz jn' \fc{(-1)^j}{x-x_k}
$$
where $\sum'$ means that the first and last terms are multiplied by $\rc2$.

*Proof*.
\begin{align}
l(x) &= (x-x_0)\cdots (x-x_n)\\
& = (z^{2n}-1)(z^2-1)(z^{-n-1}-1) \rc{2^{n+1}} & x=\fc{z+z^{-1}}2\\
&= \rc{2^n} \pa{\fc{x^{n+1}+x^{-(n+1)}}2 - \fc{x^{n-1}+x^{-(n-1)}}}\\
\la_j &=\rc{l'(x_j)}  = \fc{2^n}{T_{n+1}'(x_j) - T_{n-1}'(x_j)} = \fc{2^n}{2n(-1)^j(1+(j=0\text{ or }n))}
\end{align}
by using the recurrence relation to compute the derivatives.

This is stable, whereas polynomial interpolation via Vandemonde is exponentially unstable. 

Warning: 

* This is unstable for extrapolation. 
* The type 1 barycentric formula is stable. 
* The barycentric formulas are forward stable; the 1st barycentric formula is backwards stable. 
* Use the 1st formula for points far from Chebyshev.
* The 1st formula is not scale-invariant.

# 6 Weierstrass Approximation Theorem

**Theorem** (Weierstrass approximtion). A continuous function on $[-1,1]$ can be arbitrarily well-approximated in $L^{\iy}$ by polynomials.

*Proof*. Extend $f$ to be continuous with compact support. Take $f$ as initial data for $u_t=u_{xx}$. The solution is $f*e^{-\fc{x^2}{4t}}/\sqrt{2\pi t}$. For $t>0$ this is analytic and has uniformly convergent Taylor series.

Bernstein's proof is a discrete analogue replacing diffusion by a random walk.

**Theorem** (Mergelyan). If $f$ is continuous on compact simply connected $K\sub \C$ and analytic in $K^{\circ}$, then $f$ can be approximated on $K$ by polynomials.

# 7 Convergence for differentiable functions

(Bounded variation means $\ve{f'}_1<\iy$ where $f'$ is interpreted in the distributional sense.)

If $f^{(k)}, k\le v-1$ is absolutely continuous and $f^{(v)}$ has bounded variation, then 
\begin{align}
a_k &\le \fc{2V}{\pi k\fp{v+1}} &\le \fc{2V}{\pi (k-v)^{v+1}}\\
\ve{f-f_n}_\iy &\le \sum_{k=n+1}^\iy |a_k| \le \fc{2V}{\pi v(n-v)^v}\\
\ve{f-p_n}_\iy &\le \sum_{k=n+1}^{\iy} 2|a_k|\le \fc{4V}{\pi v(n-v)^v}
\end{align}
*Proof*. 
\begin{align}
a_k &= \rc{\pi i}\int_{|z|} f(\rc 2(z+z^{-1})) z^{k-1}\,dz\\
&=-\rc{\pi i} \int_{|z|=1} f'(\rc 2 (z+z^{-1}))\fc{z^k}{k}\dx\\
|a_k| &\le \fc{2}\pi \int_{-1}^1 |f'\Im\fc{z^k}{k}|\dx.
\end{align}
For $v>0$, integrate by parts $v+1$ times to get
$$(-1)^{v+1} \rc{\pi i}\int_{|z|=1} f^{(v+1)}(\rc 2 (z+z^{-1})) f_{v, k}(z)\dx$$
where $f_{0,k}(z) = \fc{z^k}{k}$ and $f_{n+1,k} = \int f_{n,k} \fc{1-z^{-2}}2$.

# 8 Convergence for analytic functions

If the analytic continuation of $f$ to the open Bernstein ellipse $\pa{z\mapsto \fc{z+z^{-1}}2}B_\rh$ satisfies $f\le M$, then 
\begin{align}
|a_k| &\le 2M\rh^{-k}\\
\ve{f-f_n}&\le \fc{2M\rh^{-n}}{\rh - 1}\\
\ve{f-p_n}&\le \fc{4M\rh^{-n}}{\rh - 1}.
\end{align}
*Proof*. $a_k = \ab{\rc{\pi i}\int_{|z|=\rh} z^{-1-k} F(z)\,dz}$.

Converse: If there exist $q_n$, $\ve{f-q_n}\le C\rh^{-n}$, then $f$ is continuable to the Bernstein ellipse $E_\rh$.

*Proof*. Write $f=q_0+(q_1-q_0)+\cdots$. Use the estimate $\deg p\le d\implies \ve{p}_{L^{\iy}(E_\rh)}\le \rh^d \ve{p}_{L^{\iy}[-1,1]}$. Proof: Let $q(z) = \fc{p(z)}{(z+\sqrt{z^2-1})^d}$. This is analytic on $\C\cup \{\iy\}\bs [-1,1]$. (Why is it well-defined?) (It is defined at $\iy$ because taking $z\leftarrow \rc z$ we get $\fc{p_{\text{rev}}(z)}{(1+\sqrt{1-z^2})^d}$.) The maximum is attained at the boundary $[-1,1]$ where the absolute value is 1. 

# 9 Gibbs Phenomenon

At discontinuities, the overshoot of a Chebyshev approximation does not $\to 0$ as $n\to \iy$.

For Chebyshev interpolants of $\sgn(x)$ on $[-1,1]$, 
\begin{align}
\lim_{n\to \iy,n\text{ odd}} \ve{p_n}_\iy &\approx1.282...\\
\lim_{n\to \iy,n\text{ even}} \ve{p_n}_\iy &\approx1.066...
\end{align}
For Chebyshev projections,
$$\lim_{n\to \iy} \ve{f_n} = \fc 2\pi \int_0^\pi \fc{\sin x}x\dx.$$

Intuition: $p(x) = \sum_{j=(n+1)/2}^n l_j(x)$. This is an alternating series which in the limit has finite nonzero sum.

Notes:

* Note even though each prtial sum is continuous, a series may converge pointwise to a discontinuous limit.
* Gibbs oscillations decay slowly at rate $O(k^{v+1})$ if $f^{(v)}$ has a jump.
* This is an algebraic rate of decay, while splins have exponential decay.
* We can get exponential decay by splitting up the function and approximating each piece separately.

# 10 Best approximation

**Theorem**. A continuous $f$ on $[-1,1]$ has a unique best approximation $p^*\in \cP_n$. It is uniquely characterized by $f-p$ equioscillating in $\ge n+2$ extreme points.

*Proof*. The minimum is attained because it lies in $\{\ve{f-p}\le \ve{f}\}$. ($L^\iy$ norms.) If $p,q$ satisfy the condition, and $\ve{f-q}< \ve{f_p}$, then $p-q$ has $n+1$ zeros. If it doesn't equioscillate, perturb by $(x_1-x)\cdots (x_k-x)$. (If $\ve{f-q}=\ve{f-p}$, use the following argument: suppose $p$ has equioscillation extreme points $x_{0:n+1}$. Induct on: $p-q$ has $\ge j$ roots in $[x_0,x_j]$. Suppose this is first violated at $k$ and obtain a contradiction.

# 11 Hermite integral formula
