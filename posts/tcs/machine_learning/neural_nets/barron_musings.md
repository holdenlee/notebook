---
title: Musings on Barron's Theorem
published: 2016-12-22
modified: 2017-03-15
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

# Kernel methods

* [GKKT16] Reliably Learning the ReLU in Polynomial Time
* [ZLJ16] l1-regularized Neural Networks are Improperly Learnable in Polynomial Time

## From email

* We can bound the Barron norm of a 1-hidden layer NN if we bound the size of the the vectors:  $c \sigma (a^Tx + b)$ has Barron norm $O(c||a||_2)$. We can bound Barron norm $\int||\omega|||\hat f|$ by
	* $\sqrt{(\int||\omega||^{2s}|\hat f|^2)(\int ||\omega||^{2-2s})}$ (but this requires $s>n/2$ for the second integral to converge, and I suspect the first integral might be undesirably large)
	* $\sqrt{(\int||\omega||^{2}|\hat f|^2)(\int_S 1)}$ if we somehow "band-limit" $f$ by zeroing out its Fourier transform outside $S$.
* I need to compare bound $f(x)$ by a norm in a Hilbert space and the Barron norm is not a norm in a Hilbert space.

Some things:

* I'm confused about $n$ dimensions. There's the weird thing that even though $\si=1$ in $e^{-\fc{\ve{x}^2}{2}}$, the standard deviation is $\sqrt n$. cf. Mass of sphere is mostly near boundary.
* Why aren't most reasonable functions approximable by band-limited functions? If you can approximate with $\ve{\om}$'s $\le C_n\sqrt n$, then Barron's Theorem applies trivially, because you don't have an exponentially large volume!
* Another problem: for $\si(a^Tx+b)$, $L^1$ norm is bounded so Barron is OK, but $L^2$ norm is infinite. In order to get a Hilbert space bound, you have to smooth, and you don't get finite $L^2$ until you smooth by $e^{-O(x^2)}$.
* Bandlimiting at $\sqrt n$ is like convolving with something that is $e^{-O(x^2)}$---this is bad because it smooths everything out! ? Not really, you want a bump function, not a Gaussian, this is incorrect intuition?

Conclusion: 

* Hilbert space bound seems useless for $\si(a^Tx+b)$ because the amount of smoothing needed for bounded $L^2$ seems like it kills the function.
* Even if we only care about a Barron constant bound, I have a problem: why aren't bandlimited functions good enough to approximate NN's? (Additive $L^\iy$ error OK? I.e., get signs? Don't care about total $L^2$ error?)
    * Suppose measure is in unit sphere. (Is this silly, should I consider the box instead?) It seems like there is additive error $k_n\to 0$ in $\si(a^Tx+b)$ approximation as $n\to \iy$. (I'm looking at Barron converse.)
	* Actual function approximation doesn't get better as $n\to \iy$ (otherwise it would be a paradox). If we consider point/line masses in Fourier space, there is no contradiction.
	* Radial functions without too much oscillation are also good. (This actually seems counterintuitive to me.)
	* What's an example of a function that is Lipschitz and not easily expressible? Consider a grid of triangle functions. What does this look like when bandlimited? I guess it gets killed by the convolution, while a few faraway directions do not? So instead of looking at Barron directly look at: ability to approximate with convolved/decayed function? (Although bounds are probably not too good.) Check how convolution plays out in the Hankel transform? ! For 1-D things, we only care about the projection onto that dimension---so the convolution doesn't kill it. Formalize: something with low $L^0$ (sparsity) isn't too affected (in $L^\iy$) by convolution? And this is NOT true (directly) for $L^1$? Although Barron says that things small in $L^1$ can be approximated by things small in $L^0$---so we can always use that as a first step. (norm different though?) Conclusion/steps:
		* Show that every NN can be approximated in $L^\iy$ by bandlimited function. Possibly restrict to NN's with some incoherence condition (so we lose a chunk, although possibly an unimportant chunk, of the Barron functions). 
		* Simply use RKHS with norm $\pa{\int\ve{\om}^2|\wh f(\om)|^2}^{\rc 2}$. (Proof of boundedness by this norm goes through Barron norm, but there is no use of Barron's theorem.)
		* Find the kernel for this! I'm having trouble doing this. I'm not dealing with the $f(0)$ properly so am getting divergence. $\wh k_y(\om) = \fc{e^{-i\an{\om,y}}}{\ve{\om}^2}$. If use $1+\ve{\om}^2$ I get $\wh k_y(\om) = \fc{e^{-i\an{\om,y}}}{1+\ve{\om}^2}$.
		* Write an $f$ you're trying to approximate as $\sum a_xk_x$ where $(x,y)$ are training pairs.
		* Careful with either compact support or $f(0)=0$ condition. 
	* What's transform of a sphere (surface)?
	* What's difference with using Sobolev norm $s>\fc n2$? For that you have to bandwidth to 1, not $\Te(\sqrt n)$.
* Fundamental solution $\rc{(4Dt)^{\fc n2}} e^{-\fc{\ve{x}^2}{4Dt}}$.

Other musings:

* For convolutional? Lipschitz control? Translation invariance? Think about torus case?
