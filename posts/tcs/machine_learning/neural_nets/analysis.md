---
title: Analysis of neural networks
published: 2016-03-05
modified: 2016-03-05
tags: neural net
type: research
---

#Research brainstorm

* Complexity theorety point of view: What can be calculated by depth $n$ threshold circuits? Each gate is a function $\sgn(\sum \al_ix_i)$.
* It doesn't make sense to assume the ground truth is a neural net. How can we model the ground truth?
    * As a set on the boolean cube $\{0,1\}^n$ or $[0,1]^n$. Model 1: Ising model on the Boolean cube.
	    * Understand such a distribution qualitatively. Ex. what is the average noise sensitivity? Fourier spectra? (What's the boundary look like?) Are these questions answered for random k-SAT? Might other models (ex. DNF's, CNF's) be better?
	    * Another layer: There is a probability distribution over inputs as well (you don't sample uniformly from the whole boolean cube. Makes sense because of next point).
		* Note that the set of pictures that make sense is probably very small.
		* What if you want the learned function to be noise stable? What is the noise stability of learned functions? Are threshold circuits noise stable?
	* How does this compare to known algorithms for learning boolean functions with low weight? What additional structure do we need to assume? (Low degree algorithm. Lower bounds (min sample complexity, by info theory) for learning b/c of number of functions.)
* "It doesn't make sense to assume the ground truth is a neural net," so the approach above is to consider a class of functions and show the class can be learned by neural nets. Is there reason to think of ground truth as a neural net?
* Explain me:
    * adversarial phenomena
	* the distribution of local minima follows laws from statistical physics. Getting to global optima can actually hurt generalization.

#People to talk to

* ML: Tengyu, Elad, Arora
* Zeev: threshold circuits, what's known. (See Kane's paper?)
* Aizenmann, Abbe: intuition for Ising model over $B^n$, or other models that make sense (ex. 3SAT).
* Fefferman, analysis/geometry students: approximation theory
