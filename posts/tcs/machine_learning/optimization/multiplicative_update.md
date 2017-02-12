---
title: The Blessing and the Curse of the Multiplicative Updates
published: 2017-02-12
modified: 2017-02-12
tags: multiplicative update, online learning, biology, evolution
type: paper
showTOC: True
---

(Chapter by Manfred Warmuth)

Setting: online learning

Maintain weights where $w_i$ is the belief that the $i$th expert is best. Prediction: weighted average.

Multiplicative updates motivated by minimum relative entropy principle. Simplest is Bayes's rule for updating priors.

> The "blessing" of these updates is that they learn very fast in the short term because the good weights grow exponentially. However, their "curse" is that they learn too fast and wipe out other weights too quickly. This loss of variety can have a negative effect in the long term because adaptivity is required when there is a change in the process generating the data stream.

> Surprisingly, some of Nature's methods parallel the ones developed in machine learning, but Nature also has some additional tricks.

Evolution on 2 scales:

* Short-term: mutation and selection (multiplicative update)
* Long-term: stability - requires mechanism for preventing quick convergence to currently fittest strategy or gene.

$$
\wt s_i = \fc{s_ie^{-\eta \text{loss}_i}}{Z}
= \amin_{r\in \R^n, \sum_i r_i=1} \sum_i KL(r||s) + \eta\sum_i r_il_i
$$
Relative entropy keeps $\wt s$ close to $s$. $\eta$ is tradeoff parameter. $W_i = e^{-\eta l_i}$ is the fitness of strategy $i$. Bayes Rule: expected log loss, $\eta=1$.

(systematic way of deriving such updates by trading off a relative entropy between the new and old weight vector with a loss function that measures how well the weights did on the current instance vector)

Why multiplicative, not additive update? Converge quickly when data stream generating process is static.

Problem: data changes over time. MU loss of variety.

Use of MU: separate good/bad RNA, reamplify good. Loop. Use PCR.

Assumption: $W_i$ independent of share vector $s$. (Otherwise: apostatic effects.) $\wt s_i = \fc{w_iW_i}{\an{s,W}}$. 

In-vitro selection: iterate Bayes with same data likelihoods.

> "brittle" because the gradients of the losses appear in the exponents of the update factors. This is problematic when there is noise in the data and the data-generating process changes over time

Compounded: weights have constant precision.

Curse is extinctino in nature.

## Dispelling the curse

Ex. Bacteria in nutriet solution separate into 3 niches, 3 species. Mixing kills all but one.

> three species of bacteria that play an RPS game. When started on a Petri dish, colonies of each species develop that slowly chase each other around the dish: R invades S's colonies, S invades P, and P invades R

1. Niche boundaries help prevent the curse. (Human: multiplicative update of meme shares causes loss of variety.)
    * Key problem 1 (that cannot be solved by MU alone): There are three strands of RNA in a tube and the goal is to amplify the mixture while keeping the percentages of the strands unchanged. This is to be done without sequencing the strands and determining their concentrations.
	    * Solution: Translate to (double stranded) DNA and using an enzyme, add a specific short "end strand" to both ends of all strands in the tube. These end strands function as connectors between strands and make it possible to randomly ligate many strands together into long strands. Now separate out one long strand. With the help of an enzyme, add "primer strands" to both ends of that long strand. Apply PCR iteratively starting with the long selected strand, always making complete copies of the same original long strand that is located between the primers. Stop when you have the target amount of DNA. Now divide the long strands into their constituents by cutting them at the specific end strand that functioned as the connector. Finally, remove all short primer and end strands and convert back to RNA.
		* The long strand functions as a "chromosome." Free floating genes in the nuclei of cells would compete. 
2. Coupling preserves diversity.
    * Genes on chromosome selected for together; genes "cooperate" for sake of efficient copying.
	* What updates can be implemented with in-vitro selection/blind computation? Can you have negative weights?
	* $EG^{\pm}$ algorithm: maintain 2 weight vectors $s^+,s^-\in \R^n$. Label $(s^+-s^-)\cdot x$, loss $L((s^+-s^-)\cdot x,y) = ((s^+-s^-_)\cdot x-y)^2$ so that fitness is inverse.
	* Problem 2: find small set of RNA strands that can bind to $q$ different protein sheets. (Assume that among all strands in a 1-liter tube of RNA, there is a particular set of two strands such that for each of q proteins, at least one of the two has a high fraction of attachment. Can you use PCR to get $\approx (0.5, 0.5, 0,\ldots)$?)
		* First idea: cycle through $q$ proteins and do in-vitro selection.
		* Problem: overselecting can kill off one.
		* ML problem: $\exists u$ with $k$ nonzeros of value $\rc k$, $u\cdot W_j\ge \rc k$. Find $s$ with $s\cdot W_j \ge \rc{2k}$.
		* Normalized winnow algorithm: If $s\cdot W_j\ge \rc{2k}$, then $\wt s=s$ (conservative update), else apply MU.
	* ML 1: Prevent over-training by making the update conservative.
	* in the  context of in-vitro selection this means that RNA strands that attached to the protein sheet are simply recombined into the tube without the PCR amplification step.
	* the amplification step occurs at most $O(k\log \fc Nk)$ times if there is a consistent k-literal disjunction and this is information theoretically optimal. Grows logarithmically in $n$.
	* If select for $\binom nk$ combinations, not necessary to be conservative. But this is too large. 
	* Coupling can be replaced by thresholding.
	* Cap shares/weight from above.
3. Super (apex) predator. 
    * Nibbles at the highest bar of the histogram of possible prey species. (Removing it causes this species to take over.) The more frequent a species, the more opportunity for a disease to spread and this can keep a species from
taking over.
	* ML2: Cap the weights from above for the purpose of learning a set of experts.
	* After MU: all weights that exceed c are reduced to c and the total weight gained is redistributed among the remaining components that lie below c so that their ratios are preserved and the total weight still sums to one. (cf. exploration, $\ep$-greedy.)
	* capping solves a constrained optimization problem.
	* Ex. constrain to be in convex hull of $k$-corners. This still only needs $n$ weights.
	* In matrix MU, share vectors are density matrices - prob vector of eigenvalues
	* quantum relative entropy instead of the regular relative entropy
	* MMU with capping on eigenvalues: PCA. $k$ experts become $k$-dim subspace. Capped density matrices are convex combs of $k$-dim subspaces.
	* relating: lower bound shares.
	* keep a batch of the initial mixture in reserve. When too uniform, add some!
	* Disk spindown problem.
	* $\wt s = (1-\al) s^m + \al \rc N\one$.
4. Mutations keep a base variety.
    * Data shifts once in a while and some are a return back to data seen previously. Need:
	* Capability to bring up shares quickly.
	* Remember experts that did well in past. (Sleeping)
	* ML4: Sleeping realizes long-term memory.
	* Keep track of average share vector, mix in $\al$ of $r$.
	* Markov network with 2 tracks (tubes).
	* It is reasonable to expect that Nature makes use of the sleeping mechanism as well. (Seed sprouting.)

How is sleeping realized at genetic level. Junk DNA, sex?

# Summary 

Machine Learning mechanisms:

1. conservative update for learning multiple goals
2. upper bounding weights for learning multiple goals
3. lower bounding weights for robustness against change
4. sleeping for realizing a long-term memory.

Nature's mechanisms:

1. coupling for preserving variety
2. boundaries for preserving variety
3. super-predators for preserving variety
4. mutations for keeping a base variety.
