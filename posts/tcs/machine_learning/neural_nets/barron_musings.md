---
title: Musings on Barron's Theorem
published: 2016-12-22
modified: 2016-12-22
tags: neural net
type: research
showTOC: True
---

# Directions 12/22

* Wild baseless ideas: given distribution $\mu$, there is some sequence of eigenfunctions associated with it of increasing oscillations; writing a function as a combination of these, if most weight is on small eigenfunctions, then it can be represented by a 1-hidden layer NN on $\mu$. Estimate $\mu$ with kernels around sampled points?
* Forget NN. Can we estimate a Barron function (in MISE sense) well using Fourier sampling?
* Rademacher for real-valued functions?
* Barron's theorem has a hard-to-check condition: that $f$ has some extension $f_1$ such that $\ve{\wh{f_1'}}_1$ is small. Can we replace this by a more natural, easy to check condition? Ex. use the wavelet transform or windowed FT (both are localized) instead of Fourier.
* Converse of Barron: a function computed by a 1-hidden layer NN with $a_i$'s small is Barron. (Note difference from ES16: a Barron counterexample will be a NN counterexample only if we limit the $a_i$'s.)
* (Warning: If you only care about being close in $\mu$...)
* Can we make [ES16]'s criterion into an if-and-only-if criteria for representability by 1-hidden layer NN? Ex. concentration on some tubes.
* What is the advantage of sigmoids over Fourier basis? Somehow easier to train by monotonicity (less minima)? The relationship to sigmoids is tenuous. In NN the hidden layer often isn't vastly overcomplete like in Barron to get $\ep$ error, certainly you don't have multiple in the same direction (I think? - what if you add kernel to fit for that direction). Also you don't get a lot of oscillation in any direction - like the counterexamples, or even like $\cos$ for large phase. In fact, maybe even it is unimodal. So why sigmoids? Is there a function class for which sigmoids work better? Or are they just better for optimization?
* Boundary of accepting set (threshold) rather than function values?

# Generalization bounds

229T p. 198

Let $h$ be 1-Lipschitz sigmoid function.

\begin{align}
f_{w,\al}(x) &=\sumo jm v_j h(w_j\cdot x)\\
\mathcal F &= \set{f_{w,\al}}{\forall j\in [m],\ve{\al}_2\le B_2', \ve{w_j}_2\le B_2}\\
R_n(\mathcal F)&\le \fc{2B_2B_2'C_2\sqrt m}{\sqrt n}
\end{align}


Composition properties of Rademacher complexity aligns very
nicely with the layer-by-layer compositionality of neural networks.

Problems

* Set of all bounded continuous functions is too rich.
* Optimization?

[Andoni, Panigrahy, Valiant, Zhang] Neural networks approximate bounded-degree polynomials.
