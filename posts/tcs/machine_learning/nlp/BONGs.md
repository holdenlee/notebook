---
title: (AKV17) A sparse recovery view of sentence embeddings, bag of n-grams, and LSTMs
published: 2017-07-18
modified: 2017-07-18
tags: sparse recovery, n-grams, lstm
type: paper
showTOC: True
---

* LSTMs can do as well as linear classification over BonGs.
* Calderbank: SVM can do as well given compressed $Ax$ instead of $x$, if $A$ is RIP.
	* But word vectors are not RIP, not even statistically.
* Basis pursuit/LASSO does better on word embeddings than random embeddings, even though word embeddings aren't incoherent/RIP.
	* What's a good explanation? Word vectors in sentence are often linearly separable from other vectors - why?
	* MP/OMP does worse on word embeddings.

(RIP stronger than incoherency? Ex. incoherency can have linear dependencies... Incoherency gives something like statistical RIP?)
